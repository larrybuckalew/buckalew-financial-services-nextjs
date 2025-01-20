import React, { useState } from 'react';
import { StackedAreaChart, LineChart, BarChart, ChartControls } from '@/components/charts';
import { ChartTheme, defaultTheme, formatCurrency } from '@/lib/visualization';
import { exportToCSV } from '@/lib/export';

interface ChartSectionProps {
  data: any[];
  type: 'mortgage' | 'investment' | 'retirement';
  onExport: () => void;
}

export default function ChartSection({ data, type, onExport }: ChartSectionProps) {
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar'>('area');
  const [theme, setTheme] = useState<ChartTheme>(defaultTheme);

  const getChartConfig = () => {
    switch (type) {
      case 'mortgage':
        return {
          xAxis: 'month',
          areas: [
            { key: 'balance', name: 'Balance', color: theme.colors.primary },
            { key: 'interest', name: 'Interest', color: theme.colors.tertiary },
            { key: 'principal', name: 'Principal', color: theme.colors.secondary },
          ],
        };
      case 'investment':
        return {
          xAxis: 'year',
          areas: [
            { key: 'balance', name: 'Total Balance', color: theme.colors.primary },
            { key: 'contributions', name: 'Contributions', color: theme.colors.secondary },
            { key: 'earnings', name: 'Earnings', color: theme.colors.tertiary },
          ],
        };
      case 'retirement':
        return {
          xAxis: 'age',
          areas: [
            { key: 'savings', name: 'Total Savings', color: theme.colors.primary },
            { key: 'contributions', name: 'Contributions', color: theme.colors.secondary },
            { key: 'earnings', name: 'Investment Earnings', color: theme.colors.tertiary },
          ],
        };
      default:
        return {
          xAxis: '',
          areas: [],
        };
    }
  };

  const config = getChartConfig();

  const renderChart = () => {
    const props = {
      data,
      dataKeys: {
        xAxis: config.xAxis,
        areas: config.areas,
        lines: config.areas,
        bars: config.areas,
      },
      theme,
      formatYAxis: formatCurrency,
      formatTooltip: formatCurrency,
    };

    switch (chartType) {
      case 'area':
        return <StackedAreaChart {...props} />;
      case 'line':
        return <LineChart {...props} />;
      case 'bar':
        return <BarChart {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <ChartControls
        chartType={chartType}
        onChartTypeChange={setChartType}
        theme={theme}
        onThemeChange={setTheme}
        onExport={onExport}
      />
      {renderChart()}
    </div>
  );
}