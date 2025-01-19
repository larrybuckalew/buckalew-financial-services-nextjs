import * as math from 'mathjs';

/**
 * Portfolio Optimization using Modern Portfolio Theory
 * Implements Mean-Variance Optimization
 */
class PortfolioOptimizer {
  constructor(assets) {
    this.assets = assets;
  }

  // Calculate expected returns
  calculateReturns() {
    return this.assets.map(asset => {
      const historicalReturns = asset.historicalPrices.map((price, i, arr) => {
        return i > 0 ? (price - arr[i-1]) / arr[i-1] : 0;
      }).slice(1);

      return {
        symbol: asset.symbol,
        expectedReturn: math.mean(historicalReturns),
        volatility: math.std(historicalReturns)
      };
    });
  }

  // Calculate correlation matrix
  calculateCorrelationMatrix() {
    const returns = this.assets.map(asset => 
      asset.historicalPrices.map((price, i, arr) => 
        i > 0 ? (price - arr[i-1]) / arr[i-1] : 0
      ).slice(1)
    );

    return math.corr(returns);
  }

  // Optimize portfolio allocation
  optimizePortfolio(targetReturn, riskFreeRate = 0.02) {
    const returns = this.calculateReturns();
    const correlationMatrix = this.calculateCorrelationMatrix();

    // Simplified optimization using mean-variance approach
    const numAssets = this.assets.length;
    const initialWeights = new Array(numAssets).fill(1 / numAssets);

    // Quadratic programming optimization
    const optimize = (weights) => {
      const portfolioReturn = math.dot(
        weights, 
        returns.map(r => r.expectedReturn)
      );

      const portfolioRisk = math.sqrt(
        math.multiply(
          math.multiply(weights, correlationMatrix),
          weights
        )
      );

      // Sharpe Ratio calculation
      const sharpeRatio = (portfolioReturn - riskFreeRate) / portfolioRisk;

      return {
        weights,
        expectedReturn: portfolioReturn,
        risk: portfolioRisk,
        sharpeRatio
      };
    };

    // Simple optimization iterations
    let bestAllocation = optimize(initialWeights);
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      // Generate slight variations in weights
      const newWeights = initialWeights.map(w => 
        w + (Math.random() - 0.5) * 0.1
      );

      // Normalize weights
      const normalizedWeights = newWeights.map(w => 
        w / math.sum(newWeights)
      );

      const newAllocation = optimize(normalizedWeights);

      // Select allocation with better Sharpe Ratio
      if (newAllocation.sharpeRatio > bestAllocation.sharpeRatio) {
        bestAllocation = newAllocation;
      }
    }

    return bestAllocation;
  }

  // Risk assessment
  assessRisk() {
    const returns = this.calculateReturns();

    return {
      expectedReturns: returns.map(r => r.expectedReturn),
      volatilities: returns.map(r => r.volatility),
      overallRiskScore: math.mean(returns.map(r => r.volatility))
    };
  }
}

export default PortfolioOptimizer;