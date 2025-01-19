import { useTheme } from '@/context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MetricsChart({ data }) {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow transition-colors duration-200">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Financial Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
            />
            <XAxis 
              dataKey="date" 
              stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderRadius: '0.5rem',
                color: theme === 'dark' ? '#ffffff' : '#000000'
              }}
            />
            <Line type="monotone" dataKey="assets" stroke="#2563eb" name="Total Assets" />
            <Line type="monotone" dataKey="savings" stroke="#16a34a" name="Savings" />
            <Line type="monotone" dataKey="returns" stroke="#9333ea" name="Returns" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}