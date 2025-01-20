import Redis from 'ioredis';

class RedisCache {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }

  async set(key: string, value: any, ttl: number = 3600) {
    const serializedValue = JSON.stringify(value);
    await this.client.set(key, serializedValue, 'EX', ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const cachedValue = await this.client.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  }

  async delete(key: string) {
    await this.client.del(key);
  }

  async clearAll() {
    await this.client.flushdb();
  }
}

export const redisCache = new RedisCache();
