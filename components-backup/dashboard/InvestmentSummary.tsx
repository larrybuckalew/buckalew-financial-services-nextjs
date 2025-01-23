import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Investment {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
}

export default function InvestmentSummary() {
  const { data: session } = useSession();
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('/api/investments');
        const data = await response.json();
        setInvestments(data);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    if (session) {
      fetchInvestments();
    }
  }, [session]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Investment Summary
        </h3>
        <div className="mt-5">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {investments.map((investment) => (
                <li key={investment.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {investment.type}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {investment.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-medium text-gray-900">
                        ${investment.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}