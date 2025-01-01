const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://0ac06b9895e3dd5b12777626f3972453@o4508569151668224.ingest.us.sentry.io/4508569165168640",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Performance Tracing
  tracesSampleRate: 1.0, // Capture 100% of transactions
  profilesSampleRate: 1.0, // Capture 100% of profiles

  // Optional: Additional error handling configuration
  beforeSend(event, hint) {
    // Customize error event before sending
    const error = hint.originalException;
    if (error instanceof Error) {
      // Add custom tags or modify the event
      event.tags = {
        ...event.tags,
        environment: process.env.NODE_ENV
      };
    }
    return event;
  }
});

// Export Sentry for use in other files
module.exports = Sentry;