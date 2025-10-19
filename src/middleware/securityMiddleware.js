import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import rateLimit from 'express-rate-limit';
export class SecurityMiddleware {
    // Rate limiting configuration
    static createRateLimiter(config = {}) {
        const { maxRequestsPerWindow = 100, windowMs = 15 * 60 * 1000, // 15 minutes
        trustProxy = true } = config;
        return rateLimit({
            windowMs,
            max: maxRequestsPerWindow,
            standardHeaders: true,
            legacyHeaders: false,
            trustProxy
        });
    }
    // Enhanced security headers
    static securityHeaders(req) {
        const nonce = this.generateNonce();
        const response = NextResponse.next();
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        // CSP with nonce for inline scripts
        response.headers.set('Content-Security-Policy', `default-src 'self'; 
       script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; 
       style-src 'self' 'nonce-${nonce}';
       img-src 'self' data:;
       connect-src 'self';
       font-src 'self';`);
        return { response, nonce };
    }
    // Generate cryptographically secure nonce
    static generateNonce() {
        return Buffer.from(crypto.randomBytes(16)).toString('base64');
    }
    // JWT token validation middleware
    static validateJWTToken(token) {
        try {
            // Implement JWT validation logic
            // 1. Check token structure
            // 2. Verify signature
            // 3. Check expiration
            // 4. Validate claims
            return true;
        }
        catch (error) {
            return false;
        }
    }
    // Advanced request sanitization
    static sanitizeRequest(req) {
        // Remove or sanitize potentially dangerous input
        const sanitizedBody = this.sanitizeInput(req.body);
        const sanitizedHeaders = this.sanitizeHeaders(req.headers);
        return {
            sanitizedBody,
            sanitizedHeaders
        };
    }
    // Input sanitization helper
    static sanitizeInput(input) {
        if (typeof input === 'string') {
            // Remove potential XSS vectors
            return input
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        }
        if (Array.isArray(input)) {
            return input.map(this.sanitizeInput);
        }
        if (typeof input === 'object' && input !== null) {
            const sanitizedObj = {};
            for (const [key, value] of Object.entries(input)) {
                sanitizedObj[key] = this.sanitizeInput(value);
            }
            return sanitizedObj;
        }
        return input;
    }
    // Header sanitization
    static sanitizeHeaders(headers) {
        const sanitizedHeaders = new Headers();
        headers.forEach((value, key) => {
            // Remove or sanitize specific headers
            const sanitizedKey = this.sanitizeInput(key);
            const sanitizedValue = this.sanitizeInput(value);
            // Add additional header security checks
            if (this.isAllowedHeader(sanitizedKey)) {
                sanitizedHeaders.set(sanitizedKey, sanitizedValue);
            }
        });
        return sanitizedHeaders;
    }
    // Check if header is allowed
    static isAllowedHeader(header) {
        const allowedHeaders = [
            'content-type',
            'authorization',
            'accept',
            'user-agent'
        ];
        return allowedHeaders.includes(header.toLowerCase());
    }
    // Logging security events
    static logSecurityEvent(event) {
        // Implement secure logging mechanism
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            ...event
        }));
        // Optionally send to external monitoring system
        this.notifySecurityTeam(event);
    }
    // Notify security team about potential security events
    static notifySecurityTeam(event) {
        // Implement notification logic (email, slack, etc.)
    }
    // IP-based access control
    static checkIPAccessControl(ip) {
        // Implement IP whitelist/blacklist logic
        const blockedIPs = [
        // List of blocked IP ranges or specific IPs
        ];
        return !blockedIPs.some(blockedIP => this.isIPInRange(ip, blockedIP));
    }
    // IP range checking utility
    static isIPInRange(ip, range) {
        // Implement IP range matching logic
        return false; // Placeholder
    }
}
// Middleware function for Next.js
export function securityMiddleware(req) {
    // Perform security checks
    const { response, nonce } = SecurityMiddleware.securityHeaders(req);
    // Validate IP
    if (!SecurityMiddleware.checkIPAccessControl(req.ip || '')) {
        return NextResponse.redirect(new URL('/blocked', req.url));
    }
    // Sanitize request
    const { sanitizedBody, sanitizedHeaders } = SecurityMiddleware.sanitizeRequest(req);
    // Log security events
    SecurityMiddleware.logSecurityEvent({
        type: 'login_attempt',
        details: {
            path: req.nextUrl.pathname,
            method: req.method
        }
    });
    return response;
}
