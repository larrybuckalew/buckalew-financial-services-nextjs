// Application-wide configuration

export const APP_CONFIG = {
  // Application metadata
  name: 'Buckalew Financial Services',
  version: '0.1.0',
  environment: process.env.NODE_ENV || 'development',

  // Feature flags
  features: {
    userRegistration: process.env.ENABLE_USER_REGISTRATION === 'true',
    twoFactorAuth: process.env.ENABLE_TWO_FACTOR_AUTH === 'true',
    blogComments: process.env.ENABLE_BLOG_COMMENTS === 'true'
  },

  // API configurations
  api: {
    baseUrl: process.env.API_BASE_URL || '/api',
    version: process.env.API_VERSION || 'v1'
  },

  // Security configurations
  security: {
    passwordMinLength: 8,
    maxLoginAttempts: parseInt(process.env.ACCOUNT_LOCKOUT_THRESHOLD || '5'),
    lockoutDuration: parseInt(process.env.ACCOUNT_LOCKOUT_DURATION || '3600'), // seconds
    rateLimitEnabled: process.env.RATE_LIMIT_ENABLED === 'true'
  },

  // Compliance settings
  compliance: {
    dataRetentionDays: parseInt(process.env.DATA_RETENTION_POLICY_DAYS || '365'),
    gdprEnabled: process.env.GDPR_COMPLIANCE_ENABLED === 'true'
  },

  // Performance settings
  performance: {
    cacheEnabled: process.env.CACHE_ENABLED === 'true',
    cacheTTL: parseInt(process.env.CACHE_TTL || '3600') // seconds
  },

  // External services
  services: {
    analyticsProvider: process.env.ANALYTICS_PROVIDER || 'none',
    paymentGateway: process.env.PAYMENT_GATEWAY || 'none'
  },

  // Debugging and logging
  debug: {
    level: process.env.LOG_LEVEL || 'info',
    removeConsoleInProduction: process.env.NODE_ENV === 'production'
  }
};

// Export configuration validator
export function validateAppConfig() {
  // Add any complex validation logic if needed
  if (APP_CONFIG.security.passwordMinLength < 8) {
    throw new Error('Minimum password length must be at least 8 characters');
  }

  return APP_CONFIG;
}
