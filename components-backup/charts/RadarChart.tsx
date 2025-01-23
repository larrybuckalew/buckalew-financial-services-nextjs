import React from 'react';
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartTheme, defaultTheme, getChartConfig } from '@/lib/visualization';

interface RadarChartProps {
  data: any[];
  dataKeys: {
    angleAxis: string;
    radars: Array<{
      key: string;
      name: string;
      color: string;
    }>;
  };
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
}

export default function RadarChart({
  data,
  dataKeys,
  height = 400,
  theme = defaultTheme,
  formatValue = (value) => value.toString(),
}: RadarChartProps) {
  const config = getChartConfig(theme);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={theme.colors.grid} />
          <PolarAngleAxis
            dataKey={dataKeys.angleAxis}
            tick={{ fill: theme.colors.text }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 'auto']}
            tick={{ fill: theme.colors.text }}
          />
          {dataKeys.radars.map((radar) => (
            <Radar
              key={radar.key}
              name={radar.name}
              dataKey={radar.key}
              stroke={radar.color}
              fill={radar.color}
              fillOpacity={0.6}
            />
          ))}
          <Tooltip
            formatter={formatValue}
            contentStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.grid,
              color: theme.colors.text,
            }}
          />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}