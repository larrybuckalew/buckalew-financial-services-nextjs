import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Supplement Insurance (Medigap) | Buckalew Financial',
  description: 'Learn about Medicare Supplement Insurance (Medigap) plans that help cover costs not covered by Original Medicare.',
  keywords: ['Medicare Supplement', 'Medigap', 'Medicare coverage gaps', 'supplemental insurance'],
  openGraph: {
    title: 'Medicare Supplement Insurance Plans',
    description: 'Understand how Medicare Supplement plans work with your Medicare coverage',
    type: 'article',
  },
};

const MedicareSupplementPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Supplement Insurance</h1>
            <p className="text-xl mb-8">
              Fill the gaps in your Medicare coverage with a Medigap plan
            </p>
            <Link
              href="/contact"
              className="bg-brand-primary hover:opacity-90 transition-all text-white px-8 py-3 rounded-lg inline-block"
            >
              Speak with a Medicare Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">What is Medicare Supplement Insurance?</h2>
            <p className="text-gray-700 mb-4">
              Medicare Supplement Insurance, also known as Medigap, helps pay for some of the health care costs 
              that Original Medicare doesn't cover. These private insurance policies can help with deductibles, 
              copayments, and coinsurance.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Benefits */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Medigap Plans Cover</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Basic Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medicare Part A coinsurance
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hospital costs up to 365 days
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Part B coinsurance or copayment
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Blood (first 3 pints)
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Additional Coverage</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Part A deductible
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Skilled nursing facility care
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Part B excess charges
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Foreign travel emergency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Types */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Available Medigap Plans</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <p className="text-gray-700 mb-6">
              Medigap offers standardized plans labeled A through N. Each plan type offers different levels of coverage:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Plan G</h3>
                <p className="text-gray-700">Comprehensive coverage that pays for most out-of-pocket costs</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Plan N</h3>
                <p className="text-gray-700">Lower premium option with some cost-sharing</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Other Plans</h3>
                <p className="text-gray-700">Various options to match your needs and budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Information */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">When to Enroll</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Medigap Open Enrollment Period</h3>
                <p className="text-gray-700">
                  Your 6-month Medigap Open Enrollment Period starts when you're 65 or older and enrolled in Medicare Part B.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Special Rights</h3>
                <p className="text-gray-700">
                  You may have guaranteed issue rights in certain situations, such as losing other health coverage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Best Time to Buy</h3>
                <p className="text-gray-700">
                  Buying during your Open Enrollment Period gives you the best prices and most options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Compare Medigap Plans?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can help you find the right supplement plan for your needs.
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

export default MedicareSupplementPage;