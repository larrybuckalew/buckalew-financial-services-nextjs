import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/app/providers/AuthProvider';

describe('AuthProvider', () => {
  it('provides authentication context', () => {
    let authContext;
    
    function TestComponent() {
      authContext = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(authContext).toHaveProperty('user');
    expect(authContext).toHaveProperty('signIn');
    expect(authContext).toHaveProperty('signOut');
  });

  it('handles sign in', async () => {
    let authContext;
    
    function TestComponent() {
      authContext = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await authContext.signIn({
        email: 'test@example.com',
        password: 'password'
      });
    });

    expect(authContext.user).toBeTruthy();
  });
});