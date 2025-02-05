import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Eligibility Requirements | Buckalew Financial',
  description: 'Learn about Medicare eligibility requirements, when you qualify, and how to determine your enrollment periods.',
  keywords: ['Medicare eligibility', 'Medicare requirements', 'Medicare qualification', 'when to enroll in Medicare'],
  openGraph: {
    title: 'Medicare Eligibility Guidelines',
    description: 'Understanding Medicare eligibility and qualification requirements',
    type: 'article',
  },
};

const MedicareEligibilityPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Eligibility</h1>
            <p className="text-xl mb-8">
              Understanding when and how you qualify for Medicare coverage
            </p>
            <Link
              href="/contact"
              className="bg-brand-primary hover:opacity-90 transition-all text-white px-8 py-3 rounded-lg inline-block"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Basic Eligibility */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Basic Eligibility Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Age-Based Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  65 years or older
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  U.S. citizen or permanent resident
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  10 years of qualifying work history
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Disability-Based Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Receiving Social Security Disability
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Specific medical conditions
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  24-month waiting period may apply
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Conditions */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Special Eligibility Situations</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">ALS (Lou Gehrig's Disease)</h3>
              <p className="text-gray-700">
                Automatic eligibility for Medicare benefits upon receiving Social Security Disability benefits
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">End-Stage Renal Disease (ESRD)</h3>
              <p className="text-gray-700">
                Eligible at any age if kidneys no longer function and requiring regular dialysis or kidney transplant
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Railroad Retirement Board Benefits</h3>
              <p className="text-gray-700">
                Special eligibility rules for railroad workers and their dependents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Verifying Your Eligibility</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Required Documentation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Birth certificate or proof of age
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Proof of citizenship or legal residency
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Social Security or RRB benefits information
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">How to Check</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Contact Social Security Administration
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Check your Medicare eligibility online
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    Consult with a Medicare specialist
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Understanding Your Eligibility?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can help determine your eligibility and guide you through the enrollment process.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-brand-primary hover:opacity-90 text-white px-8 py-3 rounded-lg transition-all"
            >
              Check Eligibility
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

export default MedicareEligibilityPage;