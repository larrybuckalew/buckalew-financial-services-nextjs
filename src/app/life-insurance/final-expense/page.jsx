import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Final Expense Insurance | Burial Insurance | Buckalew Financial Services',
    description: 'Get affordable final expense insurance to cover funeral costs and end-of-life expenses. No medical exam required with guaranteed acceptance options.',
    keywords: 'final expense insurance, burial insurance, funeral insurance, guaranteed acceptance life insurance, senior life insurance, end of life expenses',
    openGraph: {
        title: 'Final Expense & Burial Insurance Coverage | Buckalew Financial Services',
        description: 'Protect your family from funeral costs and final expenses with affordable coverage options.',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/images/final-expense-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Final Expense Insurance Coverage',
            },
        ],
    },
};
const planTypes = [
    {
        title: "Level Benefit Plan",
        description: "Immediate full coverage for those who qualify",
        features: [
            "Full coverage from day one",
            "Lower premiums",
            "Simple health questions",
            "Ages 50-85 eligible"
        ],
        imagePath: "/images/level-benefit.jpg"
    },
    {
        title: "Guaranteed Acceptance",
        description: "No health questions or medical exam required",
        features: [
            "No health questions",
            "Cannot be turned down",
            "Graded benefits",
            "Ages 45-85 eligible"
        ],
        imagePath: "/images/guaranteed-acceptance.jpg"
    },
    {
        title: "Modified Benefit Plan",
        description: "Coverage for those with health conditions",
        features: [
            "Limited health questions",
            "Graded benefits",
            "Affordable rates",
            "Ages 45-85 eligible"
        ],
        imagePath: "/images/modified-benefit.jpg"
    }
];
export default function FinalExpenseInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Final Expense Insurance',
            subtitle: 'Protect your loved ones from financial burden',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Final expense insurance provides financial protection for your loved ones 
            to cover funeral costs, medical bills, and other end-of-life expenses. 
            With guaranteed acceptance options available, you can secure coverage 
            regardless of your health condition.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/quote?type=final-expense" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Coverage
            </Link>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-md border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-700 transition-colors">
              Speak to an Agent
            </Link>
          </div>
        </div>

        {/* Plan Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {planTypes.map((plan, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <SafeImage src={plan.imagePath} alt={plan.title} fill className="object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-start text-gray-600">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>))}
                </ul>
              </div>
            </div>))}
        </div>

        {/* Coverage Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <SafeImage src="/images/final-expense-coverage.jpg" alt="Final expense coverage details" fill className="object-cover"/>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Coverage Details
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  What's Covered
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Funeral and burial expenses
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Medical bills and final costs
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Outstanding debts and legal fees
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Legacy planning
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Policy Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Benefits never decrease
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Premiums never increase
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    Coverage never expires
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    No medical exam required
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Information */}
          <div className="lg:pl-8">
            {/* Quick Quote Calculator */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Your Coverage Quote
              </h3>
              <p className="text-gray-600 mb-6">
                Most policies range from $5,000 to $25,000 in coverage. Get a personalized 
                quote to find the right amount for your needs.
              </p>
              <Link href="/quote?type=final-expense" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                Calculate Your Rate
              </Link>
            </div>

            {/* Coverage Options */}
            <div className="bg-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">
                Average Funeral Costs
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <strong>Basic Services:</strong>
                    <p className="text-blue-100">$7,000 - $12,000</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <strong>With Burial:</strong>
                    <p className="text-blue-100">$15,000 - $20,000</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <strong>With Cremation:</strong>
                    <p className="text-blue-100">$6,000 - $8,000</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="block w-full rounded-md bg-white px-6 py-3 text-center text-lg font-semibold text-blue-700 shadow-md hover:bg-blue-50 transition-colors">
                  Discuss Coverage Options
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
                  <span className="text-gray-600">Minimum Coverage</span>
                  <span className="font-semibold text-blue-700">$5,000</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Average Coverage</span>
                  <span className="font-semibold text-blue-700">$15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Coverage</span>
                  <span className="font-semibold text-blue-700">$25,000</span>
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
                What is graded benefit coverage?
              </h3>
              <p className="text-gray-600">
                Graded benefit means the death benefit is phased in over the first few 
                years of the policy. After this period, you receive the full benefit. 
                This is common with guaranteed acceptance policies.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I be turned down for coverage?
              </h3>
              <p className="text-gray-600">
                No, our guaranteed acceptance option ensures you cannot be turned down 
                for coverage, regardless of your health condition. Everyone between 
                ages 45-85 qualifies.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Protect Your Family Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the peace of mind that comes with knowing your final expenses are covered.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=final-expense" className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Get Your Free Quote
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              Speak with an Agent
            </Link>
          </div>
        </div>
      </div>
    </PageStructure>);
}
