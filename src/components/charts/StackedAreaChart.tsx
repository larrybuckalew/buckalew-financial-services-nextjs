import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartTheme, defaultTheme, getChartConfig } from '@/lib/visualization';

interface StackedAreaChartProps {
  data: any[];
  dataKeys: {
    xAxis: string;
    areas: Array<{
      key: string;
      name: string;
      color: string;
    }>;
  };
  height?: number;
  theme?: ChartTheme;
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
}

export default function StackedAreaChart({
  data,
  dataKeys,
  height = 400,
  theme = defaultTheme,
  formatYAxis,
  formatTooltip,
}: StackedAreaChartProps) {
  const config = getChartConfig(theme);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          {...config.areaChart}
        >
          <CartesianGrid {...config.areaChart.grid} />
          <XAxis 
            dataKey={dataKeys.xAxis}
            tick={{ fill: theme.colors.text }}
          />
          <YAxis
            tick={{ fill: theme.colors.text }}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={config.areaChart.tooltip.contentStyle}
          />
          <Legend />
          {dataKeys.areas.map((area, index) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              name={area.name}
              stackId="1"
              stroke={area.color}
              fill={area.color}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}