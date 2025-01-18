import * as Sentry from '@sentry/nextjs';
import { Analytics } from '@vercel/analytics/react';
import va from '@vercel/analytics';

export function trackEvent(name: string, properties?: Record<string, any>) {
  va.track(name, properties);
  Sentry.addBreadcrumb({
    category: 'user-action',
    message: name,
    data: properties,
  });
}

export function trackCalculation(type: string, inputs: any, result: number) {
  trackEvent('calculation', {
    type,
    inputs,
    result,
  });
}

export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context });
}