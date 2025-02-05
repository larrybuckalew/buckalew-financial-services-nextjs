import { renderToBuffer } from '@react-pdf/renderer';
import QuoteTemplate from '@/components/pdf-templates/QuoteTemplate';
import PolicySummaryTemplate from '@/components/pdf-templates/PolicySummaryTemplate';
import BenefitsGuideTemplate from '@/components/pdf-templates/BenefitsGuideTemplate';
import React from 'react';

export const generateQuotePDF = async (data: any) => {
  try {
    const quoteData = {
      quoteNumber: `Q${Date.now()}`,
      quoteDate: new Date().toLocaleDateString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      clientName: `${data.firstName} ${data.lastName}`,
      clientInfo: {
        email: data.email,
        phone: data.phone,
        address: data.address || data.zipCode
      },
      plans: [
        {
          name: 'Basic Coverage',
          carrier: 'Premier Insurance Co.',
          type: 'Term Life Insurance',
          coverage: '$250,000',
          premium: '$35/month',
          deductible: '$0',
          benefits: [
            'Death Benefit: $250,000',
            'Level Premium Guaranteed',
            'Convertible to Permanent Insurance',
            '24/7 Customer Support'
          ]
        },
        {
          name: 'Enhanced Coverage',
          carrier: 'Premier Insurance Co.',
          type: 'Term Life Insurance',
          coverage: '$500,000',
          premium: '$60/month',
          deductible: '$0',
          benefits: [
            'Death Benefit: $500,000',
            'Level Premium Guaranteed',
            'Convertible to Permanent Insurance',
            'Additional Riders Available',
            'Priority Claims Processing'
          ]
        }
      ],
      notes: [
        'Rates are guaranteed for the initial term period.',
        'Medical examination may be required.',
        'Quote valid for 30 days from issue date.',
        'Additional riders available upon request.'
      ]
    };

    return await renderToBuffer(React.createElement(QuoteTemplate, quoteData));
  } catch (error) {
    console.error('Error generating quote PDF:', error);
    throw error;
  }
};

export const generatePolicySummaryPDF = async (data: any) => {
  try {
    const policyData = {
      policyNumber: `P${Date.now()}`,
      status: 'Active',
      effectiveDate: new Date().toLocaleDateString(),
      policyHolder: {
        name: `${data.firstName} ${data.lastName}`,
        dob: data.dateOfBirth || new Date().toLocaleDateString(),
        address: data.address || data.zipCode,
        phone: data.phone,
        email: data.email
      },
      coverage: [
        {
          type: 'Death Benefit',
          limit: '$500,000',
          deductible: '$0',
          waiting: 'None'
        },
        {
          type: 'Terminal Illness',
          limit: 'Up to 50% of Death Benefit',
          deductible: '$0',
          waiting: '30 days'
        }
      ],
      benefits: [
        {
          title: 'Death Benefit',
          description: 'Guaranteed payout to beneficiaries',
          items: [
            'Tax-free benefit',
            'No waiting period',
            'Guaranteed acceptance'
          ]
        }
      ],
      premium: {
        amount: '$60.00',
        frequency: 'Monthly',
        nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      },
      notes: [
        'Premium payments must be maintained to keep policy in force',
        'Contact us for any policy changes or questions'
      ]
    };

    return await renderToBuffer(React.createElement(PolicySummaryTemplate, { policy: policyData }));
  } catch (error) {
    console.error('Error generating policy PDF:', error);
    throw error;
  }
};

export const generateBenefitsGuidePDF = async (type: string) => {
  try {
    const guideData = {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Insurance Benefits Guide`,
      subtitle: 'Understanding Your Coverage Options',
      introduction: `Learn about our comprehensive ${type} insurance options and benefits.`,
      keyFeatures: [
        {
          title: 'Comprehensive Coverage',
          description: 'Full range of coverage options to meet your needs.'
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock customer service and claims support.'
        }
      ],
      plans: [
        {
          name: 'Basic Plan',
          price: '$35/month',
          features: [
            'Essential Coverage',
            'Basic Support',
            'Standard Claims Process'
          ]
        },
        {
          name: 'Premium Plan',
          price: '$60/month',
          features: [
            'Enhanced Coverage',
            'Priority Support',
            'Expedited Claims'
          ]
        }
      ],
      comparisons: [
        {
          feature: 'Coverage Amount',
          basic: true,
          premium: true,
          elite: true
        }
      ],
      examples: [
        {
          title: 'Coverage Example',
          content: 'Example coverage scenario for typical needs.'
        }
      ],
      highlights: [
        {
          title: 'Key Benefit',
          content: 'Primary advantage of this coverage type.'
        }
      ]
    };

    return await renderToBuffer(React.createElement(BenefitsGuideTemplate, guideData));
  } catch (error) {
    console.error('Error generating benefits guide PDF:', error);
    throw error;
  }
};

export const pdfTypes = {
  QUOTE: 'quote',
  POLICY_SUMMARY: 'policy_summary',
  BENEFITS_GUIDE: 'benefits_guide'
} as const;

export type PDFType = typeof pdfTypes[keyof typeof pdfTypes];

export const generatePDF = async (type: PDFType, data: any) => {
  try {
    switch (type) {
      case pdfTypes.QUOTE:
        return await generateQuotePDF(data);
      case pdfTypes.POLICY_SUMMARY:
        return await generatePolicySummaryPDF(data);
      case pdfTypes.BENEFITS_GUIDE:
        return await generateBenefitsGuidePDF(data.insuranceType);
      default:
        throw new Error(`Invalid PDF type: ${type}`);
    }
  } catch (error) {
    console.error('Error in PDF generation:', error);
    throw error;
  }
};