'use client';

import { useState } from 'react';
import { InsurancePlan } from '../services/recommendationEngine';

interface CoverageComparisonProps {
  plans: InsurancePlan[];
}

interface CoverageCategory {
  name: string;
  icon: string;
  features: Array<{
    name: string;
    description: string;
  }>;
}

export function CoverageComparison({ plans }: CoverageComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const coverageCategories: CoverageCategory[] = [
    {
      name: 'Hospital Services',
      icon: '🏥',
      features: [
        { 
          name: 'Inpatient Care',
          description: 'Hospital stays and related services'
        },
        { 
          name: 'Emergency Room',
          description: 'Emergency medical treatment'
        },
        { 
          name: 'Outpatient Surgery',
          description: 'Same-day surgical procedures'
        },
        { 
          name: 'Maternity Care',
          description: 'Pregnancy and childbirth services'
        },
        { 
          name: 'Mental Health Inpatient',
          description: 'Mental health hospitalization'
        }
      ]
    },
    {
      name: 'Office Visits',
      icon: '👨‍⚕️',
      features: [
        { 
          name: 'Primary Care',
          description: 'Regular doctor visits'
        },
        { 
          name: 'Specialist Visits',
          description: 'Specialized medical care'
        },
        { 
          name: 'Urgent Care',
          description: 'Non-emergency immediate care'
        },
        { 
          name: 'Mental Health Outpatient',
          description: 'Mental health office visits'
        },
        { 
          name: 'Chiropractic Care',
          description: 'Spine and joint treatments'
        }
      ]
    },
    {
      name: 'Preventive Care',
      icon: '🛡️',
      features: [
        { 
          name: 'Annual Physical',
          description: 'Yearly wellness check'
        },
        { 
          name: 'Immunizations',
          description: 'Vaccines and shots'
        },
        { 
          name: 'Cancer Screenings',
          description: 'Preventive cancer tests'
        },
        { 
          name: 'Well-Child Care',
          description: 'Pediatric preventive care'
        },
        { 
          name: 'Family Planning',
          description: 'Reproductive health services'
        }
      ]
    },
    {
      name: 'Prescriptions',
      icon: '💊',
      features: [
        { 
          name: 'Generic Drugs',
          description: 'Lower-cost medications'
        },
        { 
          name: 'Brand Name Drugs',
          description: 'Brand medication coverage'
        },
        { 
          name: 'Specialty Drugs',
          description: 'High-cost specialized medications'
        },
        { 
          name: 'Mail Order',
          description: '90-day supply by mail'
        },
        { 
          name: 'Preventive Medications',
          description: 'Preventive drug coverage'
        }
      ]
    }
  ];

  const getCoverageMark = (plan: InsurancePlan, featureName: string) => {
    const included = plan.features.some(f => 
      f.toLowerCase().includes(featureName.toLowerCase())
    );
    
    return {
      symbol: included ? '✓' : '✗',
      label: included ? 'Covered' : 'Not covered',
      className: included ? 'text-green-500' : 'text-red-500'
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" role="region" aria-label="Plan Coverage Comparison">
      <h3 className="text-xl font-bold text-gray-900 p-6 border-b">
        Coverage Comparison
      </h3>

      <div className="divide-y">
        {coverageCategories.map((category) => (
          <div key={category.name}>
            <button
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-expanded={selectedCategory === category.name}
              aria-controls={`category-${category.name}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                <span className="font-medium text-gray-900">{category.name}</span>
              </div>
              <span 
                className={`transform transition-transform ${
                  selectedCategory === category.name ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {selectedCategory === category.name && (
              <div 
                id={`category-${category.name}`}
                className="px-6 py-4 bg-gray-50 overflow-x-auto"
              >
                <table className="min-w-full" role="grid">
                  <thead>
                    <tr className="border-b">
                      <th 
                        scope="col" 
                        className="text-left py-2"
                      >
                        Feature
                      </th>
                      {plans.map((plan) => (
                        <th 
                          key={plan.id} 
                          scope="col" 
                          className="text-center py-2 px-4 min-w-[120px]"
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.features.map((feature) => (
                      <tr key={feature.name} className="border-b last:border-b-0">
                        <td className="py-3">
                          <div className="text-sm text-gray-900 font-medium">
                            {feature.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {feature.description}
                          </div>
                        </td>
                        {plans.map((plan) => {
                          const coverage = getCoverageMark(plan, feature.name);
                          return (
                            <td 
                              key={plan.id} 
                              className="text-center py-3 px-4"
                            >
                              <span 
                                className={coverage.className}
                                title={`${coverage.label} under ${plan.name}`}
                                aria-label={`${coverage.label} under ${plan.name}`}
                              >
                                {coverage.symbol}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <div className="text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <p className="flex items-center">
              <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
              <span>Covered under plan</span>
            </p>
            <p className="flex items-center">
              <span className="text-red-500 mr-2" aria-hidden="true">✗</span>
              <span>Not covered under plan</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}