import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Fixed Annuities | Secure Your Financial Future',
  description: 'Explore fixed annuities offering guaranteed income and financial stability for retirement.',
  path: '/financial-products/fixed-annuities'
});

const features = [
  {
    title: "Guaranteed Income",
    description: "Predictable payments for life or a set period",
    icon: "💰"
  },
  {
    title: "Tax-Deferred Growth",
    description: "Grow your savings without immediate tax liability",
    icon: "📈"
  },
  {
    title: "Low Risk",
    description: "Principal protection with stable returns",
    icon: "🔒"
  },
  {
    title: "Customizable Options",
    description: "Choose from various payout structures",
    icon: "📋"
  }
];

export default function FixedAnnuitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Fixed Annuities</h1>
            <p className="text-xl mb-8">
              Secure your financial future with predictable, tax-deferred income
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/quote"
                className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
              >
                Get Your Quote
              </Link>
              <Link
                href="/contact"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300"
              >
                Speak with an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Are Fixed Annuities? */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">What Are Fixed Annuities?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Guaranteed Payments</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Predictable income stream
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Lifetime or term-based payouts
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Protection against market volatility
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Tax Advantages</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Tax-deferred growth
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  No taxes until withdrawal
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Potential for lower tax brackets in retirement
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Security and Stability</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Principal protection
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Fixed interest rates
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Insured by state guaranty associations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Fixed Annuities? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Fixed Annuities?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Financial Security</h3>
              <p className="text-gray-600">
                Protect your savings with guaranteed returns.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Retirement Planning</h3>
              <p className="text-gray-600">
                Create a reliable income stream for your golden years.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Tax Efficiency</h3>
              <p className="text-gray-600">
                Defer taxes and maximize your retirement savings.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Peace of Mind</h3>
              <p className="text-gray-600">
                Avoid market risks with stable, predictable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is a fixed annuity?",
                answer: "A fixed annuity is a contract with an insurance company that provides guaranteed, predictable payments in exchange for a lump-sum investment."
              },
              {
                question: "Are fixed annuities safe?",
                answer: "Yes, fixed annuities are considered low-risk because they offer principal protection and guaranteed returns."
              },
              {
                question: "How are fixed annuities taxed?",
                answer: "Earnings grow tax-deferred until you withdraw them, at which point they are taxed as ordinary income."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Secure Your Retirement Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start building a predictable income stream with fixed annuities
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}