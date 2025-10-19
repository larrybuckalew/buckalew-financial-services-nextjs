import { LRUCache } from 'lru-cache';
export class RateLimiter {
    constructor(options = {}) {
        const defaultOptions = {
            interval: 60 * 1000, // 1 minute
            uniqueTokenPerInterval: 10 // 10 requests per minute
        };
        this.options = { ...defaultOptions, ...options };
        this.cache = new LRUCache({
            max: 500, // Store up to 500 unique tokens
            ttl: this.options.interval || 60000, // Default 1 minute
        });
    }
    // Get client identifier (IP or token)
    getClientIdentifier(req) {
        // Prioritize authenticated user ID, fallback to IP
        const userId = req.user?.id;
        if (userId)
            return `user:${userId}`;
        // Fallback to IP address
        const ip = req.headers['x-forwarded-for'] ||
            req.headers['x-real-ip'] ||
            req.socket.remoteAddress ||
            '127.0.0.1';
        return Array.isArray(ip) ? ip[0] : ip;
    }
    // Check if request should be rate limited
    check(req, res) {
        const identifier = this.getClientIdentifier(req);
        const now = Date.now();
        // Get existing timestamps for this identifier
        const timestamps = this.cache.get(identifier) || [];
        // Filter out timestamps outside the current interval
        const recentRequests = timestamps.filter(time => now - time < (this.options.interval || 60000));
        // Check if we've exceeded the limit
        if (recentRequests.length >= (this.options.uniqueTokenPerInterval || 10)) {
            return false; // Rate limited
        }
        // Add current timestamp and update cache
        this.cache.set(identifier, [...recentRequests, now]);
        return true;
    }
    // Middleware for rate limiting
    middleware(req, res, next) {
        if (!this.check(req, res)) {
            return res.status(429).json({
                error: 'Too many requests, please try again later',
                retryAfter: this.options.interval ?
                    Math.ceil(this.options.interval / 1000) :
                    60
            });
        }
        next();
    }
}
// Create rate limiters for different endpoint types
export const apiRateLimiter = new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10
});
export const authRateLimiter = new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 5 // More strict for auth endpoints
});
export const publicRateLimiter = new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 20 // More lenient for public endpoints
});
// Middleware generators
export function apiRateLimitMiddleware(req, res, next) {
    return apiRateLimiter.middleware(req, res, next);
}
export function authRateLimitMiddleware(req, res, next) {
    return authRateLimiter.middleware(req, res, next);
}
export function publicRateLimitMiddleware(req, res, next) {
    return publicRateLimiter.middleware(req, res, next);
}
