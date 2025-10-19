'use client';
import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
export default function LoanComparisonCalculator() {
    const [loan1, setLoan1] = useState({
        amount: '',
        rate: '',
        term: '30'
    });
    const [loan2, setLoan2] = useState({
        amount: '',
        rate: '',
        term: '30'
    });
    const [results, setResults] = useState(null);
    const calculateLoan = (amount, rate, termYears) => {
        const monthlyRate = rate / 100 / 12;
        const numPayments = termYears * 12;
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
        const totalCost = monthlyPayment * numPayments;
        const totalInterest = totalCost - amount;
        return {
            monthlyPayment: Math.round(monthlyPayment),
            totalInterest: Math.round(totalInterest),
            totalCost: Math.round(totalCost)
        };
    };
    const compareLoans = () => {
        const amount1 = parseFloat(loan1.amount) || 0;
        const rate1 = parseFloat(loan1.rate) || 0;
        const term1 = parseFloat(loan1.term) || 0;
        const amount2 = parseFloat(loan2.amount) || 0;
        const rate2 = parseFloat(loan2.rate) || 0;
        const term2 = parseFloat(loan2.term) || 0;
        if (amount1 <= 0 || amount2 <= 0)
            return;
        const result1 = calculateLoan(amount1, rate1, term1);
        const result2 = calculateLoan(amount2, rate2, term2);
        const monthlyDifference = Math.abs(result1.monthlyPayment - result2.monthlyPayment);
        const totalSavings = Math.abs(result1.totalCost - result2.totalCost);
        const betterOption = result1.totalCost < result2.totalCost ? 'Loan 1' : 'Loan 2';
        setResults({
            loan1: result1,
            loan2: result2,
            savings: {
                monthlyDifference,
                totalSavings,
                betterOption
            }
        });
    };
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Comparison Calculator</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Compare loan options and find the best deal for your financial situation
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loan 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Loan Option 1</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2"/>
                  Loan Amount
                </label>
                <input type="number" value={loan1.amount} onChange={(e) => setLoan1({ ...loan1, amount: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="300000"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-2"/>
                  Interest Rate (%)
                </label>
                <input type="number" step="0.01" value={loan1.rate} onChange={(e) => setLoan1({ ...loan1, rate: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="4.5"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2"/>
                  Loan Term (Years)
                </label>
                <select value={loan1.term} onChange={(e) => setLoan1({ ...loan1, term: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>

            {results && (<div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">${results.loan1.monthlyPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-semibold">${results.loan1.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-semibold">${results.loan1.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Loan 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-600">Loan Option 2</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2"/>
                  Loan Amount
                </label>
                <input type="number" value={loan2.amount} onChange={(e) => setLoan2({ ...loan2, amount: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="300000"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-2"/>
                  Interest Rate (%)
                </label>
                <input type="number" step="0.01" value={loan2.rate} onChange={(e) => setLoan2({ ...loan2, rate: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="3.75"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2"/>
                  Loan Term (Years)
                </label>
                <select value={loan2.term} onChange={(e) => setLoan2({ ...loan2, term: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>

            {results && (<div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">${results.loan2.monthlyPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-semibold">${results.loan2.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-semibold">${results.loan2.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Comparison Results */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Comparison Results</h3>
            
            <div className="text-center mb-6">
              <button onClick={compareLoans} className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Compare Loans
              </button>
            </div>

            {results ? (<div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">Better Option</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {results.savings.betterOption}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">Monthly Difference</h4>
                  <p className="text-lg font-semibold text-green-600">
                    ${results.savings.monthlyDifference.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">Total Savings</h4>
                  <p className="text-lg font-semibold text-green-600">
                    ${results.savings.totalSavings.toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Consider factors beyond just cost, such as loan terms, 
                    lender reputation, and prepayment options when making your decision.
                  </p>
                </div>
              </div>) : (<div className="text-center text-gray-500">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50"/>
                <p>Enter loan details to compare options</p>
              </div>)}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Loan?</h3>
          <p className="mb-6 opacity-90">
            Our financial advisors can help you navigate loan options and find the best fit for your needs.
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
