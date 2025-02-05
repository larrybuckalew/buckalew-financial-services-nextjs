import Benchmark from 'benchmark';
import { MonteCarloSimulator } from '../src/utils/monteCarloSimulation';

const suite = new Benchmark.Suite;

// Default test inputs
const defaultInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 50000,
  monthlyContribution: 1000,
  expectedReturn: 7,
  inflationRate: 2,
  desiredRetirementIncome: 80000
};

// Add tests
suite
  .add('Monte Carlo - 100 runs', () => {
    MonteCarloSimulator.runSimulation(defaultInputs, { simulationRuns: 100 });
  })
  .add('Monte Carlo - 1000 runs', () => {
    MonteCarloSimulator.runSimulation(defaultInputs, { simulationRuns: 1000 });
  })
  .add('Monte Carlo - High Volatility', () => {
    MonteCarloSimulator.runSimulation(defaultInputs, {
      simulationRuns: 100,
      marketVolatility: 30
    });
  })
  .add('Monte Carlo - Long Projection', () => {
    MonteCarloSimulator.runSimulation({
      ...defaultInputs,
      currentAge: 25,
      retirementAge: 75
    });
  })
  .on('cycle', (event: Benchmark.Event) => {
    console.log(String(event.target));
  })
  .on('complete', function(this: Benchmark.Suite) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });