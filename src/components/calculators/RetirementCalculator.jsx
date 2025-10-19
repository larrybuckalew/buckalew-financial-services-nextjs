'use client';
import React, { useState } from 'react';
const RetirementCalculator = () => {
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
    return (<div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Retirement Savings Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Age</label>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
          <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Savings</label>
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Contribution</label>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Annual Return (%)</label>
          <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Estimated Retirement Savings</h3>
        <p className="text-2xl font-bold text-green-700">
          {calculateRetirementSavings()}
        </p>
      </div>
    </div>);
};
export default RetirementCalculator;
