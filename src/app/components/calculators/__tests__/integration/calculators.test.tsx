import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RetirementCalculator from '../../RetirementCalculator';
import MortgageCalculator from '../../MortgageCalculator';

describe('Financial Calculators Integration', () => {
  describe('Data Persistence', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('saves calculator state to local storage', async () => {
      render(<RetirementCalculator />);

      const currentAge = screen.getByLabelText(/current age/i);
      await userEvent.clear(currentAge);
      await userEvent.type(currentAge, '35');

      // Wait for local storage to be updated
      await waitFor(() => {
        const savedState = JSON.parse(localStorage.getItem('retirementCalculator') || '{}');
        expect(savedState.currentAge).toBe(35);
      });
    });

    it('loads saved state from local storage', () => {
      localStorage.setItem('retirementCalculator', JSON.stringify({
        currentAge: 35,
        retirementAge: 65,
        currentSavings: 100000
      }));

      render(<RetirementCalculator />);

      expect(screen.getByLabelText(/current age/i)).toHaveValue(35);
      expect(screen.getByLabelText(/retirement age/i)).toHaveValue(65);
      expect(screen.getByLabelText(/current savings/i)).toHaveValue(100000);
    });
  });

  describe('Cross-Calculator Integration', () => {
    it('shares data between retirement and mortgage calculators', async () => {
      const { rerender } = render(<RetirementCalculator />);

      // Set monthly contribution in retirement calculator
      const monthlyContribution = screen.getByLabelText(/monthly contribution/i);
      await userEvent.clear(monthlyContribution);
      await userEvent.type(monthlyContribution, '2000');

      // Switch to mortgage calculator
      rerender(<MortgageCalculator />);

      // Verify monthly payment is considered in affordability calculation
      const loanAmount = screen.getByLabelText(/loan amount/i);
      await userEvent.clear(loanAmount);
      await userEvent.type(loanAmount, '500000');

      expect(screen.getByText(/affordability analysis/i)).toBeInTheDocument();
      expect(screen.getByText(/based on your retirement savings/i)).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('fetches current interest rates', async () => {
      const mockRates = {
        mortgage: 3.5,
        savings: 2.0
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRates
      });

      render(<MortgageCalculator />);

      await waitFor(() => {
        expect(screen.getByText(/current market rate: 3.5%/i)).toBeInTheDocument();
      });
    });

    it('handles API errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      render(<MortgageCalculator />);

      await waitFor(() => {
        expect(screen.getByText(/unable to fetch current rates/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation Integration', () => {
    it('validates across multiple fields', async () => {
      render(<RetirementCalculator />);

      // Set invalid combination of values
      await userEvent.clear(screen.getByLabelText(/current age/i));
      await userEvent.type(screen.getByLabelText(/current age/i), '30');

      await userEvent.clear(screen.getByLabelText(/retirement age/i));
      await userEvent.type(screen.getByLabelText(/retirement age/i), '40');

      await userEvent.clear(screen.getByLabelText(/current savings/i));
      await userEvent.type(screen.getByLabelText(/current savings/i), '1000000');

      await userEvent.clear(screen.getByLabelText(/monthly contribution/i));
      await userEvent.type(screen.getByLabelText(/monthly contribution/i), '100');

      // Expect multiple validation messages
      expect(screen.getByText(/retirement age too early/i)).toBeInTheDocument();
      expect(screen.getByText(/consider increasing contributions/i)).toBeInTheDocument();
    });
  });

  describe('Calculation History', () => {
    it('maintains history of calculations', async () => {
      render(<RetirementCalculator />);

      // Perform first calculation
      await userEvent.clear(screen.getByLabelText(/current savings/i));
      await userEvent.type(screen.getByLabelText(/current savings/i), '50000');
      fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

      // Perform second calculation
      await userEvent.clear(screen.getByLabelText(/current savings/i));
      await userEvent.type(screen.getByLabelText(/current savings/i), '100000');
      fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

      // Check history
      fireEvent.click(screen.getByRole('button', { name: /show history/i }));
      
      const historyItems = screen.getAllByTestId('history-item');
      expect(historyItems).toHaveLength(2);
    });
  });

  describe('PDF Generation Integration', () => {
    it('generates PDF with correct data', async () => {
      const mockPdfBlob = new Blob(['fake pdf content'], { type: 'application/pdf' });
      global.URL.createObjectURL = jest.fn(() => 'fake-url');

      render(<RetirementCalculator />);

      await userEvent.clear(screen.getByLabelText(/current savings/i));
      await userEvent.type(screen.getByLabelText(/current savings/i), '100000');

      const downloadButton = screen.getByRole('button', { name: /download pdf/i });
      fireEvent.click(downloadButton);

      await waitFor(() => {
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      });
    });
  });

  describe('Chart Integration', () => {
    it('updates charts based on input changes', async () => {
      render(<RetirementCalculator />);

      const currentSavings = screen.getByLabelText(/current savings/i);
      await userEvent.clear(currentSavings);
      await userEvent.type(currentSavings, '200000');

      // Wait for chart update
      await waitFor(() => {
        const chart = screen.getByTestId('retirement-chart');
        expect(chart).toHaveAttribute('data-updated', 'true');
      });
    });
  });
});