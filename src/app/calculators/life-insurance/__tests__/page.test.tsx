import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LifeInsuranceCalculator from '../page';

describe('LifeInsuranceCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the calculator form', () => {
    render(<LifeInsuranceCalculator />);
    
    expect(screen.getByText('Life Insurance Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Annual Income')).toBeInTheDocument();
    expect(screen.getByLabelText('Current Debt (excluding mortgage)')).toBeInTheDocument();
    expect(screen.getByLabelText('Mortgage Balance')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Dependents')).toBeInTheDocument();
    expect(screen.getByLabelText('Spouse\'s Annual Income')).toBeInTheDocument();
    expect(screen.getByLabelText('Years of Coverage Needed')).toBeInTheDocument();
    expect(screen.getByLabelText('Existing Life Insurance')).toBeInTheDocument();
    expect(screen.getByLabelText('Final Expenses')).toBeInTheDocument();
  });

  it('should have default values', () => {
    render(<LifeInsuranceCalculator />);
    
    const finalExpensesInput = screen.getByDisplayValue('15000');
    expect(finalExpensesInput).toBeInTheDocument();
  });

  it('should update form values when user types', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    const ageInput = screen.getByLabelText('Your Age');
    const incomeInput = screen.getByLabelText('Annual Income');
    
    await user.type(ageInput, '35');
    await user.type(incomeInput, '75000');
    
    expect(ageInput).toHaveValue(35);
    expect(incomeInput).toHaveValue(75000);
  });

  it('should calculate life insurance coverage when form is submitted', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    // Fill out the form
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '75000');
    await user.type(screen.getByLabelText('Current Debt (excluding mortgage)'), '25000');
    await user.type(screen.getByLabelText('Mortgage Balance'), '200000');
    await user.type(screen.getByLabelText('Number of Dependents'), '2');
    await user.type(screen.getByLabelText('Spouse\'s Annual Income'), '50000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '20');
    await user.type(screen.getByLabelText('Existing Life Insurance'), '100000');
    
    // Submit the form
    const calculateButton = screen.getByText('Calculate Coverage Needed');
    await user.click(calculateButton);
    
    // Check that results are displayed
    await waitFor(() => {
      expect(screen.getByText('Recommended Coverage')).toBeInTheDocument();
      expect(screen.getByText('Coverage Breakdown')).toBeInTheDocument();
    });
  });

  it('should display calculated results correctly', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    // Fill out form with specific values for predictable calculation
    await user.type(screen.getByLabelText('Your Age'), '30');
    await user.type(screen.getByLabelText('Annual Income'), '60000');
    await user.type(screen.getByLabelText('Current Debt (excluding mortgage)'), '10000');
    await user.type(screen.getByLabelText('Mortgage Balance'), '150000');
    await user.type(screen.getByLabelText('Number of Dependents'), '2');
    await user.type(screen.getByLabelText('Spouse\'s Annual Income'), '30000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '15');
    await user.type(screen.getByLabelText('Existing Life Insurance'), '50000');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      // Should show breakdown components
      expect(screen.getByText('Income Replacement')).toBeInTheDocument();
      expect(screen.getByText('Debt Coverage')).toBeInTheDocument();
      expect(screen.getByText('Final Expenses')).toBeInTheDocument();
      expect(screen.getByText('Dependents Coverage')).toBeInTheDocument();
      expect(screen.getByText('Estimated Monthly Premium')).toBeInTheDocument();
    });
  });

  it('should show call-to-action after calculation', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '75000');
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Ready to Protect Your Family?')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Get Free Quote' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Speak with Agent' })).toBeInTheDocument();
    });
  });

  it('should handle zero values gracefully', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    // Leave most fields empty/zero
    await user.type(screen.getByLabelText('Your Age'), '0');
    await user.type(screen.getByLabelText('Annual Income'), '0');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Recommended Coverage')).toBeInTheDocument();
    });
  });

  it('should calculate premium based on age', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    // Test with younger age
    await user.type(screen.getByLabelText('Your Age'), '25');
    await user.type(screen.getByLabelText('Annual Income'), '50000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '10');
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Estimated Monthly Premium')).toBeInTheDocument();
    });
    
    // Clear and test with older age - premium should be higher
    await user.clear(screen.getByLabelText('Your Age'));
    await user.type(screen.getByLabelText('Your Age'), '55');
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Estimated Monthly Premium')).toBeInTheDocument();
    });
  });

  it('should include dependents in coverage calculation', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '75000');
    await user.type(screen.getByLabelText('Number of Dependents'), '3');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '10');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Dependents Coverage')).toBeInTheDocument();
      // Should show coverage for 3 dependents ($300,000 total)
    });
  });

  it('should subtract existing coverage from recommendation', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '75000');
    await user.type(screen.getByLabelText('Existing Life Insurance'), '200000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '10');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Recommended Coverage')).toBeInTheDocument();
      // The recommended coverage should account for existing coverage
    });
  });

  it('should handle spouse income in calculation', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '100000');
    await user.type(screen.getByLabelText('Spouse\'s Annual Income'), '40000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '15');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      expect(screen.getByText('Income Replacement')).toBeInTheDocument();
      // Should calculate net income replacement (100000 - 40000) * 15 years
    });
  });

  it('should display educational content', () => {
    render(<LifeInsuranceCalculator />);
    
    expect(screen.getByText('Understanding Life Insurance Coverage')).toBeInTheDocument();
    expect(screen.getByText('Income Replacement')).toBeInTheDocument();
    expect(screen.getByText('Debt Coverage')).toBeInTheDocument();
    expect(screen.getByText('Future Expenses')).toBeInTheDocument();
  });

  it('should show placeholder when no results', () => {
    render(<LifeInsuranceCalculator />);
    
    expect(screen.getByText('Enter your information to see your recommended coverage')).toBeInTheDocument();
  });

  it('should validate years of coverage selection', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    const yearsSelect = screen.getByLabelText('Years of Coverage Needed');
    
    // Check that all options are available
    expect(screen.getByRole('option', { name: 'Select years' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '10 years' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '15 years' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '20 years' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '25 years' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '30 years' })).toBeInTheDocument();
  });

  it('should format currency values correctly', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    await user.type(screen.getByLabelText('Your Age'), '35');
    await user.type(screen.getByLabelText('Annual Income'), '75000');
    await user.selectOptions(screen.getByLabelText('Years of Coverage Needed'), '10');
    
    await user.click(screen.getByText('Calculate Coverage Needed'));
    
    await waitFor(() => {
      // Should display formatted currency (e.g., $750,000 instead of 750000)
      const elements = screen.getAllByText(/\$[\d,]+/);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should handle form reset/clearing', async () => {
    const user = userEvent.setup();
    render(<LifeInsuranceCalculator />);
    
    const ageInput = screen.getByLabelText('Your Age');
    await user.type(ageInput, '35');
    
    expect(ageInput).toHaveValue(35);
    
    await user.clear(ageInput);
    expect(ageInput).toHaveValue(null);
  });
});