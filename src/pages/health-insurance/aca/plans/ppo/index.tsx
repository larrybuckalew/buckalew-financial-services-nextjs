import React from 'react';
import { PlanComparisonTool } from '@/components/plan-comparison/PlanComparisonTool';

const PPOPlansPage: React.FC = () => {
  const ppoPlanData = [
    {
      id: 'ppo-basic',
      name: 'Basic PPO Plan',
      monthlyPremium: 400,
      deductible: 2500,
      outOfPocketMax: 6500,
      coverageDetails: {
        preventiveCare: 'Fully Covered',
        primaryCareCopay: '$30',
        specialistVisit: '$60',
        emergencyRoom: '$300',
      },
    },
    {
      id: 'ppo-premium',
      name: 'Premium PPO Plan',
      monthlyPremium: 600,
      deductible: 1750,
      outOfPocketMax: 5000,
      coverageDetails: {
        preventiveCare: 'Fully Covered',
        primaryCareCopay: '$25',
        specialistVisit: '$50',
        emergencyRoom: '$250',
      },
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PPO Health Insurance Plans</h1>
      <PlanComparisonTool 
        planType="PPO"
        planData={ppoPlanData}
        features={[
          'Flexible Network',
          'No Referral Needed',
          'Out-of-Network Coverage',
          'More Provider Choices'
        ]}
      />
    </div>
  );
};

export default PPOPlansPage;