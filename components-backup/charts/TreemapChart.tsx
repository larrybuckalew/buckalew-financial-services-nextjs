import React from 'react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ChartTheme, defaultTheme } from '@/lib/visualization';

interface TreemapData {
  name: string;
  value: number;
  children?: TreemapData[];
  color?: string;
}

interface TreemapChartProps {
  data: TreemapData[];
  height?: number;
  theme?: ChartTheme;
  formatValue?: (value: number) => string;
  colorScale?: string[];
}

const RADIAN = Math.PI / 180;

export default function TreemapChart({
  data,
  height = 400,
  theme = defaultTheme,
  formatValue = (value) => value.toString(),
  colorScale = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'],
}: TreemapChartProps) {
  const assignColors = (nodes: TreemapData[], parentColor?: string) => {
    return nodes.map((node, index) => {
      const color = node.color || parentColor || colorScale[index % colorScale.length];
      if (node.children) {
        return {
          ...node,
          children: assignColors(node.children, color),
          color,
        };
      }
      return { ...node, color };
    });
  };

  const coloredData = assignColors(data);

  const renderCustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, depth } = props;
    
    if (width < 30 || height < 30) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: props.color,
            stroke: theme.colors.background,
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {width > 50 && height > 50 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill={theme.colors.background}
              fontSize={14}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill={theme.colors.background}
              fontSize={12}
            >
              {formatValue(value)}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <Treemap
          data={coloredData}
          dataKey="value"
          aspectRatio={4/3}
          stroke={theme.colors.background}
          content={renderCustomizedContent}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const data = payload[0].payload;
              return (
                <div className="custom-tooltip" style={{
                  backgroundColor: theme.colors.background,
                  padding: '10px',
                  border: `1px solid ${theme.colors.grid}`,
                  borderRadius: '4px',
                }}>
                  <p style={{ color: theme.colors.text }}>{`${data.name}`}</p>
                  <p style={{ color: theme.colors.text }}>{`Value: ${formatValue(data.value)}`}</p>
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}