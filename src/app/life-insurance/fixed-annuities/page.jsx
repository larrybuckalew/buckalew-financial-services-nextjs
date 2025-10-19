import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Fixed Annuities | Guaranteed Retirement Income | Buckalew Financial Services',
    description: 'Secure your retirement with fixed annuities offering guaranteed income and principal protection. Get stable returns with tax-deferred growth.',
    keywords: 'fixed annuities, retirement income, guaranteed returns, tax-deferred growth, retirement planning, secure retirement income',
    openGraph: {
        title: 'Fixed Annuities - Guaranteed Retirement Income | Buckalew Financial Services',
        description: 'Get guaranteed retirement income with fixed annuities. Secure your future with stable returns and principal protection.',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/images/fixed-annuities-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Fixed Annuities and Retirement Planning',
            },
        ],
    },
};
const annuityTypes = [
    {
        title: "Immediate Annuities",
        description: "Start receiving income payments right away",
        features: [
            "Immediate income stream",
            "Guaranteed payment amounts",
            "Lifetime income option",
            "Various payout schedules"
        ],
        imagePath: "/images/immediate-annuity.jpg"
    },
    {
        title: "Deferred Annuities",
        description: "Grow your money tax-deferred for future income",
        features: [
            "Tax-deferred growth",
            "Guaranteed interest rates",
            "Flexible access options",
            "Higher potential returns"
        ],
        imagePath: "/images/deferred-annuity.jpg"
    },
    {
        title: "Multi-Year Guarantee",
        description: "Lock in rates for specific time periods",
        features: [
            "Guaranteed fixed rate",
            "Multiple term options",
            "Principal protection",
            "Predictable growth"
        ],
        imagePath: "/images/myga-annuity.jpg"
    }
];
export default function FixedAnnuities() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Fixed Annuities',
            subtitle: 'Guaranteed income for a secure retirement',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Fixed annuities provide guaranteed income for retirement with principal 
            protection and tax-deferred growth. Choose from immediate income or 
            long-term growth options to match your retirement goals.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=annuity" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-700 transition-colors">
              Speak with an Advisor
            </Link>
          </div>
        </div>

        {/* Annuity Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {annuityTypes.map((type, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
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
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image src="/images/annuity-benefits.jpg" alt="Fixed annuity benefits and features" fill className="object-cover"/>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Benefits of Fixed Annuities
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Guaranteed Income
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Predictable monthly payments
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Lifetime income options
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Protected from market volatility
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Inflation protection options
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Tax Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Tax-deferred growth
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Potential tax advantages
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Estate planning benefits
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Controlled tax exposure
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Information */}
          <div className="lg:pl-8">
            {/* Rate Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Current Fixed Rates
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">3-Year Fixed</span>
                  <span className="font-semibold text-blue-700">4.15%</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">5-Year Fixed</span>
                  <span className="font-semibold text-blue-700">4.45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">7-Year Fixed</span>
                  <span className="font-semibold text-blue-700">4.75%</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                *Rates are subject to change. Contact us for current rates.
              </p>
              <Link href="/quote?type=annuity" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                Calculate Your Income
              </Link>
            </div>

            {/* Income Example */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Income Example
              </h3>
              <p className="mb-6">
                Here's what your monthly income could look like with a $250,000 
                fixed annuity:
              </p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Age 65</span>
                  <span className="font-semibold">$1,250/month</span>
                </div>
                <div className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Joint Life</span>
                  <span className="font-semibold">$1,100/month</span>
                </div>
                <div className="flex justify-between">
                  <span>With COLA</span>
                  <span className="font-semibold">$950/month</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-blue-100">
                *Example for illustration. Actual rates may vary based on age, 
                premium amount, and options selected.
              </p>
            </div>

            {/* Additional Features */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Optional Features
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Cost of living adjustments
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Joint life coverage
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Period certain options
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Legacy benefit options
                </li>
              </ul>
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
                When should I consider a fixed annuity?
              </h3>
              <p className="text-gray-600">
                Fixed annuities are ideal when you're looking for guaranteed income 
                in retirement, want to protect your principal, or need tax-deferred 
                growth with better rates than traditional savings accounts.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How safe are fixed annuities?
              </h3>
              <p className="text-gray-600">
                Fixed annuities are among the safest retirement products available. 
                They're backed by the insurance company's financial strength and 
                protected by state guaranty associations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Secure Your Retirement Income?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get started with a personalized fixed annuity quote today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=annuity" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Your Quote
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>);
}
