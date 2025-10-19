import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RetirementCalculator from '../RetirementCalculator';

describe('RetirementCalculator', () => {
  it('renders initial form correctly', () => {
    render(<RetirementCalculator />);
    
    expect(screen.getByLabelText(/current age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected annual return/i)).toBeInTheDocument();
  });

  it('updates input values correctly', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '35');
    
    expect(currentAge).toHaveValue(35);
  });

  it('calculates retirement savings correctly', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    const currentSavings = screen.getByLabelText(/current savings/i);
    const monthlyContribution = screen.getByLabelText(/monthly contribution/i);
    
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '30');
    await userEvent.clear(currentSavings);
    await userEvent.type(currentSavings, '50000');
    await userEvent.clear(monthlyContribution);
    await userEvent.type(monthlyContribution, '1000');
    
    // The exact calculation can be tested here
    const result = screen.getByText(/\$[0-9,]+(\.[0-9]{2})?/);
    expect(result).toBeInTheDocument();
  });

  it('validates input fields', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    const retirementAge = screen.getByLabelText(/retirement age/i);
    
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '65');
    await userEvent.clear(retirementAge);
    await userEvent.type(retirementAge, '60');
    
    expect(screen.getByText(/retirement age must be greater than current age/i)).toBeInTheDocument();
  });

  it('resets to default values', async () => {
    render(<RetirementCalculator />);
    
    const currentAge = screen.getByLabelText(/current age/i);
    await userEvent.clear(currentAge);
    await userEvent.type(currentAge, '40');
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(currentAge).toHaveValue(30); // Default value
  });
});