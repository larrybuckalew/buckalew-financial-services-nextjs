import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DrugPricingMetrics } from './types';

export const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState<DrugPricingMetrics[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('/api/monitoring/metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard 
          title="Cache Hit Rate" 
          value={`${metrics[metrics.length - 1]?.cacheHitRate.toFixed(1)}%`}
        />
        <MetricCard 
          title="Response Time" 
          value={`${metrics[metrics.length - 1]?.responseTime.toFixed(0)}ms`}
        />
        <MetricCard 
          title="Error Rate" 
          value={`${metrics[metrics.length - 1]?.errorRate.toFixed(2)}%`}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Metrics Timeline</h3>
        <LineChart width={800} height={400} data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cacheHitRate" stroke="#8884d8" />
          <Line type="monotone" dataKey="responseTime" stroke="#82ca9d" />
          <Line type="monotone" dataKey="errorRate" stroke="#ff7300" />
        </LineChart>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h4 className="text-gray-600 text-sm">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);