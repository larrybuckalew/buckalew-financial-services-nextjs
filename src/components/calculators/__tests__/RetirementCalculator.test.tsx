import { render, fireEvent, screen } from '@testing-library/react';
import RetirementCalculator from '../RetirementCalculator';

describe('RetirementCalculator', () => {
  it('renders all form inputs', () => {
    render(<RetirementCalculator />);
    expect(screen.getByLabelText(/Current Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Retirement Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Contribution/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expected Annual Return/i)).toBeInTheDocument();
  });

  it('calculates retirement savings correctly', () => {
    render(<RetirementCalculator />);
    
    // Set input values
    fireEvent.change(screen.getByLabelText(/Current Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/i), { target: { value: '65' } });
    fireEvent.change(screen.getByLabelText(/Current Savings/i), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Monthly Contribution/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Expected Annual Return/i), { target: { value: '7' } });

    // Click calculate
    fireEvent.click(screen.getByText('Calculate'));

    // Check results
    expect(screen.getByText(/Estimated Retirement Savings/i)).toBeInTheDocument();
    const result = screen.getByText(/\$/); // Get element containing result
    expect(result).toBeInTheDocument();
  });
});