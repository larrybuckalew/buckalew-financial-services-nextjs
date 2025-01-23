import { render, screen, fireEvent } from '@testing-library/react';
import { BubbleChart } from '../BubbleChart';
import { CompositeChart } from '../CompositeChart';
import { TreemapChart } from '../TreemapChart';
import { defaultTheme } from '@/lib/visualization';

describe('Advanced Chart Components', () => {
  describe('BubbleChart', () => {
    const mockData = [
      {
        name: 'Series A',
        data: [
          { x: 100, y: 200, z: 50, name: 'Point 1' },
          { x: 120, y: 100, z: 80, name: 'Point 2' },
        ],
        color: '#ff0000',
      },
    ];

    it('renders bubble chart with correct data', () => {
      const { container } = render(
        <BubbleChart
          data={mockData}
          height={400}
          theme={defaultTheme}
          formatValue={(value) => `$${value}`}
        />
      );
      
      expect(container.querySelector('svg')).toBeInTheDocument();
      // Verify scatter plot points exist
      const points = container.querySelectorAll('circle');
      expect(points.length).toBeGreaterThan(0);
    });

    it('applies custom formatting', () => {
      const formatValue = jest.fn(value => `$${value}`);
      render(
        <BubbleChart
          data={mockData}
          formatValue={formatValue}
          xAxisLabel="Revenue"
          yAxisLabel="Profit"
        />
      );
      
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('Profit')).toBeInTheDocument();
    });
  });

  describe('CompositeChart', () => {
    const mockData = [
      { month: 'Jan', revenue: 100, expenses: 80, profit: 20 },
      { month: 'Feb', revenue: 120, expenses: 90, profit: 30 },
    ];

    const mockSeries = [
      { type: 'bar', dataKey: 'revenue', name: 'Revenue', color: '#0088FE' },
      { type: 'bar', dataKey: 'expenses', name: 'Expenses', color: '#00C49F' },
      { type: 'line', dataKey: 'profit', name: 'Profit', color: '#FFBB28' },
    ];

    it('renders composite chart with multiple series types', () => {
      const { container } = render(
        <CompositeChart
          data={mockData}
          series={mockSeries}
          xAxisDataKey="month"
          height={400}
          theme={defaultTheme}
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
      // Verify bars and lines exist
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(0);
    });

    it('handles different y-axis configurations', () => {
      const seriesWithDualAxis = [
        { ...mockSeries[0], yAxisId: 'left' },
        { ...mockSeries[1], yAxisId: 'right' },
      ];

      render(
        <CompositeChart
          data={mockData}
          series={seriesWithDualAxis}
          xAxisDataKey="month"
          leftAxisLabel="Revenue"
          rightAxisLabel="Expenses"
        />
      );

      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('Expenses')).toBeInTheDocument();
    });
  });

  describe('TreemapChart', () => {
    const mockData = [
      {
        name: 'Revenue',
        value: 1000,
        children: [
          { name: 'Product A', value: 600 },
          { name: 'Product B', value: 400 },
        ],
      },
    ];

    it('renders treemap with hierarchical data', () => {
      const { container } = render(
        <TreemapChart
          data={mockData}
          height={400}
          theme={defaultTheme}
          formatValue={(value) => `$${value}`}
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
    });

    it('applies custom color scale', () => {
      const colorScale = ['#ff0000', '#00ff00', '#0000ff'];
      const { container } = render(
        <TreemapChart
          data={mockData}
          colorScale={colorScale}
          formatValue={(value) => `$${value}`}
        />
      );

      const rectangles = container.querySelectorAll('rect');
      rectangles.forEach((rect) => {
        const fill = rect.getAttribute('style')?.match(/fill: (#[0-9a-f]{6})/i)?.[1];
        if (fill) {
          expect(colorScale.includes(fill.toLowerCase())).toBe(true);
        }
      });
    });

    it('handles tooltip interactions', () => {
      const formatValue = jest.fn(value => `$${value}`);
      render(
        <TreemapChart
          data={mockData}
          formatValue={formatValue}
        />
      );

      // Simulate mouseover on treemap cell
      const cells = screen.getAllByText(/Product [AB]/);
      fireEvent.mouseOver(cells[0]);

      // Verify tooltip shows formatted value
      expect(formatValue).toHaveBeenCalled();
    });
  });
});
