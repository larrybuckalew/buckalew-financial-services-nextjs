'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';

// Form Validation Schema
const QuoteFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone number must be in (XXX) XXX-XXXX format'),
  insuranceType: z.enum([
    'medicare', 
    'life', 
    'health', 
    'financial-planning'
  ], { 
    errorMap: () => ({ message: 'Please select a valid insurance type' }) 
  }),
  additionalDetails: z.string().optional(),
  smsConsent: z.boolean(),
  privacyConsent: z.boolean()
});

type QuoteFormData = z.infer<typeof QuoteFormSchema>;

export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceType: '' as QuoteFormData['insuranceType'],
    additionalDetails: '',
    smsConsent: false,
    privacyConsent: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'phone'
          ? formatPhoneNumber(value)
          : value
    }));

    // Clear error when user starts typing
    if (errors[id as keyof QuoteFormData]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setErrors({});

    try {
      const validatedData = QuoteFormSchema.parse(formData);
      
      // Simulated server submission
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          insuranceType: '' as QuoteFormData['insuranceType'],
          additionalDetails: '',
          smsConsent: false,
          privacyConsent: false
        });
      } else {
        setSubmissionStatus('error');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMap = err.flatten().fieldErrors;
        const formattedErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        
        (Object.keys(errorMap) as Array<keyof QuoteFormData>).forEach(key => {
          formattedErrors[key] = errorMap[key]?.[0];
        });

        setErrors(formattedErrors);
      }
      setSubmissionStatus('error');
    }
  };

  const insuranceTypes = [
    { value: 'medicare', label: 'Medicare Insurance' },
    { value: 'life', label: 'Life Insurance' },
    { value: 'health', label: 'Health Insurance' },
    { value: 'financial-planning', label: 'Financial Planning' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-gray-700">
            First Name *
          </label>
          <input 
            type="text" 
            id="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
              ${errors.firstName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'focus:ring-2 focus:ring-primary border-gray-300'
              }`}
            placeholder="John"
            required
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
          />
          {errors.firstName && (
            <p 
              id="firstName-error" 
              className="text-red-500 text-sm mt-1"
            >
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-2 text-gray-700">
            Last Name *
          </label>
          <input 
            type="text" 
            id="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
              ${errors.lastName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'focus:ring-2 focus:ring-primary border-gray-300'
              }`}
            placeholder="Doe"
            required
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
          />
          {errors.lastName && (
            <p 
              id="lastName-error" 
              className="text-red-500 text-sm mt-1"
            >
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email Address *
          </label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
              ${errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'focus:ring-2 focus:ring-primary border-gray-300'
              }`}
            placeholder="john@example.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p 
              id="email-error" 
              className="text-red-500 text-sm mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-gray-700">
            Phone Number *
          </label>
          <input 
            type="tel" 
            id="phone" 
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
              ${errors.phone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'focus:ring-2 focus:ring-primary border-gray-300'
              }`}
            placeholder="(555) 123-4567"
            required
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <p 
              id="phone-error" 
              className="text-red-500 text-sm mt-1"
            >
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="insuranceType" className="block mb-2 text-gray-700">
          Type of Insurance *
        </label>
        <select 
          id="insuranceType" 
          value={formData.insuranceType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
            ${errors.insuranceType 
              ? 'border-red-500 focus:ring-red-500' 
              : 'focus:ring-2 focus:ring-primary border-gray-300'
            }`}
          required
          aria-invalid={!!errors.insuranceType}
          aria-describedby="insuranceType-error"
        >
          <option value="">Select Insurance Type</option>
          {insuranceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.insuranceType && (
          <p 
            id="insuranceType-error" 
            className="text-red-500 text-sm mt-1"
          >
            {errors.insuranceType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="additionalDetails" className="block mb-2 text-gray-700">
          Additional Details
        </label>
        <textarea 
          id="additionalDetails" 
          value={formData.additionalDetails}
          onChange={handleChange}
          rows={4} 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Provide any additional information that will help us create a personalized quote..."
        ></textarea>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="smsConsent" 
            checked={formData.smsConsent}
            onChange={handleChange}
            className="mr-2 mt-1"
            required 
            aria-describedby="smsConsent-description"
          />
          <label 
            htmlFor="smsConsent" 
            className="text-sm text-gray-700"
            id="smsConsent-description"
          >
            I consent to receive automated marketing text messages at the phone number provided. 
            Consent is not a condition of purchase. Message and data rates may apply. 
            Message frequency varies. Reply HELP for help or STOP to cancel.
          </label>
        </div>
        
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="privacyConsent" 
            checked={formData.privacyConsent}
            onChange={handleChange}
            className="mr-2 mt-1"
            required 
            aria-describedby="privacyConsent-description"
          />
          <label 
            htmlFor="privacyConsent" 
            className="text-sm text-gray-700"
            id="privacyConsent-description"
          >
            I agree to the{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            and authorize Buckalew Financial Services to contact me via phone, email, 
            or text message about its products and services.
          </label>
        </div>
      </div>

      <div className="text-center">
        <button 
          type="submit" 
          disabled={submissionStatus === 'submitting'}
          className={`
            bg-primary text-white px-8 py-3 rounded-lg transition
            ${submissionStatus === 'submitting' 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-primary-dark'
            }
          `}
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Request Quote'}
        </button>

        {submissionStatus === 'success' && (
          <div 
            role="alert" 
            className="mt-4 text-green-600 bg-green-50 p-4 rounded-lg"
          >
            Thank you! We've received your quote request and will contact you soon.
          </div>
        )}

        {submissionStatus === 'error' && (
          <div 
            role="alert" 
            className="mt-4 text-red-600 bg-red-50 p-4 rounded-lg"
          >
            Oops! There was an error submitting your request. Please try again.
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 text-center mt-4">
        By submitting this form, you agree to our communication terms and consent to be contacted.
      </div>
    </form>
  );
}
