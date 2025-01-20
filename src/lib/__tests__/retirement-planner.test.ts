import { calculateRetirementPlan } from '../financial-calculators';

describe('Retirement Planner', () => {
  test('calculates retirement plan correctly', () => {
    const result = calculateRetirementPlan({
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      expectedAnnualReturn: 7,
      desiredAnnualIncome: 75000,
      inflationRate: 3
    });

    expect(result.totalSavingsAtRetirement).toBeGreaterThan(50000);
    expect(result.monthlyIncomeNeeded).toBeGreaterThan(0);
    expect(result.yearsToRetirement).toBe(30);
  });

  test('handles early retirement scenario', () => {
    const result = calculateRetirementPlan({
      currentAge: 40,
      retirementAge: 55,
      currentSavings: 100000,
      monthlyContribution: 1000,
      expectedAnnualReturn: 8,
      desiredAnnualIncome: 100000,
      inflationRate: 2.5
    });

    expect(result.yearsToRetirement).toBe(15);
    expect(result.recommendedMonthlySavings).toBeGreaterThan(0);
  });

  test('throws error for invalid inputs', () => {
    expect(() => calculateRetirementPlan({
      currentAge: 70,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      expectedAnnualReturn: 7,
      desiredAnnualIncome: 75000,
      inflationRate: 3
    })).toThrow('Retirement age must be greater than current age');
  });
});