import { Redis } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = new Redis(process.env.REDIS_URL);

const rateLimiterOpts = {
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 10, // Number of points
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterRedis(rateLimiterOpts);

export const rateLimit = {
  async check(req: Request) {
    try {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      await rateLimiter.consume(ip);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
};