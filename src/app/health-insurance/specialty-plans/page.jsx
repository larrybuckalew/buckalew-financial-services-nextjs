import React from 'react';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Specialty Insurance Plans - Critical Illness Coverage | Buckalew Financial Services',
    description: 'Comprehensive specialty insurance plans including coverage for heart disease, stroke, cancer, and critical illness. Get financial protection when you need it most.',
    keywords: 'critical illness insurance, cancer insurance, heart disease coverage, stroke insurance, specialty health plans, Buckalew Financial Services',
    openGraph: {
        title: 'Specialty & Critical Illness Insurance Plans | Buckalew Financial Services',
        description: 'Get financial protection against critical illnesses with our comprehensive specialty insurance plans.',
        type: 'website',
        locale: 'en_US',
    },
};
export default function SpecialtyPlans() {
    const plans = [
        {
            title: "Cancer Insurance",
            description: "Financial protection specifically designed for cancer diagnosis and treatment.",
            features: [
                "Lump-sum benefit upon cancer diagnosis",
                "Coverage for treatment and recovery costs",
                "Additional benefits for specific cancer treatments",
                "Transportation and lodging benefits"
            ]
        },
        {
            title: "Heart & Stroke Insurance",
            description: "Coverage for cardiovascular conditions and stroke-related expenses.",
            features: [
                "Lump-sum benefit upon heart attack or stroke",
                "Coverage for coronary artery bypass surgery",
                "Rehabilitation coverage",
                "Preventive care benefits"
            ]
        },
        {
            title: "Critical Illness Insurance",
            description: "Comprehensive coverage for various serious medical conditions.",
            features: [
                "Multiple condition coverage",
                "Lump-sum benefit payments",
                "Coverage for organ transplants",
                "Recurring condition benefits"
            ]
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Specialty Insurance Plans',
            subtitle: 'Additional protection for life\'s unexpected health challenges',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600">
            Our specialty insurance plans provide additional financial protection for specific 
            health conditions. These plans work alongside your primary health insurance to 
            help cover out-of-pocket expenses, lost wages, and other costs associated with 
            serious illnesses.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (<div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">{plan.title}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-start text-gray-600">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>))}
              </ul>
            </div>))}
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose Specialty Coverage?
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                While traditional health insurance covers medical expenses, specialty plans 
                provide additional financial support when you need it most. These plans help 
                protect your savings and maintain your lifestyle during treatment and recovery.
              </p>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Lump-Sum Benefits</strong>
                      <p className="mt-1">Receive a one-time payment upon diagnosis</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Flexible Use of Funds</strong>
                      <p className="mt-1">Use the money for any purpose you choose</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Guaranteed Renewable</strong>
                      <p className="mt-1">Keep your coverage as long as you need it</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Family Coverage Available</strong>
                      <p className="mt-1">Protect your entire family with one policy</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Common Uses for Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Out-of-pocket medical expenses
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Mortgage or rent payments
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Daily living expenses
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Lost income replacement
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Experimental treatments
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Travel expenses for treatment
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Additional Info */}
          <div className="lg:pl-8">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                Get Your Specialty Insurance Quote
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Protect yourself and your family from the financial impact of critical illnesses. 
                Get a personalized quote for the coverage you need.
              </p>
              <div className="mt-6">
                <Link href="/quote?type=specialty" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700">
                  Get Your Free Quote
                </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h4 className="text-lg font-semibold text-gray-900">
                  Need Help Choosing Coverage?
                </h4>
                <p className="mt-4 text-gray-600">
                  Our insurance experts can help you understand your options and select the 
                  right combination of coverage for your needs and budget.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                  Schedule a Consultation
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>

            {/* Statistics Box */}
            <div className="mt-8 bg-blue-700 rounded-lg p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">Did You Know?</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>1 in 2 men and 1 in 3 women will develop cancer in their lifetime</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Someone has a stroke every 40 seconds in the United States</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Every 34 seconds, someone in the US has a heart attack</p>
                </li>
              </ul>
              <p className="mt-4 text-blue-100">
                Don't wait until it's too late. Protect yourself and your family today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageStructure>);
}
