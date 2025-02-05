import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Mock data for testing
export const mockInsurancePlan = {
  id: 'test-plan-1',
  name: 'Test Plan Silver',
  provider: 'Test Insurance Co',
  monthlyPremium: 299.99,
  annualDeductible: 2500,
  outOfPocketMax: 8000,
  prescriptionCoverage: {
    generic: 10,
    brandName: 35,
    specialty: 100
  },
  networkSize: 'Large',
  rating: 4,
  features: [
    'Primary Care Visits',
    'Specialist Coverage',
    'Hospital Services',
    'Mental Health Care'
  ]
};

export const mockPlanScore = {
  plan: mockInsurancePlan,
  score: 85,
  matchingFactors: [
    'Within budget',
    'Good prescription coverage',
    'Large network'
  ],
  concerns: [
    'Higher deductible'
  ],
  matchPercentage: 85
};

// Custom wrapper for tests that need context providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };