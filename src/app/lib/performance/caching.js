export class CacheManager {
    constructor(config) {
        this.cache = new Map();
        this.config = config;
    }
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }
    get(key) {
        const cached = this.cache.get(key);
        if (!cached)
            return null;
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
    clear() {
        this.cache.clear();
    }
}
// Create cache instances
export const pageCache = new CacheManager({ maxAge: 60000 }); // 1 minute
export const apiCache = new CacheManager({
    maxAge: 300000, // 5 minutes
    staleWhileRevalidate: 600000 // 10 minutes
});
