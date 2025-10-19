import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DebtPayoffCalculator from '../DebtPayoffCalculator';

// Mock the recharts library since it doesn't work well in Jest
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe('DebtPayoffCalculator', () => {
  const fillDebtForm = async (
    name: string,
    balance: number,
    interestRate: number,
    minimumPayment: number
  ) => {
    await userEvent.type(screen.getByLabelText(/name/i), name);
    await userEvent.type(screen.getByLabelText(/balance/i), balance.toString());
    await userEvent.type(screen.getByLabelText(/interest rate/i), interestRate.toString());
    await userEvent.type(screen.getByLabelText(/min payment/i), minimumPayment.toString());
  };

  beforeEach(() => {
    render(<DebtPayoffCalculator />);
  });

  it('renders the calculator form', () => {
    expect(screen.getByText(/debt payoff calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/balance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min payment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add debt/i })).toBeInTheDocument();
  });

  it('allows adding a new debt', async () => {
    await fillDebtForm('Credit Card', 5000, 18.99, 100);
    
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('18.99%')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('allows removing a debt', async () => {
    await fillDebtForm('Credit Card', 5000, 18.99, 100);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('Credit Card')).not.toBeInTheDocument();
  });

  it('calculates payoff strategies when clicking calculate', async () => {
    await fillDebtForm('Credit Card', 5000, 18.99, 100);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    await fillDebtForm('Personal Loan', 10000, 12.99, 200);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    // Set monthly payment
    const monthlyPaymentInput = screen.getByRole('spinbutton', { name: /monthly payment/i });
    await userEvent.clear(monthlyPaymentInput);
    await userEvent.type(monthlyPaymentInput, '500');
    
    fireEvent.click(screen.getByRole('button', { name: /calculate strategies/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/avalanche method/i)).toBeInTheDocument();
      expect(screen.getByText(/snowball method/i)).toBeInTheDocument();
    });
  });

  it('validates input before adding debt', async () => {
    // Try to add debt with no name
    await fillDebtForm('', 5000, 18.99, 100);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    expect(screen.queryByText('$5,000.00')).not.toBeInTheDocument();
    
    // Try to add debt with negative balance
    await fillDebtForm('Credit Card', -5000, 18.99, 100);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    expect(screen.queryByText('Credit Card')).not.toBeInTheDocument();
  });

  it('updates total calculations when debt list changes', async () => {
    // Add first debt
    await fillDebtForm('Credit Card', 5000, 18.99, 100);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    // Calculate with one debt
    const monthlyPaymentInput = screen.getByRole('spinbutton', { name: /monthly payment/i });
    await userEvent.clear(monthlyPaymentInput);
    await userEvent.type(monthlyPaymentInput, '500');
    
    fireEvent.click(screen.getByRole('button', { name: /calculate strategies/i }));
    
    const firstTotalInterest = screen.getByText(/total interest/i).nextSibling?.textContent;
    
    // Add second debt
    await fillDebtForm('Personal Loan', 10000, 12.99, 200);
    fireEvent.click(screen.getByRole('button', { name: /add debt/i }));
    
    // Recalculate
    fireEvent.click(screen.getByRole('button', { name: /calculate strategies/i }));
    
    const secondTotalInterest = screen.getByText(/total interest/i).nextSibling?.textContent;
    
    expect(firstTotalInterest).not.toBe(secondTotalInterest);
  });
});