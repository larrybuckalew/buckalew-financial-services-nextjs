import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { withAuth } from '@/middleware/withAuth';
import { financialService } from '@/services/api';

// Financial Components
import FinancialSummaryCard from '@/components/financial/FinancialSummaryCard';
import InvestmentAllocationChart from '@/components/financial/InvestmentAllocationChart';

// UI Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';

// Visualizations
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Hooks & Utilities
import useFinancialStore from '@/store/financial';
import { formatCurrency } from '@/lib/utils';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    investments: [],
    performanceData: []
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated data fetch - replace with actual API calls
        const mockData = {
          totalAssets: 250000,
          totalLiabilities: 100000,
          investments: [
            { category: 'Stocks', amount: 100000 },
            { category: 'Bonds', amount: 75000 },
            { category: 'Real Estate', amount: 50000 },
            { category: 'Crypto', amount: 25000 }
          ],
          performanceData: [
            { month: 'Jan', value: 50000 },
            { month: 'Feb', value: 55000 },
            { month: 'Mar', value: 52000 },
            { month: 'Apr', value: 60000 },
            { month: 'May', value: 58000 }
          ]
        };

        setDashboardData(mockData);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinancialSummaryCard
              totalAssets={dashboardData.totalAssets}
              totalLiabilities={dashboardData.totalLiabilities}
              netWorth={dashboardData.totalAssets - dashboardData.totalLiabilities}
            />

            <InvestmentAllocationChart 
              investments={dashboardData.investments}
            />
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Portfolio Value']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={3} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Financial Predictions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Retirement Forecast</h3>
                <p className="text-2xl font-bold text-blue-600">$1,250,000 by 2040</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Investment Growth</h3>
                <p className="text-2xl font-bold text-green-600">7.5% Annual Return</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

// Protect the dashboard page
export const getServerSideProps = withAuth();

export default DashboardPage;