import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
  };
  extra?: Record<string, any>;
}

class ErrorTracker {
  static init() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
      enabled: process.env.NODE_ENV === 'production'
    });
  }

  static captureException(error: Error, context?: ErrorContext) {
    Sentry.withScope((scope) => {
      if (context?.user) {
        scope.setUser({
          id: context.user.id,
          email: context.user.email
        });
      }

      if (context?.extra) {
        Object.entries(context.extra).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
      }

      Sentry.captureException(error);
    });
  }

  static captureMessage(message: string, context?: ErrorContext) {
    Sentry.withScope((scope) => {
      if (context?.user) {
        scope.setUser({
          id: context.user.id,
          email: context.user.email
        });
      }

      if (context?.extra) {
        Object.entries(context.extra).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
      }

      Sentry.captureMessage(message);
    });
  }
}

export default ErrorTracker;
