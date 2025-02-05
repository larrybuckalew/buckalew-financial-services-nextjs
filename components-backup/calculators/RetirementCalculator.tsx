import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { retirementCalculatorSchema } from '@/lib/validations/calculator';
import { calculateRetirement } from '@/lib/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

type FormData = {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  desiredRetirementIncome: number;
};

export default function RetirementCalculator() {
  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculateRetirement> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(retirementCalculatorSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 1000,
      annualReturn: 7,
      desiredRetirementIncome: 5000,
    },
  });

  const onSubmit = (data: FormData) => {
    const result = calculateRetirement(
      data.currentAge,
      data.retirementAge,
      data.currentSavings,
      data.monthlyContribution,
      data.annualReturn,
      data.desiredRetirementIncome
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
              Current Age
            </label>
            <input
              type="number"
              {...register('currentAge', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.currentAge && (
              <p className="text-red-600 text-sm">{errors.currentAge.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Retirement Age
            </label>
            <input
              type="number"
              {...register('retirementAge', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.retirementAge && (
              <p className="text-red-600 text-sm">{errors.retirementAge.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Current Savings
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('currentSavings', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.currentSavings && (
              <p className="text-red-600 text-sm">{errors.currentSavings.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Contribution
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('monthlyContribution', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.monthlyContribution && (
              <p className="text-red-600 text-sm">{errors.monthlyContribution.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('annualReturn', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.annualReturn && (
              <p className="text-red-600 text-sm">{errors.annualReturn.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Desired Monthly Retirement Income
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('desiredRetirementIncome', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.desiredRetirementIncome && (
              <p className="text-red-600 text-sm">{errors.desiredRetirementIncome.message}</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Retirement Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Savings at Retirement</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.savingsAtRetirement)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.monthlyRetirementIncome)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Savings Gap</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.savingsGap)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Additional Monthly Savings Needed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.additionalMonthlySavingsNeeded)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Projected Savings Growth</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={calculationResult.projectedBreakdown}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis 
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    name="Total Savings"
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stackId="2"
                    stroke="#16a34a"
                    fill="#22c55e"
                    name="Contributions"
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stackId="3"
                    stroke="#dc2626"
                    fill="#ef4444"
                    name="Investment Earnings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}