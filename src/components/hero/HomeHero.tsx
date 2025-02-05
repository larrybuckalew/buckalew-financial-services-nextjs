'use client'

import Link from 'next/link';

export const HomeHero = () => {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 opacity-95"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Insurance Solutions for Your Peace of Mind
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Comprehensive coverage tailored to protect what matters most to you
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-primary-700 text-white hover:bg-primary-800 px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};