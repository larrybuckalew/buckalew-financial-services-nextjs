import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Whole Life Insurance',
  description: 'Comprehensive whole life insurance solutions with lifetime coverage and cash value benefits.',
  path: '/life-insurance/whole'
});

const benefits = [
  {
    title: "Lifetime Coverage",
    description: "Protection that lasts your entire life",
    icon: "🏛️"
  },
  {
    title: "Cash Value Growth",
    description: "Build tax-deferred savings over time",
    icon: "💎"
  },
  {
    title: "Fixed Premiums",
    description: "Rates never increase with age",
    icon: "📊"
  },
  {
    title: "Guaranteed Benefits",
    description: "Death benefit and cash value guarantees",
    icon: "🔒"
  }
];

const features = [
  {
    title: "Living Benefits",
    items: [
      "Access to cash value through loans or withdrawals",
      "Use for retirement supplementation",
      "Emergency fund accessibility",
      "College funding options"
    ]
  },
  {
    title: "Financial Security",
    items: [
      "Guaranteed death benefit",
      "Estate planning tool",
      "Business succession planning",
      "Legacy creation"
    ]
  }
];

export default function WholeLifePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Whole Life Insurance</h1>
            <p className="text-xl mb-8">
              Permanent protection with guaranteed growth and lifelong benefits.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/quote"
                className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
              >
                Get Your Free Quote
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

      {/* Benefits Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Key Benefits of Whole Life Insurance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600">
                      <span className="text-secondary mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cash Value Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Understanding Cash Value
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">How It Grows</h3>
              <p className="text-gray-600">
                A portion of your premium builds cash value over time with guaranteed growth rates.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Access Options</h3>
              <p className="text-gray-600">
                Borrow against your cash value or make withdrawals for various needs.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Tax Benefits</h3>
              <p className="text-gray-600">
                Enjoy tax-deferred growth and potential tax-free access to cash value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How much does whole life insurance cost?",
                answer: "Premiums are typically higher than term insurance but remain level for life. The exact cost depends on factors like age, health, and coverage amount."
              },
              {
                question: "When can I access the cash value?",
                answer: "Cash value typically takes several years to accumulate. Once built up, you can access it through loans or withdrawals."
              },
              {
                question: "Is whole life insurance a good investment?",
                answer: "While primarily insurance, whole life offers guaranteed growth and can be part of a diversified financial strategy."
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

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our experts help you find the right whole life insurance solution.
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