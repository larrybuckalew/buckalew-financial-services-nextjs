'use client';

import React, { useState } from 'react';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const handleReset = () => {
    setLoanAmount(300000);
    setDownPayment(60000);
    setInterestRate(3.5);
    setLoanTerm(30);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Mortgage Calculator</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Down Payment</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Monthly Payment</h3>
        <p className="text-2xl font-bold text-green-700">{calculateMonthlyPayment()}</p>
      </div>
    </div>
  );
};

export default MortgageCalculator;