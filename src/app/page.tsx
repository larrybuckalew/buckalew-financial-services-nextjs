'use client'

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Insurance Solutions for Your Peace of Mind</h1>
            <p className="text-xl mb-8">
              Comprehensive coverage tailored to protect what matters most to you
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Our Insurance Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Life Insurance */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-green-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Life Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Protect your family's financial future with our comprehensive life insurance plans.
                </p>
                <Link href="/life-insurance" className="text-brand-green-light hover:text-brand-green-dark">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Health Insurance */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-green-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Health Insurance</h3>
                <p className="text-gray-600 mb-4">
                  Quality healthcare coverage for individuals and families.
                </p>
                <Link href="/health-insurance" className="text-brand-green-light hover:text-brand-green-dark">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Medicare */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="h-12 w-12 bg-brand-green-light rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">Medicare Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Expert guidance through Medicare options and enrollment.
                </p>
                <Link href="/medicare" className="text-brand-green-light hover:text-brand-green-dark">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="gradient-featured py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Buckalew Financial Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Experience",
                description: "25+ years serving our community"
              },
              {
                icon: "🤝",
                title: "Personal Touch",
                description: "Customized solutions for your needs"
              },
              {
                icon: "💰",
                title: "Best Rates",
                description: "Competitive pricing from top carriers"
              },
              {
                icon: "📞",
                title: "Support",
                description: "Always here when you need us"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">
            Tools & Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              href="/calculators"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-2">Insurance Calculators</h3>
              <p className="text-gray-600">
                Calculate your insurance needs and coverage requirements.
              </p>
            </Link>

            <Link 
              href="/blog"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-2">Insurance Blog</h3>
              <p className="text-gray-600">
                Stay informed with the latest insurance news and tips.
              </p>
            </Link>

            <Link 
              href="/drug-pricing"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-2">Drug Pricing Tool</h3>
              <p className="text-gray-600">
                Compare medication costs across different plans.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Hero/CTA Section */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to speak with an insurance specialist and find the right coverage for you.
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}