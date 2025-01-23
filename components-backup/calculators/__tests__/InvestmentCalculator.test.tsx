import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvestmentCalculator from '../InvestmentCalculator';

describe('InvestmentCalculator', () => {
  it('renders all form inputs', () => {
    render(<InvestmentCalculator />);
    
    expect(screen.getByLabelText(/initial investment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/investment length/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid inputs', async () => {
    render(<InvestmentCalculator />);
    
    const initialInvestment = screen.getByLabelText(/initial investment/i);
    const annualReturn = screen.getByLabelText(/annual return/i);
    
    await userEvent.clear(initialInvestment);
    await userEvent.type(initialInvestment, '-5000');
    
    await userEvent.clear(annualReturn);
    await userEvent.type(annualReturn, '150');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/initial investment cannot be negative/i)).toBeInTheDocument();
      expect(screen.getByText(/annual return cannot exceed 100%/i)).toBeInTheDocument();
    });
  });

  it('calculates investment growth correctly with valid inputs', async () => {
    render(<InvestmentCalculator />);
    
    const initialInvestment = screen.getByLabelText(/initial investment/i);
    const monthlyContribution = screen.getByLabelText(/monthly contribution/i);
    const annualReturn = screen.getByLabelText(/annual return/i);
    const investmentLength = screen.getByLabelText(/investment length/i);
    
    await userEvent.clear(initialInvestment);
    await userEvent.type(initialInvestment, '10000');
    
    await userEvent.clear(monthlyContribution);
    await userEvent.type(monthlyContribution, '500');
    
    await userEvent.clear(annualReturn);
    await userEvent.type(annualReturn, '7');
    
    await userEvent.clear(investmentLength);
    await userEvent.type(investmentLength, '30');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/final balance/i)).toBeInTheDocument();
      expect(screen.getByText(/total contributions/i)).toBeInTheDocument();
      expect(screen.getByText(/total earnings/i)).toBeInTheDocument();
    });
  });

  it('resets form to default values', async () => {
    render(<InvestmentCalculator />);
    
    const initialInvestment = screen.getByLabelText(/initial investment/i);
    await userEvent.clear(initialInvestment);
    await userEvent.type(initialInvestment, '50000');
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(initialInvestment).toHaveValue(10000);
    });
  });

  it('shows investment projection chart after calculation', async () => {
    render(<InvestmentCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/growth projection/i)).toBeInTheDocument();
    });
  });
});