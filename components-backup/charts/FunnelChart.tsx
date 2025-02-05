import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartTheme, defaultTheme } from '@/lib/visualization';

interface FunnelData {
  name: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelData[];
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
  showLabels?: boolean;
  showPercentages?: boolean;
}

export default function FunnelChart({
  data,
  height = 400,
  theme = defaultTheme,
  formatValue = (value) => value.toString(),
  showLabels = true,
  showPercentages = true,
}: FunnelChartProps) {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Calculate dimensions for each segment
  const segments = sortedData.map((item, index) => {
    const percentage = (item.value / totalValue) * 100;
    const prevPercentage = index > 0 
      ? (sortedData[index - 1].value / totalValue) * 100 
      : 100;
    
    return {
      ...item,
      percentage,
      prevPercentage,
      topWidth: prevPercentage,
      bottomWidth: percentage,
    };
  });

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <ResponsiveContainer>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {segments.map((segment, index) => {
            const y = index * (100 / segments.length);
            const nextY = (index + 1) * (100 / segments.length);
            const topWidth = segment.topWidth;
            const bottomWidth = segment.bottomWidth;
            const leftX = (100 - topWidth) / 2;
            const rightX = leftX + topWidth;
            const nextLeftX = (100 - bottomWidth) / 2;
            const nextRightX = nextLeftX + bottomWidth;
            const color = segment.color || theme.colors.primary;

            const path = `
              M ${leftX} ${y}
              L ${rightX} ${y}
              L ${nextRightX} ${nextY}
              L ${nextLeftX} ${nextY}
              Z
            `;

            return (
              <g key={segment.name}>
                <path
                  d={path}
                  fill={color}
                  stroke={theme.colors.background}
                  strokeWidth="0.5"
                />
                {showLabels && (
                  <text
                    x="50"
                    y={y + ((nextY - y) / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={theme.colors.text}
                    fontSize="3"
                    fontFamily={theme.fonts.base}
                  >
                    {segment.name}
                    {showPercentages && ` (${segment.percentage.toFixed(1)}%)`}
                  </text>
                )}
                <text
                  x="50"
                  y={y + ((nextY - y) / 2) + (showLabels ? 4 : 0)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={theme.colors.text}
                  fontSize="2.5"
                  fontFamily={theme.fonts.base}
                >
                  {formatValue(segment.value)}
                </text>
              </g>
            );
          })}
        </svg>
      </ResponsiveContainer>
    </div>
  );
}