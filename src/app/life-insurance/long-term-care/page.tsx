import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Long-Term Care Insurance',
  description: 'Comprehensive protection for extended healthcare needs and personal care services.',
  path: '/life-insurance/long-term-care'
});

const features = [
  {
    title: "Flexible Coverage",
    description: "Tailored plans for various care needs",
    icon: "🛡️"
  },
  {
    title: "Financial Protection",
    description: "Preserve your assets and retirement savings",
    icon: "💼"
  },
  {
    title: "Care Options",
    description: "Home care, assisted living, nursing facilities",
    icon: "🏡"
  },
  {
    title: "Family Support",
    description: "Reduce burden on loved ones",
    icon: "❤️"
  }
];

export default function LongTermCarePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Long-Term Care Insurance</h1>
            <p className="text-xl mb-8">
              Comprehensive protection for your healthcare and personal care needs
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

      {/* Care Coverage Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Care Coverage Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Healthcare",
                benefits: [
                  "Skilled nursing care",
                  "Personal care assistance",
                  "Comfort of home setting"
                ]
              },
              {
                title: "Assisted Living",
                benefits: [
                  "Daily living assistance",
                  "Community and social support",
                  "Medication management"
                ]
              },
              {
                title: "Nursing Home Care",
                benefits: [
                  "24/7 medical supervision",
                  "Comprehensive medical care",
                  "Rehabilitation services"
                ]
              }
            ].map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{option.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {option.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-secondary mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Asset Preservation</h3>
              <p className="text-gray-600">
                Protect your retirement savings and estate from being depleted by care costs.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Family Support</h3>
              <p className="text-gray-600">
                Reduce the emotional and financial burden on your loved ones.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Quality Care</h3>
              <p className="text-gray-600">
                Ensure access to high-quality care in your preferred setting.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Flexibility</h3>
              <p className="text-gray-600">
                Adaptable coverage that grows with your changing care needs.
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
                question: "When should I consider long-term care insurance?",
                answer: "Typically in your 50s or 60s, before health issues arise. Earlier enrollment often means lower premiums."
              },
              {
                question: "How much coverage do I need?",
                answer: "Coverage depends on your age, health, location, and potential care costs. Our advisors can help you determine the right amount."
              },
              {
                question: "Are premiums tax-deductible?",
                answer: "In some cases, long-term care insurance premiums can be tax-deductible. Consult with a tax professional for specifics."
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
          <h2 className="text-3xl font-bold mb-6">Protect Your Care Future</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore long-term care insurance options tailored to your unique needs and lifestyle.
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