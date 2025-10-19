'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of the user
interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'GUEST';
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  isAuthenticated: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  isAuthenticated: false
});

// Provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // TODO: Implement actual session check with backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session check failed', error);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual backend authentication
      const mockUser: User = {
        id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email,
        role: email.includes('admin') ? 'ADMIN' : 'USER'
      };

      // Simulate authentication (replace with real API call)
      if (password === 'password123' || password === 'Admin123!') {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const register = async (userData: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      // TODO: Replace with actual backend registration
      const mockUser: User = {
        id: 'newUser' + Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'USER'
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);