import React, { useState } from 'react';
import { z } from 'zod';

// Zod schema for investment growth calculation
const InvestmentSchema = z.object({
  initialInvestment: z.number().positive('Initial investment must be positive'),
  monthlyContribution: z.number().nonnegative('Monthly contribution cannot be negative'),
  annualReturnRate: z.number().min(0, 'Return rate must be non-negative').max(100, 'Return rate cannot exceed 100%'),
  investmentYears: z.number().int().positive('Investment years must be a positive number')
});

const InvestmentGrowthCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    initialInvestment: '',
    monthlyContribution: '',
    annualReturnRate: '',
    investmentYears: ''
  });

  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateInvestmentGrowth = () => {
    try {
      // Validate inputs
      const validatedData = InvestmentSchema.parse({
        initialInvestment: parseFloat(formData.initialInvestment),
        monthlyContribution: parseFloat(formData.monthlyContribution),
        annualReturnRate: parseFloat(formData.annualReturnRate),
        investmentYears: parseInt(formData.investmentYears)
      });

      const {
        initialInvestment, 
        monthlyContribution, 
        annualReturnRate, 
        investmentYears 
      } = validatedData;

      const monthlyRate = annualReturnRate / 100 / 12;
      const months = investmentYears * 12;

      let totalValue = initialInvestment;
      for (let i = 0; i < months; i++) {
        totalValue = (totalValue + monthlyContribution) * (1 + monthlyRate);
      }

      setCalculationResult(totalValue);
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
      <h1 className="text-3xl font-bold mb-6">Investment Growth Calculator</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Investment</label>
              <input
                type="number"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="$10,000"
              />
              {validationErrors.initialInvestment && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.initialInvestment}</p>
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
              <label className="block text-sm font-medium text-gray-700">Annual Return Rate (%)</label>
              <input
                type="number"
                name="annualReturnRate"
                value={formData.annualReturnRate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="7%"
              />
              {validationErrors.annualReturnRate && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.annualReturnRate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Investment Years</label>
              <input
                type="number"
                name="investmentYears"
                value={formData.investmentYears}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="10"
              />
              {validationErrors.investmentYears && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.investmentYears}</p>
              )}
            </div>

            <button
              onClick={calculateInvestmentGrowth}
              className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
            >
              Calculate Investment Growth
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
          {calculationResult !== null ? (
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                ${calculationResult.toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">
                Total investment value after {formData.investmentYears} years
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Enter investment details to see results</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentGrowthCalculator;