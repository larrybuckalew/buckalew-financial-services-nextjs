'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ChartSectionProps {
  data: any[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'stacked';
  dataKey: string;
  xAxisKey: string;
  title: string;
  yAxisLabel?: string;
  height?: number;
  compareKeys?: string[];
  colors?: string[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({
  data,
  type,
  dataKey,
  xAxisKey,
  title,
  yAxisLabel = 'Value',
  height = 300,
  compareKeys = [],
  colors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']
}) => {
  const [chartType, setChartType] = useState(type);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis 
              tickFormatter={formatYAxis}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, dataKey]}
            />
            <Legend />
            {compareKeys.length > 0 ? (
              compareKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis
              tickFormatter={formatYAxis}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, dataKey]}
            />
            <Legend />
            {compareKeys.length > 0 ? (
              compareKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  stroke={colors[index % colors.length]}
                  fillOpacity={0.3}
                />
              ))
            ) : (
              <Area
                type="monotone"
                dataKey={dataKey}
                fill={colors[0]}
                stroke={colors[0]}
                fillOpacity={0.3}
              />
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis
              tickFormatter={formatYAxis}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, dataKey]}
            />
            <Legend />
            {compareKeys.length > 0 ? (
              compareKeys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
              ))
            ) : (
              <Bar dataKey={dataKey} fill={colors[0]} />
            )}
          </BarChart>
        );

      case 'stacked':
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis
              tickFormatter={formatYAxis}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, dataKey]}
            />
            <Legend />
            {compareKeys.map((key, index) => (
              <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name}: $${entry.value.toLocaleString()}`}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, dataKey]} />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          {['line', 'area', 'bar', compareKeys.length > 0 ? 'stacked' : null, 'pie']
            .filter(Boolean)
            .map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type as any)}
                className={`px-3 py-1 rounded text-sm ${
                  chartType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};