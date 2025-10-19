'use client';
import React, { useState } from 'react';
import { Heart, Calculator, DollarSign, AlertCircle } from 'lucide-react';
export default function MedicareCostCalculator() {
    const [formData, setFormData] = useState({
        age: '',
        zipCode: '',
        income: '',
        currentHealthStatus: 'good',
        prescriptionDrugs: '1-2',
        supplementInsurance: 'yes',
        planType: 'advantage' // advantage vs original
    });
    const [results, setResults] = useState(null);
    // 2024 Medicare costs (would be updated annually)
    const medicareCosts = {
        partAPremium: 0, // Most people don't pay Part A premium
        partBStandardPremium: 174.70, // 2024 standard premium
        partBHighIncomeAdjustment: {
            'under87000': 0,
            '87001-109000': 69.90,
            '109001-136000': 174.70,
            '136001-163000': 279.50,
            '163001-196000': 384.30,
            'over196000': 489.10
        },
        partDPremiums: {
            'basic': 35,
            'enhanced': 65
        },
        supplementPremiums: {
            'planF': 200,
            'planG': 150,
            'planN': 120
        },
        advantagePremiums: {
            'low': 0,
            'medium': 50,
            'high': 100
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const calculateMedicareCosts = () => {
        const income = parseFloat(formData.income) || 0;
        const age = parseInt(formData.age) || 65;
        // Part B Premium calculation
        let partBPremium = medicareCosts.partBStandardPremium;
        if (income > 196000) {
            partBPremium += medicareCosts.partBHighIncomeAdjustment['over196000'];
        }
        else if (income > 163000) {
            partBPremium += medicareCosts.partBHighIncomeAdjustment['163001-196000'];
        }
        else if (income > 136000) {
            partBPremium += medicareCosts.partBHighIncomeAdjustment['136001-163000'];
        }
        else if (income > 109000) {
            partBPremium += medicareCosts.partBHighIncomeAdjustment['109001-136000'];
        }
        else if (income > 87000) {
            partBPremium += medicareCosts.partBHighIncomeAdjustment['87001-109000'];
        }
        let partDPremium = 0;
        let supplementPremium = 0;
        let outOfPocketMax = 0;
        if (formData.planType === 'advantage') {
            // Medicare Advantage
            const advantageLevel = formData.currentHealthStatus === 'poor' ? 'high' :
                formData.currentHealthStatus === 'fair' ? 'medium' : 'low';
            supplementPremium = medicareCosts.advantagePremiums[advantageLevel];
            outOfPocketMax = 8300; // 2024 Medicare Advantage out-of-pocket maximum
            // Part D usually included in Advantage plans
            partDPremium = 0;
        }
        else {
            // Original Medicare + Supplement
            if (formData.supplementInsurance === 'yes') {
                supplementPremium = medicareCosts.supplementPremiums.planG; // Most popular
            }
            // Part D
            const drugLevel = formData.prescriptionDrugs === '5+' ? 'enhanced' : 'basic';
            partDPremium = medicareCosts.partDPremiums[drugLevel];
            outOfPocketMax = formData.supplementInsurance === 'yes' ? 2000 : 11000; // Estimated
        }
        const totalMonthlyCost = partBPremium + partDPremium + supplementPremium;
        const annualCost = totalMonthlyCost * 12;
        // Generate recommendations
        const recommendations = [];
        if (formData.planType === 'advantage') {
            recommendations.push('Medicare Advantage includes prescription drug coverage and additional benefits');
            if (formData.currentHealthStatus === 'poor') {
                recommendations.push('Consider plans with lower copays for frequent medical visits');
            }
        }
        else {
            recommendations.push('Medigap Plan G offers comprehensive coverage with predictable costs');
            if (income < 50000) {
                recommendations.push('You may qualify for Medicare Savings Programs to help with costs');
            }
        }
        if (age < 65) {
            recommendations.push('Costs may vary if you qualify for Medicare due to disability');
        }
        if (formData.prescriptionDrugs === '5+') {
            recommendations.push('Review Part D formularies to ensure your medications are covered');
        }
        setResults({
            partBPremium,
            partDPremium,
            supplementPremium,
            totalMonthlyCost,
            annualCost,
            outOfPocketMax,
            recommendations
        });
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };
    return (<div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-red-500 mr-3"/>
              <h1 className="text-4xl font-bold text-primary">Medicare Cost Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estimate your Medicare premiums and out-of-pocket costs to plan your healthcare budget
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Medicare Information</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="65"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="12345"/>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Annual Income</label>
                  <input type="number" name="income" value={formData.income} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="50000"/>
                  <p className="text-sm text-gray-500 mt-1">Higher incomes may result in additional Part B premiums</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Current Health Status</label>
                  <select name="currentHealthStatus" value={formData.currentHealthStatus} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Number of Prescription Drugs</label>
                  <select name="prescriptionDrugs" value={formData.prescriptionDrugs} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="none">None</option>
                    <option value="1-2">1-2 medications</option>
                    <option value="3-4">3-4 medications</option>
                    <option value="5+">5+ medications</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Medicare Plan Type</label>
                  <select name="planType" value={formData.planType} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="advantage">Medicare Advantage (Part C)</option>
                    <option value="original">Original Medicare + Supplement</option>
                  </select>
                </div>

                {formData.planType === 'original' && (<div>
                    <label className="block text-gray-700 font-medium mb-2">Supplement Insurance (Medigap)</label>
                    <select name="supplementInsurance" value={formData.supplementInsurance} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="yes">Yes - Plan G (recommended)</option>
                      <option value="no">No supplement</option>
                    </select>
                  </div>)}

                <button onClick={calculateMedicareCosts} className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors">
                  Calculate Medicare Costs
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Estimated Medicare Costs</h2>
              
              {results ? (<div className="space-y-6">
                  {/* Total Cost Summary */}
                  <div className="bg-primary text-white rounded-lg p-6 text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-lg font-semibold mb-2">Estimated Monthly Cost</h3>
                    <p className="text-4xl font-bold">{formatCurrency(results.totalMonthlyCost)}</p>
                    <p className="text-lg mt-2">Annual: {formatCurrency(results.annualCost)}</p>
                  </div>

                  {/* Cost Breakdown */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Monthly Premium Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Part B Premium</span>
                        <span className="font-semibold">{formatCurrency(results.partBPremium)}</span>
                      </div>
                      {results.partDPremium > 0 && (<div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Part D (Prescription)</span>
                          <span className="font-semibold">{formatCurrency(results.partDPremium)}</span>
                        </div>)}
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">
                          {formData.planType === 'advantage' ? 'Advantage Plan' : 'Supplement Plan'}
                        </span>
                        <span className="font-semibold">{formatCurrency(results.supplementPremium)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Out-of-Pocket Maximum */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-2"/>
                      <h4 className="text-lg font-semibold text-blue-800">Annual Out-of-Pocket Maximum</h4>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.outOfPocketMax)}</p>
                    <p className="text-sm text-blue-600 mt-1">Maximum you'll pay for covered services in a year</p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Personalized Recommendations</h4>
                    <div className="space-y-3">
                      {results.recommendations.map((recommendation, index) => (<div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-gray-700">{recommendation}</p>
                        </div>))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Get Personalized Medicare Help</h4>
                    <p className="text-green-700 mb-4">
                      Medicare decisions can be complex. Our licensed agents can help you find the right plan for your needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="/quote?type=medicare" className="bg-primary text-white px-6 py-3 rounded-lg text-center hover:bg-primary-dark transition-colors">
                        Get Medicare Quote
                      </a>
                      <a href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg text-center hover:bg-primary-light transition-colors">
                        Speak with Agent
                      </a>
                    </div>
                  </div>
                </div>) : (<div className="text-center py-12 text-gray-500">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                  <p className="text-lg">Enter your information to estimate Medicare costs</p>
                </div>)}
            </div>
          </div>

          {/* Medicare Basics */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Medicare Costs</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">Part A - Hospital</h3>
                <p className="text-gray-600">
                  Most people don't pay a premium for Part A if they paid Medicare taxes while working. Covers hospital stays, skilled nursing, and hospice care.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Part B - Medical</h3>
                <p className="text-gray-600">
                  Covers doctor visits, outpatient care, and medical supplies. Standard premium is $174.70/month in 2024, but may be higher for higher incomes.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-3">Part D - Prescription</h3>
                <p className="text-gray-600">
                  Optional prescription drug coverage. Premiums vary by plan and income. Late enrollment may result in penalty fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
