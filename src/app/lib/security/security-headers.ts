import helmet from 'helmet';
import { NextApiRequest, NextApiResponse } from 'next';

class SecurityHeaders {
  /**
   * Apply secure HTTP headers
   * @param req Next.js API Request
   * @param res Next.js API Response
   */
  static applyHeaders(req: NextApiRequest, res: NextApiResponse) {
    // Content Security Policy
    res.setHeader(
      'Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src * data:; " +
      "connect-src 'self' https://vitals.vercel-insights.com; " +
      "font-src 'self'"
    );

    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // XSS Protection
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Strict Transport Security
    res.setHeader(
      'Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  /**
   * Rate limiting middleware
   * @param req Next.js API Request
   * @param res Next.js API Response
   * @param next Middleware next function
   */
  static async rateLimit(
    req: NextApiRequest, 
    res: NextApiResponse, 
    next: () => Promise<void>
  ) {
    // Implement rate limiting logic
    const ip = req.socket.remoteAddress || '127.0.0.1';
    const currentTime = Date.now();

    // Store rate limit in Redis or another cache
    const requestCount = await this.incrementRequestCount(ip);

    if (requestCount > 100) { // 100 requests per hour
      return res.status(429).json({ 
        error: 'Too many requests, please try again later' 
      });
    }

    next();
  }

  /**
   * Increment request count for an IP
   * @param ip IP Address
   * @returns Current request count
   */
  private static async incrementRequestCount(ip: string): Promise<number> {
    // This would typically use Redis or another distributed cache
    // Simplified for demonstration
    return 0;
  }

  /**
   * Sanitize user input
   * @param input Raw input string
   * @returns Sanitized input
   */
  static sanitizeInput(input: string): string {
    // Remove potential XSS scripts and SQL injection attempts
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
        switch (char) {
          case '\0': return '\\0';
          case '\x08': return '\\b';
          case '\x09': return '\\t';
          case '\x1a': return '\\z';
          case '\n': return '\\n';
          case '\r': return '\\r';
          case '"':
          case "'":
          case '\\':
          case '%':
            return '\\' + char; // Escape special chars
          default: return char;
        }
      });
  }
}

export default SecurityHeaders;
