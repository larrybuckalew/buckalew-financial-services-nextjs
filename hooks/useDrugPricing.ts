import { useState } from 'react';
import { DrugPricingMonitor } from '../monitoring/DrugPricingMonitor';

export const useDrugPricing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const monitor = DrugPricingMonitor.getInstance();

  const searchDrugPrices = async (drugName: string, zipCode?: string) => {
    setLoading(true);
    setError(null);
    monitor.startRequest(drugName, zipCode);

    try {
      const startTime = performance.now();
      const response = await fetch(`/api/drug-prices?drug=${drugName}&zipCode=${zipCode}`);
      const data = await response.json();
      
      monitor.recordMetrics({
        responseTime: performance.now() - startTime,
        cacheHitRate: response.headers.get('Cache-Hit') ? 100 : 0,
        errorRate: 0,
        totalRequests: 1,
        uniqueDrugs: 1,
        avgPriceVariance: calculatePriceVariance(data.prices)
      });

      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      monitor.recordError(error);
      throw error;
    } finally {
      setLoading(false);
      monitor.endRequest();
    }
  };

  return { searchDrugPrices, loading, error };
};

const calculatePriceVariance = (prices: Array<{ price: number }>) => {
  if (prices.length < 2) return 0;
  const avg = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
  const variance = prices.reduce((sum, p) => sum + Math.pow(p.price - avg, 2), 0) / prices.length;
  return Math.sqrt(variance);
};