import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BenefitEstimate {
  retirementAge: number;
  monthlyBenefit: number;
  totalBenefitBy90: number;
}

const SocialSecurityCalculator: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number>(1970);
  const [lastYearIncome, setLastYearIncome] = useState<number>(75000);
  const [retirementAge, setRetirementAge] = useState<number>(67);
  const [benefits, setBenefits] = useState<BenefitEstimate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const currentYear = new Date().getFullYear();

  const calculateBenefits = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/retirement/social-security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthYear,
          lastYearIncome,
          retirementAge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate benefits');
      }

      setBenefits(data.benefits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Social Security Calculator</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Year</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              min="1900"
              max={currentYear}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Year's Income</label>
            <input
              type="number"
              value={lastYearIncome}
              onChange={(e) => setLastYearIncome(Number(e.target.value))}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Planned Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              min="62"
              max="70"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={calculateBenefits}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Calculating...' : 'Calculate Benefits'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {benefits.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Benefit Estimates</h2>

          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={benefits}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="retirementAge"
                  label={{ value: 'Retirement Age', position: 'bottom' }}
                />
                <YAxis
                  tickFormatter={(value) => formatCurrency(value).replace('.00', '')}
                  label={{ value: 'Monthly Benefit', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Age ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="monthlyBenefit"
                  name="Monthly Benefit"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Retirement Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Benefit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total by Age 90
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {benefits.map((benefit, index) => (
                  <tr 
                    key={benefit.retirementAge}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {benefit.retirementAge}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(benefit.monthlyBenefit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(benefit.totalBenefitBy90)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Considerations</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-800">
              <li>
                Full retirement age for your birth year ({birthYear}) is {' '}
                {birthYear >= 1960 ? '67' : birthYear >= 1955 ? '66 and 2 months' : '66'}.
              </li>
              <li>
                Taking benefits before full retirement age permanently reduces your monthly benefit.
              </li>
              <li>
                Delaying benefits past full retirement age increases your monthly benefit by about 8% per year.
              </li>
              <li>
                These estimates are based on current law and may change with future legislation.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSecurityCalculator;