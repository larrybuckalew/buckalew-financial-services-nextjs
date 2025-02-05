import { render, screen, fireEvent } from './test-utils';
import { PlanRecommendations } from '../components/PlanRecommendations';
import { mockPlanScore } from './test-utils';

describe('PlanRecommendations', () => {
  const mockOnPlanSelect = jest.fn();

  beforeEach(() => {
    mockOnPlanSelect.mockClear();
  });

  it('renders loading state correctly', () => {
    render(
      <PlanRecommendations
        recommendations={[]}
        isLoading={true}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders empty state when no recommendations', () => {
    render(
      <PlanRecommendations
        recommendations={[]}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    expect(screen.getByText(/No Matching Plans Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your preferences/i)).toBeInTheDocument();
  });

  it('renders recommendations correctly', () => {
    render(
      <PlanRecommendations
        recommendations={[mockPlanScore]}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    expect(screen.getByText(mockPlanScore.plan.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPlanScore.matchPercentage}% Match`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockPlanScore.plan.monthlyPremium}`)).toBeInTheDocument();
  });

  it('handles plan selection correctly', () => {
    render(
      <PlanRecommendations
        recommendations={[mockPlanScore]}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    const selectButton = screen.getByRole('button', { name: /select plan/i });
    fireEvent.click(selectButton);

    expect(mockOnPlanSelect).toHaveBeenCalledWith(mockPlanScore.plan);
    expect(selectButton).toHaveTextContent(/selected/i);
  });

  it('displays matching factors and concerns', () => {
    render(
      <PlanRecommendations
        recommendations={[mockPlanScore]}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    mockPlanScore.matchingFactors.forEach(factor => {
      expect(screen.getByText(factor)).toBeInTheDocument();
    });

    mockPlanScore.concerns.forEach(concern => {
      expect(screen.getByText(concern)).toBeInTheDocument();
    });
  });

  it('is accessible', async () => {
    const { container } = render(
      <PlanRecommendations
        recommendations={[mockPlanScore]}
        onPlanSelect={mockOnPlanSelect}
      />
    );

    // Basic accessibility checks
    expect(container).toBeAccessible();
    
    // Check for proper ARIA roles
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});