'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PriceHistory {
  date: string;
  price: number;
  lowestPrice: number;
  averagePrice: number;
}

interface PriceHistoryChartProps {
  data: PriceHistory[];
  drugName: string;
}

export function PriceHistoryChart({ data, drugName }: PriceHistoryChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Price History for {drugName}
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name="Current Price"
              stroke="#285A84"
              strokeWidth={2}
              dot={{ fill: '#285A84', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="lowestPrice"
              name="Lowest Price"
              stroke="#85C872"
              strokeWidth={2}
              dot={{ fill: '#85C872', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="averagePrice"
              name="Average Price"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: '#9CA3AF', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>* Price history shown for the last 30 days</p>
      </div>
    </div>
  );
}