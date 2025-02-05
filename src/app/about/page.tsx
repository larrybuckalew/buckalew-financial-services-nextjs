'use client'

import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'John Buckalew',
    title: 'Founder & CEO',
    description: 'Over 30 years of experience in insurance and financial services.',
    image: '/api/placeholder/200/200'
  }
];

const values = [
  {
    title: "Integrity",
    description: "We believe in complete transparency and always putting our clients' interests first.",
    icon: "🤝"
  },
  {
    title: "Expertise",
    description: "Our team brings decades of experience in insurance and financial services.",
    icon: "📚"
  },
  {
    title: "Service",
    description: "We are committed to providing personalized service and support to every client.",
    icon: "⭐"
  },
  {
    title: "Innovation",
    description: "We stay ahead of industry trends to offer the best solutions available.",
    icon: "💡"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">
              About Buckalew Financial Services
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Providing expert guidance and comprehensive insurance solutions since 1993
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-600 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To provide our clients with expert guidance and comprehensive insurance solutions that protect what matters most, delivered with integrity and personalized service.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-600 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-primary-600 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-600 mb-12">Our Team</h2>
          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-8">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-primary-600 mb-2">{member.name}</h3>
                  <p className="text-lg text-gray-600 mb-4">{member.title}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-600 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary-600 mb-3">Medicare Solutions</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance through Medicare options and enrollment periods.
              </p>
              <Link href="/medicare" className="text-secondary-500 hover:text-secondary-700 font-medium">
                Learn More →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary-600 mb-3">Life Insurance</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive life insurance solutions to protect your family's future.
              </p>
              <Link href="/insurance/life" className="text-secondary-500 hover:text-secondary-700 font-medium">
                Learn More →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary-600 mb-3">Health Insurance</h3>
              <p className="text-gray-600 mb-4">
                Quality healthcare coverage for individuals and families.
              </p>
              <Link href="/insurance/health" className="text-secondary-500 hover:text-secondary-700 font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let us help you find the right insurance coverage for your needs
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-primary-700 text-white hover:bg-primary-800 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}