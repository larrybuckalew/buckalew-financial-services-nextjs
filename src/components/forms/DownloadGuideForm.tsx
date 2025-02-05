'use client';

import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Life Insurance Guides
import { UnderstandingLifeInsuranceGuide } from '@/components/pdf-templates/resources/life-insurance/UnderstandingLifeInsurance';
import { ChoosingRightPolicyGuide } from '@/components/pdf-templates/resources/life-insurance/ChoosingRightPolicy';
import { WhyStartEarlyGuide } from '@/components/pdf-templates/resources/life-insurance/WhyStartEarly';

// Health Insurance Guides
import { NavigatingHealthInsuranceGuide } from '@/components/pdf-templates/resources/health-insurance/NavigatingHealthInsurance';
import { PreventiveCareGuide } from '@/components/pdf-templates/resources/health-insurance/PreventiveCare';
import { HMOvsPPOGuide } from '@/components/pdf-templates/resources/health-insurance/HMOvsPPO';

// Medicare Guides
import { Medicare101Guide } from '@/components/pdf-templates/resources/medicare/Medicare101';
import { WhenToEnrollGuide } from '@/components/pdf-templates/resources/medicare/WhenToEnroll';
import { SupplementingMedicareGuide } from '@/components/pdf-templates/resources/medicare/SupplementingMedicare';

const pdfTemplates = {
  'Understanding Life Insurance Guide': UnderstandingLifeInsuranceGuide,
  'Choosing the Right Policy Guide': ChoosingRightPolicyGuide,
  'Why Start Early with Life Insurance?': WhyStartEarlyGuide,
  'Navigating Health Insurance Guide': NavigatingHealthInsuranceGuide,
  'Preventive Care Guide': PreventiveCareGuide,
  'HMO vs. PPO: What\'s the Difference?': HMOvsPPOGuide,
  'Medicare Basics Guide': Medicare101Guide,
  'Medicare Enrollment Guide': WhenToEnrollGuide,
  'Medicare Supplement Guide': SupplementingMedicareGuide
};

interface DownloadGuideFormProps {
  guideName: string;
  guideDescription: string;
}

const DownloadGuideForm: React.FC<DownloadGuideFormProps> = ({ 
  guideName, 
  guideDescription 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const PDFComponent = pdfTemplates[guideName];

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
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
          Thank you for downloading!
        </h3>
        <PDFDownloadLink 
          document={<PDFComponent />} 
          fileName={`${guideName}.pdf`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4 inline-block"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
        </PDFDownloadLink>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Check your email for more insurance tips and resources.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{guideName}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{guideDescription}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(___) ___-____"
            maxLength={14}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
            pattern="\(\d{3}\)\s\d{3}-\d{4}"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Download Guide'}
        </button>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        By downloading this guide, you agree to receive insurance-related emails and calls from us. 
        You can unsubscribe at any time. Contact us at 844-779-7600 for support.
      </p>
    </div>
  );
};

export default DownloadGuideForm;