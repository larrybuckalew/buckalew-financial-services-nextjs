'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';

interface RetirementData {
  year: number;
  balance: number;
}

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [chartData, setChartData] = useState<RetirementData[]>([]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (currentAge >= retirementAge) {
      newErrors.currentAge = 'Retirement age must be greater than current age';
    }
    if (currentAge < 0 || currentAge > 100) {
      newErrors.currentAge = 'Please enter a valid age between 0 and 100';
    }
    if (retirementAge < 0 || retirementAge > 100) {
      newErrors.retirementAge = 'Please enter a valid retirement age between 0 and 100';
    }
    if (expectedReturn < 0 || expectedReturn > 20) {
      newErrors.expectedReturn = 'Expected return should be between 0% and 20%';
    }
    if (currentSavings < 0) {
      newErrors.currentSavings = 'Current savings cannot be negative';
    }
    if (monthlyContribution < 0) {
      newErrors.monthlyContribution = 'Monthly contribution cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentAge, retirementAge, expectedReturn, currentSavings, monthlyContribution]);

  const calculateRetirementProjection = useCallback(() => {
    if (!validateInputs()) return;

    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = expectedReturn / 100 / 12;
    const projectionData: RetirementData[] = [];
    let currentBalance = currentSavings;

    for (let year = 0; year <= yearsToRetirement; year++) {
      projectionData.push({
        year: currentAge + year,
        balance: Math.round(currentBalance)
      });

      // Calculate next year's balance
      for (let month = 0; month < 12; month++) {
        currentBalance = currentBalance * (1 + monthlyReturn) + monthlyContribution;
      }
    }

    setChartData(projectionData);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, validateInputs]);

  useEffect(() => {
    calculateRetirementProjection();
  }, [calculateRetirementProjection]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            error={errors.currentAge}
            min={0}
            max={100}
          />
          
          <Input
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            error={errors.retirementAge}
            min={0}
            max={100}
          />
          
          <Input
            label="Current Savings"
            value={currentSavings}
            onChange={setCurrentSavings}
            error={errors.currentSavings}
            min={0}
            step={1000}
          />
          
          <Input
            label="Monthly Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            error={errors.monthlyContribution}
            min={0}
            step={100}
          />
          
          <Input
            label="Expected Annual Return (%)"
            value={expectedReturn}
            onChange={setExpectedReturn}
            error={errors.expectedReturn}
            min={0}
            max={20}
            step={0.1}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Years until retirement</p>
              <p className="text-lg font-semibold">{retirementAge - currentAge} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total monthly investment</p>
              <p className="text-lg font-semibold">{formatCurrency(monthlyContribution)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated retirement savings</p>
              <p className="text-2xl font-bold text-green-700">
                {chartData.length > 0 && formatCurrency(chartData[chartData.length - 1].balance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <ChartSection
          data={chartData}
          type="line"
          dataKey="balance"
          xAxisKey="year"
          title="Retirement Savings Projection"
          yAxisLabel="Savings"
          height={400}
        />
      )}
    </div>
  );
};

export default RetirementCalculator;