import { logger } from './logger'

export interface Metric {
  name: string
  value: number
  timestamp: Date
  tags?: Record<string, string>
}

export class Monitoring {
  private static instance: Monitoring
  private metrics: Metric[] = []

  private constructor() {}

  public static getInstance(): Monitoring {
    if (!Monitoring.instance) {
      Monitoring.instance = new Monitoring()
    }
    return Monitoring.instance
  }

  recordMetric(metric: Metric) {
    this.metrics.push(metric)
    
    // Log metric for immediate visibility
    logger.info(`Metric: ${metric.name}`, {
      value: metric.value,
      tags: metric.tags
    })

    // TODO: Send to external monitoring service
    this.sendToMonitoringService(metric)
  }

  private sendToMonitoringService(metric: Metric) {
    // Placeholder for external monitoring integration
    // Could be Datadog, New Relic, Prometheus, etc.
    try {
      // Example: Simulate sending to a monitoring endpoint
      // fetch('/monitoring-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify(metric)
      // })
    } catch (error) {
      logger.error('Failed to send metric', { error: String(error) })
    }
  }

  trackPerformance(name: string, startTime: number) {
    const duration = Date.now() - startTime
    this.recordMetric({
      name: `performance.${name}`,
      value: duration,
      timestamp: new Date(),
      tags: { type: 'performance' }
    })
  }

  trackError(error: Error, context?: Record<string, any>) {
    this.recordMetric({
      name: 'error.count',
      value: 1,
      timestamp: new Date(),
      tags: {
        errorType: error.name,
        ...context
      }
    })
  }
}

export const monitoring = Monitoring.getInstance()
