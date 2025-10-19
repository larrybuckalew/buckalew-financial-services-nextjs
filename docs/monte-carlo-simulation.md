# Monte Carlo Simulation Documentation

## Overview

The Monte Carlo simulation module provides robust retirement planning analysis through statistical simulation. This guide covers setup, usage, and performance considerations.

## Installation

```bash
npm install mathjs decimal.js web-worker performance-now
```

## Basic Usage

```typescript
import { MonteCarloSimulator } from '../utils/monteCarloSimulation';

const inputs = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 50000,
  monthlyContribution: 1000,
  expectedReturn: 7,
  inflationRate: 2,
  desiredRetirementIncome: 80000
};

const results = MonteCarloSimulator.runSimulation(inputs);
console.log(`Success Rate: ${results.successRate}%`);
```

## Advanced Features

### 1. Custom Simulation Options

```typescript
const results = MonteCarloSimulator.runSimulation(inputs, {
  simulationRuns: 10000,          // Number of simulations
  marketVolatility: 15,           // Market volatility percentage
  inflationMean: 2.5,            // Expected inflation rate
  inflationVolatility: 1,        // Inflation volatility
  randomSeed: 12345              // For reproducible results
});
```

### 2. Performance Monitoring

```typescript
import { useMonteCarloPerformance } from '../hooks/useMonteCarloPerformance';

function SimulationComponent() {
  const {
    metrics,
    isRunning,
    error,
    runSimulation,
    cancelSimulation
  } = useMonteCarloPerformance(inputs, {
    simulationRuns: 1000,
    batchSize: 100,
    updateInterval: 1000,
    enablePerformanceTracking: true
  });

  // Use metrics for real-time monitoring
}
```

### 3. Worker Thread Implementation

```typescript
const worker = new Worker('../workers/simulation.worker.ts');

worker.postMessage({
  type: 'start',
  inputs,
  options: { simulationRuns: 10000 }
});

worker.onmessage = (event) => {
  const { type, data, progress } = event.data;
  switch (type) {
    case 'progress':
      updateProgress(progress);
      break;
    case 'complete':
      handleResults(data);
      break;
    case 'error':
      handleError(data);
      break;
  }
};
```

## Performance Optimization

### 1. Batch Processing

For large simulations, use batch processing to maintain UI responsiveness:

```typescript
const batchSize = 100;
const totalRuns = 10000;
let completedRuns = 0;

while (completedRuns < totalRuns) {
  const batchResults = await runSimulationBatch(
    inputs,
    Math.min(batchSize, totalRuns - completedRuns)
  );
  updateProgress(completedRuns / totalRuns);
  completedRuns += batchSize;
}
```

### 2. Memory Management

```typescript
// Clear previous results when starting new simulation
const cleanupSimulation = () => {
  if (global.gc) {
    global.gc();
  }
  // Clear cached results
  simulationCache.clear();
};
```

## Load Testing

To run load tests:

```bash
# Run basic load test
npm run test:load

# Run with custom configuration
npm run test:load -- -c tests/load/retirement.config.js
```

## Benchmarking

To run benchmarks:

```bash
# Run all benchmarks
npm run test:benchmark

# Run specific benchmark
npm run test:benchmark -- --filter="Monte Carlo"
```

## Error Handling

```typescript
try {
  const results = await MonteCarloSimulator.runSimulation(inputs);
} catch (error) {
  if (error instanceof SimulationError) {
    console.error('Simulation failed:', error.message);
    // Handle specific simulation errors
  } else {
    console.error('Unexpected error:', error);
    // Handle other errors
  }
}
```

## Best Practices

1. **Memory Efficiency**
   - Use batch processing for large simulations
   - Implement cleanup routines
   - Monitor memory usage with performance hooks

2. **CPU Optimization**
   - Use worker threads for CPU-intensive calculations
   - Implement progressive loading for large datasets
   - Cache intermediate results when possible

3. **Error Handling**
   - Implement proper error boundaries
   - Provide meaningful error messages
   - Include recovery mechanisms

4. **Performance Monitoring**
   - Track execution time
   - Monitor memory usage
   - Log CPU utilization
   - Implement circuit breakers for long-running simulations

## API Reference

### MonteCarloSimulator

- `runSimulation(inputs: SimulationInputs, options?: SimulationOptions): MonteCarloOutput`
- `analyzeWorstCases(simulations: SimulationResult[][], failureYears: number[]): WorstCaseAnalysis`
- `calculateConfidenceIntervals(results: SimulationResult[]): ConfidenceIntervals`

### useMonteCarloPerformance Hook

- `metrics: PerformanceMetrics`
- `isRunning: boolean`
- `error: Error | null`
- `runSimulation(): Promise<void>`
- `cancelSimulation(): void`

## Type Definitions

See `src/types/monteCarloSimulation.d.ts` for complete type definitions.

## Contributing

1. Run tests: `npm test`
2. Run benchmarks: `npm run test:benchmark`
3. Run load tests: `npm run test:load`
4. Submit PR with test results

## Troubleshooting

Common issues and solutions:

1. **High Memory Usage**
   - Reduce batch size
   - Implement cleanup routines
   - Monitor memory leaks

2. **Poor Performance**
   - Use worker threads
   - Implement caching
   - Optimize calculations

3. **Accuracy Issues**
   - Increase simulation runs
   - Verify input parameters
   - Check for numerical stability