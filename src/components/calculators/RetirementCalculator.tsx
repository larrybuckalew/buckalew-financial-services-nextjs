import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState<number | null>(null);

  const calculateRetirement = () => {
    const years = retirementAge - currentAge;
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    
    const futureValueSavings = currentSavings * Math.pow(1 + (annualReturn / 100), years);
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);

    setResult(futureValueSavings + futureValueContributions);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <Input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <Input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Savings ($)</label>
          <Input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Contribution ($)</label>
          <Input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Annual Return (%)</label>
          <Input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
          />
        </div>

        <Button onClick={calculateRetirement} className="w-full">
          Calculate
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-semibold">Estimated Retirement Savings</h3>
            <p className="text-3xl font-bold text-blue-600">
              ${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}