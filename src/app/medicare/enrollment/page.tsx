import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicare Enrollment Periods | Buckalew Financial',
  description: 'Learn about Medicare enrollment periods, including Initial Enrollment, Special Enrollment, and Annual Enrollment periods.',
  keywords: ['Medicare enrollment', 'Medicare signup', 'Medicare periods', 'when to enroll in Medicare'],
  openGraph: {
    title: 'Medicare Enrollment Periods Explained',
    description: 'Understanding when and how to enroll in Medicare',
    type: 'article',
  },
};

const MedicareEnrollmentPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Enrollment Periods</h1>
            <p className="text-xl mb-8">
              Understanding when you can enroll in Medicare coverage
            </p>
            <Link
              href="/contact"
              className="bg-brand-primary hover:opacity-90 transition-all text-white px-8 py-3 rounded-lg inline-block"
            >
              Speak with an Enrollment Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Initial Enrollment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Initial Enrollment Period</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">When It Occurs</h3>
                <p className="text-gray-700">
                  Your Initial Enrollment Period is a 7-month period that includes:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    3 months before your 65th birthday
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    The month of your 65th birthday
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">•</span>
                    3 months after your 65th birthday
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">What You Can Do</h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Enroll in Medicare Part A (Hospital Insurance)
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Sign up for Medicare Part B (Medical Insurance)
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Join a Medicare Advantage Plan
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Add Part D prescription drug coverage
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Enrollment */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Annual Enrollment Period</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700 mb-6">
              October 15 - December 7 each year
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">During This Period You Can:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Switch Medicare Advantage plans
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Switch from Original Medicare to Medicare Advantage
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Switch from Medicare Advantage to Original Medicare
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-green-light mr-2">✓</span>
                    Join, switch, or drop a Part D prescription drug plan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Enrollment */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Special Enrollment Periods</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Qualifying Life Events</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Moving to a new address
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Losing your current coverage
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Your plan changing service area
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Qualifying for Extra Help with Medicare costs
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">What You Can Do</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Change Medicare Advantage plans
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Switch prescription drug plans
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Enroll in or leave a Medicare Advantage plan
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Key Medicare Dates</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Annual Open Enrollment</h3>
              <p className="text-gray-700 mb-2">October 15 - December 7</p>
              <p className="text-gray-600">
                Make changes to your Medicare Advantage and Medicare prescription drug coverage
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Medicare Advantage Open Enrollment</h3>
              <p className="text-gray-700 mb-2">January 1 - March 31</p>
              <p className="text-gray-600">
                Switch to a different Medicare Advantage plan or return to Original Medicare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help With Medicare Enrollment?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can help you understand your enrollment periods and options.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-brand-primary hover:opacity-90 text-white px-8 py-3 rounded-lg transition-all"
            >
              Get Started
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

export default MedicareEnrollmentPage;