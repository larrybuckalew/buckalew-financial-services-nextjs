import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

export default function LoanCalculator() {
  const { theme } = useTheme();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);
  const [schedule, setSchedule] = useState([]);

  // ... existing calculation logic ...

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Loan Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm"
          />
        </div>
        {/* ... other inputs with dark mode classes ... */}
      </div>
      <button
        onClick={calculateLoan}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Calculate
      </button>
      {schedule.length > 0 && (
        <div className="mt-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schedule}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="month" 
                  stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}
                />
                <Line type="monotone" dataKey="remainingBalance" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}