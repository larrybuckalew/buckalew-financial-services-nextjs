import React from 'react';
import { PlanComparisonTool } from '@/components/plan-comparison/PlanComparisonTool';
import { EpoPlanData } from '@/data/plan-data/epo-plans';

const EpoPlansPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">EPO Health Insurance Plans</h1>
      <PlanComparisonTool 
        planType="EPO"
        planData={EpoPlanData}
        features={[
          'Network Restrictions',
          'Cost Sharing',
          'Preventive Care',
          'Specialist Referrals'
        ]}
      />
      {/* Additional EPO-specific content */}
    </div>
  );
};

export default EpoPlansPage;