'use client';

import React, { useState, useCallback } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';
import { ExportButton } from './shared/ExportButton';

interface InsuranceNeeds {
  category: string;
  amount: number;
}

interface PolicyComparison {
  type: string;
  monthlyPremium: number;
  coverage: number;
  cashValue: number;
  years: number;
  features: string[];
}

const POLICY_FEATURES = {
  'Term 20': [
    'Level premiums for 20 years',
    'No cash value',
    'Simple and affordable',
    'Convertible to permanent insurance'
  ],
  'Term 30': [
    'Level premiums for 30 years',
    'No cash value',
    'Longer coverage period',
    'Convertible to permanent insurance'
  ],
  'Whole Life': [
    'Lifetime coverage',
    'Builds cash value',
    'Fixed premiums',
    'Potential dividends',
    'Tax-deferred growth'
  ],
  'Universal Life': [
    'Flexible premiums',
    'Adjustable death benefit',
    'Builds cash value',
    'Tax-deferred growth',
    'Investment options'
  ]
};

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const LifeInsuranceCalculator: React.FC = () => {
  // Basic personal and financial inputs
  const [age, setAge] = useState<number>(35);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(5000);
  const [outstandingDebts, setOutstandingDebts] = useState<number>(200000);
  const [numChildren, setNumChildren] = useState<number>(2);
  const [yearsUntilCollege, setYearsUntilCollege] = useState<number>(10);
  const [yearsNeeded, setYearsNeeded] = useState<number>(25);

  // Financial calculation states
  const [insuranceNeeds, setInsuranceNeeds] = useState<InsuranceNeeds[]>([]);
  const [policyComparisons, setPolicyComparisons] = useState<PolicyComparison[]>([
    {
      type: 'Term 20',
      monthlyPremium: 50,
      coverage: 500000,
      cashValue: 0,
      years: 20,
      features: POLICY_FEATURES['Term 20']
    },
    {
      type: 'Term 30',
      monthlyPremium: 75,
      coverage: 750000,
      cashValue: 0,
      years: 30,
      features: POLICY_FEATURES['Term 30']
    },
    {
      type: 'Whole Life',
      monthlyPremium: 200,
      coverage: 500000,
      cashValue: 50000,
      years: 100,
      features: POLICY_FEATURES['Whole Life']
    },
    {
      type: 'Universal Life',
      monthlyPremium: 150,
      coverage: 750000,
      cashValue: 75000,
      years: 100,
      features: POLICY_FEATURES['Universal Life']
    }
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState<string>('');

  const coverageGap = outstandingDebts + 
    (monthlyExpenses * 12 * yearsNeeded) + 
    (numChildren * yearsUntilCollege * 50000);

  const policySuitabilityScore = (policy: PolicyComparison): number => {
    let score = 0;
    
    // Age-based scoring
    if (policy.type.includes('Term') && yearsNeeded <= policy.years) score += 30;
    if (policy.type.includes('Whole') && yearsNeeded > 30) score += 30;
    
    // Budget scoring
    const monthlyBudget = monthlyExpenses * 0.1; // Assume 10% of monthly expenses for insurance
    if (policy.monthlyPremium <= monthlyBudget) score += 20;
    
    // Coverage scoring
    if (policy.coverage >= coverageGap) score += 25;
    
    // Cash value scoring
    if (policy.cashValue > 0 && outstandingDebts > 100000) score += 15;
    
    // Education needs scoring
    if (numChildren > 0 && policy.years >= yearsUntilCollege) score += 10;
    
    return score;
  };

  // Calculate insurance needs
  const calculateInsuranceNeeds = useCallback(() => {
    const needs: InsuranceNeeds[] = [
      { category: 'Outstanding Debts', amount: outstandingDebts },
      { category: 'Future Living Expenses', amount: monthlyExpenses * 12 * yearsNeeded },
      { category: 'Children\'s Education', amount: numChildren * yearsUntilCollege * 50000 }
    ];
    
    setInsuranceNeeds(needs);
  }, [outstandingDebts, monthlyExpenses, yearsNeeded, numChildren, yearsUntilCollege]);

  return (
    <div className="space-y-6">
      {/* Input Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age Input */}
        <Input 
          label="Your Age" 
          type="number" 
          value={age} 
          onChange={(e) => setAge(Number(e.target.value))} 
        />
        
        {/* Monthly Expenses Input */}
        <Input 
          label="Monthly Expenses" 
          type="number" 
          value={monthlyExpenses} 
          onChange={(e) => setMonthlyExpenses(Number(e.target.value))} 
        />
        
        {/* Outstanding Debts Input */}
        <Input 
          label="Outstanding Debts" 
          type="number" 
          value={outstandingDebts} 
          onChange={(e) => setOutstandingDebts(Number(e.target.value))} 
        />
        
        {/* Number of Children Input */}
        <Input 
          label="Number of Children" 
          type="number" 
          value={numChildren} 
          onChange={(e) => setNumChildren(Number(e.target.value))} 
        />
        
        {/* Years Until College Input */}
        <Input 
          label="Years Until Children's College" 
          type="number" 
          value={yearsUntilCollege} 
          onChange={(e) => setYearsUntilCollege(Number(e.target.value))} 
        />
        
        {/* Years of Coverage Needed Input */}
        <Input 
          label="Years of Coverage Needed" 
          type="number" 
          value={yearsNeeded} 
          onChange={(e) => setYearsNeeded(Number(e.target.value))} 
        />
      </div>

      {/* Calculate Button */}
      <div className="text-center my-6">
        <button 
          onClick={calculateInsuranceNeeds}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate Insurance Needs
        </button>
      </div>

      {/* Policy Comparisons Section */}
      {policyComparisons.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Policy Comparisons</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {policyComparisons.map((policy, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPolicy === policy.type 
                    ? 'ring-2 ring-blue-500 border-blue-500' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPolicy(policy.type)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{policy.type}</h4>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {policySuitabilityScore(policy)}% Match
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Premium</p>
                    <p className="text-lg font-semibold">{formatCurrency(policy.monthlyPremium)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Coverage Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(policy.coverage)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cash Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(policy.cashValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Term Length</p>
                    <p className="text-lg font-semibold">{policy.years} years</p>
                  </div>
                </div>
                {selectedPolicy === policy.type && (
                  <div className="mt-4 border-t pt-4">
                    <h5 className="font-semibold mb-2">Key Features</h5>
                    <ul className="space-y-2">
                      {POLICY_FEATURES[policy.type as keyof typeof POLICY_FEATURES].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining sections follow the same pattern as before */}
      {/* ... [Rest of the component remains the same] ... */}
    </div>
  );
};

export default LifeInsuranceCalculator;