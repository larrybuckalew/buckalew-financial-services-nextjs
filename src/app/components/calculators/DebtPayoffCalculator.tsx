'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';

interface Debt {
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

interface PaymentSchedule {
  month: number;
  remainingBalance: number;
  interestPaid: number;
  principalPaid: number;
}

const DebtPayoffCalculator: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { name: '', balance: 0, interestRate: 0, minPayment: 0 }
  ]);
  const [additionalPayment, setAdditionalPayment] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avalancheSchedule, setAvalancheSchedule] = useState<PaymentSchedule[]>([]);
  const [snowballSchedule, setSnowballSchedule] = useState<PaymentSchedule[]>([]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    debts.forEach((debt, index) => {
      if (!debt.name) {
        newErrors[`name-${index}`] = 'Name is required';
      }
      if (debt.balance < 0) {
        newErrors[`balance-${index}`] = 'Balance cannot be negative';
      }
      if (debt.interestRate < 0 || debt.interestRate > 100) {
        newErrors[`interestRate-${index}`] = 'Interest rate must be between 0 and 100';
      }
      if (debt.minPayment < 0) {
        newErrors[`minPayment-${index}`] = 'Minimum payment cannot be negative';
      }
      if (debt.minPayment > debt.balance) {
        newErrors[`minPayment-${index}`] = 'Payment cannot exceed balance';
      }
    });

    if (additionalPayment < 0) {
      newErrors.additionalPayment = 'Additional payment cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [debts, additionalPayment]);

  const calculatePayoff = useCallback((sortedDebts: Debt[]) => {
    const schedule: PaymentSchedule[] = [];
    let month = 0;
    let remainingDebts = [...sortedDebts];
    let totalBalance = remainingDebts.reduce((sum, debt) => sum + debt.balance, 0);
    let extraPayment = additionalPayment;

    while (totalBalance > 0 && month < 360) { // 30 years max
      let monthlyInterest = 0;
      let monthlyPrincipal = 0;

      // Process each debt
      remainingDebts = remainingDebts.map(debt => {
        const monthlyRate = debt.interestRate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        let payment = debt.minPayment;

        // Apply extra payment to first debt
        if (extraPayment > 0 && debt === remainingDebts[0]) {
          payment += extraPayment;
        }

        const principal = Math.min(payment - interest, debt.balance);
        monthlyInterest += interest;
        monthlyPrincipal += principal;

        return {
          ...debt,
          balance: debt.balance - principal
        };
      }).filter(debt => debt.balance > 0);

      totalBalance = remainingDebts.reduce((sum, debt) => sum + debt.balance, 0);
      month++;

      schedule.push({
        month,
        remainingBalance: totalBalance,
        interestPaid: monthlyInterest,
        principalPaid: monthlyPrincipal
      });
    }

    return schedule;
  }, [additionalPayment]);

  useEffect(() => {
    if (!validateInputs()) return;

    // Calculate both strategies
    const avalancheOrder = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    const snowballOrder = [...debts].sort((a, b) => a.balance - b.balance);

    setAvalancheSchedule(calculatePayoff(avalancheOrder));
    setSnowballSchedule(calculatePayoff(snowballOrder));
  }, [debts, additionalPayment, calculatePayoff, validateInputs]);

  const addDebt = () => {
    setDebts([...debts, { name: '', balance: 0, interestRate: 0, minPayment: 0 }]);
  };

  const updateDebt = (index: number, field: keyof Debt, value: string) => {
    const newDebts = [...debts];
    newDebts[index] = {
      ...newDebts[index],
      [field]: field === 'name' ? value : Number(value)
    };
    setDebts(newDebts);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  const getTotalInterest = (schedule: PaymentSchedule[]) => {
    return schedule.reduce((sum, month) => sum + month.interestPaid, 0);
  };

  const getPayoffTime = (schedule: PaymentSchedule[]) => {
    return schedule.length;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {debts.map((debt, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <Input
              label="Debt Name"
              value={debt.name}
              onChange={(value) => updateDebt(index, 'name', value.toString())}
              error={errors[`name-${index}`]}
              placeholder="e.g., Credit Card 1"
            />
            <Input
              label="Balance"
              value={debt.balance}
              onChange={(value) => updateDebt(index, 'balance', value.toString())}
              error={errors[`balance-${index}`]}
              min={0}
              step={100}
            />
            <Input
              label="Interest Rate (%)"
              value={debt.interestRate}
              onChange={(value) => updateDebt(index, 'interestRate', value.toString())}
              error={errors[`interestRate-${index}`]}
              min={0}
              max={100}
              step={0.1}
            />
            <Input
              label="Min Payment"
              value={debt.minPayment}
              onChange={(value) => updateDebt(index, 'minPayment', value.toString())}
              error={errors[`minPayment-${index}`]}
              min={0}
              step={10}
            />
          </div>
        ))}
      </div>

      <button
        onClick={addDebt}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Another Debt
      </button>

      <div>
        <Input
          label="Additional Monthly Payment"
          value={additionalPayment}
          onChange={setAdditionalPayment}
          error={errors.additionalPayment}
          min={0}
          step={10}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Avalanche Method</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Total Interest</p>
              <p className="text-lg font-semibold">
                {avalancheSchedule.length > 0 && formatCurrency(getTotalInterest(avalancheSchedule))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Months to Payoff</p>
              <p className="text-lg font-semibold">
                {avalancheSchedule.length > 0 && getPayoffTime(avalancheSchedule)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Snowball Method</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Total Interest</p>
              <p className="text-lg font-semibold">
                {snowballSchedule.length > 0 && formatCurrency(getTotalInterest(snowballSchedule))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Months to Payoff</p>
              <p className="text-lg font-semibold">
                {snowballSchedule.length > 0 && getPayoffTime(snowballSchedule)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {avalancheSchedule.length > 0 && (
        <>
          <ChartSection
            data={avalancheSchedule.map(month => ({
              month: month.month,
              balance: month.remainingBalance
            }))}
            type="line"
            dataKey="balance"
            xAxisKey="month"
            title="Debt Balance Over Time"
            yAxisLabel="Balance"
            height={300}
          />

          <ChartSection
            data={avalancheSchedule.map(month => ({
              month: month.month,
              principal: month.principalPaid,
              interest: month.interestPaid
            }))}
            type="bar"
            dataKey="principal"
            xAxisKey="month"
            title="Monthly Payment Breakdown"
            yAxisLabel="Amount"
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default DebtPayoffCalculator;