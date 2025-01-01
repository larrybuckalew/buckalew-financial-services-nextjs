import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const generateMockData = (months) => {
  return Array.from({ length: months }, (_, index) => ({
    month: `Month ${index + 1}`,
    investment: 10000 + Math.random() * 5000,
    returns: 500 + Math.random() * 300,
    risk: Math.random() * 10
  }));
};

const InteractiveDashboard = () => {
  const [visualizationData, setVisualizationData] = useState([]);
  const [activeMetrics, setActiveMetrics] = useState({
    investment: true,
    returns: true,
    risk: false
  });

  useEffect(() => {
    setVisualizationData(generateMockData(12));
  }, []);

  const toggleMetric = (metric) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Financial Performance Dashboard</h2>
        <div className="flex space-x-2">
          {Object.keys(activeMetrics).map(metric => (
            <motion.button
              key={metric}
              onClick={() => toggleMetric(metric)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 py-1 rounded-full text-sm
                ${activeMetrics[metric] 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'}
              `}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={visualizationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              typeof value === 'number' ? `$${value.toFixed(2)}` : value, 
              name
            ]} 
          />
          <Legend />

          {activeMetrics.investment && (
            <Area
              type="monotone"
              dataKey="investment"
              fill="rgba(75, 192, 192, 0.2)"
              stroke="rgba(75, 192, 192, 1)"
            />
          )}

          {activeMetrics.returns && (
            <Line
              type="monotone"
              dataKey="returns"
              stroke="#8884d8"
              strokeWidth={2}
            />
          )}

          {activeMetrics.risk && (
            <Bar
              dataKey="risk"
              fill="rgba(255, 99, 132, 0.6)"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {Object.keys(activeMetrics).map(metric => (
          <div
            key={metric}
            className={`p-4 rounded-lg ${activeMetrics[metric] ? 'bg-gray-100' : 'opacity-50'}`}
          >
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </h3>
            <p className="text-xl font-bold">
              {activeMetrics[metric] ? 'Visible' : 'Hidden'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveDashboard;