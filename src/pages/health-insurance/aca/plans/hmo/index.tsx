import React from 'react';
import { PlanComparisonTool } from '@/components/plan-comparison/PlanComparisonTool';

const HMOPlansPage: React.FC = () => {
  const hmoPlanData = [
    {
      id: 'hmo-basic',
      name: 'Basic HMO Plan',
      monthlyPremium: 300,
      deductible: 2000,
      outOfPocketMax: 5500,
      coverageDetails: {
        preventiveCare: 'Fully Covered',
        primaryCareCopay: '$20',
        specialistVisit: '$40',
        emergencyRoom: '$200',
      },
    },
    {
      id: 'hmo-premium',
      name: 'Premium HMO Plan',
      monthlyPremium: 450,
      deductible: 1500,
      outOfPocketMax: 4000,
      coverageDetails: {
        preventiveCare: 'Fully Covered',
        primaryCareCopay: '$15',
        specialistVisit: '$30',
        emergencyRoom: '$150',
      },
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">HMO Health Insurance Plans</h1>
      <PlanComparisonTool 
        planType="HMO"
        planData={hmoPlanData}
        features={[
          'Network Restrictions',
          'Coordinated Care',
          'Lower Costs',
          'Primary Care Physician Referral'
        ]}
      />
    </div>
  );
};

export default HMOPlansPage;