'use client'

import React, { useState } from 'react';
import { z } from 'zod';

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number must be in (XXX) XXX-XXXX format')
});

type FormData = z.infer<typeof formSchema>;

interface GatedContentFormProps {
  guideName: string;
  guideDescription: string;
}

export const GatedContentForm: React.FC<GatedContentFormProps> = ({ 
  guideName,
  guideDescription 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Remove formatting from phone number before sending
      const cleanedPhone = phone.replace(/[^\d]/g, '');
      
      // Submit to Go High Level via our API route
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: cleanedPhone,
          guideRequested: guideName
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to process your request. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center text-secondary">
        <p>Thank you! Download your guide now.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-2 text-primary hover:underline"
        >
          Download Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <button 
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition"
      >
        Get Guide
      </button>
      
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Download: {guideName}
          </h2>
          <p className="text-gray-600 mb-4">{guideDescription}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-primary">
                Full Name
              </label>
              <input 
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-primary">
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-primary">
                Phone Number
              </label>
              <input 
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(___) ___-____"
                maxLength={14}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                required
                pattern="\(\d{3}\)\s\d{3}-\d{4}"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-secondary hover:bg-secondary-dark'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Download Guide'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};