import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface FinancialData {
  totalInvestments: number;
  monthlyGrowth: number;
  yearlyGrowth: number;
}

export default function FinancialOverview() {
  const { data: session } = useSession();
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalInvestments: 0,
    monthlyGrowth: 0,
    yearlyGrowth: 0,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch('/api/dashboard/financial-overview');
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    if (session) {
      fetchFinancialData();
    }
  }, [session]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Add an icon here */}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Investments
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  ${financialData.totalInvestments.toLocaleString()}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <div className="font-medium text-blue-700">
            Monthly Growth: {financialData.monthlyGrowth}%
          </div>
          <div className="font-medium text-green-700">
            Yearly Growth: {financialData.yearlyGrowth}%
          </div>
        </div>
      </div>
    </div>
  );
}