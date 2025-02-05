declare module 'monte-carlo-simulation' {
  export interface SimulationInputs {
    currentAge: number;
    retirementAge: number;
    currentSavings: number;
    monthlyContribution: number;
    expectedReturn: number;
    inflationRate: number;
    desiredRetirementIncome: number;
  }

  export interface SimulationOptions {
    simulationRuns?: number;
    marketVolatility?: number;
    inflationMean?: number;
    inflationVolatility?: number;
    randomSeed?: number;
    calculationMethod?: 'standard' | 'optimized' | 'approximated';
  }

  export interface SimulationResult {
    year: number;
    age: number;
    portfolioValue: number;
    contribution: number;
    withdrawal: number;
  }

  export interface MonteCarloOutput {
    successRate: number;
    median: number;
    percentile95: number;
    percentile5: number;
    simulations: SimulationResult[][];
    failureYears: number[];
  }

  export interface PerformanceMetrics {
    executionTime: number;
    memoryUsage: number;
    cpuLoad: number;
    batchSize: number;
    lastUpdated: Date;
  }

  export interface WorkerMessage {
    type: 'start' | 'progress' | 'complete' | 'error';
    data?: any;
    progress?: number;
    error?: string;
  }
}

declare module 'performance-metrics' {
  export interface MetricsSnapshot {
    timestamp: number;
    memory: {
      heapUsed: number;
      heapTotal: number;
      external: number;
    };
    cpu: {
      user: number;
      system: number;
      percentage: number;
    };
    eventLoop: {
      latency: number;
      lag: number;
    };
  }

  export interface PerformanceReport {
    timeframe: {
      start: Date;
      end: Date;
    };
    snapshots: MetricsSnapshot[];
    summary: {
      averageMemoryUsage: number;
      peakMemoryUsage: number;
      averageCpuUsage: number;
      peakCpuUsage: number;
      averageLatency: number;
      p95Latency: number;
    };
  }
}