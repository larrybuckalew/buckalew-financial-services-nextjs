import Redis from 'ioredis';
import { logMetric } from '../monitoring';

const redis = new Redis(process.env.REDIS_URL);

interface CacheOptions {
  ttl?: number;
  tags?: string[];
}

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logMetric('cache_error', 1, { operation: 'get', key });
      return null;
    }
  },

  async set(key: string, value: any, options: CacheOptions = {}): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (options.ttl) {
        await redis.set(key, serialized, 'EX', options.ttl);
      } else {
        await redis.set(key, serialized);
      }
      if (options.tags) {
        await Promise.all(options.tags.map(tag => 
          redis.sadd(`cache:tags:${tag}`, key)
        ));
      }
    } catch (error) {
      logMetric('cache_error', 1, { operation: 'set', key });
    }
  },

  async invalidateByTag(tag: string): Promise<void> {
    const keys = await redis.smembers(`cache:tags:${tag}`);
    if (keys.length) {
      await redis.del(...keys, `cache:tags:${tag}`);
    }
  }
};