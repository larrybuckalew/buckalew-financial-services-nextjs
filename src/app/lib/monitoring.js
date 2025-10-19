import * as Sentry from '@sentry/nextjs';
import { Integrations } from '@sentry/tracing';
export function initializeMonitoring() {
    if (process.env.NODE_ENV === 'production') {
        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            integrations: [
                new Integrations.BrowserTracing({
                    tracingOrigins: ['localhost', process.env.NEXT_PUBLIC_API_URL],
                }),
            ],
            tracesSampleRate: 0.2,
        });
    }
}
export function captureError(error, context) {
    console.error('[Error]', error);
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error, {
            extra: context,
        });
    }
}
export function logMetric(name, value, tags) {
    if (process.env.NODE_ENV === 'production') {
        // Send to monitoring service
        console.log('[Metric]', { name, value, tags });
    }
}
export function logEvent(name, properties) {
    if (process.env.NODE_ENV === 'production') {
        // Send to analytics service
        console.log('[Event]', { name, properties });
    }
}
