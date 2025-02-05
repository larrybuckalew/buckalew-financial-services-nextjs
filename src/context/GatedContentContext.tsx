'use client'

import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

// Types for Gated Content Form Data
type GatedContentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredContactMethod: 'email' | 'phone' | 'both';
  interestedIn: string[];
  pdfTitle: string;
};

// Context Type
type GatedContentContextType = {
  submitGatedContent: (data: GatedContentFormData) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
};

// Create Context
const GatedContentContext = createContext<GatedContentContextType | undefined>(undefined);

// Provider Component
export const GatedContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitGatedContent = useCallback(async (data: GatedContentFormData): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/gated-content', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Optional: Add any additional logic after successful submission
        return true;
      } else {
        setError(response.data.message || 'An unexpected error occurred');
        return false;
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Network error occurred'
        : 'An unexpected error occurred';
      
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <GatedContentContext.Provider value={{ 
      submitGatedContent, 
      isSubmitting, 
      error 
    }}>
      {children}
    </GatedContentContext.Provider>
  );
};

// Custom Hook
export const useGatedContent = () => {
  const context = useContext(GatedContentContext);
  
  if (context === undefined) {
    throw new Error('useGatedContent must be used within a GatedContentProvider');
  }
  
  return context;
};
