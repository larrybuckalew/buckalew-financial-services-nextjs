import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { AlertCircle, DollarSign, Calculator } from 'lucide-react';

interface SubsidyResult {
  monthlySubsidy: number;
  annualSubsidy: number;
  monthlyPremiumAfterSubsidy: number;
  costSharingReduction: boolean;
}

export default function SubsidyCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    householdSize: '1',
    householdIncome: '',
    age: '',
    tobacco: 'no',
  });
  const [result, setResult] = useState<SubsidyResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubsidy = () => {
    // This is a simplified calculation. In production, this would make an API call
    // or use more complex calculations based on FPL guidelines and local rates
    const income = parseFloat(formData.householdIncome);
    const householdSize = parseInt(formData.householdSize);
    const age = parseInt(formData.age);

    // Example calculation (simplified)
    const fpl2023 = 14580; // 2023 Federal Poverty Level for 1 person
    const householdFPL = fpl2023 + (fpl2023 * 0.35 * (householdSize - 1));
    const fplPercentage = (income / householdFPL) * 100;

    let monthlySubsidy = 0;
    let costSharingReduction = false;

    if (fplPercentage <= 150) {
      monthlySubsidy = 500;
      costSharingReduction = true;
    } else if (fplPercentage <= 200) {
      monthlySubsidy = 400;
      costSharingReduction = true;
    } else if (fplPercentage <= 250) {
      monthlySubsidy = 300;
      costSharingReduction = true;
    } else if (fplPercentage <= 400) {
      monthlySubsidy = 200;
    }

    // Adjust for age
    if (age >= 50) {
      monthlySubsidy += 100;
    }

    // Tobacco surcharge
    const baseMonthlyPremium = 500; // Example base premium
    const tobaccoSurcharge = formData.tobacco === 'yes' ? baseMonthlyPremium * 0.5 : 0;

    setResult({
      monthlySubsidy,
      annualSubsidy: monthlySubsidy * 12,
      monthlyPremiumAfterSubsidy: Math.max(0, baseMonthlyPremium + tobaccoSurcharge - monthlySubsidy),
      costSharingReduction
    });

    setStep(3);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {step === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  maxLength={5}
                  pattern="[0-9]*"
                  className="max-w-[200px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Household Size
                </label>
                <Select
                  name="householdSize"
                  value={formData.householdSize}
                  onValueChange={(value) => handleInputChange({
                    target: { name: 'householdSize', value }
                  } as any)}
                  className="max-w-[200px]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                  ))}
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.zipCode || formData.zipCode.length !== 5}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Income & Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Household Income
                </label>
                <div className="relative max-w-[200px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    name="householdIncome"
                    value={formData.householdIncome}
                    onChange={handleInputChange}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age of Oldest Family Member
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                  max="120"
                  className="max-w-[200px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tobacco Use in Last 6 Months?
                </label>
                <Select
                  name="tobacco"
                  value={formData.tobacco}
                  onValueChange={(value) => handleInputChange({
                    target: { name: 'tobacco', value }
                  } as any)}
                  className="max-w-[200px]"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={calculateSubsidy}
                  disabled={!formData.householdIncome || !formData.age}
                >
                  Calculate
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 3 && result && (
          <>
            <h3 className="text-xl font-semibold mb-4">Your Estimated Savings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-blue-50">
                  <h4 className="font-medium mb-2">Monthly Subsidy</h4>
                  <p className="text-2xl font-semibold text-blue-600">
                    {formatCurrency(result.monthlySubsidy)}
                  </p>
                </Card>
                <Card className="p-4 bg-green-50">
                  <h4 className="font-medium mb-2">Annual Savings</h4>
                  <p className="text-2xl font-semibold text-green-600">
                    {formatCurrency(result.annualSubsidy)}
                  </p>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Estimated Monthly Premium</h4>
                  <p className="text-xl font-semibold">
                    {formatCurrency(result.monthlyPremiumAfterSubsidy)}
                  </p>
                  <p className="text-sm text-gray-500">
                    After applying your subsidy
                  </p>
                </div>

                {result.costSharingReduction && (
                  <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Cost-Sharing Reduction Eligible</p>
                      <p className="text-sm text-gray-600">
                        You may qualify for additional savings on deductibles, 
                        copayments, and coinsurance.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Recalculate
                </Button>
                <Button>
                  Compare Plans
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
