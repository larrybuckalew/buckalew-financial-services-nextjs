import { NextApiRequest, NextApiResponse } from 'next';

export function withSecurityHeaders(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async function securityMiddleware(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // Security headers
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.buckalew-financial.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    );
    res.setHeader(
      'Permissions-Policy',
      [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'interest-cohort=()',
      ].join(', ')
    );
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Cross-Origin-Embedder-Policy (COEP)
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    // Cross-Origin-Opener-Policy (COOP)
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

    // Cross-Origin-Resource-Policy (CORP)
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    try {
      await handler(req, res);
    } catch (error) {
      console.error('Request error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export function combineMiddleware(...middleware: Function[]) {
  return middleware.reduce((a, b) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      await a(req, res, async () => {
        await b(req, res, async () => {});
      });
    };
  });
}