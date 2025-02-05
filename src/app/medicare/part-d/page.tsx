import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Part D - Prescription Drug Coverage | Buckalew Financial',
  description: 'Learn about Medicare Part D prescription drug coverage, costs, enrollment periods, and how to choose the right plan for your medication needs.',
  keywords: ['Medicare Part D', 'prescription drug coverage', 'Medicare drug plans', 'medication coverage'],
  openGraph: {
    title: 'Medicare Part D Drug Coverage Explained',
    description: 'Comprehensive guide to Medicare Part D prescription drug coverage',
    type: 'article',
  },
};

const MedicarePartDPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Part D Coverage</h1>
            <p className="text-xl mb-8">
              Understanding your prescription drug coverage options and benefits
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
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">What is Medicare Part D?</h2>
            <p className="text-gray-700 mb-4">
              Medicare Part D is prescription drug coverage offered through Medicare-approved private insurance companies. 
              It helps cover the cost of prescription medications and can be added to Original Medicare (Parts A and B) 
              or may be included in some Medicare Advantage plans.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Part D Covers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Covered Medications</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Prescription medications
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Some vaccines
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Generic and brand-name drugs
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Plan Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Pharmacy networks
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Mail-order services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Formulary drug lists
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Costs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Understanding Part D Costs</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">Monthly Premium</h3>
              <p className="text-gray-700">
                Premiums vary by plan and income level. Higher-income beneficiaries may pay more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">Annual Deductible</h3>
              <p className="text-gray-700">
                Amount you pay for prescriptions before your plan begins to pay its share.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">Copayments/Coinsurance</h3>
              <p className="text-gray-700">
                Your share of costs for covered drugs after meeting the deductible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Stages */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Part D Coverage Stages</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Initial Coverage</h3>
              <p className="text-gray-700">
                After meeting your deductible, you pay copayments or coinsurance for covered drugs.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Coverage Gap</h3>
              <p className="text-gray-700">
                Also known as the "donut hole," where you may pay more for your drugs until reaching catastrophic coverage.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Catastrophic Coverage</h3>
              <p className="text-gray-700">
                After reaching this stage, you pay significantly less for covered drugs for the rest of the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">When to Enroll</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-brand-green-light mr-2">✓</span>
                <div>
                  <strong className="text-brand-primary">Initial Enrollment Period:</strong>
                  <p className="text-gray-700">When you first become eligible for Medicare</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green-light mr-2">✓</span>
                <div>
                  <strong className="text-brand-primary">Annual Enrollment Period:</strong>
                  <p className="text-gray-700">October 15 - December 7 each year</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green-light mr-2">✓</span>
                <div>
                  <strong className="text-brand-primary">Special Enrollment Periods:</strong>
                  <p className="text-gray-700">Available in certain situations like moving or losing coverage</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Understanding Part D Coverage?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can help you find the right prescription drug plan for your needs.
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

export default MedicarePartDPage;