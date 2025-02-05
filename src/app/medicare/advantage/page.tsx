import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Medicare Advantage Plans | Comprehensive Coverage',
  description: 'Explore Medicare Advantage plans offering additional benefits like dental, vision, and prescription drug coverage. Compare plans and get expert guidance.',
  path: '/medicare/advantage',
  keywords: [
    'Medicare Advantage',
    'Medicare Part C',
    'Medicare plans',
    'Medicare coverage',
    'Medicare benefits',
    'Medicare insurance',
    'dental coverage',
    'vision coverage',
    'prescription drug coverage'
  ]
});

const features = [
  {
    title: "All-in-One Coverage",
    description: "Combines Medicare Parts A, B, and often D",
    icon: "📦"
  },
  {
    title: "Extra Benefits",
    description: "Includes dental, vision, and hearing coverage",
    icon: "👓"
  },
  {
    title: "Prescription Drugs",
    description: "Often includes Part D prescription drug coverage",
    icon: "💊"
  },
  {
    title: "Affordable Premiums",
    description: "Low-cost plans with predictable out-of-pocket costs",
    icon: "💰"
  }
];

export default function MedicareAdvantagePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Advantage Plans</h1>
            <p className="text-xl mb-8">
              Comprehensive coverage with added benefits beyond Original Medicare
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

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Medicare Advantage Covers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Hospital & Medical Care</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hospital stays (Part A)
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Doctor visits (Part B)
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Preventive care
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Dental coverage
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Vision benefits
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hearing services
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Prescription Drugs</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Part D coverage
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Pharmacy network
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Mail order options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Medicare Advantage Plan Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">HMO Plans</h3>
              <p className="text-gray-600 mb-4">
                Network-based plans with lower costs and coordinated care through a primary care physician.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Lower premiums
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Primary care coordination
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">PPO Plans</h3>
              <p className="text-gray-600 mb-4">
                Flexible plans offering both in-network and out-of-network coverage options.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  More provider choice
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  No referrals needed
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Special Needs Plans</h3>
              <p className="text-gray-600 mb-4">
                Specialized plans for those with specific conditions or circumstances.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Tailored benefits
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">•</span>
                  Specialized care teams
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Information */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Enrollment Periods</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-2">Initial Coverage Election Period</h3>
              <p className="text-gray-600">
                When you first become eligible for Medicare around your 65th birthday.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-2">Annual Enrollment Period</h3>
              <p className="text-gray-600">
                October 15 - December 7 each year to change your Medicare Advantage plan.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-2">Special Enrollment Periods</h3>
              <p className="text-gray-600">
                Available in specific situations like moving or losing other coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Compare Medicare Advantage Plans?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can help you find the right plan for your needs and budget.
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
}