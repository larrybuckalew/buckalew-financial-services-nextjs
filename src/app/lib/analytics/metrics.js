import { logMetric } from '../monitoring';
export function trackWebVitals() {
    if (typeof window === 'undefined')
        return;
    const { onFCP, onLCP, onFID, onCLS } = require('web-vitals');
    onFCP(({ value }) => logMetric('fcp', value));
    onLCP(({ value }) => logMetric('lcp', value));
    onFID(({ value }) => logMetric('fid', value));
    onCLS(({ value }) => logMetric('cls', value));
}
export function trackUserMetrics(userId) {
    return {
        trackPageView: (page) => {
            logMetric('page_view', 1, { userId, page });
        },
        trackInteraction: (action) => {
            logMetric('user_interaction', 1, { userId, action });
        }
    };
}
