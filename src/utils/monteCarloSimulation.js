export class MonteCarloSimulator {
    /**
     * Runs Monte Carlo simulation for retirement planning
     */
    static runSimulation(inputs, options = {}) {
        const { simulationRuns = this.DEFAULT_RUNS, marketVolatility = 15, inflationMean = 2.5, inflationVolatility = 1 } = options;
        const retirementYears = inputs.retirementAge - inputs.currentAge;
        const projectionYears = 95 - inputs.currentAge; // Project to age 95
        const monthlyContribution = inputs.monthlyContribution;
        const monthlyWithdrawal = inputs.desiredRetirementIncome / 12;
        let successfulRuns = 0;
        const allSimulations = [];
        const failureYears = [];
        // Run multiple simulations
        for (let run = 0; run < simulationRuns; run++) {
            const simulation = this.runSingleSimulation(inputs.currentSavings, retirementYears, projectionYears, monthlyContribution, monthlyWithdrawal, inputs.expectedReturn, marketVolatility, inflationMean, inflationVolatility);
            // Check if this simulation was successful (didn't run out of money)
            const successful = simulation[simulation.length - 1].portfolioValue > 0;
            if (successful) {
                successfulRuns++;
            }
            else {
                // Find when the failure occurred
                const failureYear = simulation.findIndex(year => year.portfolioValue <= 0);
                failureYears.push(failureYear);
            }
            allSimulations.push(simulation);
        }
        // Calculate success rate and percentiles
        const successRate = (successfulRuns / simulationRuns) * 100;
        const finalValues = allSimulations.map(sim => sim[sim.length - 1].portfolioValue);
        finalValues.sort((a, b) => a - b);
        const median = this.calculatePercentile(finalValues, 50);
        const percentile95 = this.calculatePercentile(finalValues, 95);
        const percentile5 = this.calculatePercentile(finalValues, 5);
        return {
            successRate,
            median,
            percentile95,
            percentile5,
            simulations: allSimulations,
            failureYears
        };
    }
    static runSingleSimulation(initialBalance, retirementYears, projectionYears, monthlyContribution, monthlyWithdrawal, expectedReturn, volatility, inflationMean, inflationVolatility) {
        let balance = initialBalance;
        const results = [];
        const monthlyReturnMean = (expectedReturn / 100) / 12;
        const monthlyVolatility = (volatility / 100) / Math.sqrt(12);
        for (let year = 0; year < projectionYears; year++) {
            const age = year + inputs.currentAge;
            const isRetired = year >= retirementYears;
            let yearlyBalance = balance;
            // Simulate monthly returns and contributions/withdrawals
            for (let month = 0; month < this.MONTHS_IN_YEAR; month++) {
                // Generate random monthly return using normal distribution
                const monthlyReturn = this.generateRandomNormal(monthlyReturnMean, monthlyVolatility);
                // Generate random monthly inflation
                const monthlyInflation = this.generateRandomNormal(inflationMean / 12 / 100, inflationVolatility / 12 / 100);
                // Apply inflation to contributions/withdrawals
                const inflationAdjustedContribution = isRetired ? 0 :
                    monthlyContribution * Math.pow(1 + monthlyInflation, year * 12 + month);
                const inflationAdjustedWithdrawal = isRetired ?
                    monthlyWithdrawal * Math.pow(1 + monthlyInflation, year * 12 + month) : 0;
                // Update balance
                balance = balance * (1 + monthlyReturn);
                balance += inflationAdjustedContribution;
                balance -= inflationAdjustedWithdrawal;
                // Stop if balance goes negative
                if (balance <= 0) {
                    balance = 0;
                    break;
                }
            }
            results.push({
                year: year + new Date().getFullYear(),
                age,
                portfolioValue: balance,
                contribution: isRetired ? 0 : monthlyContribution * 12,
                withdrawal: isRetired ? monthlyWithdrawal * 12 : 0
            });
            if (balance <= 0)
                break;
        }
        return results;
    }
    static generateRandomNormal(mean, stdDev) {
        // Box-Muller transform for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z0 * stdDev + mean;
    }
    static calculatePercentile(values, percentile) {
        const index = Math.ceil((percentile / 100) * values.length) - 1;
        return values[index];
    }
    /**
     * Analyzes the worst-case scenarios from the simulation
     */
    static analyzeWorstCases(simulations, failureYears) {
        if (failureYears.length === 0) {
            return {
                medianFailureYear: 0,
                earliestFailure: 0,
                riskFactors: ['No failures observed']
            };
        }
        // Sort failure years
        failureYears.sort((a, b) => a - b);
        // Calculate median failure year
        const medianFailureYear = this.calculatePercentile(failureYears, 50);
        // Analyze risk factors
        const riskFactors = this.identifyRiskFactors(simulations, failureYears);
        return {
            medianFailureYear,
            earliestFailure: failureYears[0],
            riskFactors
        };
    }
    static identifyRiskFactors(simulations, failureYears) {
        const factors = [];
        // Analyze early failures (first quartile)
        const earlyFailures = failureYears.filter(year => year <= this.calculatePercentile(failureYears, 25));
        if (earlyFailures.length > 0) {
            factors.push('High risk of early depletion');
        }
        // Analyze withdrawal rates in failed simulations
        const failedSimulations = simulations.filter((sim, index) => failureYears.includes(sim.length - 1));
        const avgWithdrawalRate = failedSimulations.reduce((sum, sim) => {
            const initialBalance = sim[0].portfolioValue;
            const firstWithdrawal = sim.find(year => year.withdrawal > 0)?.withdrawal || 0;
            return sum + (firstWithdrawal / initialBalance * 100);
        }, 0) / failedSimulations.length;
        if (avgWithdrawalRate > 4) {
            factors.push('Withdrawal rate may be unsustainable');
        }
        // Check market volatility impact
        const volatilityImpact = this.analyzeVolatilityImpact(failedSimulations);
        if (volatilityImpact > 0.5) {
            factors.push('High sensitivity to market volatility');
        }
        return factors;
    }
    static analyzeVolatilityImpact(failedSimulations) {
        // Calculate average year-over-year portfolio volatility in failed simulations
        const volatilities = failedSimulations.map(sim => {
            const returns = [];
            for (let i = 1; i < sim.length; i++) {
                const yearReturn = (sim[i].portfolioValue - sim[i - 1].portfolioValue) /
                    sim[i - 1].portfolioValue;
                returns.push(yearReturn);
            }
            return this.calculateStandardDeviation(returns);
        });
        return this.calculateAverage(volatilities);
    }
    static calculateStandardDeviation(values) {
        const avg = this.calculateAverage(values);
        const squareDiffs = values.map(value => (value - avg) ** 2);
        return Math.sqrt(this.calculateAverage(squareDiffs));
    }
    static calculateAverage(values) {
        return values.reduce((a, b) => a + b, 0) / values.length;
    }
}
MonteCarloSimulator.MONTHS_IN_YEAR = 12;
MonteCarloSimulator.DEFAULT_RUNS = 1000;
