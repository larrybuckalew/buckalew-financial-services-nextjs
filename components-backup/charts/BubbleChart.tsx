import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartTheme, defaultTheme, getChartConfig } from '@/lib/visualization';

interface BubbleData {
  x: number;
  y: number;
  z: number;
  name?: string;
}

interface BubbleChartProps {
  data: Array<{
    name: string;
    data: BubbleData[];
    color: string;
  }>;
  height?: number;
  theme?: ChartTheme;
  formatXAxis?: (value: number) => string;
  formatYAxis?: (value: number) => string;
  formatValue?: (value: number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default function BubbleChart({
  data,
  height = 400,
  theme = defaultTheme,
  formatXAxis,
  formatYAxis,
  formatValue,
  xAxisLabel,
  yAxisLabel,
}: BubbleChartProps) {
  const config = getChartConfig(theme);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.grid} />
          <XAxis
            name={xAxisLabel}
            type="number"
            dataKey="x"
            tickFormatter={formatXAxis}
            label={xAxisLabel ? { value: xAxisLabel, position: 'bottom' } : undefined}
            tick={{ fill: theme.colors.text }}
          />
          <YAxis
            name={yAxisLabel}
            type="number"
            dataKey="y"
            tickFormatter={formatYAxis}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left' } : undefined}
            tick={{ fill: theme.colors.text }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatValue ? formatValue(value) : value,
              name,
            ]}
            contentStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.grid,
              color: theme.colors.text,
            }}
          />
          <Legend />
          {data.map((series, index) => (
            <Scatter
              key={series.name}
              name={series.name}
              data={series.data}
              fill={series.color}
              shape="circle"
            >
              {series.data.map((entry, i) => (
                <circle
                  key={i}
                  r={Math.sqrt(entry.z) * 2} // Scale the radius based on z value
                  fillOpacity={0.6}
                />
              ))}
            </Scatter>
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}