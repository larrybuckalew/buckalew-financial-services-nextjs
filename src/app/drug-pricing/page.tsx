'use client';

import { DrugSearchForm } from './components/DrugSearchForm';
import { PriceComparisonCard } from './components/PriceComparisonCard';
import { PriceHistoryChart } from './components/PriceHistoryChart';
import { useDrugPricing } from './context/DrugPricingContext';
import { DrugPricingErrorBoundary } from './DrugPricingError';
import Link from 'next/link';

export default function DrugPricingPage() {
  const {
    drugName,
    dosage,
    priceData,
    priceHistory,
    isLoading,
    error,
    searchDrugPrices
  } = useDrugPricing();

  const lowestPrice = priceData.length > 0 
    ? Math.min(...priceData.map(d => d.price))
    : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Prescription Drug Pricing Tool</h1>
            <p className="text-xl mb-8">
              Compare medication costs across different pharmacies and insurance plans to find the most affordable options.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <DrugPricingErrorBoundary>
            <DrugSearchForm 
              onSearch={searchDrugPrices}
              isLoading={isLoading}
            />
          </DrugPricingErrorBoundary>
        </div>
      </section>

      {/* Results Section */}
      {(priceData.length > 0 || isLoading) && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {drugName && dosage && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Prices for {drugName} {dosage}
                </h2>
                {lowestPrice && (
                  <p className="text-lg text-gray-600 mt-2">
                    Prices starting from ${lowestPrice.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-6">
              {priceData.map((comparison, index) => (
                <PriceComparisonCard
                  key={index}
                  comparison={comparison}
                  isLowest={comparison.price === lowestPrice}
                />
              ))}
            </div>

            {priceHistory.length > 0 && (
              <div className="mt-12">
                <PriceHistoryChart
                  data={priceHistory}
                  drugName={drugName}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="bg-primary text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Finding Affordable Prescriptions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our pharmacy experts can help you find ways to reduce your medication costs and navigate insurance coverage.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg inline-block transition duration-300"
          >
            Speak with a Pharmacy Advisor
          </Link>
        </div>
      </section>
    </div>
  );
}