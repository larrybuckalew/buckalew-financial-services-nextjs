'use client'

import Link from 'next/link';

export default function HealthInsurancePage() {
  const coverageTypes = [
    {
      title: 'Medicare',
      description: 'Comprehensive coverage for seniors and those with disabilities.',
      icon: '🏥',
      link: '/health-insurance/medicare'
    },
    {
      title: 'ACA Plans',
      description: 'Affordable marketplace health insurance options.',
      icon: '📋',
      link: '/health-insurance/aca'
    },
    {
      title: 'Dental Insurance',
      description: 'Preventive and comprehensive dental care coverage.',
      icon: '🦷',
      link: '/health-insurance/dental'
    },
    {
      title: 'Vision Insurance',
      description: 'Eye care and eyewear coverage for all ages.',
      icon: '👁️',
      link: '/health-insurance/vision'
    },
    {
      title: 'Hearing Insurance',
      description: 'Hearing health and hearing aid coverage.',
      icon: '👂',
      link: '/health-insurance/hearing'
    },
    {
      title: 'Specialty Plans',
      description: 'Targeted coverage for specific health conditions.',
      icon: '❤️',
      link: '/health-insurance/specialty-plans'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">
              Comprehensive Health Insurance
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Protect your health and financial well-being with tailored insurance plans designed to meet your unique needs.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/quote"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
              >
                Speak with an Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {coverageTypes.map((type, index) => (
            <Link 
              key={index} 
              href={type.link}
              className="group"
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition">
                  {type.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{type.title}</h2>
                <p className="text-gray-600">{type.description}</p>
                <div className="text-primary-600 font-semibold group-hover:underline mt-4">
                  Explore {type.title} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-600 mb-12">
            Why Choose Buckalew Financial Services?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🛡️',
                title: 'Personalized Coverage',
                description: 'Tailored insurance solutions that match your unique health needs.'
              },
              {
                icon: '💡',
                title: 'Expert Guidance',
                description: 'Professional advice to help you make informed health insurance decisions.'
              },
              {
                icon: '💰',
                title: 'Cost-Effective Plans',
                description: 'Comprehensive coverage at competitive and affordable rates.'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Find Your Perfect Health Insurance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Schedule a free consultation with our experts to discuss your health insurance needs 
            and discover the best coverage for you and your family.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Speak with an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}