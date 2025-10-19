import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
class RateLimiter {
    constructor() {
        this.store = {};
    }
    checkRateLimit(key, config) {
        const now = Date.now();
        const entry = this.store[key];
        // Clean up expired entries
        if (entry && entry.resetTime < now) {
            delete this.store[key];
        }
        if (!entry || entry.resetTime < now) {
            // Create new entry
            this.store[key] = {
                count: 1,
                resetTime: now + config.windowMs
            };
            return true;
        }
        if (entry.count < config.max) {
            entry.count++;
            return true;
        }
        return false;
    }
}
const rateLimiter = new RateLimiter();
export function rateLimitMiddleware(request, config) {
    const ip = request.ip || 'unknown';
    const path = request.nextUrl.pathname;
    const isRateLimited = !rateLimiter.checkRateLimit(ip, config);
    if (isRateLimited) {
        logger.warn('Rate limit exceeded', {
            ip,
            path,
            maxRequests: config.max
        });
        return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 });
    }
    return NextResponse.next();
}
