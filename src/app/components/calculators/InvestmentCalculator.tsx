'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';

interface InvestmentData {
  year: number;
  balance: number;
  contributions: number;
  earnings: number;
}

const InvestmentCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [investmentYears, setInvestmentYears] = useState(20);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectionData, setProjectionData] = useState<InvestmentData[]>([]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (initialInvestment < 0) {
      newErrors.initialInvestment = 'Initial investment cannot be negative';
    }
    if (monthlyContribution < 0) {
      newErrors.monthlyContribution = 'Monthly contribution cannot be negative';
    }
    if (annualReturn < -100 || annualReturn > 100) {
      newErrors.annualReturn = 'Annual return must be between -100% and 100%';
    }
    if (investmentYears <= 0 || investmentYears > 50) {
      newErrors.investmentYears = 'Investment period must be between 1 and 50 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [initialInvestment, monthlyContribution, annualReturn, investmentYears]);

  const calculateProjection = useCallback(() => {
    if (!validateInputs()) return;

    const monthlyRate = annualReturn / 100 / 12;
    const projections: InvestmentData[] = [];
    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let year = 0; year <= investmentYears; year++) {
      projections.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        earnings: Math.round(balance - totalContributions)
      });

      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }
    }

    setProjectionData(projections);
  }, [initialInvestment, monthlyContribution, annualReturn, investmentYears, validateInputs]);

  useEffect(() => {
    calculateProjection();
  }, [calculateProjection]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  const getFinalValues = () => {
    if (projectionData.length === 0) return null;
    const finalYear = projectionData[projectionData.length - 1];
    return {
      totalValue: finalYear.balance,
      totalContributions: finalYear.contributions,
      totalEarnings: finalYear.earnings
    };
  };

  const finalValues = getFinalValues();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Initial Investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            error={errors.initialInvestment}
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
            value={annualReturn}
            onChange={setAnnualReturn}
            error={errors.annualReturn}
            min={-100}
            max={100}
            step={0.1}
          />
          
          <Input
            label="Investment Period (years)"
            value={investmentYears}
            onChange={setInvestmentYears}
            error={errors.investmentYears}
            min={1}
            max={50}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Investment Summary</h3>
          {finalValues && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Investment Value</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(finalValues.totalValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Contributions</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(finalValues.totalContributions)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investment Earnings</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatCurrency(finalValues.totalEarnings)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Return on Investment</p>
                <p className="text-lg font-semibold">
                  {((finalValues.earnings / finalValues.totalContributions) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {projectionData.length > 0 && (
        <>
          <ChartSection
            data={projectionData}
            type="line"
            dataKey="balance"
            xAxisKey="year"
            title="Total Investment Value Over Time"
            yAxisLabel="Value"
            height={300}
          />

          <ChartSection
            data={projectionData}
            type="line"
            dataKey="earnings"
            xAxisKey="year"
            title="Investment Earnings Over Time"
            yAxisLabel="Earnings"
            height={300}
          />

          <ChartSection
            data={projectionData.map(data => ({
              year: data.year,
              Contributions: data.contributions,
              Earnings: data.earnings
            }))}
            type="bar"
            dataKey="Contributions"
            xAxisKey="year"
            title="Contributions vs Earnings"
            yAxisLabel="Amount"
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default InvestmentCalculator;