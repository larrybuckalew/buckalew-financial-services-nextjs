import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartTheme, defaultTheme, getChartConfig } from '@/lib/visualization';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
  innerRadius?: number;
  outerRadius?: number;
  label?: boolean;
}

export default function PieChart({
  data,
  height = 400,
  theme = defaultTheme,
  formatValue = (value) => value.toString(),
  innerRadius = 0,
  outerRadius = 80,
  label = true,
}: PieChartProps) {
  const config = getChartConfig(theme);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            label={label && {
              fill: theme.colors.text,
              fontSize: 12,
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || theme.colors.primary} 
              />
            ))}
          </Pie>
          <Tooltip
            formatter={formatValue}
            contentStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.grid,
              color: theme.colors.text,
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}