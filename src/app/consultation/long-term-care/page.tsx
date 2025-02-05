'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LongTermCareConsultation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    age: '',
    healthStatus: '',
    planningFor: '',
    coverageType: '',
    careNeeds: [],
    timeframe: '',
    budget: '',
    questions: '',
    contactPreference: 'phone',
    leadSource: 'long-term-care-page'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will integrate with High Level here
    console.log('Form submitted:', formData);
    router.push('/thank-you');
  };

  const handleCareNeedsChange = (value: string) => {
    const currentNeeds = formData.careNeeds as string[];
    const updatedNeeds = currentNeeds.includes(value)
      ? currentNeeds.filter(item => item !== value)
      : [...currentNeeds, value];
    
    setFormData({...formData, careNeeds: updatedNeeds});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Schedule Your Long-Term Care Insurance Consultation
          </h1>
          
          <p className="text-gray-600 mb-8">
            Plan for your future care needs with expert guidance on long-term care insurance options.
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

            {/* Coverage Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Coverage Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="planningFor">
                  Planning For
                </label>
                <select
                  id="planningFor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.planningFor}
                  onChange={(e) => setFormData({...formData, planningFor: e.target.value})}
                >
                  <option value="">Select who needs coverage...</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="both">Self and Spouse</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="age">
                  Age of Person Needing Coverage
                </label>
                <select
                  id="age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                >
                  <option value="">Select age range...</option>
                  <option value="under50">Under 50</option>
                  <option value="50-55">50-55</option>
                  <option value="56-60">56-60</option>
                  <option value="61-65">61-65</option>
                  <option value="66-70">66-70</option>
                  <option value="over70">Over 70</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="healthStatus">
                  Current Health Status
                </label>
                <select
                  id="healthStatus"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.healthStatus}
                  onChange={(e) => setFormData({...formData, healthStatus: e.target.value})}
                >
                  <option value="">Select health status...</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Care Needs Planning (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    ['nursing', 'Nursing Home Care'],
                    ['assisted', 'Assisted Living'],
                    ['home', 'In-Home Care'],
                    ['adult', 'Adult Day Care'],
                    ['respite', 'Respite Care']
                  ].map(([value, label]) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={value}
                        checked={formData.careNeeds.includes(value)}
                        onChange={() => handleCareNeedsChange(value)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="timeframe">
                  When Do You Want Coverage to Start?
                </label>
                <select
                  id="timeframe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                >
                  <option value="">Select timeframe...</option>
                  <option value="immediate">As Soon as Possible</option>
                  <option value="6months">Within 6 Months</option>
                  <option value="1year">Within 1 Year</option>
                  <option value="planning">Just Planning Ahead</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="budget">
                  Monthly Budget for Premium
                </label>
                <select
                  id="budget"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Select budget range...</option>
                  <option value="100">Under $100</option>
                  <option value="200">$100 - $200</option>
                  <option value="300">$200 - $300</option>
                  <option value="400">$300 - $400</option>
                  <option value="500+">$400+</option>
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
                  placeholder="Any specific questions about long-term care insurance?"
                ></textarea>
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
              By submitting this form, you agree to be contacted about long-term care insurance 
              options. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}