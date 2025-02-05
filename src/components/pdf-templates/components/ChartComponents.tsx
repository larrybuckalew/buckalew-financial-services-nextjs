import React from 'react';
import { View, Svg, Path, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes } from '@/styles/pdfTheme';

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xl,
  },
  chartTitle: {
    fontSize: fontSizes.md,
    fontWeight: 600,
    color: colors.primary[700],
    marginBottom: spacing.md,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200],
  }
});

export const PieChart = ({ 
  data,
  title,
  width = 200,
  height = 200
}: {
  data: Array<{ value: number; label: string; color: string }>;
  title: string;
  width?: number;
  height?: number;
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <View style={[styles.container, styles.chartContainer]}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={width} height={height}>
        {data.map((item, index) => {
          const percentage = item.value / total;
          const angle = percentage * Math.PI * 2;
          const largeArcFlag = percentage > 0.5 ? 1 : 0;
          
          const x1 = width/2 + Math.cos(currentAngle) * (width/2);
          const y1 = height/2 + Math.sin(currentAngle) * (height/2);
          const x2 = width/2 + Math.cos(currentAngle + angle) * (width/2);
          const y2 = height/2 + Math.sin(currentAngle + angle) * (height/2);

          const d = `
            M ${width/2} ${height/2}
            L ${x1} ${y1}
            A ${width/2} ${height/2} 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `;

          currentAngle += angle;

          return <Path key={index} d={d} fill={item.color} />;
        })}
      </Svg>
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label} ({Math.round((item.value / total) * 100)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const BarChart = ({
  data,
  title,
  width = 400,
  height = 200,
  barColor = colors.primary[500]
}: {
  data: Array<{ label: string; value: number }>;
  title: string;
  width?: number;
  height?: number;
  barColor?: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - 40) / data.length - 10;
  const scale = (height - 40) / maxValue;

  return (
    <View style={[styles.container, styles.chartContainer]}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = height - 30 - (maxValue * ratio * scale);
          return (
            <React.Fragment key={index}>
              <Path
                d={`M 30 ${y} L ${width - 10} ${y}`}
                stroke={colors.gray[200]}
                strokeDasharray="2,2"
              />
              <Text
                x={25}
                y={y + 5}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'end',
                  fill: colors.gray[600],
                }}
              >
                {Math.round(maxValue * ratio)}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Y-axis */}
        <Path d={`M 30 10 L 30 ${height - 30}`} stroke={colors.gray[300]} />
        
        {/* X-axis */}
        <Path d={`M 30 ${height - 30} L ${width - 10} ${height - 30}`} stroke={colors.gray[300]} />
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = item.value * scale;
          const x = 40 + index * (barWidth + 10);
          const y = height - 30 - barHeight;

          return (
            <React.Fragment key={index}>
              <Path
                d={`M ${x} ${height - 30} L ${x} ${y} L ${x + barWidth} ${y} L ${x + barWidth} ${height - 30} Z`}
                fill={barColor}
              />
              <Text
                x={x + barWidth/2}
                y={height - 15}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'middle',
                  fill: colors.gray[600],
                }}
              >
                {item.label}
              </Text>
              <Text
                x={x + barWidth/2}
                y={y - 5}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'middle',
                  fill: colors.gray[600],
                }}
              >
                {item.value}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export const LineChart = ({
  data,
  title,
  width = 400,
  height = 200,
  lineColor = colors.primary[500]
}: {
  data: Array<{ label: string; value: number }>;
  title: string;
  width?: number;
  height?: number;
  lineColor?: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const xStep = (width - 60) / (data.length - 1);
  const scale = (height - 60) / maxValue;

  const points = data.map((item, index) => ({
    x: 40 + index * xStep,
    y: height - 30 - (item.value * scale),
  }));

  const pathD = points.reduce((path, point, index) => (
    index === 0
      ? `M ${point.x} ${point.y}`
      : `${path} L ${point.x} ${point.y}`
  ), '');

  return (
    <View style={[styles.container, styles.chartContainer]}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = height - 30 - (maxValue * ratio * scale);
          return (
            <React.Fragment key={index}>
              <Path
                d={`M 30 ${y} L ${width - 20} ${y}`}
                stroke={colors.gray[200]}
                strokeDasharray="2,2"
              />
              <Text
                x={20}
                y={y + 5}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'end',
                  fill: colors.gray[600],
                }}
              >
                {Math.round(maxValue * ratio)}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Line */}
        <Path d={pathD} stroke={lineColor} strokeWidth={2} fill="none" />

        {/* Area under the line */}
        <Path
          d={`${pathD} L ${points[points.length - 1].x} ${height - 30} L ${points[0].x} ${height - 30} Z`}
          fill={lineColor}
          opacity={0.1}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <React.Fragment key={index}>
            <Path
              d={`M ${point.x - 4} ${point.y} L ${point.x + 4} ${point.y} M ${point.x} ${point.y - 4} L ${point.x} ${point.y + 4}`}
              stroke={lineColor}
              strokeWidth={2}
            />
            <Text
              x={point.x}
              y={height - 15}
              style={{
                fontSize: fontSizes.xs,
                textAnchor: 'middle',
                fill: colors.gray[600],
              }}
            >
              {data[index].label}
            </Text>
            <Text
              x={point.x}
              y={point.y - 15}
              style={{
                fontSize: fontSizes.xs,
                textAnchor: 'middle',
                fill: colors.gray[600],
              }}
            >
              {data[index].value}
            </Text>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

export const ComparisonChart = ({
  data,
  title,
  width = 400,
  height = 250,
}: {
  data: Array<{
    category: string;
    basic: number;
    premium: number;
    elite: number;
  }>;
  title: string;
  width?: number;
  height?: number;
}) => {
  const maxValue = Math.max(
    ...data.flatMap(d => [d.basic, d.premium, d.elite])
  );
  const scale = (height - 60) / maxValue;
  const categoryWidth = (width - 60) / data.length;
  const barWidth = (categoryWidth - 40) / 3;

  return (
    <View style={[styles.container, styles.chartContainer]}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = height - 30 - (maxValue * ratio * scale);
          return (
            <React.Fragment key={index}>
              <Path
                d={`M 30 ${y} L ${width - 20} ${y}`}
                stroke={colors.gray[200]}
                strokeDasharray="2,2"
              />
              <Text
                x={20}
                y={y + 5}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'end',
                  fill: colors.gray[600],
                }}
              >
                {Math.round(maxValue * ratio)}
              </Text>
            </React.Fragment>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = 40 + index * categoryWidth;
          return (
            <React.Fragment key={index}>
              {/* Basic plan bar */}
              <Path
                d={`M ${x} ${height - 30 - item.basic * scale} 
                   L ${x} ${height - 30} 
                   L ${x + barWidth} ${height - 30} 
                   L ${x + barWidth} ${height - 30 - item.basic * scale}Z`}
                fill={colors.primary[300]}
              />
              
              {/* Premium plan bar */}
              <Path
                d={`M ${x + barWidth + 5} ${height - 30 - item.premium * scale} 
                   L ${x + barWidth + 5} ${height - 30} 
                   L ${x + 2 * barWidth + 5} ${height - 30} 
                   L ${x + 2 * barWidth + 5} ${height - 30 - item.premium * scale}Z`}
                fill={colors.primary[500]}
              />
              
              {/* Elite plan bar */}
              <Path
                d={`M ${x + 2 * barWidth + 10} ${height - 30 - item.elite * scale} 
                   L ${x + 2 * barWidth + 10} ${height - 30} 
                   L ${x + 3 * barWidth + 10} ${height - 30} 
                   L ${x + 3 * barWidth + 10} ${height - 30 - item.elite * scale}Z`}
                fill={colors.primary[700]}
              />

              {/* Category label */}
              <Text
                x={x + (3 * barWidth) / 2}
                y={height - 10}
                style={{
                  fontSize: fontSizes.xs,
                  textAnchor: 'middle',
                  fill: colors.gray[600],
                }}
              >
                {item.category}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.primary[300] }]} />
          <Text style={styles.legendText}>Basic</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.primary[500] }]} />
          <Text style={styles.legendText}>Premium</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.primary[700] }]} />
          <Text style={styles.legendText}>Elite</Text>
        </View>
      </View>
    </View>
  );
};
