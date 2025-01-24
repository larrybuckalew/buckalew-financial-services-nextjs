import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Dashboard from '@/pages/dashboard';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com'
        }
      },
      status: 'authenticated'
    });
  });

  it('renders dashboard for authenticated users', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Welcome, Test User/i)).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-main')).toBeInTheDocument();
    });
  });

  it('displays financial calculators', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mortgage-calculator')).toBeInTheDocument();
      expect(screen.getByTestId('investment-calculator')).toBeInTheDocument();
      expect(screen.getByTestId('retirement-calculator')).toBeInTheDocument();
    });
  });
});
