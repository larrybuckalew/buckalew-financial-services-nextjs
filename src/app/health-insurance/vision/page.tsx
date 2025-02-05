'use client'

import Link from 'next/link';

const features = [
  {
    title: "Comprehensive Eye Care",
    description: "Coverage for routine eye exams and screenings",
    icon: "👀"
  },
  {
    title: "Affordable Premiums",
    description: "Budget-friendly plans for individuals and families",
    icon: "💰"
  },
  {
    title: "Wide Network",
    description: "Access to a large network of eye care providers",
    icon: "🏥"
  },
  {
    title: "Flexible Benefits",
    description: "Discounts on glasses, contacts, and LASIK surgery",
    icon: "👓"
  }
];

export default function VisionInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Vision Insurance Plans</h1>
            <p className="text-xl mb-8">
              Comprehensive coverage for eye exams, glasses, contacts, and more
            </p>
            <Link
              href="/quote"
              className="bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* What Does Vision Insurance Cover? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Does Vision Insurance Cover?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Routine Eye Care</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Annual eye exams
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Vision screenings
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Glaucoma testing
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Corrective Lenses</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Glasses
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Contact lenses
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Lens upgrades (e.g., anti-glare, bifocals)
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Discounts on LASIK surgery
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Frames and lens replacement
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Sunglasses discounts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vision Insurance? */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Why Choose Vision Insurance?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Affordable Coverage</h3>
              <p className="text-gray-600">
                Low premiums and copayments for eye care services.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Comprehensive Benefits</h3>
              <p className="text-gray-600">
                Coverage for exams, glasses, contacts, and more.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Wide Network Access</h3>
              <p className="text-gray-600">
                Visit any provider in our extensive vision care network.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Family-Friendly Plans</h3>
              <p className="text-gray-600">
                Flexible options for individuals and families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is vision insurance?",
                answer: "Vision insurance helps cover the cost of routine eye exams, glasses, contacts, and other vision-related expenses."
              },
              {
                question: "Does vision insurance cover LASIK?",
                answer: "Some plans offer discounts or partial coverage for LASIK surgery. Check your policy for details."
              },
              {
                question: "How often can I get new glasses?",
                answer: "Most plans allow you to get new glasses or contacts annually, but benefits vary by plan."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-brand-primary mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Hero/CTA Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Protect Your Vision Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Affordable vision insurance plans to keep your eyes healthy and your sight clear
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/quote" 
              className="bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Get a Quote
            </Link>
            <Link 
              href="/contact"
              className="bg-white text-brand-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition-all"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}