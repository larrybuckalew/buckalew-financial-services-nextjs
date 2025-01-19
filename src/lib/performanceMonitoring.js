import * as Sentry from "@sentry/nextjs";

// Initialize Performance Monitoring
export const initPerformanceMonitoring = () => {
  // Web Vitals Reporting
  export function reportWebVitals(metric) {
    if (metric.label === 'web-vital') {
      const { id, name, value } = metric;

      Sentry.metrics.set(name, value, {
        tags: {
          type: metric.label,
          id: id
        }
      });

      // Optional: Log to console for local debugging
      console.log(`${name} - ${Math.round(value)} ms`);
    }
  }

  // Custom Performance Tracing
  export function startPerformanceTrace(name) {
    return Sentry.startTransaction({ name });
  }

  // Performance Budget Checking
  export function checkPerformanceBudget(metrics) {
    const budgets = {
      'Largest Contentful Paint': 2500,  // ms
      'First Input Delay': 100,          // ms
      'Cumulative Layout Shift': 0.1     // score
    };

    const performanceIssues = [];

    Object.entries(budgets).forEach(([metric, budget]) => {
      const metricValue = metrics[metric.toLowerCase().replace(/\s/g, '-')];
      if (metricValue > budget) {
        performanceIssues.push({
          metric,
          value: metricValue,
          budget
        });
      }
    });

    return performanceIssues;
  }
};