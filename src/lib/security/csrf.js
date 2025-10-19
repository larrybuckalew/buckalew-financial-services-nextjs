import { randomBytes } from 'crypto';
// CSRF token management class
export class CSRFProtection {
    // Generate a new CSRF token
    static generateToken(sessionId) {
        // Remove any expired tokens
        this.cleanupExpiredTokens();
        // Generate a new token
        const token = randomBytes(32).toString('hex');
        // Store the token with a timestamp
        this.tokens.set(sessionId, JSON.stringify({
            token,
            createdAt: Date.now()
        }));
        return token;
    }
    // Validate CSRF token
    static validateToken(sessionId, providedToken) {
        const storedTokenData = this.tokens.get(sessionId);
        if (!storedTokenData)
            return false;
        const { token, createdAt } = JSON.parse(storedTokenData);
        // Check if token is valid and not expired
        return (token === providedToken &&
            (Date.now() - createdAt) < this.TOKEN_EXPIRY);
    }
    // Remove expired tokens
    static cleanupExpiredTokens() {
        const now = Date.now();
        for (const [sessionId, tokenData] of this.tokens.entries()) {
            const { createdAt } = JSON.parse(tokenData);
            if ((now - createdAt) >= this.TOKEN_EXPIRY) {
                this.tokens.delete(sessionId);
            }
        }
    }
    // CSRF middleware for API routes
    static middleware(req, res, next) {
        // Only protect state-changing methods
        const protectedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (protectedMethods.includes(req.method || '')) {
            // Get session ID (could be from session, JWT, or another method)
            const sessionId = req.cookies['session_id'] || 'default_session';
            // Get CSRF token from request headers or body
            const csrfToken = req.headers['x-csrf-token'] ||
                req.body['_csrf'];
            // Validate the token
            if (!csrfToken || !this.validateToken(sessionId, csrfToken)) {
                return res.status(403).json({
                    error: 'Invalid or missing CSRF token'
                });
            }
        }
        next();
    }
}
CSRFProtection.tokens = new Map();
CSRFProtection.TOKEN_EXPIRY = 1000 * 60 * 60; // 1 hour
// Utility to get a new CSRF token
export function getCSRFToken(sessionId) {
    return CSRFProtection.generateToken(sessionId);
}
// Middleware export for use in API routes
export function csrfProtection(req, res, next) {
    return CSRFProtection.middleware(req, res, next);
}
