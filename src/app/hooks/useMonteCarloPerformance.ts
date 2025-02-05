import { useState, useEffect, useRef } from 'react';
import { RetirementCalculatorInputs } from '../utils/financialCalculations';
import { MonteCarloSimulator, MonteCarloOutput } from '../utils/monteCarloSimulation';

interface PerformanceMetrics {
  executionTime: number;
  memoryUsage: number;
  cpuLoad: number;
  batchSize: number;
  lastUpdated: Date;
}

interface SimulationMetrics extends PerformanceMetrics {
  simulationResults: MonteCarloOutput;
}

export const useMonteCarloPerformance = (
  inputs: RetirementCalculatorInputs,
  options: {
    simulationRuns?: number;
    batchSize?: number;
    updateInterval?: number;
    enablePerformanceTracking?: boolean;
  } = {}
) => {
  const {
    simulationRuns = 1000,
    batchSize = 100,
    updateInterval = 1000,
    enablePerformanceTracking = true
  } = options;

  const [metrics, setMetrics] = useState<SimulationMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const performanceObserver = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    if (enablePerformanceTracking && window.PerformanceObserver) {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        // Process performance entries
        console.log('Performance entries:', entries);
      });

      performanceObserver.current.observe({ 
        entryTypes: ['measure', 'memory', 'resource'] 
      });

      return () => performanceObserver.current?.disconnect();
    }
  }, [enablePerformanceTracking]);

  const runSimulation = async () => {
    if (isRunning) {
      return;
    }

    setIsRunning(true);
    setError(null);
    abortController.current = new AbortController();

    try {
      const batches = Math.ceil(simulationRuns / batchSize);
      let completedRuns = 0;
      let aggregatedResults: MonteCarloOutput | null = null;

      const startTime = performance.now();
      let lastUpdateTime = startTime;

      for (let batch = 0; batch < batches; batch++) {
        if (abortController.current?.signal.aborted) {
          break;
        }

        const batchResults = await runSimulationBatch(
          inputs,
          batchSize,
          completedRuns,
          simulationRuns
        );

        aggregatedResults = aggregateResults(aggregatedResults, batchResults);
        completedRuns += batchSize;

        const currentTime = performance.now();
        if (currentTime - lastUpdateTime >= updateInterval) {
          updateMetrics(aggregatedResults, startTime, completedRuns);
          lastUpdateTime = currentTime;
        }
      }

      if (!abortController.current?.signal.aborted && aggregatedResults) {
        updateMetrics(aggregatedResults, startTime, simulationRuns);
      }

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Simulation failed'));
    } finally {
      setIsRunning(false);
    }
  };

  const runSimulationBatch = async (
    inputs: RetirementCalculatorInputs,
    batchSize: number,
    completedRuns: number,
    totalRuns: number
  ): Promise<MonteCarloOutput> => {
    // Use performance mark to track batch execution
    performance.mark('batchStart');

    const results = await new Promise<MonteCarloOutput>((resolve) => {
      // Use requestIdleCallback for non-blocking execution
      requestIdleCallback(() => {
        const batchResults = MonteCarloSimulator.runSimulation(inputs, {
          simulationRuns: batchSize
        });
        resolve(batchResults);
      });
    });

    performance.mark('batchEnd');
    performance.measure('batchExecution', 'batchStart', 'batchEnd');

    return results;
  };

  const aggregateResults = (
    previous: MonteCarloOutput | null,
    current: MonteCarloOutput
  ): MonteCarloOutput => {
    if (!previous) return current;

    return {
      successRate: (previous.successRate + current.successRate) / 2,
      median: (previous.median + current.median) / 2,
      percentile95: (previous.percentile95 + current.percentile95) / 2,
      percentile5: (previous.percentile5 + current.percentile5) / 2,
      simulations: [...previous.simulations, ...current.simulations],
      failureYears: [...previous.failureYears, ...current.failureYears]
    };
  };

  const updateMetrics = (
    results: MonteCarloOutput,
    startTime: number,
    completedRuns: number
  ) => {
    const currentTime = performance.now();
    const executionTime = currentTime - startTime;

    // Get memory usage if available
    let memoryUsage = 0;
    if (performance?.memory) {
      memoryUsage = performance.memory.usedJSHeapSize / (1024 * 1024);
    }

    // Estimate CPU load based on execution time vs elapsed time
    const cpuLoad = (executionTime / (currentTime - startTime)) * 100;

    setMetrics({
      executionTime,
      memoryUsage,
      cpuLoad,
      batchSize,
      lastUpdated: new Date(),
      simulationResults: results
    });
  };

  const cancelSimulation = () => {
    abortController.current?.abort();
  };

  return {
    metrics,
    isRunning,
    error,
    runSimulation,
    cancelSimulation
  };
};
