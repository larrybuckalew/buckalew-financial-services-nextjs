import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { formatCurrency } from '@/lib/utils';

// Financial calculation utilities
const calculateCompoundInterest = (principal, rate, years, contributionAmount) => {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  let totalValue = principal;

  for (let i = 0; i < months; i++) {
    totalValue = (totalValue + contributionAmount) * (1 + monthlyRate);
  }

  return totalValue;
};

const calculateMortgage = (principal, interestRate, years) => {
  const monthlyRate = interestRate / 12 / 100;
  const months = years * 12;

  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest
  };
};

const FinancialCalculator = () => {
  const [calculatorType, setCalculatorType] = useState('compound');
  const [inputs, setInputs] = useState({
    principal: 10000,
    rate: 7,
    years: 10,
    contributionAmount: 500
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateResult = () => {
    switch(calculatorType) {
      case 'compound':
        const compoundResult = calculateCompoundInterest(
          inputs.principal, 
          inputs.rate, 
          inputs.years, 
          inputs.contributionAmount
        );
        setResult(compoundResult);
        break;
      case 'mortgage':
        const mortgageResult = calculateMortgage(
          inputs.principal, 
          inputs.rate, 
          inputs.years
        );
        setResult(mortgageResult);
        break;
      default:
        setResult(null);
    }
  };

  useEffect(() => {
    calculateResult();
  }, [calculatorType, inputs]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Financial Calculator
          <select 
            value={calculatorType}
            onChange={(e) => setCalculatorType(e.target.value)}
            className="ml-4 p-1 border rounded"
          >
            <option value="compound">Compound Interest</option>
            <option value="mortgage">Mortgage</option>
          </select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {calculatorType === 'compound' && (
            <>
              <div>
                <label>Initial Investment</label>
                <Input
                  type="number"
                  name="principal"
                  value={inputs.principal}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Annual Interest Rate (%)</label>
                <Input
                  type="number"
                  name="rate"
                  value={inputs.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Investment Period (Years)</label>
                <Input
                  type="number"
                  name="years"
                  value={inputs.years}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Monthly Contribution</label>
                <Input
                  type="number"
                  name="contributionAmount"
                  value={inputs.contributionAmount}
                  onChange={handleInputChange}
                />
              </div>
            </>)
          }

          {calculatorType === 'mortgage' && (
            <>
              <div>
                <label>Loan Amount</label>
                <Input
                  type="number"
                  name="principal"
                  value={inputs.principal}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Interest Rate (%)</label>
                <Input
                  type="number"
                  name="rate"
                  value={inputs.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Loan Term (Years)</label>
                <Input
                  type="number"
                  name="years"
                  value={inputs.years}
                  onChange={handleInputChange}
                />
              </div>
            </>)
          }
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          {calculatorType === 'compound' && result && (
            <p>
              Total Value: <strong>{formatCurrency(result)}</strong>
            </p>
          )}

          {calculatorType === 'mortgage' && result && (
            <>
              <p>Monthly Payment: <strong>{formatCurrency(result.monthlyPayment)}</strong></p>
              <p>Total Payment: <strong>{formatCurrency(result.totalPayment)}</strong></p>
              <p>Total Interest: <strong>{formatCurrency(result.totalInterest)}</strong></p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCalculator;