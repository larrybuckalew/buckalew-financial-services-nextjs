'use client';
import React, { useState } from 'react';
import { Search, Pill, MapPin } from 'lucide-react';
export default function DrugPricingPage() {
    const [drugName, setDrugName] = useState('');
    const [dosage, setDosage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [results, setResults] = useState([]);
    const handleSearch = (e) => {
        e.preventDefault();
        // Mock results for demonstration
        const mockResults = [
            {
                pharmacy: 'CVS Pharmacy',
                location: 'Main St Location',
                price: '$24.99',
                savings: '$15.00'
            },
            {
                pharmacy: 'Walgreens',
                location: 'Downtown Location',
                price: '$28.50',
                savings: '$11.49'
            },
            {
                pharmacy: 'Walmart Pharmacy',
                location: 'Supercenter',
                price: '$22.75',
                savings: '$17.24'
            }
        ];
        setResults(mockResults);
    };
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Drug Pricing Tool</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Compare prescription drug prices and find the best deals in your area
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Search Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Your Medication</h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Pill className="w-4 h-4 inline mr-2"/>
                Drug Name
              </label>
              <input type="text" value={drugName} onChange={(e) => setDrugName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter medication name (e.g., Lipitor, Metformin)" required/>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage
                </label>
                <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 10mg, 500mg" required/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Number of pills/units" required/>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
              <Search className="w-5 h-5 mr-2"/>
              Compare Prices
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (<div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Price Comparison Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{result.pharmacy}</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1"/>
                        {result.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{result.price}</div>
                      <div className="text-sm text-green-500">Save {result.savings}</div>
                    </div>
                  </div>
                </div>))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Prices shown are estimates and may vary based on insurance coverage, 
                pharmacy location, and current promotions. Always verify prices with the pharmacy before purchasing.
              </p>
            </div>
          </div>)}

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help With Prescription Costs?</h3>
          <p className="mb-6 opacity-90">
            Our healthcare specialists can help you find insurance plans that cover your medications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Get Healthcare Guidance
            </a>
            <a href="/quote" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </div>);
}
