import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Life Insurance Solutions',
  description: 'Protect your family\'s financial future with comprehensive life insurance coverage.',
  path: '/life-insurance'
});

const insuranceTypes = [
  {
    title: 'Term Life Insurance',
    description: 'Affordable coverage for a specific period of time, perfect for temporary needs.',
    path: '/life-insurance/term',
    icon: '⏱️'
  },
  {
    title: 'Whole Life Insurance',
    description: 'Permanent coverage with a cash value component that builds over time.',
    path: '/life-insurance/whole',
    icon: '🏦'
  },
  {
    title: 'Final Expense',
    description: 'Coverage specifically designed to help with end-of-life expenses.',
    path: '/life-insurance/final-expense',
    icon: '🕊️'
  },
  {
    title: 'Accidental Death',
    description: 'Additional protection that pays benefits for accidental death.',
    path: '/life-insurance/accidental-death',
    icon: '🛡️'
  },
  {
    title: 'Long-Term Care',
    description: 'Protection for extended healthcare needs and assisted living.',
    path: '/life-insurance/long-term-care',
    icon: '🏥'
  }
];

export default function LifeInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Life Insurance Solutions</h1>
            <p className="text-xl mb-8">
              Protect what matters most - your family's financial security and peace of mind.
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
        </div>
      </section>

      {/* Insurance Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Types of Life Insurance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((type, index) => (
              <Link 
                key={index}
                href={type.path}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
                <span className="text-secondary hover:text-secondary-dark font-medium mt-4 inline-block">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Buckalew Financial Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our experienced advisors help you find the perfect coverage.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Best Rates</h3>
              <p className="text-gray-600">
                We compare rates from top carriers to find you the best value.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Easy Process</h3>
              <p className="text-gray-600">
                Simple, straightforward application and approval process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Family?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started today with a free consultation and personalized quote.
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
      </section>
    </div>
  );
}