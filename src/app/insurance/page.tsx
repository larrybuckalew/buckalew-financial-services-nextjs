import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Insurance Solutions | Buckalew Financial Services',
  description: 'Comprehensive insurance solutions including life insurance, health insurance, and Medicare coverage options.',
  path: '/insurance'
});

const insuranceSolutions = [
  {
    title: 'Life Insurance',
    icon: '🛡️',
    description: "Protect your family's financial future with our comprehensive life insurance plans.",
    link: '/insurance/life',
    features: [
      'Term Life Insurance',
      'Whole Life Insurance',
      'Universal Life Insurance',
      'Final Expense Insurance'
    ]
  },
  {
    title: 'Health Insurance',
    icon: '⚕️',
    description: 'Quality healthcare coverage for individuals and families.',
    link: '/insurance/health',
    features: [
      'Individual Plans',
      'Family Coverage',
      'Dental & Vision',
      'Critical Illness'
    ]
  },
  {
    title: 'Medicare Solutions',
    icon: '🏥',
    description: 'Expert guidance through Medicare options and enrollment.',
    link: '/medicare',
    features: [
      'Medicare Advantage',
      'Medicare Supplement',
      'Prescription Drug Plans',
      'Medicare Resources'
    ]
  }
];

export default function InsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Insurance Solutions</h1>
            <p className="text-xl mb-8">
              Comprehensive coverage options tailored to protect what matters most
            </p>
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg inline-block transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Insurance Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {insuranceSolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="mb-6 space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solution.link}
                  className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center"
                >
                  Learn More 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Buckalew Financial?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our experienced advisors help you navigate complex insurance decisions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Personalized Service</h3>
              <p className="text-gray-600">
                We tailor solutions to meet your unique needs and circumstances.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Trusted Partner</h3>
              <p className="text-gray-600">
                Dedicated to helping you protect what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you find the right insurance coverage for your needs.
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}