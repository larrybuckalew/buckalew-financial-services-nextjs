import React from 'react';
import {
  CompositeChart as RechartsCompositeChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartTheme, defaultTheme, getChartConfig } from '@/lib/visualization';

interface Series {
  type: 'line' | 'area' | 'bar';
  dataKey: string;
  name: string;
  color: string;
  yAxisId?: 'left' | 'right';
  stackId?: string;
}

interface CompositeChartProps {
  data: any[];
  series: Series[];
  height?: number;
  theme?: ChartTheme;
  formatLeftAxis?: (value: number) => string;
  formatRightAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
  xAxisDataKey: string;
  leftAxisLabel?: string;
  rightAxisLabel?: string;
}

export default function CompositeChart({
  data,
  series,
  height = 400,
  theme = defaultTheme,
  formatLeftAxis,
  formatRightAxis,
  formatTooltip,
  xAxisDataKey,
  leftAxisLabel,
  rightAxisLabel,
}: CompositeChartProps) {
  const config = getChartConfig(theme);
  const hasRightAxis = series.some(s => s.yAxisId === 'right');

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsCompositeChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.grid} />
          <XAxis 
            dataKey={xAxisDataKey}
            tick={{ fill: theme.colors.text }}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={formatLeftAxis}
            tick={{ fill: theme.colors.text }}
            label={leftAxisLabel ? { value: leftAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
          />
          {hasRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={formatRightAxis}
              tick={{ fill: theme.colors.text }}
              label={rightAxisLabel ? { value: rightAxisLabel, angle: 90, position: 'insideRight' } : undefined}
            />
          )}
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.grid,
              color: theme.colors.text,
            }}
          />
          <Legend />
          {series.map((s) => {
            const commonProps = {
              key: s.dataKey,
              type="monotone"
              dataKey: s.dataKey,
              name: s.name,
              stroke: s.color,
              fill: s.color,
              yAxisId: s.yAxisId || 'left',
              stackId: s.stackId,
            };

            switch (s.type) {
              case 'line':
                return <Line {...commonProps} />;
              case 'area':
                return <Area {...commonProps} />;
              case 'bar':
                return <Bar {...commonProps} />;
              default:
                return null;
            }
          })}
        </RechartsCompositeChart>
      </ResponsiveContainer>
    </div>
  );
}