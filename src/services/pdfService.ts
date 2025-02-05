import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import QuoteTemplate from '@/components/pdf-templates/QuoteTemplate';
import type { PDFThemeCustomization } from '@/utils/pdfCustomization';

interface SampleQuote {
  planType: string;
  coverage: Array<{
    type: string;
    details: string;
    amount: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  monthlyPremium: string;
  annualPremium: string;
  term?: string;
  riders?: Array<{
    name: string;
    cost: string;
    description: string;
  }>;
}

const getSampleQuote = (type: string): SampleQuote => {
  switch (type) {
    case 'life':
      return {
        planType: 'Term Life Insurance',
        coverage: [
          {
            type: 'Death Benefit',
            details: 'Guaranteed payout to beneficiaries',
            amount: '$500,000'
          },
          {
            type: 'Term Length',
            details: 'Guaranteed level premium period',
            amount: '20 Years'
          }
        ],
        benefits: [
          {
            title: 'Guaranteed Level Premium',
            description: 'Your premium remains the same for the entire term period.'
          },
          {
            title: 'Accelerated Death Benefit',
            description: 'Access a portion of your death benefit if diagnosed with a terminal illness.'
          },
          {
            title: 'Convertibility Option',
            description: 'Convert to permanent insurance without new medical exam.'
          }
        ],
        monthlyPremium: '$45.00',
        annualPremium: '$540.00',
        term: '20 Years',
        riders: [
          {
            name: 'Waiver of Premium',
            cost: '$8/month',
            description: 'Waives premiums if you become disabled.'
          },
          {
            name: 'Child Term Rider',
            cost: '$5/month',
            description: 'Provides coverage for all eligible children.'
          }
        ]
      };
    
    case 'health':
      return {
        planType: 'PPO Health Insurance',
        coverage: [
          {
            type: 'Annual Deductible',
            details: 'Amount you pay before insurance begins',
            amount: '$1,500'
          },
          {
            type: 'Out-of-Pocket Maximum',
            details: 'Maximum yearly out-of-pocket expenses',
            amount: '$5,000'
          },
          {
            type: 'Primary Care Visit',
            details: 'Copay for regular doctor visits',
            amount: '$25'
          }
        ],
        benefits: [
          {
            title: 'Preventive Care',
            description: '100% covered with no cost sharing'
          },
          {
            title: 'Prescription Drug Coverage',
            description: 'Tiered copay system for medications'
          },
          {
            title: 'Specialist Visits',
            description: '$50 copay after deductible'
          },
          {
            title: 'Hospital Coverage',
            description: '80% coverage after deductible'
          }
        ],
        monthlyPremium: '$350.00',
        annualPremium: '$4,200.00'
      };

    case 'dental':
      return {
        planType: 'Comprehensive Dental Insurance',
        coverage: [
          {
            type: 'Annual Maximum',
            details: 'Maximum yearly benefit',
            amount: '$2,000'
          },
          {
            type: 'Preventive Care',
            details: 'Cleanings and X-rays',
            amount: '100% Covered'
          },
          {
            type: 'Basic Services',
            details: 'Fillings and extractions',
            amount: '80% Coverage'
          },
          {
            type: 'Major Services',
            details: 'Crowns and bridges',
            amount: '50% Coverage'
          }
        ],
        benefits: [
          {
            title: 'Preventive Services',
            description: 'Two cleanings per year included'
          },
          {
            title: 'Basic Restorative',
            description: 'Fillings covered at 80%'
          },
          {
            title: 'Major Restorative',
            description: 'Crowns and bridges at 50%'
          }
        ],
        monthlyPremium: '$45.00',
        annualPremium: '$540.00'
      };

    default:
      throw new Error('Invalid insurance type');
  }
};

export async function generateQuotePDF(
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    insuranceType: string;
  }, 
  theme?: PDFThemeCustomization
) {
  try {
    const quoteDate = new Date().toLocaleDateString();
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    const quoteNumber = `Q${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const sampleQuote = getSampleQuote(data.insuranceType);

    return await renderToBuffer(
      React.createElement(QuoteTemplate, {
        quoteNumber,
        quoteDate,
        validUntil,
        clientName: `${data.firstName} ${data.lastName}`,
        clientInfo: {
          email: data.email,
          phone: data.phone
        },
        quoteDetails: sampleQuote,
        theme
      })
    );
  } catch (error) {
    console.error('Error generating quote PDF:', error);
    throw error;
  }
}