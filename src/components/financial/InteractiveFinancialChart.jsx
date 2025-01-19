import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Brush 
} from 'recharts';

// Utility to generate mock financial data
const generateFinancialData = (timeframe) => {
  const baseValue = 50000;
  const volatility = 0.02;

  return Array.from({ length: timeframe }, (_, i) => ({
    month: `Month ${i + 1}`,
    value: baseValue * (1 + Math.sin(i * volatility) * 0.1),
    optimistic: baseValue * (1 + Math.sin(i * volatility) * 0.2),
    pessimistic: baseValue * (1 + Math.sin(i * volatility) * 0.05)
  }));
};

const InteractiveFinancialChart = () => {
  const [timeframe, setTimeframe] = useState(12);
  const [chartData, setChartData] = useState([]);
  const [activeLines, setActiveLines] = useState({
    value: true,
    optimistic: false,
    pessimistic: false
  });

  useEffect(() => {
    setChartData(generateFinancialData(timeframe));
  }, [timeframe]);

  const toggleLine = (lineName) => {
    setActiveLines(prev => ({
      ...prev,
      [lineName]: !prev[lineName]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interactive Financial Projection</CardTitle>
        <div className="flex space-x-2 mt-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={12}>1 Year</option>
            <option value={24}>2 Years</option>
            <option value={36}>3 Years</option>
            <option value={60}>5 Years</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          {Object.keys(activeLines).map(lineName => (
            <motion.button
              key={lineName}
              onClick={() => toggleLine(lineName)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 py-1 rounded-full text-sm
                ${activeLines[lineName] 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'}
              `}
            >
              {lineName.charAt(0).toUpperCase() + lineName.slice(1)}
            </motion.button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} 
            />
            <Legend />
            <Brush />

            {Object.entries(activeLines)
              .filter(([_, isActive]) => isActive)
              .map(([lineName]) => (
                <Line
                  key={lineName}
                  type="monotone"
                  dataKey={lineName}
                  stroke={{
                    value: '#8884d8',
                    optimistic: '#82ca9d',
                    pessimistic: '#ff7300'
                  }[lineName]}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              ))
            }
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InteractiveFinancialChart;