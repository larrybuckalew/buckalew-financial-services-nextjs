import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface InvestmentSummary {
  summary: Array<{
    type: string;
    totalAmount: number;
    count: number;
  }>;
  totalInvestment: number;
  yearToDateInvestment: number;
  performance: Array<{
    date: string;
    amount: number;
    type: string;
  }>;
}

const COLORS = {
  STOCK: '#0088FE',
  BOND: '#00C49F',
  CRYPTO: '#FFBB28',
  REAL_ESTATE: '#FF8042'
};

const ReportsPage: React.FC = () => {
  const [reportData, setReportData] = useState<InvestmentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch('/api/reports/investment-summary');
        if (!response.ok) {
          throw new Error('Failed to fetch investment summary');
        }
        const data = await response.json();
        setReportData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  if (!reportData) {
    return <div className="text-center py-8">No investment data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investment Reports</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Investment Breakdown */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Investment Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.summary}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalAmount"
              >
                {reportData.summary.map((entry) => (
                  <Cell key={entry.type} fill={COLORS[entry.type as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Investment Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Total Investment</span>
              <span className="font-bold">${reportData.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Year-to-Date Investment</span>
              <span className="font-bold">${reportData.yearToDateInvestment.toLocaleString()}</span>
            </div>
            {reportData.summary.map((investment) => (
              <div key={investment.type} className="flex justify-between">
                <span>{investment.type} Investments</span>
                <span className="font-semibold">
                  {investment.count} | ${investment.totalAmount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Server-side authentication check
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default ReportsPage;