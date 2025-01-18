import React from 'react';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import InvestmentCalculator from '@/components/calculators/InvestmentCalculator';

export default function CalculatorsPage() {
  const calculators = [
    { title: 'Retirement Calculator', component: RetirementCalculator },
    { title: 'Mortgage Calculator', component: MortgageCalculator },
    { title: 'Investment Calculator', component: InvestmentCalculator }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Financial Calculators</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.map((calc, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">{calc.title}</h2>
            <calc.component />
          </div>
        ))}
      </div>
      
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
        <p className="text-gray-600">
          These calculators are for informational purposes only and do not constitute financial advice. 
          Results are estimates based on the inputs provided and should not be considered as guaranteed 
          financial outcomes. Always consult with a professional financial advisor for personalized guidance.
        </p>
      </div>
    </div>
  );
}