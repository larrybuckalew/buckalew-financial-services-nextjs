import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mortgageCalculatorSchema } from '@/lib/validations/calculator';
import { calculateMortgage } from '@/lib/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FormData = {
  principal: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
};

export default function MortgageCalculator() {
  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(mortgageCalculatorSchema),
    defaultValues: {
      principal: 300000,
      interestRate: 3.5,
      loanTerm: 30,
      downPayment: 60000,
    },
  });

  const onSubmit = (data: FormData) => {
    const result = calculateMortgage(
      data.principal,
      data.interestRate,
      data.loanTerm,
      data.downPayment
    );
    setCalculationResult(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loan Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('principal', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.principal && (
              <p className="text-red-600 text-sm">{errors.principal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Down Payment
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('downPayment', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.downPayment && (
              <p className="text-red-600 text-sm">{errors.downPayment.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('interestRate', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.interestRate && (
              <p className="text-red-600 text-sm">{errors.interestRate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loan Term (Years)
            </label>
            <input
              type="number"
              {...register('loanTerm', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.loanTerm && (
              <p className="text-red-600 text-sm">{errors.loanTerm.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate
          </button>
        </div>
      </form>

      {calculationResult && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.monthlyPayment)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.totalPayment)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.totalInterest)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Amortization Schedule</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={calculationResult.amortizationSchedule}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    label={{ 
                      value: 'Amount ($)', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: 10
                    }}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label: number) => `Month ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#2563eb" 
                    name="Remaining Balance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interest" 
                    stroke="#dc2626" 
                    name="Interest"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="principal" 
                    stroke="#16a34a" 
                    name="Principal"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}