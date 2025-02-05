'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';

interface BenefitProjection {
  age: number;
  monthlyBenefit: number;
  totalBenefits: number;
  lifetimeBenefits: number;
}

const SocialSecurityCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(50);
  const [fullRetirementAge, setFullRetirementAge] = useState(67);
  const [monthlyBenefitAtFRA, setMonthlyBenefitAtFRA] = useState(2000);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectionData, setProjectionData] = useState<BenefitProjection[]>([]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (currentAge < 0 || currentAge > 100) {
      newErrors.currentAge = 'Current age must be between 0 and 100';
    }
    if (fullRetirementAge < 62 || fullRetirementAge > 70) {
      newErrors.fullRetirementAge = 'Full retirement age must be between 62 and 70';
    }
    if (monthlyBenefitAtFRA < 0 || monthlyBenefitAtFRA > 10000) {
      newErrors.monthlyBenefitAtFRA = 'Monthly benefit must be between $0 and $10,000';
    }
    if (lifeExpectancy <= fullRetirementAge || lifeExpectancy > 100) {
      newErrors.lifeExpectancy = 'Life expectancy must be greater than retirement age and less than 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentAge, fullRetirementAge, monthlyBenefitAtFRA, lifeExpectancy]);

  const calculateProjection = useCallback(() => {
    if (!validateInputs()) return;

    const projections: BenefitProjection[] = [];
    const startAge = Math.max(62, currentAge);

    for (let age = startAge; age <= lifeExpectancy; age++) {
      let benefitReduction = 0;

      // Calculate benefit reduction/increase
      if (age < fullRetirementAge) {
        // Reduce by 5/9 of 1% per month for the first 36 months
        const monthsEarly = (fullRetirementAge - age) * 12;
        if (monthsEarly <= 36) {
          benefitReduction = monthsEarly * (5/9) / 100;
        } else {
          benefitReduction = (36 * (5/9) + (monthsEarly - 36) * (5/12)) / 100;
        }
      } else if (age > fullRetirementAge) {
        // Increase by 8% per year after full retirement age
        benefitReduction = -(age - fullRetirementAge) * 0.08;
      }

      const monthlyBenefit = monthlyBenefitAtFRA * (1 - benefitReduction);
      const yearlyBenefit = monthlyBenefit * 12;
      const yearsReceiving = lifeExpectancy - age;
      const lifetimeBenefit = yearlyBenefit * yearsReceiving;

      projections.push({
        age,
        monthlyBenefit: Math.round(monthlyBenefit),
        totalBenefits: Math.round(yearlyBenefit),
        lifetimeBenefits: Math.round(lifetimeBenefit)
      });
    }

    setProjectionData(projections);
  }, [currentAge, fullRetirementAge, monthlyBenefitAtFRA, lifeExpectancy, validateInputs]);

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

  const getOptimalStartAge = () => {
    if (projectionData.length === 0) return null;
    const maxBenefits = Math.max(...projectionData.map(d => d.lifetimeBenefits));
    return projectionData.find(d => d.lifetimeBenefits === maxBenefits);
  };

  const optimalAge = getOptimalStartAge();

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
            label="Full Retirement Age"
            value={fullRetirementAge}
            onChange={setFullRetirementAge}
            error={errors.fullRetirementAge}
            min={62}
            max={70}
          />
          
          <Input
            label="Monthly Benefit at Full Retirement Age"
            value={monthlyBenefitAtFRA}
            onChange={setMonthlyBenefitAtFRA}
            error={errors.monthlyBenefitAtFRA}
            min={0}
            max={10000}
            step={100}
          />
          
          <Input
            label="Life Expectancy"
            value={lifeExpectancy}
            onChange={setLifeExpectancy}
            error={errors.lifeExpectancy}
            min={Math.max(62, currentAge)}
            max={100}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Benefits Summary</h3>
          {optimalAge && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Optimal Starting Age</p>
                <p className="text-2xl font-bold text-green-700">
                  Age {optimalAge.age}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Benefit at Optimal Age</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(optimalAge.monthlyBenefit)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Lifetime Benefits</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatCurrency(optimalAge.lifetimeBenefits)}
                </p>
              </div>
              <div className="mt-4 p-4 bg-white rounded-md">
                <p className="text-sm text-gray-700">
                  Claiming at age {optimalAge.age} maximizes your potential lifetime benefits based on your life expectancy.
                  {optimalAge.age > fullRetirementAge 
                    ? ` By delaying benefits ${optimalAge.age - fullRetirementAge} years past your full retirement age, you'll receive an 8% increase for each year of delay.`
                    : optimalAge.age < fullRetirementAge
                      ? ` Claiming ${fullRetirementAge - optimalAge.age} years before your full retirement age will reduce your monthly benefit, but may provide more payments over your lifetime.`
                      : ' This aligns with your full retirement age, providing your full benefit amount.'
                  }
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
            dataKey="monthlyBenefit"
            xAxisKey="age"
            title="Monthly Benefit by Starting Age"
            yAxisLabel="Monthly Benefit"
            height={300}
          />

          <ChartSection
            data={projectionData}
            type="line"
            dataKey="lifetimeBenefits"
            xAxisKey="age"
            title="Total Lifetime Benefits by Starting Age"
            yAxisLabel="Lifetime Benefits"
            height={300}
          />

          <ChartSection
            data={projectionData}
            type="bar"
            dataKey="totalBenefits"
            xAxisKey="age"
            title="Annual Benefits by Starting Age"
            yAxisLabel="Annual Benefits"
            height={300}
          />

          <div className="mt-6 bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Key Considerations</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Early retirement (before {fullRetirementAge}): Your benefits will be permanently reduced</li>
              <li>• Full retirement age ({fullRetirementAge}): You'll receive 100% of your benefit amount</li>
              <li>• Delayed retirement (after {fullRetirementAge}): Your benefit increases by 8% for each year you delay</li>
              <li>• Maximum benefit age (70): No additional increases after age 70</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialSecurityCalculator;