import { render, screen, fireEvent } from '@testing-library/react';
import PolicyCard from '@/components/PolicyCard';

describe('PolicyCard', () => {
  const mockPolicy = {
    id: '1',
    policyNumber: 'POL123',
    type: 'MEDICARE_ADVANTAGE',
    carrier: 'Blue Cross',
    premium: 150.00,
    startDate: new Date('2024-01-01'),
    status: 'ACTIVE',
    clientId: 'client123'
  };

  it('renders policy information correctly', () => {
    render(<PolicyCard policy={mockPolicy} />);
    
    expect(screen.getByText('POL123')).toBeInTheDocument();
    expect(screen.getByText('Blue Cross')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('handles policy status changes', () => {
    const onStatusChange = jest.fn();
    render(<PolicyCard policy={mockPolicy} onStatusChange={onStatusChange} />);
    
    const statusButton = screen.getByRole('button', { name: /change status/i });
    fireEvent.click(statusButton);
    
    expect(onStatusChange).toHaveBeenCalledWith(mockPolicy.id);
  });
});