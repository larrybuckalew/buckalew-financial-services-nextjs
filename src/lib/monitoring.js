// Stub monitoring module
export function trackEvent(event, properties) {
    console.log('Event tracked:', event, properties);
}
export function trackError(error, context) {
    console.error('Error tracked:', error, context);
}
export const metrics = {
    increment: (metric, value = 1) => console.log('Metric incremented:', metric, value),
    gauge: (metric, value) => console.log('Metric gauge:', metric, value),
    timing: (metric, duration) => console.log('Metric timing:', metric, duration)
};
