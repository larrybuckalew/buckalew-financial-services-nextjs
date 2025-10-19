import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'

class SecurityService {
  // Generate secure random tokens
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  // Password strength validation
  static validatePasswordStrength(password: string): boolean {
    // Enforce strong password policy
    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$'
    )
    return passwordRegex.test(password)
  }

  // Sanitize user inputs
  static sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // Create rate limiter for authentication
  static createAuthRateLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many login attempts, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
    })
  }

  // Generate secure headers
  static getSecurityHeaders() {
    return {
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }

  // Implement CSRF protection
  static generateCSRFToken(): string {
    return uuidv4()
  }

  // Verify CSRF token
  static verifyCSRFToken(
    providedToken: string, 
    storedToken: string
  ): boolean {
    return crypto.timingSafeEqual(
      Buffer.from(providedToken), 
      Buffer.from(storedToken)
    )
  }
}

export default SecurityService