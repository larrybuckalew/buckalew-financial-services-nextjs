'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicareConsultation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    age: '',
    enrollmentStatus: '',
    coverageInterest: [],
    currentCoverage: '',
    questions: '',
    contactPreference: 'phone',
    leadSource: 'medicare-page'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will integrate with High Level here
    console.log('Form submitted:', formData);
    router.push('/thank-you');
  };

  const handleCoverageInterestChange = (value: string) => {
    const currentInterests = formData.coverageInterest as string[];
    const updatedInterests = currentInterests.includes(value)
      ? currentInterests.filter(item => item !== value)
      : [...currentInterests, value];
    
    setFormData({...formData, coverageInterest: updatedInterests});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Schedule Your Medicare Insurance Consultation
          </h1>
          
          <p className="text-gray-600 mb-8">
            Get expert guidance on Medicare options and find the right coverage for your needs.
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

            {/* Medicare Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Medicare Information</h2>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="age">
                  Your Age
                </label>
                <select
                  id="age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                >
                  <option value="">Select age range...</option>
                  <option value="under64">Under 64</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="over65">Over 65</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="enrollmentStatus">
                  Medicare Enrollment Status
                </label>
                <select
                  id="enrollmentStatus"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.enrollmentStatus}
                  onChange={(e) => setFormData({...formData, enrollmentStatus: e.target.value})}
                >
                  <option value="">Select status...</option>
                  <option value="not-enrolled">Not Yet Enrolled</option>
                  <option value="initial">Initial Enrollment Period</option>
                  <option value="enrolled">Currently Enrolled</option>
                  <option value="changing">Looking to Change Coverage</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Coverage Interest (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    ['advantage', 'Medicare Advantage Plans'],
                    ['supplement', 'Medicare Supplement (Medigap)'],
                    ['partd', 'Prescription Drug Plans (Part D)'],
                    ['dental', 'Dental & Vision Coverage']
                  ].map(([value, label]) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={value}
                        checked={formData.coverageInterest.includes(value)}
                        onChange={() => handleCoverageInterestChange(value)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="currentCoverage">
                  Current Coverage
                </label>
                <select
                  id="currentCoverage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.currentCoverage}
                  onChange={(e) => setFormData({...formData, currentCoverage: e.target.value})}
                >
                  <option value="">Select current coverage...</option>
                  <option value="original">Original Medicare Only</option>
                  <option value="advantage">Medicare Advantage</option>
                  <option value="supplement">Medicare Supplement</option>
                  <option value="none">No Medicare Coverage</option>
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
                  placeholder="Any specific questions about Medicare coverage?"
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
              Schedule Medicare Consultation
            </button>

            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you agree to be contacted about Medicare insurance 
              options. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}