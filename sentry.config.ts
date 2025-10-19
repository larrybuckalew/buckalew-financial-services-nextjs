import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || '';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,
  
  // Capture all errors in production
  // In development, only capture errors that would crash the app
  debug: ENVIRONMENT !== 'production',
  
  // Add environment information
  environment: ENVIRONMENT,
  
  // Attach source maps for better error tracking
  sourceMapsUploadOptions: {
    // Automatically upload source maps during build
    include: ['.next/static/chunks', 'public/static/chunks'],
  },
  
  // Filtering and sampling
  beforeSend(event) {
    // Optionally modify or filter events
    if (ENVIRONMENT === 'development') {
      console.log('Sentry event:', event);
    }
    
    // Exclude sensitive data
    if (event.request?.data) {
      delete event.request.data.password;
    }
    
    return event;
  },
  
  // Error types to ignore
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'ChunkLoadError',
    'Failed to fetch',
    /^NetworkError/
  ]
});