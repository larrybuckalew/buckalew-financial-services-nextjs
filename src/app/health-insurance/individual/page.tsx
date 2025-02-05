'use client'

import Link from 'next/link';

export default function IndividualHealthInsurance() {
  const benefits = [
    {
      title: "Comprehensive Coverage",
      description: "Full medical coverage including doctor visits, hospitalization, and prescriptions",
      icon: "🏥"
    },
    {
      title: "Preventive Care",
      description: "100% coverage for preventive services and wellness visits",
      icon: "✨"
    },
    {
      title: "Prescription Benefits",
      description: "Access to affordable prescription medications",
      icon: "💊"
    },
    {
      title: "Flexible Options",
      description: "Choose from multiple plans to fit your needs and budget",
      icon: "⚖️"
    }
  ];

  const planTypes = [
    {
      name: "Bronze Plans",
      features: ["Lower monthly premiums", "Higher deductibles", "Good for healthy individuals", "Catastrophic coverage"]
    },
    {
      name: "Silver Plans",
      features: ["Moderate premiums", "Moderate deductibles", "Balance of cost and coverage", "Popular choice"]
    },
    {
      name: "Gold Plans",
      features: ["Higher premiums", "Lower deductibles", "More comprehensive coverage", "Good for frequent care"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Individual Health Insurance</h1>
            <p className="text-xl mb-8">
              Get the coverage you need with flexible, affordable health insurance plans.
            </p>
            <Link
              href="/consultation/health-insurance"
              className="bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Plan Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Available Plan Types
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {planTypes.map((plan, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-brand-primary mb-4">{plan.name}</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-600">
                      <span className="text-brand-green-light mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            What's Covered
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Essential Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Doctor visits and preventive care
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hospital stays and emergency services
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Prescription drug coverage
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Lab tests and imaging
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Mental health services
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Rehabilitation services
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Chronic condition management
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Telehealth services
                </li>
              </ul>
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
                question: "What makes a good individual health plan?",
                answer: "A good plan balances monthly premiums with out-of-pocket costs while providing coverage for your specific health needs."
              },
              {
                question: "Can I keep my current doctors?",
                answer: "We'll help you find plans that include your preferred healthcare providers in their network."
              },
              {
                question: "When can I enroll in coverage?",
                answer: "You can enroll during Open Enrollment or if you qualify for a Special Enrollment Period due to life changes."
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
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Plan?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert guidance and find the health insurance coverage that's right for you.
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