'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (success) {
        router.push('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input 
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input 
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input 
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label 
          htmlFor="confirmPassword" 
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input 
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Confirm your password"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full flex justify-center py-2 px-4 border border-transparent 
            rounded-md shadow-sm text-sm font-medium text-white 
            ${isLoading 
              ? 'bg-primary-light cursor-not-allowed' 
              : 'bg-primary hover:bg-primary-dark'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          `}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </div>

      <div className="text-center">
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-medium text-primary hover:text-primary-dark"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
}
