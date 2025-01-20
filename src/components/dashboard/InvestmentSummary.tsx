import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InvestmentSummaryProps {
  investments: Array<{
    id: string;
    type: string;
    amount: number;
    date: string;
  }>;
  totalValue: number;
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({ investments, totalValue }) => {
  const chartData = investments.map(inv => ({
    type: inv.type,
    amount: inv.amount
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Investment Overview</h2>
        <span className="text-lg font-bold text-primary-600">${totalValue.toLocaleString()}</span>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">Investment Breakdown</h3>
        <ul className="mt-2 space-y-1">
          {investments.map(inv => (
            <li key={inv.id} className="flex justify-between">
              <span>{inv.type}</span>
              <span className="font-semibold">${inv.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvestmentSummary;