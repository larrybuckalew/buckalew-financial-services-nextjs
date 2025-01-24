import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { investmentCalculatorSchema } from '@/lib/validations/calculator';
import { calculateInvestmentGrowth } from '@/lib/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

type FormData = {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  investmentLength: number;
};

export default function InvestmentCalculator() {
  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculateInvestmentGrowth> | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(investmentCalculatorSchema),
    defaultValues: {
      initialInvestment: 10000,
      monthlyContribution: 500,
      annualReturn: 7,
      investmentLength: 30,
    },
  });

  const onSubmit = (data: FormData) => {
    const result = calculateInvestmentGrowth(
      data.initialInvestment,
      data.monthlyContribution,
      data.annualReturn,
      data.investmentLength
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
              Initial Investment
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                {...register('initialInvestment', { valueAsNumber: true })}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.initialInvestment && (
              <p className="text-red-600 text-sm">{errors.initialInvestment.message}</p>
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
              Investment Length (Years)
            </label>
            <input
              type="number"
              {...register('investmentLength', { valueAsNumber: true })}
              className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.investmentLength && (
              <p className="text-red-600 text-sm">{errors.investmentLength.message}</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Final Balance</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.finalBalance)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Contributions</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.totalContributions)}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(calculationResult.totalEarnings)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Projection</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={calculationResult.yearlyBreakdown}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    name="Total Balance"
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
                    name="Earnings"
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