'use client';
import { useState } from 'react';
export default function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState(300000);
    const [interestRate, setInterestRate] = useState(4.5);
    const [loanTermYears, setLoanTermYears] = useState(30);
    const calculateMonthlyPayment = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTermYears * 12;
        const monthlyPayment = loanAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        return monthlyPayment.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    return (<div className="bg-brand-green-lighter/20 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-brand-blue mb-4">Mortgage Payment Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-brand-blue mb-2">Loan Amount</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full p-2 border border-brand-blue rounded"/>
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Interest Rate (%)</label>
          <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full p-2 border border-brand-blue rounded"/>
        </div>
        
        <div>
          <label className="block text-brand-blue mb-2">Loan Term (Years)</label>
          <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} className="w-full p-2 border border-brand-blue rounded"/>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-brand-blue">Estimated Monthly Payment</h3>
        <p className="text-2xl font-bold text-brand-green-dark">
          {calculateMonthlyPayment()}
        </p>
      </div>
    </div>);
}
