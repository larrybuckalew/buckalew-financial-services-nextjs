import { logMetric } from '../monitoring';

export interface PerformanceMetrics {
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  fid: number;  // First Input Delay
  cls: number;  // Cumulative Layout Shift
}

export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  const { onFCP, onLCP, onFID, onCLS } = require('web-vitals');

  onFCP(({ value }) => logMetric('fcp', value));
  onLCP(({ value }) => logMetric('lcp', value));
  onFID(({ value }) => logMetric('fid', value));
  onCLS(({ value }) => logMetric('cls', value));
}

export function trackUserMetrics(userId: string) {
  return {
    trackPageView: (page: string) => {
      logMetric('page_view', 1, { userId, page });
    },
    trackInteraction: (action: string) => {
      logMetric('user_interaction', 1, { userId, action });
    }
  };
}