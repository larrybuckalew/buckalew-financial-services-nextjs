import { calculateInvestmentGrowth } from '../financial-calculators';

describe('Investment Calculator', () => {
  test('calculates investment growth correctly', () => {
    const result = calculateInvestmentGrowth({
      initialInvestment: 10000,
      monthlyContribution: 500,
      annualReturnRate: 7,
      years: 10
    });

    expect(result.totalValue).toBeGreaterThan(10000);
    expect(result.totalContributions).toBe(10000 + (500 * 12 * 10));
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  test('handles zero monthly contribution', () => {
    const result = calculateInvestmentGrowth({
      initialInvestment: 10000,
      monthlyContribution: 0,
      annualReturnRate: 7,
      years: 10
    });

    expect(result.totalValue).toBeGreaterThan(10000);
    expect(result.totalContributions).toBe(10000);
  });

  test('throws error for negative inputs', () => {
    expect(() => calculateInvestmentGrowth({
      initialInvestment: -1000,
      monthlyContribution: 500,
      annualReturnRate: 7,
      years: 10
    })).toThrow('Initial investment must be positive');
  });
});