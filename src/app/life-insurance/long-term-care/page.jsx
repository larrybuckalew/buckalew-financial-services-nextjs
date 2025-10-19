import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Long Term Care Insurance | Buckalew Financial Services',
    description: 'Protect your retirement savings with Long Term Care insurance. Coverage for nursing home care, home health care, and assisted living facilities.',
    keywords: 'long term care insurance, LTC insurance, nursing home insurance, home health care coverage, assisted living insurance, senior care insurance',
    openGraph: {
        title: 'Long Term Care Insurance Coverage | Buckalew Financial Services',
        description: 'Get comprehensive long term care coverage to protect your assets and maintain independence.',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/images/long-term-care-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Long Term Care Insurance Coverage',
            },
        ],
    },
};
const coverageTypes = [
    {
        title: "Traditional LTC Insurance",
        description: "Pure long-term care coverage with flexible benefits",
        features: [
            "Comprehensive coverage",
            "Customizable benefits",
            "Multiple care settings",
            "Inflation protection options"
        ],
        imagePath: "/images/traditional-ltc.jpg"
    },
    {
        title: "Hybrid LTC Insurance",
        description: "Combined life insurance with LTC benefits",
        features: [
            "Life insurance benefit",
            "LTC benefits if needed",
            "Return of premium options",
            "Asset preservation"
        ],
        imagePath: "/images/hybrid-ltc.jpg"
    },
    {
        title: "Asset-Based LTC",
        description: "Single-premium policy with multiple benefits",
        features: [
            "Guaranteed benefits",
            "One-time payment option",
            "Tax advantages",
            "Legacy protection"
        ],
        imagePath: "/images/asset-based-ltc.jpg"
    }
];
export default function LongTermCare() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Long Term Care Insurance',
            subtitle: 'Protect your assets and maintain your independence',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Statistics Banner */}
        <div className="bg-blue-50 rounded-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700">70%</div>
              <p className="text-gray-600">of people over 65 will need long-term care</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">$108,405</div>
              <p className="text-gray-600">Average annual nursing home cost</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">3 Years</div>
              <p className="text-gray-600">Average length of care needed</p>
            </div>
          </div>
        </div>

        {/* Introduction with CTAs */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Long-term care insurance helps cover the costs of services needed when you can no longer perform everyday activities on your own. It protects your assets and provides peace of mind.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=ltc" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>

        {/* Coverage Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coverageTypes.map((type, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={type.imagePath} alt={type.title} fill className="object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-start text-gray-600">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>))}
                </ul>
              </div>
            </div>))}
        </div>

        {/* Benefits and Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What's Covered?
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Care Settings
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Nursing Home Care
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Assisted Living Facilities
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Home Health Care
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Adult Day Care
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Additional Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Care Coordination Services
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Respite Care Coverage
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Caregiver Training
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Home Modification
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Information */}
          <div className="lg:pl-8">
            {/* Cost Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Cost of Care Calculator
              </h3>
              <p className="text-gray-600 mb-6">
                See the potential costs of long-term care in your area and how much
                coverage you might need.
              </p>
              <Link href="/quote?type=ltc" className="block w-full rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                Calculate Costs
              </Link>
            </div>

            {/* Why Now Box */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Why Plan Now?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Lower premiums when you start younger</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Better chance of approval while healthy</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Protect your retirement savings</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Give your family peace of mind</p>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="block w-full rounded-md bg-white px-6 py-3 text-center text-lg font-semibold text-blue-700 shadow-md hover:bg-blue-50 transition-colors">
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            {/* Coverage Options */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Available Coverage Options
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Daily Benefit</span>
                  <span className="font-semibold text-blue-700">$100 - $500</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Benefit Period</span>
                  <span className="font-semibold text-blue-700">2-6 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elimination Period</span>
                  <span className="font-semibold text-blue-700">30-90 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                When is the best time to buy LTC insurance?
              </h3>
              <p className="text-gray-600">
                The best time to purchase long-term care insurance is typically between
                ages 50-65, while you're still healthy and premiums are more affordable.
                Waiting too long may result in higher costs or potential disqualification.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What makes hybrid LTC policies different?
              </h3>
              <p className="text-gray-600">
                Hybrid policies combine life insurance or annuity benefits with LTC
                coverage. If you don't need long-term care, your beneficiaries receive
                a death benefit. This ensures your premiums aren't "wasted" if you
                never need care.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Protect Your Future Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Don't wait until it's too late. Start planning for your long-term care needs now.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=ltc" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Your Quote
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>);
}
