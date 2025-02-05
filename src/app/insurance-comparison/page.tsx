'use client';

import { useState } from 'react';
import { PreferencesQuestionnaire } from './components/PreferencesQuestionnaire';
import { PlanRecommendations } from './components/PlanRecommendations';
import { PlanComparisonTable } from './components/PlanComparisonTable';
import { CostComparisonChart } from './components/CostComparisonChart';
import { ProviderSearch } from './components/ProviderSearch';
import { type UserPreferences, type InsurancePlan, recommendPlans } from './services/recommendationEngine';

export default function InsuranceComparison() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<InsurancePlan[]>([]);

  const handlePreferencesComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setStep(2);
  };

  const handlePlanSelect = (plan: InsurancePlan) => {
    setSelectedPlans(current => {
      const exists = current.find(p => p.id === plan.id);
      if (exists) {
        return current.filter(p => p.id !== plan.id);
      }
      return [...current, plan];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {[
              'Your Preferences',
              'View Recommendations',
              'Compare Plans'
            ].map((label, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < step ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${index + 1 <= step ? 'bg-primary text-white' : 'bg-gray-200'}
                `}>
                  {index + 1}
                </div>
                <span className="ml-2 hidden md:inline">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {step === 1 && (
            <PreferencesQuestionnaire onComplete={handlePreferencesComplete} />
          )}

          {step === 2 && preferences && (
            <div className="space-y-8">
              <PlanRecommendations
                recommendations={recommendPlans(preferences, [])} // Add your plans data
                onPlanSelect={handlePlanSelect}
              />
              {selectedPlans.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => setStep(3)}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition"
                  >
                    Compare Selected Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 3 && selectedPlans.length > 0 && (
            <div className="space-y-8">
              <PlanComparisonTable 
                plans={selectedPlans}
                onPlanSelect={handlePlanSelect}
              />
              <CostComparisonChart
                plans={selectedPlans}
                expectedVisits={6}
                expectedPrescriptions={2}
              />
              <ProviderSearch plan={selectedPlans[0]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}