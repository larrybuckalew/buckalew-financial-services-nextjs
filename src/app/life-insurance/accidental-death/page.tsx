import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Accidental Death Insurance',
  description: 'Comprehensive financial protection for unexpected life-altering events.',
  path: '/life-insurance/accidental-death'
});

const features = [
  {
    title: "Immediate Protection",
    description: "Coverage begins from day one",
    icon: "🛡️"
  },
  {
    title: "Affordable Premiums",
    description: "Budget-friendly protection for your family",
    icon: "💰"
  },
  {
    title: "Comprehensive Coverage",
    description: "Protection against various accidental scenarios",
    icon: "🏥"
  },
  {
    title: "Quick Payouts",
    description: "Expedited claims process for beneficiaries",
    icon: "⚡"
  }
];

export default function AccidentalDeathInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">Accidental Death Insurance</h1>
            <p className="text-xl mb-8 text-white/90">
              Financial protection for unexpected life-changing events
            </p>
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Coverage Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Accident Coverage",
                benefits: [
                  "Comprehensive accident protection",
                  "24/7 worldwide coverage",
                  "Immediate benefit payout"
                ]
              },
              {
                title: "Enhanced Benefit Plan",
                benefits: [
                  "Additional benefits for severe accidents",
                  "Disability income protection",
                  "Medical expense coverage"
                ]
              },
              {
                title: "Family Protection Plan",
                benefits: [
                  "Coverage for entire family",
                  "Child and spouse riders available",
                  "Flexible benefit amounts"
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Financial Security</h3>
              <p className="text-gray-600">
                Provide immediate financial support to your loved ones in case of an unexpected tragedy.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Debt Protection</h3>
              <p className="text-gray-600">
                Cover outstanding debts and prevent financial hardship for your family.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Peace of Mind</h3>
              <p className="text-gray-600">
                Know that your family is protected against unforeseen circumstances.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Affordable Coverage</h3>
              <p className="text-gray-600">
                Get comprehensive protection at budget-friendly rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What does accidental death insurance cover?",
                answer: "It provides a death benefit if the insured dies due to an accident, offering financial protection for your loved ones."
              },
              {
                question: "How is this different from standard life insurance?",
                answer: "Accidental death insurance specifically covers death caused by accidents, often at a lower cost than traditional life insurance."
              },
              {
                question: "Can I combine this with other insurance?",
                answer: "Yes, accidental death insurance can complement your existing life insurance for additional protection."
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

      {/* CTA Section with Gradient */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Protect What Matters Most</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Secure financial protection for unexpected life events
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
