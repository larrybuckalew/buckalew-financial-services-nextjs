import Redis from 'ioredis'

class CacheService {
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      db: 0 // Use database 0 for caching
    })
  }

  // Cache calculation results
  async cacheCalculation(key: string, data: any, ttl: number = 3600) {
    try {
      await this.redis.set(
        `calc:${key}`, 
        JSON.stringify(data), 
        'EX', 
        ttl // Expire after 1 hour by default
      )
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  // Retrieve cached calculation
  async getCachedCalculation(key: string): Promise<any | null> {
    try {
      const cachedData = await this.redis.get(`calc:${key}`)
      return cachedData ? JSON.parse(cachedData) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  // Generate a unique cache key based on request
  generateCacheKey(method: string, url: string, body: any, query: any): string {
    const keyParts = [
      method,
      url,
      JSON.stringify(body),
      JSON.stringify(query)
    ]
    return keyParts.join(':')
  }
}

export const cacheService = new CacheService()