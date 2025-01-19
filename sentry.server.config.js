const Sentry = require("@sentry/node");

module.exports = {
  // Your Sentry configuration for server-side
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
  // Add server-specific configurations
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ]
};