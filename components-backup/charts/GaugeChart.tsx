import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartTheme, defaultTheme } from '@/lib/visualization';

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
  thresholds?: {
    value: number;
    color: string;
    label?: string;
  }[];
  label?: string;
  animated?: boolean;
}

export default function GaugeChart({
  value,
  min = 0,
  max = 100,
  height = 400,
  theme = defaultTheme,
  formatValue = (v) => v.toString(),
  thresholds = [],
  label,
  animated = true,
}: GaugeChartProps) {
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;

  // Sort thresholds by value
  const sortedThresholds = [
    { value: min, color: theme.colors.primary },
    ...thresholds,
    { value: max, color: thresholds[thresholds.length - 1]?.color || theme.colors.primary }
  ].sort((a, b) => a.value - b.value);

  // Calculate angles (180 degree arc)
  const startAngle = -90;
  const endAngle = 90;
  const valueAngle = startAngle + (percentage / 100) * (endAngle - startAngle);

  // Create gradient stops
  const gradientStops = sortedThresholds.map((threshold, index) => {
    const offset = ((threshold.value - min) / (max - min)) * 100;
    return (
      <stop
        key={threshold.value}
        offset={`${offset}%`}
        stopColor={threshold.color || theme.colors.primary}
      />
    );
  });

  // Helper function to calculate point on arc
  const getArcPoint = (angle: number, radius: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: 50 + radius * Math.cos(radians),
      y: 85 + radius * Math.sin(radians),
    };
  };

  // Create gauge arc path
  const radius = 40;
  const startPoint = getArcPoint(startAngle, radius);
  const endPoint = getArcPoint(endAngle, radius);
  const arcPath = `
    M ${startPoint.x} ${startPoint.y}
    A ${radius} ${radius} 0 0 1 ${endPoint.x} ${endPoint.y}
  `;

  // Create needle path
  const needleLength = radius - 5;
  const needlePoint = getArcPoint(valueAngle, needleLength);
  const needleBase = { x: 50, y: 85 };
  const needleWidth = 2;
  const needlePath = `
    M ${needleBase.x - needleWidth} ${needleBase.y}
    L ${needlePoint.x} ${needlePoint.y}
    L ${needleBase.x + needleWidth} ${needleBase.y}
    Z
  `;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gaugeGradient" gradientUnits="userSpaceOnUse"
              x1={startPoint.x} y1={startPoint.y}
              x2={endPoint.x} y2={endPoint.y}>
              {gradientStops}
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d={arcPath}
            fill="none"
            stroke={theme.colors.grid}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Value arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.2}, 251.2`}
            style={animated ? {
              transition: 'stroke-dasharray 0.5s ease-in-out',
            } : undefined}
          />

          {/* Needle */}
          <path
            d={needlePath}
            fill={theme.colors.tertiary}
            style={animated ? {
              transformOrigin: '50px 85px',
              transform: `rotate(${valueAngle + 90}deg)`,
              transition: 'transform 0.5s ease-in-out',
            } : {
              transformOrigin: '50px 85px',
              transform: `rotate(${valueAngle + 90}deg)`,
            }}
          />

          {/* Center point */}
          <circle
            cx={needleBase.x}
            cy={needleBase.y}
            r="4"
            fill={theme.colors.tertiary}
          />

          {/* Value text */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fill={theme.colors.text}
            fontSize="8"
            fontFamily={theme.fonts.base}
            fontWeight="bold"
          >
            {formatValue(normalizedValue)}
          </text>

          {/* Label text */}
          {label && (
            <text
              x="50"
              y="75"
              textAnchor="middle"
              fill={theme.colors.text}
              fontSize="4"
              fontFamily={theme.fonts.base}
            >
              {label}
            </text>
          )}

          {/* Threshold labels */}
          {sortedThresholds.map((threshold, index) => {
            if (!threshold.label) return null;
            const point = getArcPoint(
              startAngle + ((threshold.value - min) / (max - min)) * (endAngle - startAngle),
              radius + 10
            );
            return (
              <text
                key={threshold.value}
                x={point.x}
                y={point.y}
                textAnchor={index === 0 ? 'start' : index === sortedThresholds.length - 1 ? 'end' : 'middle'}
                fill={theme.colors.text}
                fontSize="3"
                fontFamily={theme.fonts.base}
              >
                {threshold.label}
              </text>
            );
          })}
        </svg>
      </ResponsiveContainer>
    </div>
  );
}