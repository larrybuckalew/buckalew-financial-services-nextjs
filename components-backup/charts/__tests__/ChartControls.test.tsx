import { render, screen, fireEvent } from '@testing-library/react';
import ChartControls from '../ChartControls';
import { defaultTheme, darkTheme } from '@/lib/visualization';

describe('ChartControls', () => {
  const mockProps = {
    chartType: 'area' as const,
    onChartTypeChange: jest.fn(),
    theme: defaultTheme,
    onThemeChange: jest.fn(),
    onExport: jest.fn(),
  };

  it('renders all controls', () => {
    render(<ChartControls {...mockProps} />);
    
    expect(screen.getByText('Chart Type:')).toBeInTheDocument();
    expect(screen.getByText('Theme:')).toBeInTheDocument();
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
  });

  it('handles chart type change', () => {
    render(<ChartControls {...mockProps} />);
    
    const select = screen.getByDisplayValue('Area Chart');
    fireEvent.change(select, { target: { value: 'line' } });
    
    expect(mockProps.onChartTypeChange).toHaveBeenCalledWith('line');
  });

  it('handles theme change', () => {
    render(<ChartControls {...mockProps} />);
    
    const select = screen.getByDisplayValue('Light');
    fireEvent.change(select, { target: { value: 'dark' } });
    
    expect(mockProps.onThemeChange).toHaveBeenCalledWith(darkTheme);
  });

  it('handles export button click', () => {
    render(<ChartControls {...mockProps} />);
    
    const exportButton = screen.getByText('Export CSV');
    fireEvent.click(exportButton);
    
    expect(mockProps.onExport).toHaveBeenCalled();
  });
});