import { NextResponse } from 'next/server';
import { Redis } from 'ioredis';
import { logMetric } from '@/lib/monitoring';

interface RateLimitConfig {
  windowMs: number;
  max: number;
  keyGenerator?: (req: Request) => string;
}

const redis = new Redis(process.env.REDIS_URL);

export function createRateLimiter(config: RateLimitConfig) {
  return async (req: Request) => {
    const key = config.keyGenerator
      ? config.keyGenerator(req)
      : `ratelimit:${req.headers.get('x-forwarded-for') || 'unknown'}`;

    const window = Math.floor(Date.now() / config.windowMs);
    const windowKey = `${key}:${window}`;

    try {
      const requests = await redis.incr(windowKey);
      await redis.expire(windowKey, Math.ceil(config.windowMs / 1000));

      const remaining = Math.max(0, config.max - requests);

      if (requests > config.max) {
        logMetric('rate_limit_exceeded', 1, { key });
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (window * config.windowMs + config.windowMs).toString(),
          },
        });
      }

      return {
        headers: {
          'X-RateLimit-Limit': config.max.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': (window * config.windowMs + config.windowMs).toString(),
        },
      };
    } catch (error) {
      logMetric('rate_limit_error', 1, { key });
      // Fail open in case of Redis errors
      return { headers: {} };
    }
  };
}