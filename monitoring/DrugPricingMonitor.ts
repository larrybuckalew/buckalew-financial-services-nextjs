import * as Sentry from '@sentry/nextjs';
import { Transaction } from '@sentry/types';
import { DrugPricingMetrics } from './types';

export class DrugPricingMonitor {
  private static instance: DrugPricingMonitor;
  private transaction: Transaction | null = null;

  static getInstance(): DrugPricingMonitor {
    if (!this.instance) {
      this.instance = new DrugPricingMonitor();
    }
    return this.instance;
  }

  startRequest(drugName: string, zipCode?: string) {
    this.transaction = Sentry.startTransaction({
      name: 'drug_price_lookup',
      data: { drugName, zipCode }
    });
  }

  recordMetrics(metrics: DrugPricingMetrics) {
    Sentry.setContext('metrics', metrics);
    
    // Custom metrics for CloudWatch
    CloudWatch.putMetricData({
      MetricData: [
        {
          MetricName: 'CacheHitRate',
          Value: metrics.cacheHitRate,
          Unit: 'Percent'
        },
        {
          MetricName: 'ResponseTime',
          Value: metrics.responseTime,
          Unit: 'Milliseconds'
        },
        {
          MetricName: 'ErrorRate',
          Value: metrics.errorRate,
          Unit: 'Percent'
        }
      ],
      Namespace: 'DrugPricing'
    });
  }

  recordError(error: Error) {
    Sentry.captureException(error);
  }

  endRequest() {
    this.transaction?.finish();
  }
}