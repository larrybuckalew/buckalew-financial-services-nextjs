import React from 'react';
import { NextSeo } from 'next-seo';
import { PlanComparisonTool } from '@/components/plan-comparison/PlanComparisonTool';
import { generatePageSEO, generateBusinessSchema } from '@/lib/seo-utils';

const PPOPlansPage: React.FC = () => {
  const pageTitle = 'PPO Health Insurance Plans';
  const pageDescription = 'Flexible PPO health insurance plans with extensive provider networks. Choose your healthcare providers with comprehensive coverage.';
  const pagePath = '/health-insurance/aca/plans/ppo';

  const seoProps = generatePageSEO({
    title: pageTitle,
    description: pageDescription,
    path: pagePath
  });

  const businessSchema = generateBusinessSchema();

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
    <>
      <NextSeo {...seoProps} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([
            businessSchema,
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PPO Health Insurance Plans",
              "description": pageDescription,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "description": "Comprehensive PPO health insurance plans"
              }
            }
          ])
        }}
      />

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
    </>
  );
};

export default PPOPlansPage;