import { render, screen } from '@testing-library/react';
import { FunnelChart } from '../FunnelChart';
import { GaugeChart } from '../GaugeChart';
import { SankeyChart } from '../SankeyChart';
import { defaultTheme } from '@/lib/visualization';

describe('Specialized Charts', () => {
  describe('FunnelChart', () => {
    const mockData = [
      { name: 'Visitors', value: 1000, color: '#1f77b4' },
      { name: 'Leads', value: 750, color: '#2ca02c' },
      { name: 'Prospects', value: 500, color: '#ff7f0e' },
      { name: 'Customers', value: 250, color: '#d62728' },
    ];

    it('renders funnel chart with correct data', () => {
      const { container } = render(
        <FunnelChart
          data={mockData}
          height={400}
          theme={defaultTheme}
          formatValue={(v) => `${v}`}
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
      mockData.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(item.value.toString())).toBeInTheDocument();
      });
    });

    it('handles percentage display', () => {
      render(
        <FunnelChart
          data={mockData}
          showPercentages={true}
        />
      );

      expect(screen.getByText(/100\.0%/)).toBeInTheDocument();
      expect(screen.getByText(/75\.0%/)).toBeInTheDocument();
      expect(screen.getByText(/50\.0%/)).toBeInTheDocument();
      expect(screen.getByText(/25\.0%/)).toBeInTheDocument();
    });
  });

  describe('GaugeChart', () => {
    const mockThresholds = [
      { value: 0, color: '#d62728', label: 'Low' },
      { value: 50, color: '#ff7f0e', label: 'Medium' },
      { value: 80, color: '#2ca02c', label: 'High' },
    ];

    it('renders gauge chart with correct value', () => {
      const { container } = render(
        <GaugeChart
          value={75}
          thresholds={mockThresholds}
          label="Performance"
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('Performance')).toBeInTheDocument();
    });

    it('handles threshold labels', () => {
      render(
        <GaugeChart
          value={75}
          thresholds={mockThresholds}
        />
      );

      mockThresholds.forEach(threshold => {
        if (threshold.label) {
          expect(screen.getByText(threshold.label)).toBeInTheDocument();
        }
      });
    });

    it('clamps values to min/max range', () => {
      render(
        <GaugeChart
          value={150}
          min={0}
          max={100}
        />
      );

      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('SankeyChart', () => {
    const mockNodes = [
      { id: 'a', name: 'Source A' },
      { id: 'b', name: 'Source B' },
      { id: 'c', name: 'Target C' },
      { id: 'd', name: 'Target D' },
    ];

    const mockLinks = [
      { source: 'a', target: 'c', value: 50 },
      { source: 'a', target: 'd', value: 30 },
      { source: 'b', target: 'c', value: 40 },
      { source: 'b', target: 'd', value: 20 },
    ];

    it('renders sankey chart with nodes and links', () => {
      const { container } = render(
        <SankeyChart
          nodes={mockNodes}
          links={mockLinks}
        />
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
      mockNodes.forEach(node => {
        expect(screen.getByText(node.name)).toBeInTheDocument();
      });
    });

    it('shows link values when enabled', () => {
      render(
        <SankeyChart
          nodes={mockNodes}
          links={mockLinks}
          showValues={true}
        />
      );

      mockLinks.forEach(link => {
        expect(screen.getByText(link.value.toString())).toBeInTheDocument();
      });
    });

    it('handles custom formatting', () => {
      render(
        <SankeyChart
          nodes={mockNodes}
          links={mockLinks}
          showValues={true}
          formatValue={(v) => `$${v}`}
        />
      );

      mockLinks.forEach(link => {
        expect(screen.getByText(`$${link.value}`)).toBeInTheDocument();
      });
    });
  });
});