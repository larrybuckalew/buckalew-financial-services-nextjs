// Advanced Security Utilities

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csrf from 'csurf';

// Rate Limiting Configuration
export const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options.max || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    headers: true,
    ...options
  });
};

// CSRF Protection Middleware
export const csrfProtection = csrf({ cookie: true });

// Advanced Security Middleware
export const securityMiddleware = [
  // Helmet helps secure Express apps by setting various HTTP headers
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'trusted-cdn.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'trusted-cdn.com']
      }
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }),

  // Basic bot protection
  (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';
    const botPatterns = [
      /bot/i,
      /spider/i,
      /crawler/i
    ];

    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      return res.status(403).send('Bot access denied');
    }
    next();
  }
];

// Secure Document Storage Configuration
export const configureDocumentStorage = (multer) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // Validate user permissions before allowing document upload
      if (!req.user || !req.user.hasDocumentUploadPermission) {
        return cb(new Error('Unauthorized document upload'), null);
      }
      cb(null, 'uploads/secure_documents/');
    },
    filename: (req, file, cb) => {
      // Generate secure, unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
};