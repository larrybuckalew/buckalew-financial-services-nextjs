import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InvestmentData {
  year: number;
  balance: number;
  contributions: number;
  earnings: number;
}

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [years, setYears] = useState(30);
  const [data, setData] = useState<InvestmentData[]>([]);

  const calculateInvestment = () => {
    const annualRate = returnRate / 100;
    const monthlyRate = annualRate / 12;
    let balance = initialAmount;
    const newData: InvestmentData[] = [];
    let totalContributions = initialAmount;

    for (let year = 1; year <= years; year++) {
      let yearlyContributions = monthlyContribution * 12;
      totalContributions += yearlyContributions;

      // Calculate compound interest with monthly contributions
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }

      newData.push({
        year,
        balance,
        contributions: totalContributions,
        earnings: balance - totalContributions
      });
    }

    setData(newData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Investment Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Investment</label>
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Contribution</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Return Rate (%)</label>
          <input
            type="number"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={calculateInvestment}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate
      </button>
      {data.length > 0 && (
        <div className="mt-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#2563eb" />
                <Line type="monotone" dataKey="contributions" stroke="#16a34a" />
                <Line type="monotone" dataKey="earnings" stroke="#9333ea" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}