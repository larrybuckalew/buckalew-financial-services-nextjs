'use client';

import { useState } from 'react';
import { InsurancePlan } from '../services/recommendationEngine';

interface BenefitsBreakdownProps {
  plan: InsurancePlan;
}

interface BenefitCategory {
  name: string;
  icon: string;
  items: {
    name: string;
    coverage: string;
    details?: string;
  }[];
}

export function BenefitsBreakdown({ plan }: BenefitsBreakdownProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const benefitCategories: BenefitCategory[] = [
    {
      name: 'Medical Services',
      icon: '🏥',
      items: [
        {
          name: 'Primary Care Visits',
          coverage: 'Covered after deductible',
          details: `$${plan.annualDeductible} deductible applies`
        },
        {
          name: 'Specialist Visits',
          coverage: 'Covered after deductible',
          details: 'Referral may be required'
        },
        {
          name: 'Urgent Care',
          coverage: 'Covered after deductible',
          details: 'In-network facilities'
        },
        {
          name: 'Emergency Room',
          coverage: 'Covered after deductible',
          details: 'Waived if admitted'
        }
      ]
    },
    {
      name: 'Prescriptions',
      icon: '💊',
      items: [
        {
          name: 'Generic Drugs',
          coverage: `$${plan.prescriptionCoverage.generic} copay`,
          details: '30-day supply'
        },
        {
          name: 'Brand Name Drugs',
          coverage: `$${plan.prescriptionCoverage.brandName} copay`,
          details: '30-day supply'
        },
        {
          name: 'Specialty Drugs',
          coverage: `$${plan.prescriptionCoverage.specialty} copay`,
          details: 'Prior authorization may be required'
        }
      ]
    },
    {
      name: 'Preventive Care',
      icon: '🛡️',
      items: [
        {
          name: 'Annual Physical',
          coverage: 'Covered 100%',
          details: 'Once per year'
        },
        {
          name: 'Immunizations',
          coverage: 'Covered 100%',
          details: 'Age-appropriate vaccines'
        },
        {
          name: 'Screenings',
          coverage: 'Covered 100%',
          details: 'As recommended'
        }
      ]
    },
    {
      name: 'Hospital Services',
      icon: '🏨',
      items: [
        {
          name: 'Inpatient Care',
          coverage: 'Covered after deductible',
          details: 'Pre-authorization required'
        },
        {
          name: 'Outpatient Surgery',
          coverage: 'Covered after deductible',
          details: 'At approved facilities'
        },
        {
          name: 'Lab Services',
          coverage: 'Covered after deductible',
          details: 'In-network labs'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-xl font-bold text-gray-900 p-6 border-b">
        Plan Benefits & Coverage Details
      </h3>

      <div className="divide-y">
        {benefitCategories.map((category) => (
          <div key={category.name}>
            <button
              onClick={() => setActiveCategory(
                activeCategory === category.name ? null : category.name
              )}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
              </div>
              <span className={`
                transform transition-transform
                ${activeCategory === category.name ? 'rotate-180' : ''}
              `}>
                ▼
              </span>
            </button>

            {activeCategory === category.name && (
              <div className="px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        {item.details && (
                          <p className="text-sm text-gray-500">
                            {item.details}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.coverage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <h4 className="font-medium text-gray-900 mb-2">
          Additional Benefits
        </h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}