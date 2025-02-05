'use client';

import { useState } from 'react';
import { InsurancePlan, PlanScore } from '../services/recommendationEngine';

interface PlanRecommendationsProps {
  recommendations: PlanScore[];
  onPlanSelect?: (plan: InsurancePlan) => void;
  isLoading?: boolean;
}

export function PlanRecommendations({
  recommendations,
  onPlanSelect,
  isLoading = false
}: PlanRecommendationsProps) {
  const [selectedPlanIds, setSelectedPlanIds] = useState<Set<string>>(new Set());

  const handlePlanSelect = (plan: InsurancePlan) => {
    const newSelected = new Set(selectedPlanIds);
    if (newSelected.has(plan.id)) {
      newSelected.delete(plan.id);
    } else {
      newSelected.add(plan.id);
    }
    setSelectedPlanIds(newSelected);
    onPlanSelect?.(plan);
  };

  if (isLoading) {
    return (
      <div className="space-y-6" role="alert" aria-busy="true">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3 text-right">
                <div className="h-6 w-24 bg-gray-200 rounded ml-auto"></div>
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 text-center"
        role="alert"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Matching Plans Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your preferences to see more plan options.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="space-y-6" 
      role="region" 
      aria-label="Plan Recommendations"
    >
      {recommendations.map(({ plan, score, matchingFactors, concerns, matchPercentage }) => (
        <div
          key={plan.id}
          className={`
            bg-white rounded-lg shadow-md overflow-hidden transition-shadow
            ${selectedPlanIds.has(plan.id) ? 'ring-2 ring-primary' : ''}
          `}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              {/* Plan Details */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600">{plan.provider}</p>
                
                {/* Match Score */}
                <div 
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2
                    ${matchPercentage >= 80 ? 'bg-green-100 text-green-800' :
                      matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}
                  `}
                  role="status"
                >
                  {matchPercentage}% Match
                </div>
              </div>

              {/* Price and Action */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${plan.monthlyPremium}
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`
                    mt-2 px-6 py-2 rounded-lg transition-colors
                    ${selectedPlanIds.has(plan.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-primary hover:bg-primary-dark text-white'}
                  `}
                  aria-pressed={selectedPlanIds.has(plan.id)}
                >
                  {selectedPlanIds.has(plan.id) ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>

            {/* Matching Factors and Concerns */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {matchingFactors.length > 0 && (
                <div role="list" aria-label="Plan Advantages">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Plan Advantages
                  </h4>
                  <ul className="space-y-1">
                    {matchingFactors.map((factor, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-green-600"
                      >
                        <span 
                          className="mr-2"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {concerns.length > 0 && (
                <div role="list" aria-label="Potential Concerns">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Considerations
                  </h4>
                  <ul className="space-y-1">
                    {concerns.map((concern, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-amber-600"
                      >
                        <span 
                          className="mr-2"
                          aria-hidden="true"
                        >
                          ⚠
                        </span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Plan Features */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Key Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Deductible</div>
                  <div className="font-medium">${plan.annualDeductible}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Out of Pocket Max</div>
                  <div className="font-medium">${plan.outOfPocketMax}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Network Size</div>
                  <div className="font-medium">{plan.networkSize}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Prescription Coverage</div>
                  <div className="font-medium">
                    From ${plan.prescriptionCoverage.generic}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}