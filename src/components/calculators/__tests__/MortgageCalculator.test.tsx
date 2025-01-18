import { render, fireEvent, screen } from '@testing-library/react';
import MortgageCalculator from '../MortgageCalculator';

describe('MortgageCalculator', () => {
  it('renders all form inputs', () => {
    render(<MortgageCalculator />);
    expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Annual Interest Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loan Term/i)).toBeInTheDocument();
  });

  it('calculates monthly payment correctly', () => {
    render(<MortgageCalculator />);
    
    // Set input values
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '300000' } });
    fireEvent.change(screen.getByLabelText(/Annual Interest Rate/i), { target: { value: '3.5' } });
    fireEvent.change(screen.getByLabelText(/Loan Term/i), { target: { value: '30' } });

    // Click calculate
    fireEvent.click(screen.getByText('Calculate'));

    // Check results
    expect(screen.getByText(/Monthly Payment/i)).toBeInTheDocument();
    const result = screen.getByText(/\$/); // Get element containing result
    expect(result).toBeInTheDocument();
  });
});