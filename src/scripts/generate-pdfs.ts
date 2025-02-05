import fs from 'fs';
import { renderToFile } from '@react-pdf/renderer';

// Import all PDF templates
import { UnderstandingLifeInsuranceGuide } from '../components/pdf-templates/resources/life-insurance/UnderstandingLifeInsurance';
import { ChoosingRightPolicyGuide } from '../components/pdf-templates/resources/life-insurance/ChoosingRightPolicy';
import { WhyStartEarlyGuide } from '../components/pdf-templates/resources/life-insurance/WhyStartEarly';

import { NavigatingHealthInsuranceGuide } from '../components/pdf-templates/resources/health-insurance/NavigatingHealthInsurance';
import { PreventiveCareGuide } from '../components/pdf-templates/resources/health-insurance/PreventiveCare';
import { HMOvsPPOGuide } from '../components/pdf-templates/resources/health-insurance/HMOvsPPO';

import { Medicare101Guide } from '../components/pdf-templates/resources/medicare/Medicare101';
import { WhenToEnrollGuide } from '../components/pdf-templates/resources/medicare/WhenToEnroll';
import { SupplementingMedicareGuide } from '../components/pdf-templates/resources/medicare/SupplementingMedicare';

const publicDir = './public/guides';

async function generatePDF(Component: React.ComponentType, filename: string) {
  const path = `${publicDir}/${filename}.pdf`;
  await renderToFile(path, <Component />);
  console.log(`Generated: ${path}`);
}

async function generateAllPDFs() {
  // Ensure the directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Life Insurance PDFs
  await generatePDF(UnderstandingLifeInsuranceGuide, 'understanding-life-insurance');
  await generatePDF(ChoosingRightPolicyGuide, 'choosing-right-policy');
  await generatePDF(WhyStartEarlyGuide, 'why-start-early');

  // Health Insurance PDFs
  await generatePDF(NavigatingHealthInsuranceGuide, 'navigating-health-insurance');
  await generatePDF(PreventiveCareGuide, 'preventive-care');
  await generatePDF(HMOvsPPOGuide, 'hmo-vs-ppo');

  // Medicare PDFs
  await generatePDF(Medicare101Guide, 'medicare-101');
  await generatePDF(WhenToEnrollGuide, 'when-to-enroll-medicare');
  await generatePDF(SupplementingMedicareGuide, 'supplementing-medicare');
}

generateAllPDFs().catch(console.error);