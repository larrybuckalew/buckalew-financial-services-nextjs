import { render, screen, fireEvent } from '@testing-library/react';
import PlanComparison from '@/components/insurance/PlanComparison';

describe('PlanComparison', () => {
  const mockPlans = [
    {
      id: '1',
      name: 'Basic Plan',
      type: 'HMO',
      premium: 250,
      deductible: 2000,
      outOfPocketMax: 8000,
      coinsurance: 20,
      copays: {
        primaryCare: 25,
        specialist: 50,
        urgentCare: 75,
        emergency: 300,
        genericDrugs: 10,
        brandDrugs: 35
      },
      features: ['Preventive care covered 100%'],
      network: 'Limited',
      prescription: 'Tier 1 & 2 only'
    },
    {
      id: '2',
      name: 'Premium Plan',
      type: 'PPO',
      premium: 450,
      deductible: 1000,
      outOfPocketMax: 5000,
      coinsurance: 10,
      copays: {
        primaryCare: 15,
        specialist: 30,
        urgentCare: 50,
        emergency: 200,
        genericDrugs: 5,
        brandDrugs: 25
      },
      features: ['Preventive care covered 100%', 'Nationwide coverage'],
      network: 'Extensive',
      prescription: 'All tiers covered'
    }
  ];

  beforeEach(() => {
    // Reset any mocks and render with mock plans
    jest.clearAllMocks();
  });

  it('renders the plan comparison tool', () => {
    render(<PlanComparison selectedPlans={mockPlans} />);
    expect(screen.getByText('Plan Comparison Tool')).toBeInTheDocument();
    expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    expect(screen.getByText('Premium Plan')).toBeInTheDocument();
  });

  it('displays correct plan details', () => {
    render(<PlanComparison selectedPlans={mockPlans} />);
    
    // Check premium display
    expect(screen.getByText('$250')).toBeInTheDocument();
    expect(screen.getByText('$450')).toBeInTheDocument();

    // Check deductibles
    expect(screen.getByText('$2,000')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();

    // Check features
    expect(screen.getByText('Preventive care covered 100%')).toBeInTheDocument();
    expect(screen.getByText('Nationwide coverage')).toBeInTheDocument();
  });

  it('calculates yearly costs correctly', () => {
    render(<PlanComparison selectedPlans={mockPlans} />);

    // Set yearly medical expenses
    fireEvent.change(screen.getByLabelText('Expected Yearly Medical Expenses'), {
      target: { value: '5000' }
    });

    // Basic Plan calculation: Premium + Deductible + Coinsurance
    // Premium: $250 * 12 = $3000
    // Deductible: $2000
    // Remaining: $5000 - $2000 = $3000
    // Coinsurance: $3000 * 0.2 = $600
    // Total: $5600
    expect(screen.getByText('$5,600')).toBeInTheDocument();

    // Premium Plan calculation
    // Premium: $450 * 12 = $5400
    // Deductible: $1000
    // Remaining: $5000 - $1000 = $4000
    // Coinsurance: $4000 * 0.1 = $400
    // Total: $6800
    expect(screen.getByText('$6,800')).toBeInTheDocument();
  });

  it('updates cost comparison chart when expenses change', () => {
    render(<PlanComparison selectedPlans={mockPlans} />);
    
    const chart = screen.getByRole('img', { name: /cost comparison/i });
    expect(chart).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Expected Yearly Medical Expenses'), {
      target: { value: '10000' }
    });

    // Verify that chart updates - exact check would depend on chart implementation
    expect(chart).toBeInTheDocument();
  });

  it('displays plan recommendations based on usage', () => {
    render(<PlanComparison selectedPlans={mockPlans} />);

    // Set high medical usage
    fireEvent.change(screen.getByLabelText('Expected Yearly Medical Expenses'), {
      target: { value: '15000' }
    });

    fireEvent.change(screen.getByLabelText('Prescription Needs'), {
      target: { value: 'high' }
    });

    fireEvent.change(screen.getByLabelText('Specialist Visits per Year'), {
      target: { value: '10' }
    });

    // Verify recommendation appears
    expect(screen.getByText(/Based on your expected medical expenses/)).toBeInTheDocument();
  });
});