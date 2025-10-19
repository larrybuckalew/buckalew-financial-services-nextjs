import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  app: {
    name: string;
    url: string;
    environment: string;
  };
  database: {
    url: string;
  };
  auth: {
    jwtSecret: string;
    jwtExpiration: string;
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    from: string;
  };
  security: {
    rateLimitWindowMs: number;
    maxRequestsPerWindow: number;
  };
  features: {
    mfaEnabled: boolean;
    passwordResetEnabled: boolean;
    emailNotificationsEnabled: boolean;
  };
}

export const config: Config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Buckalew Financial Services',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development'
  },
  database: {
    url: process.env.DATABASE_URL || ''
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h'
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@buckalew.com'
  },
  security: {
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequestsPerWindow: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },
  features: {
    mfaEnabled: process.env.ENABLE_MFA === 'true',
    passwordResetEnabled: process.env.ENABLE_PASSWORD_RESET === 'true',
    emailNotificationsEnabled: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true'
  }
};

// Validation function to ensure critical configurations are set
export function validateConfig() {
  const errors: string[] = [];

  if (!config.database.url) {
    errors.push('DATABASE_URL is not set');
  }

  if (!config.auth.jwtSecret) {
    errors.push('JWT_SECRET is not set');
  }

  if (!config.email.user || !config.email.pass) {
    errors.push('Email credentials are not configured');
  }

  if (errors.length > 0) {
    console.error('Configuration Errors:', errors);
    throw new Error('Invalid configuration: ' + errors.join(', '));
  }
}

// Optional: Log warnings for non-critical configurations
export function logConfigWarnings() {
  if (config.app.environment === 'development') {
    console.warn('Running in development mode');
  }

  if (!config.features.mfaEnabled) {
    console.warn('Multi-Factor Authentication is disabled');
  }

  if (!config.features.passwordResetEnabled) {
    console.warn('Password reset feature is disabled');
  }
}

// Initialize configuration
export function initializeConfig() {
  validateConfig();
  logConfigWarnings();
}
