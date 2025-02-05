import { render } from '@testing-library/react';
import { StackedAreaChart, LineChart, BarChart } from '../';
import { defaultTheme } from '@/lib/visualization';

const mockData = [
  { month: 1, value: 100 },
  { month: 2, value: 200 },
  { month: 3, value: 300 },
];

const mockConfig = {
  data: mockData,
  dataKeys: {
    xAxis: 'month',
    areas: [
      { key: 'value', name: 'Value', color: '#000000' },
    ],
    lines: [
      { key: 'value', name: 'Value', color: '#000000' },
    ],
    bars: [
      { key: 'value', name: 'Value', color: '#000000' },
    ],
  },
  theme: defaultTheme,
  formatYAxis: (value: number) => value.toString(),
  formatTooltip: (value: number) => value.toString(),
};

describe('Chart Components', () => {
  it('renders StackedAreaChart without errors', () => {
    const { container } = render(<StackedAreaChart {...mockConfig} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders LineChart without errors', () => {
    const { container } = render(<LineChart {...mockConfig} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders BarChart without errors', () => {
    const { container } = render(<BarChart {...mockConfig} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // Note: More detailed tests for chart behavior would require more complex
  // testing utilities that can handle SVG and chart interactions
});