'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext({
    user: null,
    login: async () => false,
    logout: () => { },
    register: async () => false,
    isAuthenticated: false
});

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const storedUser = localStorage.getItem('user');
                
                if (token && storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                }
            }
            catch (error) {
                console.error('Session check failed', error);
                localStorage.removeItem('auth-token');
                localStorage.removeItem('user');
            }
        };
        checkSession();
    }, []);

    const login = async (email, password) => {
        try {
            // Call the actual login API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Login failed:', data.error);
                return false;
            }

            // Store the token and user info
            if (data.token && data.user) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            }

            return false;
        }
        catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        try {
            // Call the actual register API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Registration failed:', data.error);
                return false;
            }

            // Auto-login after registration if token is provided
            if (data.token && data.user) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            }

            return false;
        }
        catch (error) {
            console.error('Registration error:', error);
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
