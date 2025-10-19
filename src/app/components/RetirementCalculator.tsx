'use client';

import { useState } from 'react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const calculateRetirementSavings = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = expectedReturn / 100 / 12;
    
    const futureValue = currentSavings * Math.pow(1 + monthlyReturn, yearsToRetirement * 12) +
      monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1) / monthlyReturn);
    
    return futureValue.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    });
  };

  return (
    <div className="bg-brand-green-lighter/20 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-brand-blue mb-4">Retirement Savings Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-brand-blue mb-2">Current Age</label>
          <input 
            type="number" 
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full p-2 border border-brand-blue rounded"
          />
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Retirement Age</label>
          <input 
            type="number" 
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full p-2 border border-brand-blue rounded"
          />
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Current Savings</label>
          <input 
            type="number" 
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full p-2 border border-brand-blue rounded"
          />
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Monthly Contribution</label>
          <input 
            type="number" 
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full p-2 border border-brand-blue rounded"
          />
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Expected Annual Return (%)</label>
          <input 
            type="number" 
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full p-2 border border-brand-blue rounded"
          />
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-brand-blue">Estimated Retirement Savings</h3>
        <p className="text-2xl font-bold text-brand-green-dark">
          {calculateRetirementSavings()}
        </p>
      </div>
    </div>
  );
}
