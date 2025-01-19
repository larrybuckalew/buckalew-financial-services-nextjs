'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

export default function HistoryPage() {
  const { data: session } = useSession();
  const { data: calculations } = useQuery({
    queryKey: ['calculations'],
    queryFn: async () => {
      const res = await fetch('/api/calculations');
      return res.json();
    },
    enabled: !!session,
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Calculation History</h1>
      
      <div className="grid gap-4">
        {calculations?.map((calc: any) => (
          <div key={calc.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold capitalize">{calc.type} Calculation</h3>
              <span className="text-sm text-gray-500">
                {new Date(calc.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              ${calc.result.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}