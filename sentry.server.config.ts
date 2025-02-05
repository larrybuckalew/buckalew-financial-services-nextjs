import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
  
  sampleRate: process.env.NODE_ENV === 'production' ? 0.5 : 1,

  // Server-side specific configurations
  serverName: 'buckalew-financial-services',
  enabled: process.env.NODE_ENV === 'production',

  // Attach release and environment
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Performance monitoring for API routes
  integrations: [
    new Sentry.Integrations.Http({ tracing: true })
  ]
});
