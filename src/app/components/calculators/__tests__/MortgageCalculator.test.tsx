import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    await userEvent.type(interestRate, '101');

    expect(screen.getByText(/loan amount must be positive/i)).toBeInTheDocument();
    expect(screen.getByText(/interest rate must be between 0 and 100/i)).toBeInTheDocument();
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

    const monthlyPayment = screen.getByText(/\$[0-9,]+(\.[0-9]{2})?/);
    expect(monthlyPayment).toBeInTheDocument();

    // Calculate expected monthly payment
    const principal = 300000 - 60000;
    const monthlyRate = 3.5 / 100 / 12;
    const numberOfPayments = 30 * 12;
    const expectedPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const formattedExpected = expectedPayment.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    expect(monthlyPayment).toHaveTextContent(formattedExpected);
  });

  it('resets form to default values', async () => {
    render(<MortgageCalculator />);

    const loanAmount = screen.getByLabelText(/loan amount/i);
    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '400000');

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(loanAmount).toHaveValue(300000); // Default value
  });

  it('handles down payment validation', async () => {
    render(<MortgageCalculator />);

    const loanAmount = screen.getByLabelText(/loan amount/i);
    const downPayment = screen.getByLabelText(/down payment/i);

    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '300000');

    await userEvent.clear(downPayment);
    await userEvent.type(downPayment, '350000');

    expect(screen.getByText(/down payment cannot exceed loan amount/i)).toBeInTheDocument();
  });

  it('updates calculation in real-time', async () => {
    render(<MortgageCalculator />);

    const loanAmount = screen.getByLabelText(/loan amount/i);
    const initialPayment = screen.getByText(/\$[0-9,]+(\.[0-9]{2})?/);
    const initialValue = initialPayment.textContent;

    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '400000');

    const updatedPayment = screen.getByText(/\$[0-9,]+(\.[0-9]{2})?/);
    expect(updatedPayment.textContent).not.toBe(initialValue);
  });

  it('validates loan term range', async () => {
    render(<MortgageCalculator />);

    const loanTerm = screen.getByLabelText(/loan term/i);

    await userEvent.clear(loanTerm);
    await userEvent.type(loanTerm, '0');

    expect(screen.getByText(/loan term must be between 1 and 50 years/i)).toBeInTheDocument();

    await userEvent.clear(loanTerm);
    await userEvent.type(loanTerm, '51');

    expect(screen.getByText(/loan term must be between 1 and 50 years/i)).toBeInTheDocument();
  });

  it('preserves decimal places in interest rate', async () => {
    render(<MortgageCalculator />);

    const interestRate = screen.getByLabelText(/interest rate/i);

    await userEvent.clear(interestRate);
    await userEvent.type(interestRate, '3.75');

    expect(interestRate).toHaveValue(3.75);
  });

  it('formats currency inputs correctly', async () => {
    render(<MortgageCalculator />);

    const loanAmount = screen.getByLabelText(/loan amount/i);
    await userEvent.clear(loanAmount);
    await userEvent.type(loanAmount, '1234567');

    const monthlyPayment = screen.getByText(/\$[0-9,]+(\.[0-9]{2})?/);
    expect(monthlyPayment.textContent).toMatch(/\$[0-9,]+\.[0-9]{2}/);
  });
});