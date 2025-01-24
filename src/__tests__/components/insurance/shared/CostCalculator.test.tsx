import { calculateYearlyCost } from '@/components/insurance/shared/CostCalculator';

describe('CostCalculator', () => {
  const mockPlan = {
    premium: 300,
    deductible: 2000,
    outOfPocketMax: 8000,
    coinsurance: 20
  };

  it('calculates costs below deductible', () => {
    const cost = calculateYearlyCost(mockPlan, 1000);
    // Premium: $300 * 12 = $3600
    // Medical costs: $1000 (below deductible)
    expect(cost).toBe(4600);
  });

  it('calculates costs with coinsurance', () => {
    const cost = calculateYearlyCost(mockPlan, 4000);
    // Premium: $300 * 12 = $3600
    // Deductible: $2000
    // Remaining: $2000 * 0.2 = $400
    expect(cost).toBe(6000);
  });

  it('respects out-of-pocket maximum', () => {
    const cost = calculateYearlyCost(mockPlan, 50000);
    // Premium: $300 * 12 = $3600
    // Out of pocket max: $8000
    expect(cost).toBe(11600);
  });

  it('handles zero medical expenses', () => {
    const cost = calculateYearlyCost(mockPlan, 0);
    // Only premiums: $300 * 12 = $3600
    expect(cost).toBe(3600);
  });
});
