import { logger } from '../logging/logger';
class DatadogMetricsLogger {
    constructor(defaultTags = {}) {
        this.tags = {
            env: process.env.NODE_ENV || 'development',
            service: 'buckalew-financial',
            ...defaultTags
        };
    }
    gauge(metric, value, tags = {}) {
        const allTags = { ...this.tags, ...tags };
        const tagString = Object.entries(allTags)
            .map(([k, v]) => `${k}:${v}`)
            .join(',');
        logger.info({ metric, value, tags: allTags }, `METRIC gauge#${metric}=${value},${tagString}`);
    }
    increment(metric, tags = {}) {
        this.gauge(metric, 1, tags);
    }
    histogram(metric, value, tags = {}) {
        const allTags = { ...this.tags, ...tags };
        logger.info({ metric, value, tags: allTags }, `METRIC histogram#${metric}=${value}`);
    }
    timing(metric, value, tags = {}) {
        this.histogram(`${metric}_ms`, value, tags);
    }
}
export const metrics = new DatadogMetricsLogger();
