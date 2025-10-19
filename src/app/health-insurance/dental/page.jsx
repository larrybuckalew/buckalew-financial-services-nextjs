import React from 'react';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Dental Insurance | Buckalew Financial Services',
    description: 'Comprehensive dental insurance plans to keep your smile bright and healthy. Find the right coverage for you and your family.',
};
export default function DentalInsurance() {
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Dental Insurance',
            subtitle: 'Protect your smile with comprehensive dental coverage',
        }}>
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Dental Insurance Plans?
            </h2>
            <div className="mt-6 space-y-6 text-lg text-gray-600">
              <p>
                Regular dental care is essential for maintaining not just your oral health, 
                but your overall well-being. Our dental insurance plans provide comprehensive 
                coverage to help you maintain a healthy smile while keeping costs manageable.
              </p>
              <p>
                We offer a variety of plans to suit different needs and budgets, including:
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>Preventive care coverage (cleanings, check-ups, x-rays)</li>
                <li>Basic procedures (fillings, extractions)</li>
                <li>Major procedures (crowns, bridges, root canals)</li>
                <li>Orthodontic coverage options</li>
                <li>Individual and family plans</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                Benefits of Our Dental Plans
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">Preventive Care</h4>
                  <p className="mt-2 text-gray-600">
                    Most preventive services covered at 100% with no deductible
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">Large Network</h4>
                  <p className="mt-2 text-gray-600">
                    Access to extensive network of qualified dentists
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">No Waiting</h4>
                  <p className="mt-2 text-gray-600">
                    Immediate coverage for preventive services
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">Flexible Plans</h4>
                  <p className="mt-2 text-gray-600">
                    Choose from various coverage levels to fit your needs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:pl-8">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                Get Your Dental Insurance Quote
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Ready to protect your smile? Get a personalized quote and find the perfect 
                dental insurance plan for you and your family.
              </p>
              <div className="mt-6">
                <Link href="/quote?type=dental" className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-blue-700">
                  Get Your Free Quote
                </Link>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h4 className="text-lg font-semibold text-gray-900">
                  Need Help Choosing?
                </h4>
                <p className="mt-4 text-gray-600">
                  Our insurance experts are here to help you find the right dental coverage. 
                  Schedule a consultation to discuss your needs.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                  Contact Us
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageStructure>);
}
