'use client';

import React, { useState } from 'react';
import { TrendingDown, DollarSign, Calendar, Percent } from 'lucide-react';

export default function InflationCalculator() {
  const [formData, setFormData] = useState({
    currentAmount: '',
    inflationRate: '3.5',
    years: '10'
  });

  const [results, setResults] = useState<{
    futureValue: number;
    purchasingPowerLoss: number;
    equivalentToday: number;
    yearlyBreakdown: Array<{
      year: number;
      value: number;
      purchasingPower: number;
      loss: number;
    }>;
  } | null>(null);

  const calculateInflationImpact = () => {
    const current = parseFloat(formData.currentAmount) || 0;
    const rate = parseFloat(formData.inflationRate) / 100 || 0;
    const years = parseInt(formData.years) || 0;
    
    if (current <= 0 || years <= 0) return;
    
    // Calculate future value needed to maintain purchasing power
    const futureValue = current * Math.pow(1 + rate, years);
    const purchasingPowerLoss = futureValue - current;
    const equivalentToday = current / Math.pow(1 + rate, years);
    
    // Calculate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= years; year++) {
      const value = current * Math.pow(1 + rate, year);
      const purchasingPower = current / Math.pow(1 + rate, year);
      const loss = value - current;
      
      yearlyBreakdown.push({
        year,
        value: Math.round(value),
        purchasingPower: Math.round(purchasingPower),
        loss: Math.round(loss)
      });
    }
    
    setResults({
      futureValue: Math.round(futureValue),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
      equivalentToday: Math.round(equivalentToday),
      yearlyBreakdown
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)'}}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Inflation Impact Calculator</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Understand how inflation affects your money's purchasing power over time
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Inflation Analysis</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Current Amount
                </label>
                <input
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({...formData, currentAmount: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-2" />
                  Expected Inflation Rate (%)
                </label>
                <select
                  value={formData.inflationRate}
                  onChange={(e) => setFormData({...formData, inflationRate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8].map(rate => (
                    <option key={rate} value={rate}>{rate}%</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Time Period (Years)
                </label>
                <select
                  value={formData.years}
                  onChange={(e) => setFormData({...formData, years: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 10, 15, 20, 25, 30].map(year => (
                    <option key={year} value={year}>{year} years</option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateInflationImpact}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Calculate Inflation Impact
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Impact Analysis</h2>
            
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Amount Needed (Future Value)</span>
                      <span className="text-2xl font-bold text-red-600">
                        ${results.futureValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Purchasing Power Loss</span>
                      <span className="text-lg font-semibold text-red-500">
                        -${results.purchasingPowerLoss.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Today's Equivalent Value</span>
                      <span className="text-lg font-semibold text-orange-600">
                        ${results.equivalentToday.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Year-by-Year Impact</h3>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 text-left">Year</th>
                          <th className="p-2 text-right">Need</th>
                          <th className="p-2 text-right">Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyBreakdown.map((year) => (
                          <tr key={year.year} className="border-b">
                            <td className="p-2">{year.year}</td>
                            <td className="p-2 text-right font-medium">
                              ${year.value.toLocaleString()}
                            </td>
                            <td className="p-2 text-right text-red-600">
                              -${year.loss.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Educational Info */}
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>Understanding Inflation:</strong> This shows how much more money you'll need 
                    in the future to buy the same goods and services you can purchase today. 
                    It's crucial to factor inflation into your financial planning.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter values to see inflation impact analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-red-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Protect Your Wealth from Inflation</h3>
          <p className="mb-6 opacity-90">
            Our financial advisors can help you develop strategies to preserve and grow your purchasing power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Schedule Consultation
            </a>
            <a
              href="/quote"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-red-600 transition"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}