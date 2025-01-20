import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../signin';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react');

describe('SignIn', () => {
  it('renders sign in form', () => {
    render(<SignIn />);
    
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });
    
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(signIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('displays error message on invalid credentials', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: 'Invalid credentials' });
    
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('handles network errors', async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred during sign in/i)).toBeInTheDocument();
    });
  });
});