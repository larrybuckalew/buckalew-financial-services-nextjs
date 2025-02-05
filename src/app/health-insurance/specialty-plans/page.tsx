'use client'

import Link from 'next/link';

const features = [
  {
    title: "Critical Illness Coverage",
    description: "Financial support for stroke, cancer, heart attack, and more",
    icon: "🩺"
  },
  {
    title: "Lump-Sum Payment",
    description: "Receive a tax-free payout upon diagnosis",
    icon: "💰"
  },
  {
    title: "Flexible Options",
    description: "Customizable plans to fit your needs",
    icon: "📋"
  },
  {
    title: "Peace of Mind",
    description: "Protection against unexpected medical expenses",
    icon: "😌"
  }
];

export default function SpecialtyPlansPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Specialty Plans for Critical Illness</h1>
            <p className="text-xl mb-8">
              Financial protection for stroke, cancer, heart attack, and other critical illnesses
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

      {/* What Are Specialty Plans? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Are Specialty Plans?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Critical Illness Coverage</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Stroke
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Cancer
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Heart attack
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Lump-Sum Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Tax-free payment upon diagnosis
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Use funds for treatment, travel, or bills
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  No restrictions on how you use the money
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Wellness benefits
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Second opinion services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Access to specialists
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Specialty Plans? */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Why Choose Specialty Plans?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Financial Security</h3>
              <p className="text-gray-600">
                A lump-sum payment provides immediate financial relief during tough times.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Flexibility</h3>
              <p className="text-gray-600">
                Use the funds however you need—medical bills, living expenses, or travel.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                Protection for multiple critical illnesses, including stroke, cancer, and heart attack.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Peace of Mind</h3>
              <p className="text-gray-600">
                Focus on recovery without worrying about financial burdens.
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
                question: "What are specialty plans?",
                answer: "Specialty plans provide financial protection for critical illnesses like stroke, cancer, and heart attack by offering lump-sum payouts upon diagnosis."
              },
              {
                question: "How does the lump-sum payment work?",
                answer: "Upon diagnosis of a covered critical illness, you receive a tax-free lump-sum payment that you can use for medical expenses, living costs, or any other needs."
              },
              {
                question: "Are pre-existing conditions covered?",
                answer: "Coverage for pre-existing conditions varies by plan. Speak with an advisor to understand your options."
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
          <h2 className="text-3xl font-bold mb-6">Secure Your Future Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Protect yourself and your loved ones with specialty plans for critical illnesses
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