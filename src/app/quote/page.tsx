'use client';

import React, { useState } from 'react';
import { generateQuotePDF } from '@/services/pdfService';

type InsuranceType = 'life' | 'health' | 'dental' | 'vision';

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [insuranceType, setInsuranceType] = useState<InsuranceType | ''>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate PDF
      const pdfBuffer = await generateQuotePDF(formData);
      
      // Create blob from buffer
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `insurance-quote-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Move to next step
      setStep(prev => prev + 1);
    } catch (error) {
      console.error('Error generating quote:', error);
      alert('There was an error generating your quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const insuranceOptions: { type: InsuranceType; title: string; description: string }[] = [
    {
      type: 'life',
      title: 'Life Insurance',
      description: 'Protect your family\'s financial future'
    },
    {
      type: 'health',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family'
    },
    {
      type: 'dental',
      title: 'Dental Insurance',
      description: 'Coverage for dental procedures and routine care'
    },
    {
      type: 'vision',
      title: 'Vision Insurance',
      description: 'Coverage for eye exams and vision care'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Get Your Free Quote</h1>
        
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            {insuranceOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  setInsuranceType(option.type);
                  setStep(2);
                }}
                className={`p-6 text-left border rounded-lg ${
                  insuranceType === option.type 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-primary/50'
                } transition-colors`}
              >
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  pattern="[0-9]{5}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-primary-dark"
                disabled={loading}
              >
                ← Back
              </button>
              <button
                type="submit"
                className={`bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Generating Quote...' : 'Get Quote'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your quote has been generated and downloaded. Please check your downloads folder.
            </p>
            <p className="text-gray-600 mb-6">
              We've also sent a copy to your email at {formData.email}
            </p>
            <button
              onClick={() => setStep(1)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Generate Another Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}