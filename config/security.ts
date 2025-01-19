export const securityConfig = {
  // Password complexity requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },

  // Rate limiting configurations
  rateLimit: {
    loginAttempts: {
      max: 5,
      windowMs: 15 * 60 * 1000 // 15 minutes
    },
    apiRequests: {
      max: 100,
      windowMs: 60 * 60 * 1000 // 1 hour
    }
  },

  // Security headers
  headers: {
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"]
    },
    xssProtection: true,
    frameGuard: 'deny'
  }
}

export function validatePassword(password: string): boolean {
  const { 
    minLength, 
    requireUppercase, 
    requireLowercase, 
    requireNumbers, 
    requireSpecialChars 
  } = securityConfig.password

  return (
    password.length >= minLength &&
    (requireUppercase ? /[A-Z]/.test(password) : true) &&
    (requireLowercase ? /[a-z]/.test(password) : true) &&
    (requireNumbers ? /[0-9]/.test(password) : true) &&
    (requireSpecialChars ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true)
  )
}
