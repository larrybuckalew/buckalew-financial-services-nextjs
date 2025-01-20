import { 
  getChartConfig,
  defaultTheme,
  darkTheme,
  formatCurrency,
  formatPercentage,
  formatDate
} from '../visualization';

describe('Visualization Utils', () => {
  describe('Theme Configuration', () => {
    it('generates correct chart config for default theme', () => {
      const config = getChartConfig(defaultTheme);
      
      expect(config.areaChart.style.backgroundColor).toBe(defaultTheme.colors.background);
      expect(config.areaChart.grid.stroke).toBe(defaultTheme.colors.grid);
      expect(config.areaChart.tooltip.contentStyle.color).toBe(defaultTheme.colors.text);
    });

    it('generates correct chart config for dark theme', () => {
      const config = getChartConfig(darkTheme);
      
      expect(config.areaChart.style.backgroundColor).toBe(darkTheme.colors.background);
      expect(config.areaChart.grid.stroke).toBe(darkTheme.colors.grid);
      expect(config.areaChart.tooltip.contentStyle.color).toBe(darkTheme.colors.text);
    });

    it('handles custom theme configuration', () => {
      const customTheme = {
        colors: {
          primary: '#custom1',
          secondary: '#custom2',
          tertiary: '#custom3',
          background: '#custom4',
          text: '#custom5',
          grid: '#custom6',
        },
        fonts: {
          base: 'CustomFont, sans-serif',
        },
      };

      const config = getChartConfig(customTheme);
      
      expect(config.areaChart.style.backgroundColor).toBe(customTheme.colors.background);
      expect(config.areaChart.style.fontFamily).toBe(customTheme.fonts.base);
    });
  });

  describe('Formatting Functions', () => {
    describe('formatCurrency', () => {
      it('formats integers correctly', () => {
        expect(formatCurrency(1000)).toBe('$1,000');
        expect(formatCurrency(1000000)).toBe('$1,000,000');
      });

      it('formats decimals correctly', () => {
        expect(formatCurrency(1000.5)).toBe('$1,001');
        expect(formatCurrency(1000.5, 2)).toBe('$1,000.50');
      });

      it('handles negative values', () => {
        expect(formatCurrency(-1000)).toBe('-$1,000');
        expect(formatCurrency(-1000.5, 2)).toBe('-$1,000.50');
      });

      it('handles zero value', () => {
        expect(formatCurrency(0)).toBe('$0');
        expect(formatCurrency(0, 2)).toBe('$0.00');
      });
    });

    describe('formatPercentage', () => {
      it('formats percentage correctly', () => {
        expect(formatPercentage(50)).toBe('50.0%');
        expect(formatPercentage(33.333)).toBe('33.3%');
      });

      it('handles decimals correctly', () => {
        expect(formatPercentage(50.55)).toBe('50.6%');
        expect(formatPercentage(33.333333)).toBe('33.3%');
      });

      it('handles negative percentages', () => {
        expect(formatPercentage(-50)).toBe('-50.0%');
        expect(formatPercentage(-33.333)).toBe('-33.3%');
      });

      it('handles zero percentage', () => {
        expect(formatPercentage(0)).toBe('0.0%');
      });
    });

    describe('formatDate', () => {
      it('formats dates correctly', () => {
        expect(formatDate(new Date('2025-01-01'))).toBe('Jan 01, 2025');
        expect(formatDate('2025-12-31')).toBe('Dec 31, 2025');
      });

      it('handles different date input formats', () => {
        expect(formatDate('2025-01-01T00:00:00.000Z')).toBe('Jan 01, 2025');
        expect(formatDate(1735689600000)).toBe('Jan 01, 2025');
      });

      it('handles edge cases', () => {
        expect(formatDate(new Date('2025-02-29'))).toBe('Mar 01, 2025');
        expect(formatDate(new Date('2024-02-29'))).toBe('Feb 29, 2024');
      });
    });
  });

  describe('Chart Configuration', () => {
    it('provides correct margins for different chart types', () => {
      const config = getChartConfig(defaultTheme);
      
      expect(config.areaChart.margin).toEqual(
        expect.objectContaining({
          top: expect.any(Number),
          right: expect.any(Number),
          bottom: expect.any(Number),
          left: expect.any(Number),
        })
      );

      expect(config.lineChart.margin).toEqual(
        expect.objectContaining({
          top: expect.any(Number),
          right: expect.any(Number),
          bottom: expect.any(Number),
          left: expect.any(Number),
        })
      );

      expect(config.barChart.margin).toEqual(
        expect.objectContaining({
          top: expect.any(Number),
          right: expect.any(Number),
          bottom: expect.any(Number),
          left: expect.any(Number),
        })
      );
    });

    it('configures tooltips correctly', () => {
      const config = getChartConfig(defaultTheme);
      
      expect(config.areaChart.tooltip.contentStyle).toEqual(
        expect.objectContaining({
          backgroundColor: defaultTheme.colors.background,
          borderColor: defaultTheme.colors.grid,
          color: defaultTheme.colors.text,
        })
      );
    });

    it('configures grid correctly', () => {
      const config = getChartConfig(defaultTheme);
      
      expect(config.areaChart.grid).toEqual(
        expect.objectContaining({
          strokeDasharray: '3 3',
          stroke: defaultTheme.colors.grid,
        })
      );
    });
  });
});