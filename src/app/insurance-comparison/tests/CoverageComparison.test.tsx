import { render, screen, fireEvent } from './test-utils';
import { CoverageComparison } from '../components/CoverageComparison';
import { mockInsurancePlan } from './test-utils';

describe('CoverageComparison', () => {
  const plans = [mockInsurancePlan];

  it('renders category headers correctly', () => {
    render(<CoverageComparison plans={plans} />);

    expect(screen.getByText('Hospital Services')).toBeInTheDocument();
    expect(screen.getByText('Office Visits')).toBeInTheDocument();
    expect(screen.getByText('Preventive Care')).toBeInTheDocument();
    expect(screen.getByText('Prescriptions')).toBeInTheDocument();
  });

  it('expands and collapses categories on click', () => {
    render(<CoverageComparison plans={plans} />);

    // Initially no features are visible
    expect(screen.queryByText('Primary Care')).not.toBeInTheDocument();

    // Click to expand Office Visits
    fireEvent.click(screen.getByText('Office Visits'));
    expect(screen.getByText('Primary Care')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(screen.getByText('Office Visits'));
    expect(screen.queryByText('Primary Care')).not.toBeInTheDocument();
  });

  it('displays coverage indicators correctly', () => {
    render(<CoverageComparison plans={plans} />);

    // Expand a category
    fireEvent.click(screen.getByText('Hospital Services'));

    // Check for coverage marks
    const coverageMarks = screen.getAllByRole('cell');
    expect(coverageMarks.length).toBeGreaterThan(0);
  });

  it('shows plan names in table headers', () => {
    render(<CoverageComparison plans={plans} />);

    // Expand a category
    fireEvent.click(screen.getByText('Hospital Services'));

    expect(screen.getByText(mockInsurancePlan.name)).toBeInTheDocument();
  });

  it('maintains accessibility attributes', () => {
    render(<CoverageComparison plans={plans} />);

    // Check for ARIA attributes
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
    });
  });

  it('shows legend with coverage indicators', () => {
    render(<CoverageComparison plans={plans} />);

    expect(screen.getByText('Covered under plan')).toBeInTheDocument();
    expect(screen.getByText('Not covered under plan')).toBeInTheDocument();
  });

  it('handles empty plans array gracefully', () => {
    render(<CoverageComparison plans={[]} />);

    // Should still render structure but with no plan columns
    expect(screen.getByText('Coverage Comparison')).toBeInTheDocument();
  });

  // Test keyboard navigation
  it('supports keyboard navigation', () => {
    render(<CoverageComparison plans={plans} />);

    const firstButton = screen.getAllByRole('button')[0];
    firstButton.focus();
    
    // Press Enter to expand
    fireEvent.keyDown(firstButton, { key: 'Enter' });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Press Enter again to collapse
    fireEvent.keyDown(firstButton, { key: 'Enter' });
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });
});