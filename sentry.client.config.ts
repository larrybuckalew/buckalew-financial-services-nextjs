import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
  
  // Error Sampling
  sampleRate: process.env.NODE_ENV === 'production' ? 0.5 : 1,

  // Ignore specific errors
  ignoreErrors: [
    'ResizeObserver loop',
    'NetworkError',
    'AbortError'
  ],

  // Attach user context (optional)
  beforeSend(event) {
    // Modify or filter events if needed
    return event;
  },

  // Environment and release tracking
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
});
