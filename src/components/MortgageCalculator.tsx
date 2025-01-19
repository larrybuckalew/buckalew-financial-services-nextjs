import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateMortgage = () => {
    setError('');
    
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanTerm) * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(months)) {
      setError('Please enter valid numbers for all fields');
      return;
    }

    if (principal <= 0 || rate <= 0 || months <= 0) {
      setError('All values must be greater than zero');
      return;
    }

    const monthlyPayment = 
      (principal * rate * Math.pow(1 + rate, months)) / 
      (Math.pow(1 + rate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <Input
              id="loanTerm"
              type="number"
              placeholder="Enter loan term"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <button
            onClick={calculateMortgage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <TooltipProvider>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Tooltip>
                    <TooltipTrigger className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm font-medium">Monthly Payment</div>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(result.monthlyPayment)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your monthly mortgage payment</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm font-medium">Total Payment</div>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(result.totalPayment)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total amount paid over the loan term</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm font-medium">Total Interest</div>
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(result.totalInterest)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total interest paid over the loan term</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;