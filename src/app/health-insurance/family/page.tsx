'use client'

import Link from 'next/link';

const benefits = [
  {
    title: "Family Coverage",
    description: "Protection for your entire family under one plan",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    title: "Preventive Care",
    description: "No-cost preventive services for the whole family",
    icon: "🏥"
  },
  {
    title: "Child Benefits",
    description: "Special coverage options for children's needs",
    icon: "👶"
  },
  {
    title: "Easy Management",
    description: "One plan, one premium, one deductible for all",
    icon: "✨"
  }
];

const coverageFeatures = [
  {
    title: "Medical Coverage",
    features: [
      "Doctor visits and checkups",
      "Hospital stays",
      "Emergency services",
      "Specialist consultations"
    ]
  },
  {
    title: "Additional Benefits",
    features: [
      "Prescription medications",
      "Mental health services",
      "Maternity and newborn care",
      "Pediatric services"
    ]
  },
  {
    title: "Optional Coverage",
    features: [
      "Dental insurance",
      "Vision care",
      "Orthodontic coverage",
      "Alternative medicine"
    ]
  }
];

export default function FamilyHealthInsurance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Family Health Insurance</h1>
            <p className="text-xl mb-8">
              Comprehensive health coverage designed to protect your entire family.
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
            Family Plan Benefits
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

      {/* Coverage Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            What's Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coverageFeatures.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-brand-primary mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.features.map((feature, fIndex) => (
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

      {/* Why Choose Family Plan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Why Choose a Family Plan?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Cost Savings</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Often more affordable than individual plans
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Single family deductible
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Shared out-of-pocket maximums
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Convenience</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  One plan to manage
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Single monthly premium
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Coordinated family care
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Special Features for Families
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Children's Coverage</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Well-child visits
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Immunizations
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Pediatric dental & vision
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Maternity Care</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Prenatal care
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Labor and delivery
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Newborn care
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Preventive Care</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Annual checkups
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Screenings
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Vaccinations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Who can be covered under a family plan?",
                answer: "Family plans typically cover you, your spouse, and your children under age 26. Dependents may include stepchildren, adopted children, and foster children."
              },
              {
                question: "What happens when children turn 26?",
                answer: "When children reach age 26, they'll need to transition to their own health insurance plan. We can help with this transition."
              },
              {
                question: "Can we change plans mid-year?",
                answer: "You can change plans during Open Enrollment or if you experience a qualifying life event like marriage, birth, or job change."
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
          <h2 className="text-3xl font-bold mb-6">Protect Your Family Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert guidance in choosing the perfect family health insurance plan.
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