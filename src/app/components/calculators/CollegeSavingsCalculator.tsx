'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';
import { ExportButton } from './shared/ExportButton';

interface CollegeSavingsData {
  year: number;
  savings: number;
  contributions: number;
  expectedCost: number;
}

const CollegeSavingsCalculator: React.FC = () => {
  const [childAge, setChildAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(6);
  const [collegeYears, setCollegeYears] = useState(4);
  const [yearlyTuition, setYearlyTuition] = useState(25000);
  const [tuitionInflation, setTuitionInflation] = useState(5);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectionData, setProjectionData] = useState<CollegeSavingsData[]>([]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (childAge >= collegeAge) {
      newErrors.childAge = 'Child\'s age must be less than college age';
    }
    if (childAge < 0 || childAge > 17) {
      newErrors.childAge = 'Child\'s age must be between 0 and 17';
    }
    if (collegeAge < 17 || collegeAge > 25) {
      newErrors.collegeAge = 'College age must be between 17 and 25';
    }
    if (expectedReturn < 0 || expectedReturn > 15) {
      newErrors.expectedReturn = 'Expected return should be between 0% and 15%';
    }
    if (tuitionInflation < 0 || tuitionInflation > 10) {
      newErrors.tuitionInflation = 'Tuition inflation should be between 0% and 10%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [childAge, collegeAge, expectedReturn, tuitionInflation]);

  const calculateProjection = useCallback(() => {
    if (!validateInputs()) return;

    const yearsUntilCollege = collegeAge - childAge;
    const monthlyReturn = expectedReturn / 100 / 12;
    const monthlyInflation = tuitionInflation / 100 / 12;
    const projections: CollegeSavingsData[] = [];
    
    let currentBalance = currentSavings;
    let totalContributions = currentSavings;
    let baseTuition = yearlyTuition;

    for (let year = 0; year <= yearsUntilCollege + collegeYears; year++) {
      const inflatedTuition = baseTuition * Math.pow(1 + tuitionInflation / 100, year);
      
      projections.push({
        year: childAge + year,
        savings: Math.round(currentBalance),
        contributions: Math.round(totalContributions),
        expectedCost: Math.round(inflatedTuition)
      });

      // Only grow savings until college starts
      if (year < yearsUntilCollege) {
        for (let month = 0; month < 12; month++) {
          currentBalance = currentBalance * (1 + monthlyReturn) + monthlyContribution;
          totalContributions += monthlyContribution;
        }
      } else {
        // During college years, deduct tuition and continue growth on remaining balance
        currentBalance -= inflatedTuition;
        if (currentBalance < 0) currentBalance = 0;
      }
    }

    setProjectionData(projections);
  }, [
    childAge, collegeAge, currentSavings, monthlyContribution,
    expectedReturn, collegeYears, yearlyTuition, tuitionInflation,
    validateInputs
  ]);

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

  const getFinalNumbers = () => {
    if (projectionData.length === 0) return null;
    
    const yearsUntilCollege = collegeAge - childAge;
    const savingsAtCollege = projectionData[yearsUntilCollege].savings;
    const totalCost = projectionData
      .slice(yearsUntilCollege, yearsUntilCollege + collegeYears)
      .reduce((sum, year) => sum + year.expectedCost, 0);
    
    return {
      savingsAtCollege,
      totalCost,
      surplus: savingsAtCollege - totalCost,
      funded: (savingsAtCollege / totalCost) * 100
    };
  };

  const finalNumbers = getFinalNumbers();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Child's Age"
              value={childAge}
              onChange={setChildAge}
              error={errors.childAge}
              min={0}
              max={17}
            />
            <Input
              label="College Age"
              value={collegeAge}
              onChange={setCollegeAge}
              error={errors.collegeAge}
              min={17}
              max={25}
            />
          </div>

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
            label="Expected Return (%)"
            value={expectedReturn}
            onChange={setExpectedReturn}
            error={errors.expectedReturn}
            min={0}
            max={15}
            step={0.1}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Years in College"
              value={collegeYears}
              onChange={setCollegeYears}
              error={errors.collegeYears}
              min={1}
              max={6}
            />
            <Input
              label="Yearly Tuition"
              value={yearlyTuition}
              onChange={setYearlyTuition}
              error={errors.yearlyTuition}
              min={0}
              step={1000}
            />
          </div>

          <Input
            label="Tuition Inflation (%)"
            value={tuitionInflation}
            onChange={setTuitionInflation}
            error={errors.tuitionInflation}
            min={0}
            max={10}
            step={0.1}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">College Savings Summary</h3>
          {finalNumbers && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Years Until College</p>
                <p className="text-lg font-semibold">{collegeAge - childAge} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Projected Savings at College Age</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(finalNumbers.savingsAtCollege)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expected College Cost</p>
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(finalNumbers.totalCost)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Surplus/Deficit</p>
                <p className={`text-lg font-semibold ${
                  finalNumbers.surplus >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(finalNumbers.surplus)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Funding Progress</p>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min(finalNumbers.funded, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        finalNumbers.funded >= 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    />
                  </div>
                  <p className="text-right text-sm font-semibold">
                    {Math.round(finalNumbers.funded)}% Funded
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <ExportButton
              data={projectionData}
              filename="college-savings-projection"
              type="csv"
            />
          </div>
        </div>
      </div>

      {projectionData.length > 0 && (
        <>
          <ChartSection
            data={projectionData}
            type="line"
            dataKey="savings"
            xAxisKey="year"
            title="Savings vs. College Costs"
            yAxisLabel="Amount"
            height={300}
            compareKeys={['savings', 'expectedCost']}
            colors={['#10b981', '#ef4444']}
          />

          <ChartSection
            data={projectionData}
            type="area"
            dataKey="contributions"
            xAxisKey="year"
            title="Total Contributions Over Time"
            yAxisLabel="Amount"
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default CollegeSavingsCalculator;