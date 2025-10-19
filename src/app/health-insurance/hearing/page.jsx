import React from 'react';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Hearing Insurance Coverage | Buckalew Financial Services',
    description: 'Comprehensive hearing insurance coverage including hearing aids, tests, and treatments. Get access to quality hearing care through our network of audiologists.',
    keywords: 'hearing insurance, hearing aid coverage, hearing test insurance, audiologist coverage, hearing care insurance, Buckalew Financial Services',
    openGraph: {
        title: 'Hearing Insurance Coverage | Buckalew Financial Services',
        description: 'Get coverage for hearing aids, tests, and treatments with our comprehensive hearing insurance plans.',
        type: 'website',
        locale: 'en_US',
    },
};
export default function HearingInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} keywords={metadata.keywords} heroContent={{
            title: 'Hearing Insurance Coverage',
            subtitle: 'Protect your hearing health with comprehensive coverage for tests, treatments, and hearing aids',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Hearing Tests</h3>
            <p className="text-gray-700">Coverage for routine hearing tests and diagnostic evaluations by qualified audiologists.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Hearing Aids</h3>
            <p className="text-gray-700">Benefits for hearing aid devices, including fitting, maintenance, and repairs.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Expert Care</h3>
            <p className="text-gray-700">Access to a network of qualified audiologists and hearing care professionals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Comprehensive Hearing Coverage
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Hearing health is crucial for maintaining quality of life and staying connected 
                with loved ones. Our hearing insurance plans provide comprehensive coverage 
                to help you access the care and devices you need.
              </p>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  What's Covered
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Hearing Evaluations</strong>
                      <p className="mt-1 text-gray-600">Comprehensive hearing tests and assessments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Hearing Aids</strong>
                      <p className="mt-1 text-gray-600">Coverage for various types of hearing devices</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Fitting & Adjustments</strong>
                      <p className="mt-1 text-gray-600">Professional fitting and ongoing adjustments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <div>
                      <strong className="text-gray-900">Maintenance</strong>
                      <p className="mt-1 text-gray-600">Routine maintenance and repairs</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Plan Features
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Low monthly premiums
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Choice of hearing care providers
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Coverage for digital hearing aids
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-600 mr-2">✓</span>
                    Follow-up care included
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:pl-8">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                Get Your Hearing Insurance Quote
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Protect your hearing health with comprehensive coverage. Get a personalized 
                quote for hearing insurance that fits your needs and budget.
              </p>
              <div className="mt-6">
                <Link href="/quote?type=hearing" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700">
                  Get Your Free Quote
                </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h4 className="text-lg font-semibold text-gray-900">
                  Questions About Coverage?
                </h4>
                <p className="mt-4 text-gray-600">
                  Our insurance experts can help you understand your hearing coverage options 
                  and find the right plan for your needs.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                  Schedule a Consultation
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>

            {/* Educational Box */}
            <div className="mt-8 bg-blue-700 rounded-lg p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">Why Hearing Insurance Matters</h4>
              <p>
                Approximately 48 million Americans have some degree of hearing loss. Early detection 
                and treatment can help prevent further hearing loss and improve quality of life. 
                Don't wait until it's too late - protect your hearing health today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageStructure>);
}
