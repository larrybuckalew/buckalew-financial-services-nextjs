import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RetirementCalculator from '../RetirementCalculator';

describe('RetirementCalculator', () => {
  it('renders all form inputs', () => {
    render(<RetirementCalculator />);
    
    expect(screen.getByLabelText(/current age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/desired.*income/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid inputs', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    const retirementAge = screen.getByLabelText(/retirement age/i);
    
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '15');
    
    await userEvent.clear(retirementAge);
    await userEvent.type(retirementAge, '110');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/current age must be at least 18/i)).toBeInTheDocument();
      expect(screen.getByText(/retirement age cannot exceed 100/i)).toBeInTheDocument();
    });
  });

  it('calculates retirement projections correctly with valid inputs', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    const retirementAge = screen.getByLabelText(/retirement age/i);
    const currentSavings = screen.getByLabelText(/current savings/i);
    const monthlyContribution = screen.getByLabelText(/monthly contribution/i);
    const annualReturn = screen.getByLabelText(/annual return/i);
    const desiredIncome = screen.getByLabelText(/desired.*income/i);
    
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '30');
    
    await userEvent.clear(retirementAge);
    await userEvent.type(retirementAge, '65');
    
    await userEvent.clear(currentSavings);
    await userEvent.type(currentSavings, '50000');
    
    await userEvent.clear(monthlyContribution);
    await userEvent.type(monthlyContribution, '1000');
    
    await userEvent.clear(annualReturn);
    await userEvent.type(annualReturn, '7');
    
    await userEvent.clear(desiredIncome);
    await userEvent.type(desiredIncome, '5000');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/savings at retirement/i)).toBeInTheDocument();
      expect(screen.getByText(/monthly income/i)).toBeInTheDocument();
      expect(screen.getByText(/savings gap/i)).toBeInTheDocument();
      expect(screen.getByText(/additional monthly savings needed/i)).toBeInTheDocument();
    });
  });

  it('resets form to default values', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '40');
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(currentAge).toHaveValue(30);
    });
  });

  it('shows retirement projection chart after calculation', async () => {
    render(<RetirementCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/projected savings growth/i)).toBeInTheDocument();
    });
  });

  it('validates age relationship', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    const retirementAge = screen.getByLabelText(/retirement age/i);
    
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '65');
    
    await userEvent.clear(retirementAge);
    await userEvent.type(retirementAge, '60');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/retirement age must be greater than current age/i)).toBeInTheDocument();
    });
  });
});