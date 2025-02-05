'use client'

import Link from 'next/link';

const features = [
  {
    title: "Comprehensive Coverage",
    description: "Essential health benefits as required by the ACA",
    icon: "🏥"
  },
  {
    title: "Preventive Care",
    description: "Free preventive services like screenings and vaccinations",
    icon: "💉"
  },
  {
    title: "Financial Assistance",
    description: "Subsidies and tax credits for eligible individuals",
    icon: "💰"
  },
  {
    title: "No Denials",
    description: "Coverage guaranteed regardless of pre-existing conditions",
    icon: "✅"
  }
];

export default function ACAInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section using the pre-defined gradient class */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Affordable Care Act (ACA) Insurance Plans</h1>
            <p className="text-xl mb-8">
              Get comprehensive health coverage with ACA-compliant plans
            </p>
            <Link
              href="/quote"
              className="btn-primary"
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the page content */}
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

      {/* What Does ACA Cover Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">What Does ACA Cover?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Essential Health Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Emergency services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Prescription drugs
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Maternity and newborn care
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Preventive Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Annual checkups
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Immunizations
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Screenings for chronic conditions
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Mental health services
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Pediatric care
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Rehabilitation services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ACA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Why Choose ACA Plans?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Guaranteed Coverage</h3>
              <p className="text-gray-600">
                No denials for pre-existing conditions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Financial Assistance</h3>
              <p className="text-gray-600">
                Subsidies and tax credits to lower your premiums.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Comprehensive Care</h3>
              <p className="text-gray-600">
                Coverage for essential health benefits and preventive services.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Flexible Options</h3>
              <p className="text-gray-600">
                Choose from Bronze, Silver, Gold, and Platinum plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Who is eligible for ACA plans?",
                answer: "Anyone can enroll during the Open Enrollment Period, or during a Special Enrollment Period if you qualify."
              },
              {
                question: "What are the metal tiers?",
                answer: "Bronze, Silver, Gold, and Platinum plans offer varying levels of coverage and costs."
              },
              {
                question: "Can I get financial assistance?",
                answer: "Yes, subsidies and tax credits are available based on your income and household size."
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

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Covered Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Affordable, comprehensive health insurance plans tailored to your needs
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/contact" className="bg-white text-brand-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300">
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}