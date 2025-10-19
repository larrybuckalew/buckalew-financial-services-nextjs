import React from 'react';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
import { SafeImage } from '@/components/common/SafeImage';
export const metadata = {
    title: 'Whole Life Insurance | Permanent Coverage | Buckalew Financial Services',
    description: 'Secure permanent life insurance coverage with guaranteed cash value growth. Get lifelong protection and build wealth with whole life insurance.',
    keywords: 'whole life insurance, permanent life insurance, life insurance with cash value, guaranteed life insurance, estate planning, wealth building insurance',
    openGraph: {
        title: 'Whole Life Insurance - Lifetime Coverage & Cash Value | Buckalew Financial Services',
        description: 'Get permanent life insurance protection with guaranteed cash value growth. Build wealth while protecting your loved ones.',
        type: 'website',
        locale: 'en_US',
    },
};
const benefits = [
    {
        title: "Lifetime Protection",
        description: "Coverage that lasts your entire life with guaranteed level premiums",
        imagePath: "/images/lifetime-protection.jpg"
    },
    {
        title: "Cash Value Growth",
        description: "Build tax-deferred savings with guaranteed growth rates",
        imagePath: "/images/cash-value-growth.jpg"
    },
    {
        title: "Estate Planning",
        description: "Create a lasting legacy and provide tax-efficient wealth transfer",
        imagePath: "/images/estate-planning.jpg"
    }
];
const features = [
    {
        title: "Guaranteed Death Benefit",
        points: [
            "Fixed benefit amount that never decreases",
            "Provides lifelong protection",
            "Tax-free payout to beneficiaries",
            "No term expiration"
        ]
    },
    {
        title: "Cash Value Benefits",
        points: [
            "Guaranteed growth rate",
            "Tax-deferred accumulation",
            "Policy loan options",
            "Emergency fund access"
        ]
    },
    {
        title: "Premium Features",
        points: [
            "Level premiums that never increase",
            "Premium payment flexibility",
            "Potential dividend earnings",
            "Paid-up additions options"
        ]
    }
];
export default function WholeLifeInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Whole Life Insurance',
            subtitle: 'Lifetime protection with guaranteed cash value growth',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Whole life insurance provides permanent protection with the added benefit 
            of building cash value over time. It's an ideal solution for those seeking 
            lifelong coverage and a tax-advantaged savings component.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=whole-life" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Speak to an Expert
            </Link>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <SafeImage src={benefit.imagePath} alt={benefit.title} fill className="object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>))}
        </div>

        {/* Features and Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <SafeImage src="/images/whole-life-features.jpg" alt="Whole life insurance features and benefits" fill className="object-cover"/>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Comprehensive Coverage Features
            </h2>
            <div className="space-y-6">
              {features.map((feature, index) => (<div key={index} className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    {feature.title}
                  </h3>
                  <ul className="space-y-2">
                    {feature.points.map((point, pIndex) => (<li key={pIndex} className="flex items-start text-gray-700">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>{point}</span>
                      </li>))}
                  </ul>
                </div>))}
            </div>
          </div>

          {/* Right Column - CTA and Calculator */}
          <div className="lg:pl-8">
            {/* Policy Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Calculate Your Coverage
              </h3>
              <p className="text-gray-600 mb-6">
                Find out how much whole life insurance coverage you need and see potential 
                cash value growth projections.
              </p>
              <Link href="/quote?type=whole-life" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                Get Your Personalized Quote
              </Link>
            </div>

            {/* Consultation CTA */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Get Expert Guidance
              </h3>
              <p className="mb-6">
                Our financial professionals can help you understand how whole life insurance 
                fits into your long-term financial strategy.
              </p>
              <div className="space-y-4">
                <Link href="/contact" className="block w-full rounded-md bg-white px-6 py-3 text-center text-lg font-semibold text-blue-700 shadow-md hover:bg-blue-50 transition-colors">
                  Schedule a Consultation
                </Link>
                <Link href="tel:1-800-XXX-XXXX" className="block w-full rounded-md border-2 border-white px-6 py-3 text-center text-lg font-semibold text-white hover:bg-blue-600 transition-colors">
                  Call Us Now
                </Link>
              </div>
              <p className="mt-4 text-sm text-blue-100 text-center">
                Available Mon-Fri: 9am-6pm EST
              </p>
            </div>

            {/* Cash Value Example */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Cash Value Growth Example
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Year 10</span>
                  <span className="font-semibold text-blue-700">$25,000</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Year 20</span>
                  <span className="font-semibold text-blue-700">$75,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 30</span>
                  <span className="font-semibold text-blue-700">$150,000</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  *Example based on a $500,000 policy for a healthy 35-year-old. 
                  Actual values will vary.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Common Questions About Whole Life Insurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does cash value work?
              </h3>
              <p className="text-gray-600">
                Cash value grows tax-deferred at a guaranteed rate. You can borrow 
                against it, use it to pay premiums, or surrender it for cash. The 
                growth is guaranteed, providing a reliable savings component.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I customize my policy?
              </h3>
              <p className="text-gray-600">
                Yes, you can add riders for additional coverage like long-term care, 
                critical illness, or accelerated death benefits. You can also purchase 
                paid-up additions to increase your death benefit and cash value.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start building lifetime protection and tax-advantaged savings today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=whole-life" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Your Free Quote
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>);
}
