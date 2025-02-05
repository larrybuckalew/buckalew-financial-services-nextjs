import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import LifeInsuranceQuoteTemplate from '@/components/pdf-templates/insurance/LifeInsuranceQuoteTemplate';
import MedicareQuoteTemplate from '@/components/pdf-templates/insurance/MedicareQuoteTemplate';
import DentalInsuranceQuoteTemplate from '@/components/pdf-templates/insurance/DentalInsuranceQuoteTemplate';
import VisionInsuranceQuoteTemplate from '@/components/pdf-templates/insurance/VisionInsuranceQuoteTemplate';

export type InsuranceType = 'life' | 'medicare' | 'dental' | 'vision';

export const generateInsuranceQuotePDF = async (type: InsuranceType, data: any) => {
  try {
    let component;

    switch (type) {
      case 'life':
        component = React.createElement(LifeInsuranceQuoteTemplate, data);
        break;
      case 'medicare':
        component = React.createElement(MedicareQuoteTemplate, data);
        break;
      case 'dental':
        component = React.createElement(DentalInsuranceQuoteTemplate, data);
        break;
      case 'vision':
        component = React.createElement(VisionInsuranceQuoteTemplate, data);
        break;
      default:
        throw new Error(`Unsupported insurance type: ${type}`);
    }

    return await renderToBuffer(component);
  } catch (error) {
    console.error(`Error generating ${type} insurance quote PDF:`, error);
    throw error;
  }
};

export const getDefaultDisclaimers = (type: InsuranceType): string[] => {
  const commonDisclaimers = [
    'This quote is for illustrative purposes only.',
    'Final rates are subject to underwriting approval.',
    'Coverage and benefits are subject to policy terms and conditions.',
    'Not all benefits are available in all states.',
    'Quote valid for 30 days from issue date.'
  ];

  switch (type) {
    case 'life':
      return [
        ...commonDisclaimers,
        'Premiums may vary based on health examination results.',
        'Coverage begins only after policy is issued and first premium is paid.',
        'Benefit amounts shown are subject to underwriting approval.'
      ];
    
    case 'medicare':
      return [
        ...commonDisclaimers,
        'You must have Medicare Parts A & B to enroll in a Medicare Advantage plan.',
        'You must continue to pay your Medicare Part B premium.',
        'Benefits, premiums, and copayments may change on January 1 of each year.'
      ];
    
    case 'dental':
      return [
        ...commonDisclaimers,
        'Waiting periods may apply for certain services.',
        'Pre-existing conditions may not be covered immediately.',
        'Network savings are based on contracted provider rates.',
        'Not all procedures are covered under basic plans.'
      ];
    
    case 'vision':
      return [
        ...commonDisclaimers,
        'Frame allowances are subject to retail location participation.',
        'Contact lens benefit is in lieu of lens and frame benefit.',
        'Additional discounts may not be combined with insurance benefits.',
        'Some lens options may have additional costs.'
      ];
  }
};

export const generateQuoteNumber = (type: InsuranceType): string => {
  const prefix = {
    life: 'LIFE',
    medicare: 'MED',
    dental: 'DENT',
    vision: 'VIS'
  }[type];

  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${timestamp}-${random}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const getValidUntilDate = (days: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};