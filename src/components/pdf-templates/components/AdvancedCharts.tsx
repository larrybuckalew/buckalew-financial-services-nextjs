import React from 'react';
import { View, Svg, Path, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes } from '@/styles/pdfTheme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: spacing.xl,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginVertical: spacing.lg,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 600,
    color: colors.primary[700],
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.lg,
  },
  chartArea: {
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: spacing.sm,
    borderRadius: 2,
  },
  legendText: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
  },
});

// Radar Chart for comparing multiple attributes
export const RadarChart = ({
  data,
  title,
  subtitle,
  size = 300,
  colors: customColors = [colors.primary[500], colors.primary[700], colors.primary[900]]
}: {
  data: {
    categories: string[];
    series: Array<{
      name: string;
      values: number[];
    }>;
  };
  title: string;
  subtitle?: string;
  size?: number;
  colors?: string[];
}) => {
  const center = size / 2;
  const radius = (size - 60) / 2;
  const angleStep = (Math.PI * 2) / data.categories.length;

  // Calculate points for each value
  const getPoints = (values: number[]) => {
    return values.map((value, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const distance = (value / 100) * radius;
      return {
        x: center + distance * Math.cos(angle),
        y: center + distance * Math.sin(angle),
      };
    });
  };

  // Create path string for a series
  const createPath = (points: Array<{ x: number; y: number }>) => {
    return points.reduce((path, point, i) => (
      i === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`
    ), '') + ' Z';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.chartArea}>
        <Svg width={size} height={size}>
          {/* Background grid */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
            const points = data.categories.map((_, j) => {
              const angle = -Math.PI / 2 + j * angleStep;
              const distance = radius * scale;
              return {
                x: center + distance * Math.cos(angle),
                y: center + distance * Math.sin(angle),
              };
            });
            return (
              <Path
                key={i}
                d={createPath(points)}
                stroke={colors.gray[200]}
                strokeWidth={1}
                fill="none"
              />
            );
          })}

          {/* Axis lines */}
          {data.categories.map((_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            return (
              <Path
                key={i}
                d={`M ${center} ${center} L ${center + radius * Math.cos(angle)} ${center + radius * Math.sin(angle)}`}
                stroke={colors.gray[300]}
                strokeWidth={1}
              />
            );
          })}

          {/* Data series */}
          {data.series.map((series, i) => {
            const points = getPoints(series.values);
            return (
              <Path
                key={i}
                d={createPath(points)}
                fill={customColors[i]}
                fillOpacity={0.2}
                stroke={customColors[i]}
                strokeWidth={2}
              />
            );
          })}

          {/* Category labels */}
          {data.categories.map((category, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const x = center + (radius + 20) * Math.cos(angle);
            const y = center + (radius + 20) * Math.sin(angle);
            return (
              <Text
                key={i}
                x={x}
                y={y}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'middle',
                  alignmentBaseline: 'middle',
                  fill: colors.gray[600],
                }}
              >
                {category}
              </Text>
            );
          })}
        </Svg>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {data.series.map((series, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: customColors[i] }]} />
            <Text style={styles.legendText}>{series.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Funnel Chart for showing process steps or conversion
export const FunnelChart = ({
  data,
  title,
  subtitle,
  width = 400,
  height = 300,
}: {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const stepHeight = (height - 60) / data.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.chartArea}>
        <Svg width={width} height={height}>
          {data.map((item, i) => {
            const topWidth = (width - 40) * (data[Math.max(0, i - 1)]?.value || maxValue) / maxValue;
            const bottomWidth = (width - 40) * item.value / maxValue;
            const y = 30 + i * stepHeight;
            const x = (width - bottomWidth) / 2;

            const path = `
              M ${(width - topWidth) / 2} ${y}
              L ${(width + topWidth) / 2} ${y}
              L ${x + bottomWidth} ${y + stepHeight}
              L ${x} ${y + stepHeight}
              Z
            `;

            return (
              <React.Fragment key={i}>
                <Path
                  d={path}
                  fill={item.color || colors.primary[500 + i * 100]}
                  opacity={0.8}
                />
                <Text
                  x={width / 2}
                  y={y + stepHeight / 2}
                  style={{
                    fontSize: fontSizes.sm,
                    textAnchor: 'middle',
                    alignmentBaseline: 'middle',
                    fill: 'white',
                  }}
                >
                  {item.label} (${item.value})
                </Text>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

// Stacked Area Chart for showing trends with multiple categories
export const StackedAreaChart = ({
  data,
  title,
  subtitle,
  width = 500,
  height = 300,
  areaColors = [colors.primary[300], colors.primary[500], colors.primary[700]],
}: {
  data: Array<{
    date: string;
    values: Record<string, number>;
  }>;
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  areaColors?: string[];
}) => {
  const categories = Object.keys(data[0].values);
  const maxTotal = Math.max(
    ...data.map(d => Object.values(d.values).reduce((sum, v) => sum + v, 0))
  );
  const xStep = (width - 60) / (data.length - 1);
  const yScale = (height - 60) / maxTotal;

  const getAreaPath = (categoryIndex: number) => {
    let path = '';
    data.forEach((point, i) => {
      const x = 30 + i * xStep;
      let total = 0;
      for (let j = 0; j <= categoryIndex; j++) {
        total += point.values[categories[j]] || 0;
      }
      const y = height - 30 - total * yScale;
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    // Complete the path back to the bottom
    const lastX = 30 + (data.length - 1) * xStep;
    path += ` L ${lastX} ${height - 30} L 30 ${height - 30} Z`;
    return path;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.chartArea}>
        <Svg width={width} height={height}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = height - 30 - maxTotal * ratio * yScale;
            return (
              <React.Fragment key={i}>
                <Path
                  d={`M 30 ${y} L ${width - 30} ${y}`}
                  stroke={colors.gray[200]}
                  strokeDasharray="2,2"
                />
                <Text
                  x={25}
                  y={y}
                  style={{
                    fontSize: fontSizes.xs,
                    textAnchor: 'end',
                    alignmentBaseline: 'middle',
                    fill: colors.gray[600],
                  }}
                >
                  ${Math.round(maxTotal * ratio)}
                </Text>
              </React.Fragment>
            );
          })}

          {/* Areas */}
          {categories.map((_, i) => (
            <Path
              key={i}
              d={getAreaPath(i)}
              fill={areaColors[i]}
              fillOpacity={0.6}
            />
          ))}

          {/* X-axis labels */}
          {data.map((point, i) => (
            <Text
              key={i}
              x={30 + i * xStep}
              y={height - 15}
              style={{
                fontSize: fontSizes.xs,
                textAnchor: 'middle',
                fill: colors.gray[600],
              }}
            >
              {point.date}
            </Text>
          ))}
        </Svg>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {categories.map((category, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: areaColors[i] }]} />
            <Text style={styles.legendText}>{category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
