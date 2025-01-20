import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MortgageCalculator from '../MortgageCalculator';

describe('MortgageCalculator', () => {
  it('renders all form inputs', () => {
    render(<MortgageCalculator />);
    
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/down payment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan term/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid inputs', async () => {
    render(<MortgageCalculator />);
    
    const loanAmount = screen.getByLabelText(/loan amount/i);
    const interestRate = screen.getByLabelText(/interest rate/i);
    
    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '-1000');
    
    await userEvent.clear(interestRate);
    await userEvent.type(interestRate, '35');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/loan amount must be at least/i)).toBeInTheDocument();
      expect(screen.getByText(/interest rate cannot exceed/i)).toBeInTheDocument();
    });
  });

  it('calculates mortgage correctly with valid inputs', async () => {
    render(<MortgageCalculator />);
    
    const loanAmount = screen.getByLabelText(/loan amount/i);
    const downPayment = screen.getByLabelText(/down payment/i);
    const interestRate = screen.getByLabelText(/interest rate/i);
    const loanTerm = screen.getByLabelText(/loan term/i);
    
    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '300000');
    
    await userEvent.clear(downPayment);
    await userEvent.type(downPayment, '60000');
    
    await userEvent.clear(interestRate);
    await userEvent.type(interestRate, '3.5');
    
    await userEvent.clear(loanTerm);
    await userEvent.type(loanTerm, '30');
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
      expect(screen.getByText(/total payment/i)).toBeInTheDocument();
      expect(screen.getByText(/total interest/i)).toBeInTheDocument();
    });
  });

  it('resets form to default values', async () => {
    render(<MortgageCalculator />);
    
    const loanAmount = screen.getByLabelText(/loan amount/i);
    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '500000');
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(loanAmount).toHaveValue(300000);
    });
  });

  it('shows amortization schedule after calculation', async () => {
    render(<MortgageCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/amortization schedule/i)).toBeInTheDocument();
    });
  });
});