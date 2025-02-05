<<<<<<< HEAD
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
=======
import React, { createContext, useState, useContext, ReactNode } from 'react';
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b

interface User {
  id: string;
  name: string;
  email: string;
<<<<<<< HEAD
  role: string;
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
<<<<<<< HEAD
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const cookies = parseCookies();
    const token = cookies['auth-token'];
    
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        });
      } catch (error) {
        console.error('Invalid token:', error);
        destroyCookie(null, 'auth-token');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Make API call to your authentication endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();

      // Set token in cookies
      setCookie(null, 'auth-token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Decode token and set user
      const decoded = jwtDecode<TokenPayload>(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    destroyCookie(null, 'auth-token');
=======

  const login = async (email: string, password: string) => {
    // Implement actual login logic
    setUser({
      id: '1',
      name: 'John Doe',
      email: email
    });
  };

  const logout = () => {
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
    setUser(null);
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isLoading,
        isAuthenticated: !!user 
      }}
    >
=======
    <AuthContext.Provider value={{ user, login, logout }}>
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};