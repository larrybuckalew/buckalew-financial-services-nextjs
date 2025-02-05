import { Redis } from 'ioredis';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

export class ServerCache {
  private static instance: Redis;
  private static CACHE_PREFIX = 'buckalew:';

  private static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD
      });
    }
    return this.instance;
  }

  static async set(
    key: string, 
    value: any, 
    options: CacheOptions = {}
  ): Promise<void> {
    const redis = this.getInstance();
    const cacheKey = `${this.CACHE_PREFIX}${key}`;
    const stringValue = JSON.stringify(value);

    if (options.ttl) {
      await redis.set(cacheKey, stringValue, 'EX', options.ttl);
    } else {
      await redis.set(cacheKey, stringValue);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    const redis = this.getInstance();
    const cacheKey = `${this.CACHE_PREFIX}${key}`;
    
    const cachedValue = await redis.get(cacheKey);
    
    if (cachedValue) {
      try {
        return JSON.parse(cachedValue) as T;
      } catch (error) {
        console.error('Cache parsing error:', error);
        return null;
      }
    }
    
    return null;
  }

  static async delete(key: string): Promise<void> {
    const redis = this.getInstance();
    const cacheKey = `${this.CACHE_PREFIX}${key}`;
    await redis.del(cacheKey);
  }

  // Advanced Caching Decorator for API Handlers
  static cacheable(ttl = 300) { // Default 5-minute cache
    return function(
      target: any, 
      propertyKey: string, 
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = async function(...args: any[]) {
        const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
        
        try {
          // Check cache first
          const cachedResult = await ServerCache.get(cacheKey);
          if (cachedResult) return cachedResult;

          // If not in cache, run original method
          const result = await originalMethod.apply(this, args);

          // Cache the result
          await ServerCache.set(cacheKey, result, { ttl });

          return result;
        } catch (error) {
          console.error('Caching error:', error);
          return originalMethod.apply(this, args);
        }
      };

      return descriptor;
    };
  }
}

// Error Logging Middleware
export class ErrorLogger {
  static log(error: Error, context?: Record<string, any>) {
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

  static async logApiError(
    req: any, 
    res: any, 
    error: Error
  ) {
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
