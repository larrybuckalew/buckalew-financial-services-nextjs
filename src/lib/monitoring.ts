// Stub monitoring module
export function trackEvent(event: string, properties?: any) {
  console.log('Event tracked:', event, properties);
}

export function trackError(error: Error, context?: any) {
  console.error('Error tracked:', error, context);
}

export const metrics = {
  increment: (metric: string, value = 1) => console.log('Metric incremented:', metric, value),
  gauge: (metric: string, value: number) => console.log('Metric gauge:', metric, value),
  timing: (metric: string, duration: number) => console.log('Metric timing:', metric, duration)
};