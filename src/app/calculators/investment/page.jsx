'use client';
import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
export default function InvestmentCalculator() {
    const [formData, setFormData] = useState({
        initialInvestment: '',
        monthlyContribution: '',
        years: '10',
        expectedReturn: '7',
        compoundFrequency: 'monthly'
    });
    const [results, setResults] = useState(null);
    const calculateInvestment = () => {
        const initial = parseFloat(formData.initialInvestment) || 0;
        const monthly = parseFloat(formData.monthlyContribution) || 0;
        const years = parseFloat(formData.years) || 0;
        const rate = parseFloat(formData.expectedReturn) / 100 || 0;
        const monthlyRate = rate / 12;
        const totalMonths = years * 12;
        // Calculate compound interest with monthly contributions
        let balance = initial;
        let totalContributions = initial;
        const yearlyBreakdown = [];
        for (let year = 1; year <= years; year++) {
            let yearStartBalance = balance;
            let yearContributions = 0;
            for (let month = 1; month <= 12; month++) {
                balance = balance * (1 + monthlyRate) + monthly;
                yearContributions += monthly;
                totalContributions += monthly;
            }
            yearlyBreakdown.push({
                year,
                balance: Math.round(balance),
                contributions: Math.round(yearContributions),
                interest: Math.round(balance - yearStartBalance - yearContributions)
            });
        }
        const totalEarnings = balance - totalContributions;
        setResults({
            finalAmount: Math.round(balance),
            totalContributions: Math.round(totalContributions),
            totalEarnings: Math.round(totalEarnings),
            yearlyBreakdown
        });
    };
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Calculator</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Analyze potential investment returns and plan your financial growth
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2"/>
                  Initial Investment Amount
                </label>
                <input type="number" value={formData.initialInvestment} onChange={(e) => setFormData({ ...formData, initialInvestment: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10000"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2"/>
                  Monthly Contribution
                </label>
                <input type="number" value={formData.monthlyContribution} onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2"/>
                  Investment Period (Years)
                </label>
                <select value={formData.years} onChange={(e) => setFormData({ ...formData, years: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {[5, 10, 15, 20, 25, 30].map(year => (<option key={year} value={year}>{year} years</option>))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-2"/>
                  Expected Annual Return (%)
                </label>
                <select value={formData.expectedReturn} onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {[4, 5, 6, 7, 8, 9, 10, 12].map(rate => (<option key={rate} value={rate}>{rate}%</option>))}
                </select>
              </div>

              <button onClick={calculateInvestment} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Calculate Investment Growth
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Investment Projection</h2>
            
            {results ? (<div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Final Amount</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${results.finalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Contributions</span>
                      <span className="text-lg font-semibold text-blue-600">
                        ${results.totalContributions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Earnings</span>
                      <span className="text-lg font-semibold text-purple-600">
                        ${results.totalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Year-by-Year Breakdown</h3>
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 text-left">Year</th>
                          <th className="p-2 text-right">Balance</th>
                          <th className="p-2 text-right">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyBreakdown.map((year) => (<tr key={year.year} className="border-b">
                            <td className="p-2">{year.year}</td>
                            <td className="p-2 text-right font-medium">
                              ${year.balance.toLocaleString()}
                            </td>
                            <td className="p-2 text-right text-green-600">
                              +${year.interest.toLocaleString()}
                            </td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>) : (<div className="text-center text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                <p>Enter your investment details to see projections</p>
              </div>)}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
          <p className="mb-6 opacity-90">
            Our financial advisors can help you create a personalized investment strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Schedule Consultation
            </a>
            <a href="/quote" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </div>);
}
