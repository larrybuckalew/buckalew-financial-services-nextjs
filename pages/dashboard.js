import React, { useState, useEffect } from 'react';
import { withAuth } from '@/middleware/withAuth';
import useAuthStore from '@/store/auth';
import { financialService } from '@/services/api';
import { formatCurrency } from '@/lib/utils';

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [portfolioRes, transactionRes] = await Promise.all([
          financialService.getPortfolios(),
          financialService.getTransactions()
        ]);

        setPortfolios(portfolioRes.data);
        setTransactions(transactionRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for portfolio performance chart
  const portfolioPerformanceData = portfolios.map(portfolio => ({
    name: portfolio.name,
    value: portfolio.totalValue
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portfolioPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Portfolio Value']} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2 text-right">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Protect the dashboard page
export const getServerSideProps = withAuth();

export default DashboardPage;