import * as Sentry from "@sentry/nextjs";

// Initialize error tracking
export const initErrorTracking = (app) => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  // Capture unhandled errors
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());
};

// Custom error logging function
export const logError = (error, context = {}) => {
  Sentry.withScope((scope) => {
    // Add extra context to the error
    Object.keys(context).forEach((key) => {
      scope.setExtra(key, context[key]);
    });

    // Capture the error
    Sentry.captureException(error);
  });
};

// Performance monitoring
export const startTransaction = (name) => {
  return Sentry.startTransaction({ name });
};