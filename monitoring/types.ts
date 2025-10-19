export interface DrugPricingMetrics {
  cacheHitRate: number;
  responseTime: number;
  errorRate: number;
  totalRequests: number;
  uniqueDrugs: number;
  avgPriceVariance: number;
}

export interface MonitoringConfig {
  sentry: {
    dsn: string;
    environment: string;
    tracesSampleRate: number;
  };
  cloudwatch: {
    region: string;
    namespace: string;
  };
}