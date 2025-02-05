import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Resources & Tools | Buckalew Financial',
  description: 'Access helpful Medicare resources, tools, and information to help you make informed decisions about your healthcare coverage.',
  keywords: ['Medicare resources', 'Medicare tools', 'Medicare information', 'Medicare help'],
  openGraph: {
    title: 'Medicare Resources and Tools',
    description: 'Essential resources and tools for understanding Medicare coverage',
    type: 'article',
  },
};

const MedicareResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Resources</h1>
            <p className="text-xl mb-8">
              Tools and information to help you make informed Medicare decisions
            </p>
            <Link
              href="/contact"
              className="bg-brand-primary hover:opacity-90 transition-all text-white px-8 py-3 rounded-lg inline-block"
            >
              Get Expert Help
            </Link>
          </div>
        </div>
      </section>

      {/* Helpful Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Helpful Tools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Plan Finder</h3>
              <p className="text-gray-700 mb-4">
                Compare Medicare plans side by side and find the coverage that fits your needs.
              </p>
              <Link 
                href="/calculators"
                className="text-brand-green-light hover:text-brand-green-dark"
              >
                Use Plan Finder →
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Drug Cost Calculator</h3>
              <p className="text-gray-700 mb-4">
                Estimate your prescription drug costs under different Part D plans.
              </p>
              <Link 
                href="/drug-pricing"
                className="text-brand-green-light hover:text-brand-green-dark"
              >
                Calculate Costs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Educational Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Medicare Guides</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/guide" className="text-gray-700 hover:text-brand-green-light">
                    Medicare Basics Guide
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/part-a" className="text-gray-700 hover:text-brand-green-light">
                    Understanding Part A Coverage
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/part-b" className="text-gray-700 hover:text-brand-green-light">
                    Part B Coverage Guide
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/part-d" className="text-gray-700 hover:text-brand-green-light">
                    Prescription Drug Coverage
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Important Information</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/eligibility" className="text-gray-700 hover:text-brand-green-light">
                    Eligibility Requirements
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/enrollment" className="text-gray-700 hover:text-brand-green-light">
                    Enrollment Periods
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/advantage" className="text-gray-700 hover:text-brand-green-light">
                    Medicare Advantage Plans
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  <Link href="/medicare/supplement" className="text-gray-700 hover:text-brand-green-light">
                    Medicare Supplement Insurance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads & Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Useful Documents</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Medicare Checklists</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medicare Enrollment Checklist
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Plan Comparison Worksheet
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Annual Review Guide
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Common Forms</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medicare Application Forms
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Plan Change Request Forms
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Authorization Forms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Personal Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts are here to help you understand your options and find the right coverage.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-brand-primary hover:opacity-90 text-white px-8 py-3 rounded-lg transition-all"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-brand-primary hover:text-brand-green-light px-8 py-3 rounded-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicareResourcesPage;