import PortfolioOptimizer from '@/lib/financial-models/portfolio-optimization';

describe('PortfolioOptimizer', () => {
  const mockAssets = [
    {
      symbol: 'AAPL',
      historicalPrices: [150, 155, 160, 158, 162]
    },
    {
      symbol: 'GOOGL',
      historicalPrices: [1000, 1050, 1020, 1040, 1030]
    }
  ];

  let optimizer;

  beforeEach(() => {
    optimizer = new PortfolioOptimizer(mockAssets);
  });

  it('calculates returns correctly', () => {
    const returns = optimizer.calculateReturns();
    expect(returns).toHaveLength(2);
    expect(returns[0]).toHaveProperty('symbol', 'AAPL');
    expect(returns[0]).toHaveProperty('expectedReturn');
    expect(returns[0]).toHaveProperty('volatility');
  });

  it('calculates correlation matrix', () => {
    const correlationMatrix = optimizer.calculateCorrelationMatrix();
    expect(correlationMatrix).toBeTruthy();
  });

  it('optimizes portfolio', () => {
    const optimization = optimizer.optimizePortfolio();
    expect(optimization).toHaveProperty('weights');
    expect(optimization).toHaveProperty('expectedReturn');
    expect(optimization).toHaveProperty('risk');
    expect(optimization).toHaveProperty('sharpeRatio');
  });
});