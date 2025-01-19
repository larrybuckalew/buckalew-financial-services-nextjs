import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const calculateMortgage = () => {
    // Convert annual rate to monthly rate
    const monthlyRate = (interestRate / 100) / 12;
    // Convert years to months
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using mortgage formula
    const payment = 
      principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mortgage Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
          <Input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
          <Input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <Button 
          onClick={calculateMortgage}
          className="w-full"
        >
          Calculate
        </Button>

        {monthlyPayment > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Payment</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${monthlyPayment.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}