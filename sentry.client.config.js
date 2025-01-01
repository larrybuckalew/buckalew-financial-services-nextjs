import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  // Performance
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https://yoursite\.com/],
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Error filtering
  beforeSend(event, hint) {
    const error = hint.originalException;
    
    // Ignore specific error types or sources
    if (error && error.message) {
      const ignoredErrors = [
        /Failed to fetch/i,
        /Network request failed/i
      ];

      if (ignoredErrors.some(regex => regex.test(error.message))) {
        return null;
      }
    }

    return event;
  }
});