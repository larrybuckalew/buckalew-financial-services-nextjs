interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
}

export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }>;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.cache = new Map();
    this.config = config;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > this.config.maxAge) {
      if (this.config.staleWhileRevalidate && age <= this.config.staleWhileRevalidate) {
        // Return stale data while revalidating
        return { data: cached.data, stale: true };
      }
      this.cache.delete(key);
      return null;
    }

    return { data: cached.data, stale: false };
  }

  clear(): void {
    this.cache.clear();
  }
}

// Create cache instances
export const pageCache = new CacheManager({ maxAge: 60000 }); // 1 minute
export const apiCache = new CacheManager({ 
  maxAge: 300000,  // 5 minutes
  staleWhileRevalidate: 600000  // 10 minutes
});