import { format } from 'date-fns';

export interface ChartTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    text: string;
    grid: string;
  };
  fonts: {
    base: string;
  };
}

export const defaultTheme: ChartTheme = {
  colors: {
    primary: '#3b82f6',   // Blue
    secondary: '#22c55e', // Green
    tertiary: '#ef4444',  // Red
    background: '#ffffff',
    text: '#1f2937',
    grid: '#e5e7eb',
  },
  fonts: {
    base: 'Inter, system-ui, sans-serif',
  },
};

export const darkTheme: ChartTheme = {
  colors: {
    primary: '#60a5fa',
    secondary: '#4ade80',
    tertiary: '#f87171',
    background: '#1f2937',
    text: '#f3f4f6',
    grid: '#374151',
  },
  fonts: {
    base: 'Inter, system-ui, sans-serif',
  },
};

export const formatCurrency = (value: number, minimumFractionDigits = 0): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const getChartConfig = (theme: ChartTheme = defaultTheme) => ({
  areaChart: {
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
    style: {
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.base,
    },
    grid: {
      strokeDasharray: '3 3',
      stroke: theme.colors.grid,
    },
    tooltip: {
      contentStyle: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.grid,
        color: theme.colors.text,
      },
    },
  },
  lineChart: {
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
    style: {
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.base,
    },
    grid: {
      strokeDasharray: '3 3',
      stroke: theme.colors.grid,
    },
    tooltip: {
      contentStyle: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.grid,
        color: theme.colors.text,
      },
    },
  },
  barChart: {
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    style: {
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.base,
    },
    grid: {
      strokeDasharray: '3 3',
      stroke: theme.colors.grid,
    },
    tooltip: {
      contentStyle: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.grid,
        color: theme.colors.text,
      },
    },
  },
});