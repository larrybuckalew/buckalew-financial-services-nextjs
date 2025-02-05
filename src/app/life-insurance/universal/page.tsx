import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Universal Life Insurance',
  description: 'Flexible, lifelong protection with adjustable premiums and death benefits.',
  path: '/life-insurance/universal'
});

const features = [
  {
    title: "Flexible Premiums",
    description: "Adjust your payments and coverage as your life changes",
    icon: "🔄"
  },
  {
    title: "Cash Value Growth",
    description: "Potential to build tax-advantaged cash value",
    icon: "💹"
  },
  {
    title: "Lifetime Coverage",
    description: "Protection that lasts your entire lifetime",
    icon: "🛡️"
  },
  {
    title: "Investment Options",
    description: "Potential to earn returns based on market performance",
    icon: "📈"
  }
];

export default function UniversalLifeInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Universal Life Insurance</h1>
            <p className="text-xl mb-8">
              Flexible protection that adapts to your changing life needs
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/quote"
                className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
              >
                Get Your Personalized Quote
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

      {/* Coverage Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Universal Life Insurance Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[10, 15, 20, 30].map((years) => (
              <div key={years} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{years}-Year Term</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>✓ Level premiums</li>
                  <li>✓ Guaranteed death benefit</li>
                  <li>✓ Conversion options</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Income Replacement</h3>
              <p className="text-gray-600">
                Ensure your family maintains their standard of living if you're no longer there to provide.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Debt Protection</h3>
              <p className="text-gray-600">
                Cover mortgages, loans, and other debts to protect your family from financial burden.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Education Funding</h3>
              <p className="text-gray-600">
                Secure your children's educational future with dedicated coverage.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Business Protection</h3>
              <p className="text-gray-600">
                Protect your business interests and ensure continuity for your partners.
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
                question: "How much coverage do I need?",
                answer: "Coverage needs vary based on your income, debts, and family situation. Our advisors can help you calculate the right amount."
              },
              {
                question: "Can I convert my universal life policy?",
                answer: "Yes, most universal life policies offer conversion options to adjust your coverage as your life changes."
              },
              {
                question: "What happens if I can't pay my premiums?",
                answer: "Universal life policies offer flexibility. You may be able to use accumulated cash value to cover premiums or adjust your coverage."
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
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert guidance and find the perfect universal life insurance coverage for your needs.
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