'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TermLifeConsultation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    coverageAmount: '',
    currentHealth: '',
    questions: '',
    contactPreference: 'phone',
    leadSource: 'term-life-page'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Redirect to thank you page
    router.push('/thank-you');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Schedule Your Term Life Insurance Consultation
          </h1>
          
          <p className="text-gray-600 mb-8">
            Complete the form below to schedule a personalized consultation with our 
            term life insurance expert. We'll help you find the right coverage for 
            your needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Contact Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="preferredTime">
                  Best Time to Contact
                </label>
                <select
                  id="preferredTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                >
                  <option value="">Select a time...</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 6PM)</option>
                </select>
              </div>
            </div>

            {/* Insurance Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Coverage Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="coverageAmount">
                  Desired Coverage Amount
                </label>
                <select
                  id="coverageAmount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.coverageAmount}
                  onChange={(e) => setFormData({...formData, coverageAmount: e.target.value})}
                >
                  <option value="">Select coverage amount...</option>
                  <option value="100000">$100,000</option>
                  <option value="250000">$250,000</option>
                  <option value="500000">$500,000</option>
                  <option value="1000000">$1,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="currentHealth">
                  Current Health Status
                </label>
                <select
                  id="currentHealth"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.currentHealth}
                  onChange={(e) => setFormData({...formData, currentHealth: e.target.value})}
                >
                  <option value="">Select health status...</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="questions">
                  Questions or Concerns
                </label>
                <textarea
                  id="questions"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.questions}
                  onChange={(e) => setFormData({...formData, questions: e.target.value})}
                  placeholder="Any specific questions about term life insurance?"
                ></textarea>
              </div>
            </div>

            {/* Contact Preference */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Contact Preference</h2>
              
              <div className="space-y-2">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="phone"
                      checked={formData.contactPreference === 'phone'}
                      onChange={(e) => setFormData({...formData, contactPreference: e.target.value})}
                      className="mr-2"
                    />
                    Phone Call
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={(e) => setFormData({...formData, contactPreference: e.target.value})}
                      className="mr-2"
                    />
                    Email
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors"
            >
              Schedule Consultation
            </button>

            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you agree to be contacted about term life insurance 
              services. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}