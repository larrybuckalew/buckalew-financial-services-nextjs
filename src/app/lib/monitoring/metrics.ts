import { MetricsLogger } from './types';
import { logger } from '../logging/logger';

class DatadogMetricsLogger implements MetricsLogger {
  private tags: Record<string, string>;

  constructor(defaultTags: Record<string, string> = {}) {
    this.tags = {
      env: process.env.NODE_ENV || 'development',
      service: 'buckalew-financial',
      ...defaultTags
    };
  }

  gauge(metric: string, value: number, tags: Record<string, string> = {}) {
    const allTags = { ...this.tags, ...tags };
    const tagString = Object.entries(allTags)
      .map(([k, v]) => `${k}:${v}`)
      .join(',');

    logger.info({ metric, value, tags: allTags }, `METRIC gauge#${metric}=${value},${tagString}`);
  }

  increment(metric: string, tags: Record<string, string> = {}) {
    this.gauge(metric, 1, tags);
  }

  histogram(metric: string, value: number, tags: Record<string, string> = {}) {
    const allTags = { ...this.tags, ...tags };
    logger.info(
      { metric, value, tags: allTags },
      `METRIC histogram#${metric}=${value}`
    );
  }

  timing(metric: string, value: number, tags: Record<string, string> = {}) {
    this.histogram(`${metric}_ms`, value, tags);
  }
}

export const metrics = new DatadogMetricsLogger();