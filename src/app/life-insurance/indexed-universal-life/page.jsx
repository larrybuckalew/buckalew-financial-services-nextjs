import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Indexed Universal Life Insurance (IUL) | Buckalew Financial Services',
    description: 'Explore Indexed Universal Life Insurance for flexible coverage with market-linked growth potential and downside protection. Build wealth while protecting your family.',
    keywords: 'indexed universal life insurance, IUL, market-linked insurance, flexible life insurance, cash value life insurance, wealth building insurance',
    openGraph: {
        title: 'Indexed Universal Life Insurance (IUL) | Buckalew Financial Services',
        description: 'Combine life insurance protection with market-linked growth potential.',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/images/iul-insurance-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Indexed Universal Life Insurance',
            },
        ],
    },
};
const features = [
    {
        title: "Market-Linked Growth",
        description: "Potential for higher returns based on market index performance",
        features: [
            "Growth tied to market indexes",
            "Downside protection",
            "Multiple index options",
            "Uncapped potential"
        ],
        imagePath: "/images/market-growth.jpg"
    },
    {
        title: "Flexible Coverage",
        description: "Adjustable death benefit and premium payments",
        features: [
            "Adjustable coverage amounts",
            "Flexible premium payments",
            "Premium payment options",
            "Coverage for life"
        ],
        imagePath: "/images/flexible-coverage.jpg"
    },
    {
        title: "Tax Advantages",
        description: "Tax-deferred growth and tax-free benefits",
        features: [
            "Tax-deferred cash value growth",
            "Tax-free death benefit",
            "Tax-free loans",
            "Estate planning benefits"
        ],
        imagePath: "/images/tax-advantages.jpg"
    }
];
export default function IndexedUniversalLife() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Indexed Universal Life Insurance',
            subtitle: 'Protection with growth potential and flexibility',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Indexed Universal Life Insurance combines permanent life insurance protection 
            with the potential for cash value growth linked to market index performance, 
            all while protecting against market downturns.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=iul" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
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

        {/* Detailed Information */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <SafeImage src="/images/iul-details.jpg" alt="IUL policy details" fill className="object-cover"/>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How IUL Works
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Market-Linked Growth
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Growth potential tied to market indexes
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Protected against market losses
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Multiple index options available
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Lock in gains periodically
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Policy Flexibility
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Adjust death benefit as needed
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Flexible premium payments
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Access cash value through loans
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Add optional riders for extra protection
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Information */}
          <div className="lg:pl-8">
            {/* Policy Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Explore IUL Options
              </h3>
              <p className="text-gray-600 mb-6">
                Let us help you understand how an IUL policy can fit into your 
                financial strategy.
              </p>
              <Link href="/quote?type=iul" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                Get Your Personalized Quote
              </Link>
            </div>

            {/* Growth Example */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Growth Example
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Market Goes Up 12%</span>
                  <span className="font-semibold">You Earn 12%</span>
                </div>
                <div className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Market Goes Up 20%</span>
                  <span className="font-semibold">You Earn Cap Rate</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Goes Down 15%</span>
                  <span className="font-semibold">You Earn 0%</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-blue-100">
                *Example for illustration purposes. Actual returns may vary based on 
                policy terms and market conditions.
              </p>
            </div>

            {/* Additional Benefits */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Living Benefits
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Tax-advantaged retirement income
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  College funding options
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Emergency funds access
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Business planning solutions
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Common Questions About IUL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is my money at risk in the market?
              </h3>
              <p className="text-gray-600">
                No, your principal is protected against market losses. While your returns 
                are linked to market performance, you'll never lose money due to market 
                downturns.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does indexing work?
              </h3>
              <p className="text-gray-600">
                Your cash value growth is tied to the performance of market indexes, 
                like the S&P 500. You participate in market gains up to a cap rate 
                while being protected against losses.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover how IUL can provide protection and growth potential for your future.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=iul" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
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
