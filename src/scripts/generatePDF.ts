import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import GuideTemplate from '../components/pdf-templates/GuideTemplate';
import { guideContent as understandingLifeInsurance } from '../utils/guides/understanding-life-insurance';
import { guideContent as choosingRightPolicy } from '../utils/guides/choosing-right-policy';
import { guideContent as whyStartEarly } from '../utils/guides/why-start-early';
import { guideContent as navigatingHealthInsurance } from '../utils/guides/navigating-health-insurance';
import { guideContent as preventiveCare } from '../utils/guides/preventive-care';
import { guideContent as hmoVsPpo } from '../utils/guides/hmo-vs-ppo';
import { guideContent as medicare101 } from '../utils/guides/medicare-101';

const guides = [
  {
    content: understandingLifeInsurance,
    filename: 'understanding-life-insurance'
  },
  {
    content: choosingRightPolicy,
    filename: 'choosing-right-policy'
  },
  {
    content: whyStartEarly,
    filename: 'why-start-early'
  },
  {
    content: navigatingHealthInsurance,
    filename: 'navigating-health-insurance'
  },
  {
    content: preventiveCare,
    filename: 'preventive-care'
  },
  {
    content: hmoVsPpo,
    filename: 'hmo-vs-ppo'
  },
  {
    content: medicare101,
    filename: 'medicare-101'
  }
];

async function generatePDFs() {
  try {
    console.log('Starting PDF generation...');

    for (const guide of guides) {
      console.log(`\nGenerating ${guide.filename}.pdf...`);
      
      await renderToFile(
        React.createElement(GuideTemplate, {
          title: guide.content.title,
          content: guide.content.content
        }),
        `public/guides/${guide.filename}.pdf`
      );
      
      console.log(`✓ Generated ${guide.filename}.pdf successfully`);
    }

    console.log('\n✨ All PDFs generated successfully!\n');
  } catch (error) {
    console.error('\n❌ Error generating PDFs:', error);
    process.exit(1);
  }
}

generatePDFs();