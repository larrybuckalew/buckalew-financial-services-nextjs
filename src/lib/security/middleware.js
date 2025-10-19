import { CSRFProtection } from './csrf';
import { apiRateLimiter, authRateLimiter } from './rate-limit';
import { EncryptionService } from './encryption';
export class SecurityMiddleware {
    // Comprehensive security middleware
    static apply(req, res, options = {}) {
        const defaultOptions = {
            csrf: true,
            rateLimiting: true,
            encrypt: false
        };
        const finalOptions = { ...defaultOptions, ...options };
        // CSRF Protection
        if (finalOptions.csrf) {
            const sessionId = req.cookies['session_id'] || 'default_session';
            const csrfToken = req.headers['x-csrf-token'] ||
                req.body['_csrf'];
            if (!csrfToken || !CSRFProtection.validateToken(sessionId, csrfToken)) {
                res.status(403).json({ error: 'Invalid CSRF token' });
                return false;
            }
        }
        // Rate Limiting
        if (finalOptions.rateLimiting) {
            const method = req.method?.toUpperCase();
            const limiter = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')
                ? authRateLimiter
                : apiRateLimiter;
            if (!limiter.check(req, res)) {
                res.status(429).json({
                    error: 'Too many requests, please try again later'
                });
                return false;
            }
        }
        // Optional data encryption for sensitive routes
        if (finalOptions.encrypt) {
            try {
                // Example: Encrypt request body for sensitive routes
                if (req.body) {
                    req.body = EncryptionService.encrypt(JSON.stringify(req.body), process.env.ENCRYPTION_SECRET_KEY || '');
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Encryption failed' });
                return false;
            }
        }
        return true;
    }
    // Middleware for API routes
    static apiMiddleware(req, res, next) {
        if (this.apply(req, res)) {
            next();
        }
    }
    // Middleware for authentication routes
    static authMiddleware(req, res, next) {
        if (this.apply(req, res, {
            csrf: true,
            rateLimiting: true
        })) {
            next();
        }
    }
    // Middleware for sensitive data routes
    static sensitiveDataMiddleware(req, res, next) {
        if (this.apply(req, res, {
            csrf: true,
            rateLimiting: true,
            encrypt: true
        })) {
            next();
        }
    }
}
// Utility functions for easier middleware usage
export function applySecurityMiddleware(req, res, options) {
    return SecurityMiddleware.apply(req, res, options);
}
