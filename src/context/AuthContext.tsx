import { config } from '@/config';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { handleApiError } from '@/utils/errorHandler';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// ... rest of the existing AuthContext code with error handling integrated

  async function login(email: string, password: string) {
    try {
      const res = await fetch(`${config.api.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
      router.push('/dashboard');
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
