'use client';

import { useState } from 'react';

interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  monthlyPremium: number;
  annualDeductible: number;
  outOfPocketMax: number;
  prescriptionCoverage: {
    generic: number;
    brandName: number;
    specialty: number;
  };
  networkSize: string;
  rating: number;
  features: string[];
}

interface PlanComparisonTableProps {
  plans: InsurancePlan[];
  onPlanSelect?: (plan: InsurancePlan) => void;
}

export function PlanComparisonTable({ plans, onPlanSelect }: PlanComparisonTableProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof InsurancePlan>('monthlyPremium');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof InsurancePlan) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPlans = [...plans].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    }
    
    return 0;
  });

  const handlePlanSelect = (plan: InsurancePlan) => {
    setSelectedPlan(plan.id);
    if (onPlanSelect) {
      onPlanSelect(plan);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Details
            </th>
            {sortedPlans.map((plan) => (
              <th key={plan.id} className="px-6 py-3 text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.provider}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Monthly Premium */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <button
                onClick={() => handleSort('monthlyPremium')}
                className="flex items-center"
              >
                Monthly Premium
                {sortField === 'monthlyPremium' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                <span className="text-lg font-bold text-primary">
                  ${plan.monthlyPremium}
                </span>
                <p className="text-sm text-gray-500">per month</p>
              </td>
            ))}
          </tr>

          {/* Annual Deductible */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Annual Deductible
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                ${plan.annualDeductible.toLocaleString()}
              </td>
            ))}
          </tr>

          {/* Out of Pocket Maximum */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Out of Pocket Maximum
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                ${plan.outOfPocketMax.toLocaleString()}
              </td>
            ))}
          </tr>

          {/* Prescription Coverage */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Prescription Coverage
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generic:</span>
                    <span>${plan.prescriptionCoverage.generic}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Brand Name:</span>
                    <span>${plan.prescriptionCoverage.brandName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Specialty:</span>
                    <span>${plan.prescriptionCoverage.specialty}</span>
                  </div>
                </div>
              </td>
            ))}
          </tr>

          {/* Network Size */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Network Size
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                <span className={`
                  px-3 py-1 rounded-full text-sm
                  ${plan.networkSize === 'Large' ? 'bg-green-100 text-green-800' :
                    plan.networkSize === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}
                `}>
                  {plan.networkSize}
                </span>
              </td>
            ))}
          </tr>

          {/* Rating */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Customer Rating
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < plan.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Features */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Key Features
            </td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4">
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Select Plan Button */}
          <tr>
            <td className="px-6 py-4"></td>
            {sortedPlans.map((plan) => (
              <td key={plan.id} className="px-6 py-4 text-center">
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`
                    px-6 py-2 rounded-lg text-white transition
                    ${selectedPlan === plan.id
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-primary hover:bg-primary-dark'
                    }
                  `}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}