'use client';

import { useState } from 'react';

interface UserPreferences {
  monthlyBudget: number;
  prescriptionNeeds: 'low' | 'medium' | 'high';
  preferredProviders: string[];
  preExistingConditions: boolean;
  primaryCareFrequency: 'rarely' | 'occasionally' | 'frequently';
  specialistNeeds: boolean;
  familyCoverage: boolean;
  preferredHospitals: string[];
}

interface PreferencesQuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function PreferencesQuestionnaire({ onComplete }: PreferencesQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    monthlyBudget: 0,
    prescriptionNeeds: 'low',
    preferredProviders: [],
    preExistingConditions: false,
    primaryCareFrequency: 'occasionally',
    specialistNeeds: false,
    familyCoverage: false,
    preferredHospitals: []
  });

  const handleInputChange = (field: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(preferences);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'}
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Budget for Insurance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={preferences.monthlyBudget}
                  onChange={(e) => handleInputChange('monthlyBudget', Number(e.target.value))}
                  className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you need family coverage?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleInputChange('familyCoverage', true)}
                  className={`px-4 py-2 rounded-lg ${
                    preferences.familyCoverage
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleInputChange('familyCoverage', false)}
                  className={`px-4 py-2 rounded-lg ${
                    !preferences.familyCoverage
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Healthcare Needs</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescription Medication Needs
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleInputChange('prescriptionNeeds', level)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      preferences.prescriptionNeeds === level
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How often do you visit primary care?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['rarely', 'occasionally', 'frequently'].map((frequency) => (
                  <button
                    key={frequency}
                    onClick={() => handleInputChange('primaryCareFrequency', frequency)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      preferences.primaryCareFrequency === frequency
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {frequency}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Medical History</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have any pre-existing conditions?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleInputChange('preExistingConditions', true)}
                  className={`px-4 py-2 rounded-lg ${
                    preferences.preExistingConditions
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleInputChange('preExistingConditions', false)}
                  className={`px-4 py-2 rounded-lg ${
                    !preferences.preExistingConditions
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you need specialist care?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => handleInputChange('specialistNeeds', true)}
                  className={`px-4 py-2 rounded-lg ${
                    preferences.specialistNeeds
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleInputChange('specialistNeeds', false)}
                  className={`px-4 py-2 rounded-lg ${
                    !preferences.specialistNeeds
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Provider Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Healthcare Providers
              </label>
              <input
                type="text"
                placeholder="Enter provider names (comma-separated)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                onChange={(e) => handleInputChange(
                  'preferredProviders',
                  e.target.value.split(',').map(p => p.trim())
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Hospitals
              </label>
              <input
                type="text"
                placeholder="Enter hospital names (comma-separated)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                onChange={(e) => handleInputChange(
                  'preferredHospitals',
                  e.target.value.split(',').map(h => h.trim())
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
        >
          {currentStep === totalSteps ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}