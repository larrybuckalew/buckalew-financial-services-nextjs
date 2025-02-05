import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Medicare Part A | Hospital Insurance Coverage',
  description: 'Learn about Medicare Part A hospital insurance coverage, including inpatient care, skilled nursing, hospice, and home health services.',
  path: '/medicare/part-a',
  keywords: [
    'Medicare Part A',
    'hospital insurance',
    'inpatient care',
    'skilled nursing',
    'hospice care',
    'home health services'
  ]
});

export default function MedicarePartAPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient */}
      <section className="gradient-featured py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Part A Coverage</h1>
            <p className="text-xl mb-8">
              Understanding your hospital insurance benefits and coverage
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

      {/* Coverage Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Part A Covers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Inpatient Hospital Care</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Semi-private rooms
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Meals
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  General nursing
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hospital services and supplies
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Skilled Nursing Care</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Physical therapy
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Occupational therapy
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Speech-language pathology
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medical social services
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Home Health Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Part-time skilled care
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Home health aide services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medical social services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medical supplies
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Hospice Care</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Doctor services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Nursing care
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Medical equipment
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Grief counseling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Costs and Coverage */}
      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Understanding Part A Costs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Premium-Free Part A</h3>
              <p className="text-gray-600">Most people don't pay a premium for Part A if they or their spouse paid Medicare taxes for at least 10 years.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Deductible</h3>
              <p className="text-gray-600">You pay a deductible for each benefit period before Medicare begins to pay.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Coinsurance</h3>
              <p className="text-gray-600">After your deductible, you may have to pay coinsurance based on the length of your hospital stay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Common Questions About Part A</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 card-header-gradient">
              <h3 className="text-xl font-bold text-brand-primary mb-2">When am I eligible for Part A?</h3>
              <p className="text-gray-600">Most people are eligible for Medicare Part A when they turn 65. You may qualify earlier if you have certain disabilities or conditions.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 card-header-gradient">
              <h3 className="text-xl font-bold text-brand-primary mb-2">Do I need to sign up for Part A?</h3>
              <p className="text-gray-600">If you're receiving Social Security benefits, you'll automatically be enrolled. Otherwise, you'll need to sign up during your Initial Enrollment Period.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 card-header-gradient">
              <h3 className="text-xl font-bold text-brand-primary mb-2">What's not covered by Part A?</h3>
              <p className="text-gray-600">Part A doesn't cover long-term care, most dental care, eye exams for prescription glasses, or hearing aids.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Understanding Part A Coverage?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare experts can explain your benefits and help you understand your coverage options.
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