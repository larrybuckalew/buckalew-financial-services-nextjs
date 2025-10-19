# Security Utilities

## Overview
This directory contains comprehensive security utilities for the Buckalew Financial Services application, focusing on input validation, encryption, CSRF protection, and rate limiting.

## Features

### 1. Input Validation (`validation.ts`)
- Zod-based schema validation for:
  - User Registration
  - Blog Post Creation
  - Profile Updates
- Comprehensive validation rules
- Error handling utilities

### 2. Encryption (`encryption.ts`)
- Secure password hashing
- Data encryption and decryption
- Secure token generation
- Uses AES-256-GCM encryption
- Implements key derivation with PBKDF2

### 3. CSRF Protection (`csrf.ts`)
- Token-based CSRF protection
- Token generation and validation
- Middleware for protecting state-changing routes

### 4. Rate Limiting (`rate-limit.ts`)
- Configurable rate limiting
- Different limiters for:
  - API routes
  - Authentication routes
  - Public routes
- IP and user-based tracking

### 5. Comprehensive Middleware (`middleware.ts`)
- Combines multiple security checks
- Configurable security layers
- Easy to apply to different route types

## Usage Examples

### Input Validation
```typescript
import { userRegistrationSchema, validateData } from './validation';

try {
  const validatedData = validateData(userRegistrationSchema, userData);
} catch (error) {
  // Handle validation errors
}
```

### Encryption
```typescript
import { EncryptionService } from './encryption';

// Hash a password
const { hash, salt } = EncryptionService.hashPassword(rawPassword);

// Verify a password
const isValid = EncryptionService.verifyPassword(storedHash, storedSalt, providedPassword);
```

### CSRF Protection
```typescript
import { getCSRFToken } from './csrf';

// Generate a token for a session
const csrfToken = getCSRFToken(sessionId);
```

### Rate Limiting
```typescript
import { apiRateLimiter } from './rate-limit';

// Use in API route middleware
app.use((req, res, next) => {
  if (apiRateLimiter.check(req, res)) {
    next();
  }
});
```

### Comprehensive Security Middleware
```typescript
import { SecurityMiddleware } from './middleware';

// In an API route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (SecurityMiddleware.apply(req, res)) {
    // Process the request
  }
}
```

## Best Practices
- Always validate and sanitize input
- Use strong, unique passwords
- Implement rate limiting
- Protect against CSRF
- Encrypt sensitive data
- Regularly update dependencies
- Use environment-specific configurations

## Environment Configuration
Ensure proper configuration in `.env`:
- `ENCRYPTION_SECRET_KEY`: Long, random secret
- `NEXTAUTH_SECRET`: Secure authentication secret
- `ALLOWED_ORIGINS`: Whitelist of allowed domains

## Future Improvements
- Implement advanced threat detection
- Add more granular permission checks
- Enhance logging and monitoring
