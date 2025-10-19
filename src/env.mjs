import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Database Configuration
  DATABASE_URL: z.string().url('Invalid database URL'),
  
  // Authentication and Security
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  ENCRYPTION_SECRET_KEY: z.string().min(32, 'Encryption key must be at least 32 characters'),
  
  // External Services
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  
  // Environment Mode
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Security Configurations
  ALLOWED_ORIGINS: z.string().optional(),
  RATE_LIMIT_ENABLED: z.string().transform(val => val === 'true').default('true'),
  
  // Optional additional configurations
  SENTRY_DSN: z.string().url('Invalid Sentry DSN').optional(),
});

// Validate and parse environment variables
function validateEnv() {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error('Invalid environment configuration:', result.error.format());
    throw new Error('Invalid environment configuration');
  }
  
  return result.data;
}

// Export validated environment configuration
export const env = validateEnv();

// Export a type for TypeScript support
export type Env = z.infer<typeof envSchema>;
