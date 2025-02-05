const fs = require('fs');
const path = require('path');
const { renderToFile } = require('@react-pdf/renderer');
const React = require('react');

// Life Insurance Guides
const UnderstandingLifeInsuranceGuide = require('../src/components/pdf-templates/resources/life-insurance/UnderstandingLifeInsurance').LifeInsuranceGuide;
const ChoosingRightPolicyGuide = require('../src/components/pdf-templates/resources/life-insurance/ChoosingRightPolicy').ChoosingRightPolicyGuide;
const WhyStartEarlyGuide = require('../src/components/pdf-templates/resources/life-insurance/WhyStartEarly').WhyStartEarlyGuide;

// Health Insurance Guides
const NavigatingHealthInsuranceGuide = require('../src/components/pdf-templates/resources/health-insurance/NavigatingHealthInsurance').NavigatingHealthInsuranceGuide;
const PreventiveCareGuide = require('../src/components/pdf-templates/resources/health-insurance/PreventiveCare').PreventiveCareGuide;
const HMOvsPPOGuide = require('../src/components/pdf-templates/resources/health-insurance/HMOvsPPO').HMOvsPPOGuide;

// Medicare Guides
const Medicare101Guide = require('../src/components/pdf-templates/resources/medicare/Medicare101').Medicare101Guide;
const WhenToEnrollGuide = require('../src/components/pdf-templates/resources/medicare/WhenToEnroll').WhenToEnrollGuide;
const SupplementingMedicareGuide = require('../src/components/pdf-templates/resources/medicare/SupplementingMedicare').SupplementingMedicareGuide;

const publicDir = path.join(__dirname, '../public/guides');

async function generatePDF(Component, filename) {
  // Ensure the directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const filePath = path.join(publicDir, `${filename}.pdf`);
  
  try {
    await renderToFile(filePath, React.createElement(Component));
    console.log(`Generated: ${filePath}`);
  } catch (error) {
    console.error(`Error generating ${filename}.pdf:`, error);
    console.error(error.stack);
  }
}

async function generateAllPDFs() {
  // Life Insurance PDFs
  await generatePDF(UnderstandingLifeInsuranceGuide, 'understanding-life-insurance-comprehensive-guide');
  await generatePDF(ChoosingRightPolicyGuide, 'choosing-right-policy-comprehensive-guide');
  await generatePDF(WhyStartEarlyGuide, 'why-start-early-comprehensive-guide');

  // Health Insurance PDFs
  await generatePDF(NavigatingHealthInsuranceGuide, 'navigating-health-insurance-comprehensive-guide');
  await generatePDF(PreventiveCareGuide, 'preventive-care-comprehensive-guide');
  await generatePDF(HMOvsPPOGuide, 'hmo-vs-ppo-comprehensive-guide');

  // Medicare PDFs
  await generatePDF(Medicare101Guide, 'medicare-101-comprehensive-guide');
  await generatePDF(WhenToEnrollGuide, 'when-to-enroll-medicare-comprehensive-guide');
  await generatePDF(SupplementingMedicareGuide, 'supplementing-medicare-comprehensive-guide');
}

generateAllPDFs().catch(console.error);