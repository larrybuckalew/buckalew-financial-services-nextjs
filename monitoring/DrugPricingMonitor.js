import * as Sentry from '@sentry/nextjs';
export class DrugPricingMonitor {
    constructor() {
        this.transaction = null;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DrugPricingMonitor();
        }
        return this.instance;
    }
    startRequest(drugName, zipCode) {
        this.transaction = Sentry.startTransaction({
            name: 'drug_price_lookup',
            data: { drugName, zipCode }
        });
    }
    recordMetrics(metrics) {
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
    recordError(error) {
        Sentry.captureException(error);
    }
    endRequest() {
        this.transaction?.finish();
    }
}
