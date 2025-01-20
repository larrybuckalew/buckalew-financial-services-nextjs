import React, { useState, useMemo } from 'react';
import { z } from 'zod';

// Comprehensive Retirement Planning Calculator
const RetirementPlannerSchema = z.object({
  currentAge: z.number().min(18, 'Age must be at least 18').max(100, 'Age cannot exceed 100'),
  retirementAge: z.number().min(18, 'Retirement age must be at least 18').max(100, 'Retirement age cannot exceed 100'),
  currentSavings: z.number().nonnegative('Current savings cannot be negative'),
  monthlyContribution: z.number().nonnegative('Monthly contribution cannot be negative'),
  expectedAnnualReturn: z.number().min(0, 'Return rate must be non-negative').max(20, 'Return rate seems unrealistic'),
  desiredAnnualIncome: z.number().positive('Desired income must be positive'),
  inflationRate: z.number().min(0, 'Inflation rate cannot be negative').max(10, 'Inflation rate seems unrealistic')
}).refine(data => data.retirementAge > data.currentAge, {
  message: 'Retirement age must be greater than current age',
  path: ['retirementAge']
});

const RetirementPlannerCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    expectedAnnualReturn: '',
    desiredAnnualIncome: '',
    inflationRate: ''
  });

  const [calculationResult, setCalculationResult] = useState<{
    totalSavingsAtRetirement: number;
    monthlyIncomeNeeded: number;
    savingsShortfall: number;
    yearsToRetirement: number;
    recommendedMonthlySavings: number;
  } | null>(null);

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateRetirementPlan = () => {
    try {
      // Validate inputs
      const validatedData = RetirementPlannerSchema.parse({
        currentAge: parseFloat(formData.currentAge),
        retirementAge: parseFloat(formData.retirementAge),
        currentSavings: parseFloat(formData.currentSavings),
        monthlyContribution: parseFloat(formData.monthlyContribution),
        expectedAnnualReturn: parseFloat(formData.expectedAnnualReturn),
        desiredAnnualIncome: parseFloat(formData.desiredAnnualIncome),
        inflationRate: parseFloat(formData.inflationRate)
      });

      const {
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        expectedAnnualReturn,
        desiredAnnualIncome,
        inflationRate
      } = validatedData;

      const yearsToRetirement = retirementAge - currentAge;
      const monthlyReturnRate = expectedAnnualReturn / 100 / 12;
      const monthlyInflationRate = inflationRate / 100 / 12;

      // Calculate total savings at retirement
      let totalSavingsAtRetirement = currentSavings;
      for (let i = 0; i < yearsToRetirement * 12; i++) {
        totalSavingsAtRetirement = (totalSavingsAtRetirement + monthlyContribution) * (1 + monthlyReturnRate);
      }

      // Calculate monthly income needed (adjusted for inflation)
      const monthlyIncomeNeeded = desiredAnnualIncome / 12 * Math.pow(1 + monthlyInflationRate, yearsToRetirement * 12);

      // Calculate required total savings for retirement
      const yearsInRetirement = 30; // Assume 30 years in retirement
      const requiredTotalSavings = monthlyIncomeNeeded * 12 * yearsInRetirement;

      // Calculate savings shortfall or surplus
      const savingsShortfall = requiredTotalSavings - totalSavingsAtRetirement;

      // Calculate recommended monthly savings to bridge the gap
      const recommendedMonthlySavings = savingsShortfall > 0
        ? savingsShortfall / (yearsToRetirement * 12)
        : 0;

      setCalculationResult({
        totalSavingsAtRetirement,
        monthlyIncomeNeeded,
        savingsShortfall,
        yearsToRetirement,
        recommendedMonthlySavings
      });

      setValidationErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => ({
          ...acc,
          [curr.path[0]]: curr.message
        }), {});
        setValidationErrors(errors);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Retirement Planning Calculator</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Age</label>
              <input
                type="number"
                name="currentAge"
                value={formData.currentAge}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="35"
              />
              {validationErrors.currentAge && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.currentAge}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
              <input
                type="number"
                name="retirementAge"
                value={formData.retirementAge}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="65"
              />
              {validationErrors.retirementAge && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.retirementAge}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Savings</label>
              <input
                type="number"
                name="currentSavings"
                value={formData.currentSavings}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="$50,000"
              />
              {validationErrors.currentSavings && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.currentSavings}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Contribution</label>
              <input
                type="number"
                name="monthlyContribution"
                value={formData.monthlyContribution}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="$500"
              />
              {validationErrors.monthlyContribution && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.monthlyContribution}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
              <input
                type="number"
                name="expectedAnnualReturn"
                value={formData.expectedAnnualReturn}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="7%"
              />
              {validationErrors.expectedAnnualReturn && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.expectedAnnualReturn}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Desired Annual Income in Retirement</label>
              <input
                type="number"
                name="desiredAnnualIncome"
                value={formData.desiredAnnualIncome}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="$75,000"
              />
              {validationErrors.desiredAnnualIncome && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.desiredAnnualIncome}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
              <input
                type="number"
                name="inflationRate"
                value={formData.inflationRate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="3%"
              />
              {validationErrors.inflationRate && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.inflationRate}</p>
              )}
            </div>

            <button
              onClick={calculateRetirementPlan}
              className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
            >
              Calculate Retirement Plan
            </button>
          </div>
        </div>

        {/* Calculation Results */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Retirement Planning Results</h2>
          {calculationResult ? (
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Years to Retirement</span>
                <span className="font-bold">{calculationResult.yearsToRetirement}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Total Savings at Retirement</span>
                <span className="font-bold">${calculationResult.totalSavingsAtRetirement.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Monthly Income Needed</span>
                <span className="font-bold">${calculationResult.monthlyIncomeNeeded.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{calculationResult.savingsShortfall > 0 ? 'Savings Shortfall' : 'Savings Surplus'}</span>
                <span className={`font-bold ${calculationResult.savingsShortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${Math.abs(calculationResult.savingsShortfall).toLocaleString()}
                </span>
              </div>
              {calculationResult.savingsShortfall > 0 && (
                <div className="flex justify-between">
                  <span>Recommended Monthly Savings</span>
                  <span className="font-bold text-primary-600">
                    ${calculationResult.recommendedMonthlySavings.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Enter retirement details to see results</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementPlannerCalculator;