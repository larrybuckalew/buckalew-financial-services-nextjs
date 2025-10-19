'use client';
import { createContext, useState, useContext } from 'react';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            setUser(data.user);
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };
    const logout = async () => {
        setUser(null);
    };
    const register = async (email, password, name) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data = await response.json();
            setUser(data.user);
        }
        catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };
    return (<AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
