import * as Sentry from "@sentry/nextjs";
class ErrorTracker {
    static init() {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            tracesSampleRate: 1.0,
            debug: process.env.NODE_ENV === 'development',
            enabled: process.env.NODE_ENV === 'production'
        });
    }
    static captureException(error, context) {
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
    static captureMessage(message, context) {
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
