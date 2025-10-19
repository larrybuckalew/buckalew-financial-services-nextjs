import React from 'react';
import Link from 'next/link';
const ResourcesPage = () => {
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Access helpful tools and information to make informed financial decisions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Drug Pricing Tool</h2>
            <p className="text-gray-600 mb-4">
              Search for drug prices and find the most affordable options for your medications.
            </p>
            <Link href="/resources/drug-pricing" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Search Drug Prices
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Insurance Calculators</h2>
            <p className="text-gray-600 mb-4">
              Calculate your insurance needs with our comprehensive tools.
            </p>
            <Link href="/calculators" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Use Calculators
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Educational Articles</h2>
            <p className="text-gray-600 mb-4">
              Read our latest insights on financial planning and insurance.
            </p>
            <Link href="/blog" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Read Articles
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
export default ResourcesPage;
