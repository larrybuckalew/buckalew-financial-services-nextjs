'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HealthInsuranceConsultation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    coverageType: '',
    familySize: '',
    employmentStatus: '',
    currentCoverage: '',
    specialNeeds: [],
    budget: '',
    questions: '',
    contactPreference: 'phone',
    leadSource: 'health-insurance-page'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will integrate with High Level here
    console.log('Form submitted:', formData);
    router.push('/thank-you');
  };

  const handleSpecialNeedsChange = (value: string) => {
    const currentNeeds = formData.specialNeeds as string[];
    const updatedNeeds = currentNeeds.includes(value)
      ? currentNeeds.filter(item => item !== value)
      : [...currentNeeds, value];
    
    setFormData({...formData, specialNeeds: updatedNeeds});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Schedule Your Health Insurance Consultation
          </h1>
          
          <p className="text-gray-600 mb-8">
            Let us help you find the perfect health insurance coverage for you and your family.
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
                <label className="block text-gray-700 mb-2" htmlFor="coverageType">
                  Type of Coverage Needed
                </label>
                <select
                  id="coverageType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.coverageType}
                  onChange={(e) => setFormData({...formData, coverageType: e.target.value})}
                >
                  <option value="">Select coverage type...</option>
                  <option value="individual">Individual Coverage</option>
                  <option value="family">Family Coverage</option>
                  <option value="dental">Dental Insurance</option>
                  <option value="vision">Vision Insurance</option>
                  <option value="combined">Combined Coverage</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="familySize">
                  Family Size
                </label>
                <select
                  id="familySize"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.familySize}
                  onChange={(e) => setFormData({...formData, familySize: e.target.value})}
                >
                  <option value="">Select family size...</option>
                  <option value="1">Individual</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Special Coverage Needs (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    ['prescriptions', 'Prescription Drug Coverage'],
                    ['dental', 'Dental Coverage'],
                    ['vision', 'Vision Coverage'],
                    ['maternity', 'Maternity Coverage'],
                    ['specialists', 'Specialist Visits']
                  ].map(([value, label]) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={value}
                        checked={formData.specialNeeds.includes(value)}
                        onChange={() => handleSpecialNeedsChange(value)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="budget">
                  Monthly Budget
                </label>
                <select
                  id="budget"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Select budget range...</option>
                  <option value="200">Under $200</option>
                  <option value="400">$200 - $400</option>
                  <option value="600">$400 - $600</option>
                  <option value="800">$600 - $800</option>
                  <option value="1000+">$800+</option>
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
                  placeholder="Any specific questions about health insurance coverage?"
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
              By submitting this form, you agree to be contacted about health insurance 
              options. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}