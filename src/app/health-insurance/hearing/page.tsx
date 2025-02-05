'use client'

import Link from 'next/link';

const features = [
  {
    title: "Comprehensive Coverage",
    description: "Hearing tests, aids, and treatment services",
    icon: "👂"
  },
  {
    title: "Advanced Technology",
    description: "Access to latest hearing aid technologies",
    icon: "🦻"
  },
  {
    title: "Network Providers",
    description: "Extensive network of audiologists",
    icon: "🏥"
  },
  {
    title: "Financial Support",
    description: "Affordable options for hearing care",
    icon: "💰"
  }
];

export default function HearingInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Hearing Insurance Coverage</h1>
            <p className="text-xl mb-8">
              Comprehensive protection for your hearing health
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

      {/* Coverage Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Hearing Care Coverage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Hearing Evaluations</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Annual hearing tests
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Comprehensive hearing assessments
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Diagnostic services
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Hearing Aid Coverage</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Advanced hearing aid technologies
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Partial or full device coverage
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Fitting and adjustment services
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Additional Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Hearing aid maintenance
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Battery and accessory coverage
                </li>
                <li className="flex items-center">
                  <span className="text-brand-green-light mr-2">✓</span>
                  Follow-up consultations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Early Detection</h3>
              <p className="text-gray-600">
                Identify hearing issues early to prevent further hearing loss.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Quality of Life</h3>
              <p className="text-gray-600">
                Improve communication and social interactions through better hearing.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Financial Protection</h3>
              <p className="text-gray-600">
                Reduce out-of-pocket expenses for hearing care.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-brand-green-light">
              <h3 className="text-xl font-bold text-brand-primary mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Continuous care and adjustment of hearing solutions.
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
                question: "When should I get a hearing test?",
                answer: "Recommended annually after age 50, or if you notice any hearing difficulties."
              },
              {
                question: "Are hearing aids covered by insurance?",
                answer: "Coverage varies, but our plans offer comprehensive hearing aid benefits."
              },
              {
                question: "How do I know if I need a hearing aid?",
                answer: "Signs include difficulty understanding conversations, asking people to repeat themselves, or turning up volume frequently."
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
          <h2 className="text-3xl font-bold mb-6">Protect Your Hearing Health</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comprehensive hearing care coverage tailored to your needs
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