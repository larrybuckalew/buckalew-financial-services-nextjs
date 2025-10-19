import { logger } from './logger';
export class Monitoring {
    constructor() {
        this.metrics = [];
    }
    static getInstance() {
        if (!Monitoring.instance) {
            Monitoring.instance = new Monitoring();
        }
        return Monitoring.instance;
    }
    recordMetric(metric) {
        this.metrics.push(metric);
        // Log metric for immediate visibility
        logger.info(`Metric: ${metric.name}`, {
            value: metric.value,
            tags: metric.tags
        });
        // TODO: Send to external monitoring service
        this.sendToMonitoringService(metric);
    }
    sendToMonitoringService(metric) {
        // Placeholder for external monitoring integration
        // Could be Datadog, New Relic, Prometheus, etc.
        try {
            // Example: Simulate sending to a monitoring endpoint
            // fetch('/monitoring-endpoint', {
            //   method: 'POST',
            //   body: JSON.stringify(metric)
            // })
        }
        catch (error) {
            logger.error('Failed to send metric', { error: String(error) });
        }
    }
    trackPerformance(name, startTime) {
        const duration = Date.now() - startTime;
        this.recordMetric({
            name: `performance.${name}`,
            value: duration,
            timestamp: new Date(),
            tags: { type: 'performance' }
        });
    }
    trackError(error, context) {
        this.recordMetric({
            name: 'error.count',
            value: 1,
            timestamp: new Date(),
            tags: {
                errorType: error.name,
                ...context
            }
        });
    }
}
export const monitoring = Monitoring.getInstance();
