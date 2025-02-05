'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';

interface MortgagePayment {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [chartData, setChartData] = useState<MortgagePayment[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (loanAmount <= 0) {
      newErrors.loanAmount = 'Loan amount must be greater than 0';
    }
    if (downPayment < 0) {
      newErrors.downPayment = 'Down payment cannot be negative';
    }
    if (downPayment >= loanAmount) {
      newErrors.downPayment = 'Down payment cannot be greater than loan amount';
    }
    if (interestRate < 0 || interestRate > 20) {
      newErrors.interestRate = 'Interest rate should be between 0% and 20%';
    }
    if (loanTerm <= 0 || loanTerm > 50) {
      newErrors.loanTerm = 'Loan term should be between 1 and 50 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const calculateMortgage = useCallback(() => {
    if (!validateInputs()) return;

    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment
    const monthlyPmt = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(monthlyPmt);

    // Calculate amortization schedule
    const schedule: MortgagePayment[] = [];
    let remainingBalance = principal;
    let totalInterest = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let year = 1; year <= loanTerm; year++) {
      yearlyPrincipal = 0;
      yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPmt - interestPayment;

        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      totalInterest += yearlyInterest;
      
      schedule.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(remainingBalance))
      });
    }

    setChartData(schedule);
  }, [loanAmount, downPayment, interestRate, loanTerm, validateInputs]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            error={errors.loanAmount}
            min={0}
            step={1000}
          />
          
          <Input
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            error={errors.downPayment}
            min={0}
            step={1000}
          />
          
          <Input
            label="Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            error={errors.interestRate}
            min={0}
            max={20}
            step={0.1}
          />
          
          <Input
            label="Loan Term (years)"
            value={loanTerm}
            onChange={setLoanTerm}
            error={errors.loanTerm}
            min={1}
            max={50}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Monthly Payment Breakdown</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Monthly Payment</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(monthlyPayment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Principal Amount</p>
              <p className="text-lg font-semibold">{formatCurrency(loanAmount - downPayment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Interest</p>
              <p className="text-lg font-semibold">
                {chartData.length > 0 && 
                  formatCurrency(chartData.reduce((sum, year) => sum + year.interest, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <>
          <ChartSection
            data={chartData}
            type="line"
            dataKey="balance"
            xAxisKey="year"
            title="Loan Balance Over Time"
            yAxisLabel="Balance"
            height={300}
          />
          
          <ChartSection
            data={chartData}
            type="bar"
            dataKey="interest"
            xAxisKey="year"
            title="Yearly Interest Paid"
            yAxisLabel="Interest"
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default MortgageCalculator;