import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || '';
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
  
  // Server-side specific configuration
  integrations: [
    // Optional: Add specific server-side integrations
  ],
  
  // Error filtering
  beforeSend(event) {
    // Optionally modify or filter events
    if (ENVIRONMENT === 'development') {
      console.log('Sentry server event:', event);
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