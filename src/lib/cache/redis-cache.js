import Redis from 'ioredis';
class RedisCache {
    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD
        });
    }
    async set(key, value, ttl = 3600) {
        const serializedValue = JSON.stringify(value);
        await this.client.set(key, serializedValue, 'EX', ttl);
    }
    async get(key) {
        const cachedValue = await this.client.get(key);
        return cachedValue ? JSON.parse(cachedValue) : null;
    }
    async delete(key) {
        await this.client.del(key);
    }
    async clearAll() {
        await this.client.flushdb();
    }
}
export const redisCache = new RedisCache();
