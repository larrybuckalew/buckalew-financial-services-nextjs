'use client';
import React, { useState } from 'react';
import { TrendingUp, PiggyBank, Clock, Target } from 'lucide-react';
export default function RetirementCalculator() {
    const [formData, setFormData] = useState({
        currentAge: '',
        retirementAge: '65',
        currentSavings: '',
        monthlyContribution: '',
        employerMatch: '',
        expectedReturn: '7',
        inflationRate: '3',
        desiredIncomePercentage: '80'
    });
    const [results, setResults] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const calculateRetirement = () => {
        const currentAge = parseInt(formData.currentAge) || 30;
        const retirementAge = parseInt(formData.retirementAge) || 65;
        const currentSavings = parseFloat(formData.currentSavings) || 0;
        const monthlyContribution = parseFloat(formData.monthlyContribution) || 0;
        const employerMatch = parseFloat(formData.employerMatch) || 0;
        const expectedReturn = parseFloat(formData.expectedReturn) / 100 || 0.07;
        const inflationRate = parseFloat(formData.inflationRate) / 100 || 0.03;
        const desiredIncomePercentage = parseFloat(formData.desiredIncomePercentage) / 100 || 0.8;
        const yearsToRetirement = retirementAge - currentAge;
        const monthlyReturn = expectedReturn / 12;
        const totalMonthsToRetirement = yearsToRetirement * 12;
        // Calculate future value of current savings
        const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn, yearsToRetirement);
        // Calculate future value of monthly contributions
        const totalMonthlyContribution = monthlyContribution + employerMatch;
        const futureValueContributions = totalMonthlyContribution *
            ((Math.pow(1 + monthlyReturn, totalMonthsToRetirement) - 1) / monthlyReturn);
        const projectedSavings = futureValueCurrentSavings + futureValueContributions;
        // Estimate required income in retirement (based on current income estimate)
        // Using rule of thumb: need 10-12x annual expenses saved
        const estimatedCurrentIncome = (monthlyContribution / 0.1) * 12; // Assume 10% savings rate
        const desiredRetirementIncome = estimatedCurrentIncome * desiredIncomePercentage;
        // Adjust for inflation
        const inflationAdjustedIncome = desiredRetirementIncome * Math.pow(1 + inflationRate, yearsToRetirement);
        // Using 4% withdrawal rule - need 25x annual expenses
        const totalSavingsNeeded = inflationAdjustedIncome * 25;
        const shortfall = Math.max(0, totalSavingsNeeded - projectedSavings);
        const monthlyShortfall = shortfall / totalMonthsToRetirement;
        const recommendedMonthlyContribution = monthlyContribution + monthlyShortfall;
        // Breakdown calculations
        const yearlyContributions = monthlyContribution * 12 * yearsToRetirement;
        const employerContributions = employerMatch * 12 * yearsToRetirement;
        const investmentGrowth = projectedSavings - currentSavings - yearlyContributions - employerContributions;
        setResults({
            totalSavingsNeeded,
            projectedSavings,
            monthlyShortfall,
            recommendedMonthlyContribution,
            breakdown: {
                yearlyContributions,
                employerContributions,
                investmentGrowth
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
              <PiggyBank className="w-12 h-12 text-primary mr-3"/>
              <h1 className="text-4xl font-bold text-primary">Retirement Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your retirement savings and see if you're on track to meet your retirement goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Retirement Planning Details</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Age</label>
                    <input type="number" name="currentAge" value={formData.currentAge} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="30"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Retirement Age</label>
                    <select name="retirementAge" value={formData.retirementAge} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="60">60</option>
                      <option value="62">62</option>
                      <option value="65">65</option>
                      <option value="67">67</option>
                      <option value="70">70</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Retirement Savings</label>
                    <input type="number" name="currentSavings" value={formData.currentSavings} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="50000"/>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Monthly Contribution</label>
                    <input type="number" name="monthlyContribution" value={formData.monthlyContribution} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="500"/>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Employer Match (Monthly)</label>
                  <input type="number" name="employerMatch" value={formData.employerMatch} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="250"/>
                  <p className="text-sm text-gray-500 mt-1">How much your employer contributes to your 401(k) each month</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Expected Annual Return (%)</label>
                    <select name="expectedReturn" value={formData.expectedReturn} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="5">5% (Conservative)</option>
                      <option value="6">6% (Moderate)</option>
                      <option value="7">7% (Balanced)</option>
                      <option value="8">8% (Aggressive)</option>
                      <option value="9">9% (Very Aggressive)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Inflation Rate (%)</label>
                    <select name="inflationRate" value={formData.inflationRate} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="2">2%</option>
                      <option value="2.5">2.5%</option>
                      <option value="3">3%</option>
                      <option value="3.5">3.5%</option>
                      <option value="4">4%</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Desired Retirement Income (% of current income)</label>
                  <select name="desiredIncomePercentage" value={formData.desiredIncomePercentage} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    <option value="80">80%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                  </select>
                </div>

                <button onClick={calculateRetirement} className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors">
                  Calculate Retirement Plan
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Retirement Analysis</h2>
              
              {results ? (<div className="space-y-6">
                  {/* Savings Status */}
                  <div className={`rounded-lg p-6 text-center ${results.projectedSavings >= results.totalSavingsNeeded
                ? 'bg-green-100 border border-green-200'
                : 'bg-red-100 border border-red-200'}`}>
                    <Target className={`w-12 h-12 mx-auto mb-2 ${results.projectedSavings >= results.totalSavingsNeeded
                ? 'text-green-600'
                : 'text-red-600'}`}/>
                    <h3 className="text-lg font-semibold mb-2">
                      {results.projectedSavings >= results.totalSavingsNeeded
                ? '✅ On Track!'
                : '⚠️ Needs Attention'}
                    </h3>
                    <p className="text-sm mb-2">Projected Savings vs. Goal</p>
                    <div className="flex justify-between text-sm">
                      <span>Projected: {formatCurrency(results.projectedSavings)}</span>
                      <span>Needed: {formatCurrency(results.totalSavingsNeeded)}</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2"/>
                      <p className="text-sm text-blue-700">Years to Retirement</p>
                      <p className="text-xl font-bold text-blue-800">
                        {(parseInt(formData.retirementAge) || 65) - (parseInt(formData.currentAge) || 30)}
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2"/>
                      <p className="text-sm text-purple-700">Monthly Savings</p>
                      <p className="text-xl font-bold text-purple-800">
                        {formatCurrency((parseFloat(formData.monthlyContribution) || 0) + (parseFloat(formData.employerMatch) || 0))}
                      </p>
                    </div>
                  </div>

                  {/* Shortfall Analysis */}
                  {results.monthlyShortfall > 0 && (<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-yellow-800 mb-2">Gap Analysis</h4>
                      <p className="text-yellow-700 mb-2">
                        To meet your retirement goal, consider increasing your monthly contribution by:
                      </p>
                      <p className="text-2xl font-bold text-yellow-800">
                        {formatCurrency(results.monthlyShortfall)}
                      </p>
                      <p className="text-sm text-yellow-600 mt-2">
                        Recommended total monthly contribution: {formatCurrency(results.recommendedMonthlyContribution)}
                      </p>
                    </div>)}

                  {/* Breakdown */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Savings Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Your Contributions</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.yearlyContributions)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Employer Contributions</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.employerContributions)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Investment Growth</span>
                        <span className="font-semibold">{formatCurrency(results.breakdown.investmentGrowth)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Optimize Your Retirement Strategy</h4>
                    <p className="text-blue-700 mb-4">
                      Speak with a financial advisor to review your retirement plan and explore strategies to maximize your savings.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg text-center hover:bg-primary-dark transition-colors">
                        Schedule Consultation
                      </a>
                      <a href="/quote?type=retirement" className="border border-primary text-primary px-6 py-3 rounded-lg text-center hover:bg-primary-light transition-colors">
                        Explore IRAs
                      </a>
                    </div>
                  </div>
                </div>) : (<div className="text-center py-12 text-gray-500">
                  <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                  <p className="text-lg">Enter your information to analyze your retirement plan</p>
                </div>)}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Retirement Planning Tips</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Start Early</h3>
                <p className="text-gray-600">
                  Time is your greatest asset in retirement planning. The power of compound interest means starting early can dramatically increase your retirement savings.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Maximize Employer Match</h3>
                <p className="text-gray-600">
                  Always contribute enough to your 401(k) to get the full employer match. It's free money that can significantly boost your retirement savings.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Increase Contributions</h3>
                <p className="text-gray-600">
                  Try to increase your contribution rate by 1-2% each year, or whenever you receive a raise. Small increases can make a big difference over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
