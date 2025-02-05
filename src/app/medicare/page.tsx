import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Medicare Solutions',
  description: 'Expert guidance through Medicare options and enrollment periods.',
  path: '/medicare'
});

const medicareOptions = [
  {
    title: 'Medicare Advantage',
    description: 'Comprehensive coverage that combines Part A and Part B benefits',
    icon: '🏥',
    link: '/medicare/advantage'
  },
  {
    title: 'Medicare Supplement',
    description: 'Additional coverage to fill the gaps in Original Medicare',
    icon: '🛡️',
    link: '/medicare/supplement'
  },
  {
    title: 'Prescription Drug Plans',
    description: 'Medicare Part D coverage for your medication needs',
    icon: '💊',
    link: '/medicare/part-d'
  }
];

const resources = [
  {
    title: 'Enrollment Periods',
    description: 'Learn when you can enroll in Medicare coverage',
    link: '/medicare/enrollment'
  },
  {
    title: 'Medicare Resources',
    description: 'Helpful guides and information about Medicare',
    link: '/medicare/resources'
  },
  {
    title: 'Drug Pricing Tool',
    description: 'Compare medication costs across different plans',
    link: '/drug-pricing'
  }
];

export default function MedicarePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient class */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Medicare Solutions</h1>
            <p className="text-xl mb-8">
              Navigate your Medicare options with confidence. Our experts are here to help you make informed decisions about your healthcare coverage.
            </p>
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg inline-block transition duration-300"
            >
              Speak with a Medicare Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Medicare Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Medicare Coverage Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {medicareOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <Link
                  href={option.link}
                  className="text-secondary hover:text-secondary-dark font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Helpful Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition duration-300">
                <h3 className="text-xl font-bold text-primary mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  href={resource.link}
                  className="text-secondary hover:text-secondary-dark font-medium"
                >
                  View Resource →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help with Medicare?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Medicare specialists can help you understand your options and find the right coverage for your needs.
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