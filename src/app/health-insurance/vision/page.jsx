import React from 'react';
import Link from 'next/link';
import { PageStructure } from '../../../components/layout/PageStructure';
export const metadata = {
    title: 'Vision Insurance Plans | Buckalew Financial Services',
    description: 'Protect your eye health with comprehensive vision insurance coverage. Get access to quality eye care, glasses, contacts, and more through our network of providers.',
    keywords: 'vision insurance, eye care coverage, glasses coverage, contact lens insurance, eye exam insurance, Buckalew Financial Services',
    openGraph: {
        title: 'Vision Insurance Coverage | Buckalew Financial Services',
        description: 'Find affordable vision insurance plans that cover eye exams, glasses, contacts, and_more.',
        type: 'website',
        locale: 'en_US',
    },
};
export default function VisionInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Vision Insurance Plans',
            subtitle: 'Clear vision for a better future. Comprehensive coverage for your eye care needs.'
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Comprehensive Eye Exams</h3>
            <p className="text-gray-600">Regular eye exams covered with low copays to maintain your eye health and detect early signs of vision problems.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Eyewear Coverage</h3>
            <p className="text-gray-600">Allowances for prescription glasses, frames, and contact lenses from leading brands and retailers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Large Provider Network</h3>
            <p className="text-gray-600">Access to a nationwide network of eye care professionals and retail locations.</p>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Vision Insurance Matters
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Regular eye care is essential for maintaining not just your vision, but your 
                overall health. Our vision insurance plans help make quality eye care accessible 
                and affordable.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900">Plan Coverage Includes:</h3>
              <ul className="ml-6 list-disc space-y-3">
                <li>Annual eye examinations</li>
                <li>Prescription eyeglass frames and lenses</li>
                <li>Contact lens fittings and materials</li>
                <li>Lens enhancements (anti-reflective, progressive, etc.)</li>
                <li>Discounts on LASIK and PRK vision correction</li>
                <li>Option for additional pairs of glasses</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-700">
                Additional Benefits
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Low monthly premiums</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>No waiting periods for routine care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Easy to use benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Online provider lookup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - CTA and Contact */}
          <div className="lg:pl-8">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                Get Your Vision Insurance Quote
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Ready to protect your vision? Get a personalized quote for vision insurance 
                coverage that fits your needs and budget.
              </p>
              <div className="mt-6">
                <Link href="/quote?type=vision" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700">
                  Get Your Free Quote
                </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h4 className="text-lg font-semibold text-gray-900">
                  Have Questions?
                </h4>
                <p className="mt-4 text-gray-600">
                  Our insurance experts are ready to help you understand your vision coverage 
                  options and find the right plan for you and your family.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                  Speak with an Expert
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>

            {/* Additional Info Box */}
            <div className="mt-8 bg-blue-700 rounded-lg p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">Did You Know?</h4>
              <p>
                Regular eye exams can detect early signs of serious health conditions like 
                diabetes, high blood pressure, and glaucoma. Investing in vision insurance 
                is an investment in your overall health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageStructure>);
}
