import { Redis } from 'ioredis';
export class ServerCache {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Redis({
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                password: process.env.REDIS_PASSWORD
            });
        }
        return this.instance;
    }
    static async set(key, value, options = {}) {
        const redis = this.getInstance();
        const cacheKey = `${this.CACHE_PREFIX}${key}`;
        const stringValue = JSON.stringify(value);
        if (options.ttl) {
            await redis.set(cacheKey, stringValue, 'EX', options.ttl);
        }
        else {
            await redis.set(cacheKey, stringValue);
        }
    }
    static async get(key) {
        const redis = this.getInstance();
        const cacheKey = `${this.CACHE_PREFIX}${key}`;
        const cachedValue = await redis.get(cacheKey);
        if (cachedValue) {
            try {
                return JSON.parse(cachedValue);
            }
            catch (error) {
                console.error('Cache parsing error:', error);
                return null;
            }
        }
        return null;
    }
    static async delete(key) {
        const redis = this.getInstance();
        const cacheKey = `${this.CACHE_PREFIX}${key}`;
        await redis.del(cacheKey);
    }
    // Advanced Caching Decorator for API Handlers
    static cacheable(ttl = 300) {
        return function (target, propertyKey, descriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args) {
                const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
                try {
                    // Check cache first
                    const cachedResult = await ServerCache.get(cacheKey);
                    if (cachedResult)
                        return cachedResult;
                    // If not in cache, run original method
                    const result = await originalMethod.apply(this, args);
                    // Cache the result
                    await ServerCache.set(cacheKey, result, { ttl });
                    return result;
                }
                catch (error) {
                    console.error('Caching error:', error);
                    return originalMethod.apply(this, args);
                }
            };
            return descriptor;
        };
    }
}
ServerCache.CACHE_PREFIX = 'buckalew:';
// Error Logging Middleware
export class ErrorLogger {
    static log(error, context) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: error.stack,
            context
        };
        // In a real-world scenario, this would integrate with a logging service like Sentry
        console.error(JSON.stringify(logEntry, null, 2));
        // Optional: Send to external logging service
        // Sentry.captureException(error);
    }
    static async logApiError(req, res, error) {
        this.log(error, {
            method: req.method,
            path: req.path,
            query: req.query,
            body: req.body
        });
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        });
    }
}
