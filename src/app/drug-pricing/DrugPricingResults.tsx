'use client';

import { useDrugPricing } from '@/hooks/useDrugPricing';
import { DrugPricingErrorBoundary } from './DrugPricingError';
import { TableSkeleton } from '@/components/loading/TableSkeleton';
import { useState } from 'react';

export function DrugPricingResults() {
  const { data, isLoading, error, searchDrugPrices } = useDrugPricing();
  const [formData, setFormData] = useState({
    drugName: '',
    dosage: '',
    quantity: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchDrugPrices(
      formData.drugName,
      formData.dosage,
      parseInt(formData.quantity) || 30
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DrugPricingErrorBoundary>
      <div className="container mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="drugName" className="block mb-2 text-gray-700">
                Drug Name
              </label>
              <input
                type="text"
                id="drugName"
                name="drugName"
                value={formData.drugName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Enter medication name"
                required
              />
            </div>

            <div>
              <label htmlFor="dosage" className="block mb-2 text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="e.g., 10mg"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2 text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Number of pills/units"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Compare Prices'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <TableSkeleton rows={5} cols={4} />
          </div>
        ) : data ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Price Comparison Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-gray-700">Pharmacy</th>
                    <th className="px-6 py-3 text-left text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left text-gray-700">Distance</th>
                    <th className="px-6 py-3 text-left text-gray-700">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {data.prices.map((price, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{price.pharmacy}</td>
                      <td className="px-6 py-4">${price.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{price.distance}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${price.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {price.availability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="max-w-4xl mx-auto mt-6">
            <p className="text-red-600 text-center">{error.message}</p>
          </div>
        )}
      </div>
    </DrugPricingErrorBoundary>
  );
}