'use client';
import React, { useState } from 'react';
import { Calculator, DollarSign, Users, TrendingUp } from 'lucide-react';
export default function LifeInsuranceCalculator() {
    const [formData, setFormData] = useState({
        age: '',
        annualIncome: '',
        currentDebt: '',
        mortgageBalance: '',
        dependents: '',
        spouseIncome: '',
        desiredYearsOfCoverage: '',
        existingLifeInsurance: '',
        finalExpenses: '15000' // Default funeral costs
    });
    const [results, setResults] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const calculateLifeInsurance = () => {
        const age = parseInt(formData.age) || 0;
        const annualIncome = parseFloat(formData.annualIncome) || 0;
        const currentDebt = parseFloat(formData.currentDebt) || 0;
        const mortgageBalance = parseFloat(formData.mortgageBalance) || 0;
        const dependents = parseInt(formData.dependents) || 0;
        const spouseIncome = parseFloat(formData.spouseIncome) || 0;
        const yearsOfCoverage = parseInt(formData.desiredYearsOfCoverage) || 10;
        const existingCoverage = parseFloat(formData.existingLifeInsurance) || 0;
        const finalExpenses = parseFloat(formData.finalExpenses) || 15000;
        // Income replacement calculation
        const netIncomeToReplace = annualIncome - spouseIncome;
        const incomeReplacement = netIncomeToReplace * yearsOfCoverage;
        // Debt coverage
        const debtCoverage = currentDebt + mortgageBalance;
        // Dependents coverage (education and care)
        const dependentsCoverage = dependents * 100000; // $100k per dependent for education
        // Total coverage needed
        const totalCoverageNeeded = incomeReplacement + debtCoverage + finalExpenses + dependentsCoverage;
        const recommendedCoverage = Math.max(0, totalCoverageNeeded - existingCoverage);
        // Monthly premium estimate (rough calculation based on age and coverage)
        let premiumRate = 0.001; // Base rate per $1000 of coverage
        if (age > 30)
            premiumRate += 0.0005;
        if (age > 40)
            premiumRate += 0.001;
        if (age > 50)
            premiumRate += 0.002;
        if (age > 60)
            premiumRate += 0.004;
        const monthlyPremiumEstimate = (recommendedCoverage * premiumRate) / 12;
        setResults({
            recommendedCoverage,
            monthlyPremiumEstimate,
            breakdown: {
                incomeReplacement,
                debtCoverage,
                finalExpenses,
                dependentsCoverage
            }
        });
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };
    return (<div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-primary mr-3"/>
              <h1 className="text-4xl font-bold text-primary">Life Insurance Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate how much life insurance coverage you need to protect your family's financial future
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Information</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="35"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Annual Income</label>
                    <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="75000"/>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Debt (excluding mortgage)</label>
                    <input type="number" name="currentDebt" value={formData.currentDebt} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="25000"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Mortgage Balance</label>
                    <input type="number" name="mortgageBalance" value={formData.mortgageBalance} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="200000"/>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Number of Dependents</label>
                    <input type="number" name="dependents" value={formData.dependents} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="2"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Spouse's Annual Income</label>
                    <input type="number" name="spouseIncome" value={formData.spouseIncome} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="50000"/>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Years of Coverage Needed</label>
                    <select name="desiredYearsOfCoverage" value={formData.desiredYearsOfCoverage} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select years</option>
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Existing Life Insurance</label>
                    <input type="number" name="existingLifeInsurance" value={formData.existingLifeInsurance} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="100000"/>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Final Expenses</label>
                  <input type="number" name="finalExpenses" value={formData.finalExpenses} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="15000"/>
                  <p className="text-sm text-gray-500 mt-1">Funeral and burial costs (typically $10,000-$20,000)</p>
                </div>

                <button onClick={calculateLifeInsurance} className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors">
                  Calculate Coverage Needed
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Coverage</h2>
              
              {results ? (<div className="space-y-6">
                  {/* Main Result */}
                  <div className="bg-primary text-white rounded-lg p-6 text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-lg font-semibold mb-2">Recommended Coverage</h3>
                    <p className="text-4xl font-bold">{formatCurrency(results.recommendedCoverage)}</p>
                  </div>

                  {/* Premium Estimate */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2"/>
                      <h4 className="text-lg font-semibold text-green-800">Estimated Monthly Premium</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(results.monthlyPremiumEstimate)}</p>
                    <p className="text-sm text-green-600 mt-1">*Based on term life insurance rates</p>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Coverage Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Income Replacement</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.incomeReplacement)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Debt Coverage</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.debtCoverage)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Final Expenses</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.finalExpenses)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Dependents Coverage</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.dependentsCoverage)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Users className="w-6 h-6 text-blue-600 mr-2"/>
                      <h4 className="text-lg font-semibold text-blue-800">Ready to Protect Your Family?</h4>
                    </div>
                    <p className="text-blue-700 mb-4">
                      Get personalized life insurance quotes from top-rated insurers and secure your family's future today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="/quote?type=life" className="bg-primary text-white px-6 py-3 rounded-lg text-center hover:bg-primary-dark transition-colors">
                        Get Free Quote
                      </a>
                      <a href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg text-center hover:bg-primary-light transition-colors">
                        Speak with Agent
                      </a>
                    </div>
                  </div>
                </div>) : (<div className="text-center py-12 text-gray-500">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                  <p className="text-lg">Enter your information to see your recommended coverage</p>
                </div>)}
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Life Insurance Coverage</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Income Replacement</h3>
                <p className="text-gray-600">
                  Replace the income your family would lose if you pass away. This helps maintain their standard of living and covers everyday expenses.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Debt Coverage</h3>
                <p className="text-gray-600">
                  Pay off outstanding debts including mortgage, car loans, credit cards, and other obligations so your family isn't burdened.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Future Expenses</h3>
                <p className="text-gray-600">
                  Cover future costs like children's education, final expenses, and provide financial security for major life events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
