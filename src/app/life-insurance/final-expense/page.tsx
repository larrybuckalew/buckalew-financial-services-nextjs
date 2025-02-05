import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Final Expense Insurance',
  description: 'Affordable final expense insurance to help protect your loved ones.',
  path: '/life-insurance/final-expense'
});

const features = [
  {
    title: "Guaranteed Acceptance",
    description: "No medical exam required for coverage",
    icon: "✅"
  },
  {
    title: "Fixed Premiums",
    description: "Rates never increase with age",
    icon: "🔒"
  },
  {
    title: "Quick Approval",
    description: "Get coverage in as little as 24 hours",
    icon: "⚡"
  },
  {
    title: "Lifetime Protection",
    description: "Coverage that never expires",
    icon: "🏛️"
  }
];

export default function FinalExpensePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Final Expense Insurance</h1>
            <p className="text-xl mb-8">
              Peace of mind for you and financial protection for your loved ones.
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
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Coverage Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Level Benefit</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Immediate full coverage
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Lower premium rates
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Basic health questions
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Modified Benefit</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Graded benefit period
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  No health questions
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Guaranteed acceptance
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Guaranteed Issue</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  No medical exam
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Instant approval
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Ages 50-85
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is final expense insurance?",
                answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other final expenses."
              },
              {
                question: "Who needs final expense insurance?",
                answer: "It's ideal for seniors who want to ensure their final expenses won't burden their loved ones, especially if they don't have other life insurance coverage."
              },
              {
                question: "How much coverage do I need?",
                answer: "Coverage amounts typically range from $5,000 to $25,000, depending on your needs and estimated final expenses."
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
          <h2 className="text-3xl font-bold mb-6">Protect Your Family Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the coverage you need with a simple and affordable final expense policy.
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