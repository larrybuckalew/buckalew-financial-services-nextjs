import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import { DatabaseService } from '@/lib/db/db-service';

// Create a store that uses the database to track rate limits
const createStore = () => {
  const db = new DatabaseService();
  return {
    async increment(key: string): Promise<void> {
      await db.executeQuery(
        `INSERT INTO rate_limits (key, count, expires)
         VALUES ($1, 1, NOW() + INTERVAL '1 hour')
         ON CONFLICT (key)
         DO UPDATE SET 
           count = rate_limits.count + 1,
           expires = NOW() + INTERVAL '1 hour'
         WHERE rate_limits.expires > NOW()`,
        [key]
      );
    },
    async decrement(key: string): Promise<void> {
      await db.executeQuery(
        'UPDATE rate_limits SET count = count - 1 WHERE key = $1',
        [key]
      );
    },
    async resetKey(key: string): Promise<void> {
      await db.executeQuery(
        'DELETE FROM rate_limits WHERE key = $1',
        [key]
      );
    },
    async getCount(key: string): Promise<number> {
      const result = await db.executeQuery<{ count: number }>(
        'SELECT count FROM rate_limits WHERE key = $1 AND expires > NOW()',
        [key]
      );
      return result?.count || 0;
    },
  };
};

export const rateLimiter = (options: {
  windowMs?: number;
  max?: number;
  message?: string;
  keyGenerator?: (req: NextApiRequest) => string;
}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100,
    message = 'Too many requests, please try again later.',
    keyGenerator = (req) => 
      req.headers['x-real-ip'] as string || 
      req.headers['x-forwarded-for'] as string ||
      req.socket.remoteAddress ||
      'unknown',
  } = options;

  const store = createStore();

  return async function rateLimitMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ) {
    const key = keyGenerator(req);
    const count = await store.getCount(key);

    if (count >= max) {
      res.status(429).json({ message });
      return;
    }

    await store.increment(key);
    
    // Set headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - count - 1));

    try {
      await next();
    } finally {
      // Cleanup if needed
    }
  };
};