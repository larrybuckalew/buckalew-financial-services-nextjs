import React from 'react';
import { NextSeo } from 'next-seo';
import { PlanComparisonTool } from '@/components/plan-comparison/PlanComparisonTool';
import { generatePageSEO, generateBusinessSchema } from '@/lib/seo-utils';

const HMOPlansPage: React.FC = () => {
  const pageTitle = 'HMO Health Insurance Plans';
  const pageDescription = 'Comprehensive HMO health insurance plans with coordinated care and lower costs. Find the perfect plan for your healthcare needs.';
  const pagePath = '/health-insurance/aca/plans/hmo';

  const seoProps = generatePageSEO({
    title: pageTitle,
    description: pageDescription,
    path: pagePath
  });

  const businessSchema = generateBusinessSchema();

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
              "name": "HMO Health Insurance Plans",
              "description": pageDescription,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "description": "Affordable HMO health insurance plans"
              }
            }
          ])
        }}
      />

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
    </>
  );
};

export default HMOPlansPage;