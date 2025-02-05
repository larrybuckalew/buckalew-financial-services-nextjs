import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import LifeInsuranceGuideTemplate from '@/components/pdf-templates/guides/LifeInsuranceGuideTemplate';

export type GuideType = 'life' | 'health' | 'medicare' | 'dental' | 'vision';

export const generateGuidePDF = async (type: GuideType) => {
  try {
    let component;

    switch (type) {
      case 'life':
        component = React.createElement(LifeInsuranceGuideTemplate);
        break;
      // Add other guide types here as they become available
      default:
        throw new Error(`Guide type ${type} not yet implemented`);
    }

    return await renderToBuffer(component);
  } catch (error) {
    console.error(`Error generating ${type} insurance guide PDF:`, error);
    throw error;
  }
};

export const getGuideFileName = (type: GuideType): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  const guides = {
    life: `Understanding-Life-Insurance-Guide-${timestamp}`,
    health: `Health-Insurance-Guide-${timestamp}`,
    medicare: `Medicare-Guide-${timestamp}`,
    dental: `Dental-Insurance-Guide-${timestamp}`,
    vision: `Vision-Insurance-Guide-${timestamp}`
  };
  
  return `${guides[type]}.pdf`;
};