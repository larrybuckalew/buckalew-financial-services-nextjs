import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Accidental Death Insurance | AD&D Coverage | Buckalew Financial Services',
    description: 'Get protected with Accidental Death & Dismemberment (AD&D) insurance. Additional coverage for accidents and injuries with quick approval and no medical exam.',
    keywords: 'accidental death insurance, AD&D insurance, dismemberment coverage, no medical exam insurance, accident protection, supplemental life insurance',
    openGraph: {
        title: 'Accidental Death & Dismemberment Insurance | Buckalew Financial Services',
        description: 'Protect yourself with AD&D coverage. Fast approval, no medical exam required.',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/images/add-insurance-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Accidental Death Insurance Coverage',
            },
        ],
    },
};
const coverageFeatures = [
    {
        title: "Accident Protection",
        description: "Coverage for accidental death and serious injuries",
        features: [
            "24/7 worldwide coverage",
            "Protection during work and travel",
            "Coverage for common accidents",
            "Additional travel benefits"
        ],
        imagePath: "/images/accident-protection.jpg"
    },
    {
        title: "Quick Approval",
        description: "Easy application process with no medical exam",
        features: [
            "Instant coverage available",
            "Simple application process",
            "No health questions",
            "Guaranteed acceptance"
        ],
        imagePath: "/images/quick-approval.jpg"
    },
    {
        title: "Additional Benefits",
        description: "Extra coverage options and features",
        features: [
            "Family coverage available",
            "Portable coverage",
            "Cost-effective premiums",
            "Optional riders available"
        ],
        imagePath: "/images/additional-benefits.jpg"
    }
];
export default function AccidentalDeathInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Accidental Death Insurance',
            subtitle: 'Additional protection against accidents with no medical exam required',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Accidental Death & Dismemberment (AD&D) insurance provides an additional layer 
            of protection for you and your family. Get coverage with no medical exam and 
            instant approval.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=add" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Instant Coverage
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Coverage Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coverageFeatures.map((feature, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <SafeImage src={feature.imagePath} alt={feature.title} fill className="object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, fIndex) => (<li key={fIndex} className="flex items-start text-gray-600">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>))}
                </ul>
              </div>
            </div>))}
        </div>

        {/* Coverage Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <SafeImage src="/images/add-coverage-details.jpg" alt="AD&D insurance coverage details" fill className="object-cover"/>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What's Covered?
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Accidental Death Coverage
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Full benefit for accidental death
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Coverage for accidents at work or home
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Travel accident coverage
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    24/7 worldwide protection
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Dismemberment Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Partial benefits for serious injuries
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Loss of sight or hearing coverage
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Paralysis benefits
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Rehabilitation benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Information */}
          <div className="lg:pl-8">
            {/* Quick Coverage Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Protected Today
              </h3>
              <p className="text-gray-600 mb-6">
                Coverage starts from as little as $10/month. Get an instant quote and 
                secure your protection in minutes.
              </p>
              <Link href="/quote?type=add" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                Get Instant Coverage
              </Link>
            </div>

            {/* Benefits Overview */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Why Choose AD&D Insurance?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>No medical exam or health questions required</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Guaranteed acceptance for eligible applicants</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Coverage starts immediately upon approval</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Affordable premiums that never increase</p>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="block w-full rounded-md bg-white px-6 py-3 text-center text-lg font-semibold text-blue-700 shadow-md hover:bg-blue-50 transition-colors">
                  Speak with an Expert
                </Link>
              </div>
            </div>

            {/* Coverage Amounts */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Available Coverage Amounts
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Individual Coverage</span>
                  <span className="font-semibold text-blue-700">Up to $500,000</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Family Coverage</span>
                  <span className="font-semibold text-blue-700">Up to $250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Child Coverage</span>
                  <span className="font-semibold text-blue-700">Up to $50,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is AD&D the same as life insurance?
              </h3>
              <p className="text-gray-600">
                No, AD&D is different from life insurance. It specifically covers 
                accidental death and serious injuries, while life insurance covers 
                death from any cause. AD&D is often used as supplemental coverage.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I add AD&D to my existing life insurance?
              </h3>
              <p className="text-gray-600">
                Yes, AD&D can be added as a rider to your existing life insurance policy 
                or purchased as a standalone policy. Our experts can help you determine 
                the best option for your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get instant coverage with no medical exam required.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=add" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Apply Now
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>);
}
