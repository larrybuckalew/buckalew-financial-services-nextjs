import { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';

// CSRF token management class
export class CSRFProtection {
  private static tokens = new Map<string, string>();
  private static TOKEN_EXPIRY = 1000 * 60 * 60; // 1 hour

  // Generate a new CSRF token
  static generateToken(sessionId: string): string {
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
  static validateToken(sessionId: string, providedToken: string): boolean {
    const storedTokenData = this.tokens.get(sessionId);
    
    if (!storedTokenData) return false;

    const { token, createdAt } = JSON.parse(storedTokenData);
    
    // Check if token is valid and not expired
    return (
      token === providedToken && 
      (Date.now() - createdAt) < this.TOKEN_EXPIRY
    );
  }

  // Remove expired tokens
  private static cleanupExpiredTokens() {
    const now = Date.now();
    for (const [sessionId, tokenData] of this.tokens.entries()) {
      const { createdAt } = JSON.parse(tokenData);
      if ((now - createdAt) >= this.TOKEN_EXPIRY) {
        this.tokens.delete(sessionId);
      }
    }
  }

  // CSRF middleware for API routes
  static middleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    // Only protect state-changing methods
    const protectedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    
    if (protectedMethods.includes(req.method || '')) {
      // Get session ID (could be from session, JWT, or another method)
      const sessionId = req.cookies['session_id'] || 'default_session';
      
      // Get CSRF token from request headers or body
      const csrfToken = 
        req.headers['x-csrf-token'] as string || 
        req.body['_csrf'] as string;
      
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

// Utility to get a new CSRF token
export function getCSRFToken(sessionId: string) {
  return CSRFProtection.generateToken(sessionId);
}

// Middleware export for use in API routes
export function csrfProtection(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  return CSRFProtection.middleware(req, res, next);
}
