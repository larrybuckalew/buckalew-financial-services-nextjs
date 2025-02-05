import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Part B - Comprehensive Medical Insurance | Buckalew Financial',
  description: 'Detailed guide to Medicare Part B: medical insurance coverage, costs, eligibility, and benefits explained by Buckalew Financial Services.',
  keywords: ['Medicare Part B', 'medical insurance', 'healthcare coverage', 'senior health'],
  openGraph: {
    title: 'Medicare Part B Explained',
    description: 'Comprehensive guide to understanding Medicare Part B medical insurance',
    type: 'article',
  },
};

const MedicarePartBPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Part B Coverage</h1>
            <p className="text-xl mb-8">
              Understanding your medical insurance benefits and outpatient coverage
            </p>
            <Link
              href="/contact"
              className="bg-brand-primary hover:opacity-90 transition-all text-white px-8 py-3 rounded-lg inline-block"
            >
              Speak with a Medicare Expert
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">What is Medicare Part B?</h2>
          <p className="text-gray-700 mb-4">
            Medicare Part B is medical insurance that covers medically necessary services and preventive care. It&apos;s an essential component of Medicare that helps cover outpatient services, medical supplies, and preventive care.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">What Does Medicare Part B Cover?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>Doctor&apos;s visits and outpatient services</li>
            <li>Preventive care and screenings</li>
            <li>Medical supplies and equipment</li>
            <li>Mental health services</li>
            <li>Ambulance services</li>
            <li>Laboratory tests and X-rays</li>
            <li>Some prescription drugs administered in a clinical setting</li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6 gradient-soft">
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">Costs and Enrollment</h2>
          <div className="text-gray-700">
            <p className="mb-4">
              <strong>Monthly Premium:</strong> Most people pay a standard premium, which can change annually. Some higher-income beneficiaries may pay an increased premium.
            </p>
            <p className="mb-4">
              <strong>Annual Deductible:</strong> There&apos;s an annual deductible that must be met before Medicare starts to pay.
            </p>
            <p>
              <strong>Coinsurance:</strong> After meeting the deductible, you typically pay 20% of the Medicare-approved amount for most services.
            </p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6 gradient-soft">
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">Enrollment Periods</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li><strong>Initial Enrollment Period:</strong> 3 months before, the month of, and 3 months after your 65th birthday</li>
            <li><strong>General Enrollment Period:</strong> January 1 to March 31 each year</li>
            <li><strong>Special Enrollment Periods:</strong> Available for specific life circumstances</li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link 
            href="/quote" 
            className="bg-brand-primary hover:opacity-90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Get a Medicare Consultation
          </Link>
        </div>

        <div className="mt-8 gradient-soft p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-brand-primary mb-4">Need More Information?</h3>
          <p className="text-gray-700 mb-4">
            Medicare Part B can be complex. Our experts at Buckalew Financial Services are ready to help you understand your options and make the best decision for your healthcare needs.
          </p>
          <Link 
            href="/contact" 
            className="text-brand-green-light hover:text-brand-green-dark hover:underline"
          >
            Contact Us for Personalized Guidance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicarePartBPage;