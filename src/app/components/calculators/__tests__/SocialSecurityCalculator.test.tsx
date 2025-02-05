import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SocialSecurityCalculator } from '../../../utils/socialSecurityCalculator';

// Mock the API call
jest.mock('next/api', () => ({
  fetch: jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      success: true,
      benefits: [
        {
          retirementAge: 65,
          monthlyBenefit: 2000,
          totalBenefitBy90: 600000
        }
      ]
    })
  }))
}));

describe('SocialSecurityCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calculates benefits correctly for early retirement', () => {
    const benefits = SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 62);
    expect(benefits).toBeLessThan(
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 67)
    );
  });

  it('calculates benefits correctly for delayed retirement', () => {
    const benefits = SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 70);
    expect(benefits).toBeGreaterThan(
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 67)
    );
  });

  it('calculates lifetime benefits for all retirement ages', () => {
    const benefits = SocialSecurityCalculator.calculateLifetimeBenefits(1970, 75000, 65);
    expect(benefits).toHaveLength(9); // Ages 62-70
    expect(benefits[0].retirementAge).toBe(62);
    expect(benefits[benefits.length - 1].retirementAge).toBe(70);
  });

  it('handles edge cases correctly', () => {
    // Very low income
    const lowIncome = SocialSecurityCalculator.estimateMonthlyBenefit(1970, 10000, 67);
    expect(lowIncome).toBeGreaterThan(0);

    // Very high income
    const highIncome = SocialSecurityCalculator.estimateMonthlyBenefit(1970, 500000, 67);
    const veryHighIncome = SocialSecurityCalculator.estimateMonthlyBenefit(1970, 1000000, 67);
    expect(highIncome).toBe(veryHighIncome); // Should be capped

    // Edge retirement ages
    expect(() => {
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 61)
    }).toThrow();
    expect(() => {
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, 71)
    }).toThrow();
  });

  it('calculates PIA correctly for different income levels', () => {
    const calculator = new SocialSecurityCalculator();
    
    // Test private method using type assertion
    const testCalculator = calculator as any;

    // Test first bend point
    expect(testCalculator.calculatePIA(10000))
      .toBe(10000 * 0.9);

    // Test second bend point
    expect(testCalculator.calculatePIA(50000))
      .toBe(10800 + (50000 - 12000) * 0.32);

    // Test above second bend point
    expect(testCalculator.calculatePIA(100000))
      .toBe(30000 + (100000 - 72000) * 0.15);
  });

  it('handles invalid inputs appropriately', () => {
    expect(() => {
      SocialSecurityCalculator.estimateMonthlyBenefit(2025, 75000, 67)
    }).toThrow('Invalid birth year');

    expect(() => {
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, -1000, 67)
    }).toThrow('Invalid income');
  });

  it('properly adjusts benefits for different retirement ages', () => {
    const testAges = [62, 65, 67, 70];
    const benefits = testAges.map(age => 
      SocialSecurityCalculator.estimateMonthlyBenefit(1970, 75000, age)
    );

    // Benefits should increase with age
    for (let i = 1; i < benefits.length; i++) {
      expect(benefits[i]).toBeGreaterThan(benefits[i-1]);
    }
  });
});