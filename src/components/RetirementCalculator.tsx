import React, { useState } from 'react';
import { FinancialCalculator, RetirementCalculatorInputs, RetirementProjection } from '../utils/financialCalculations';
import { PDFGenerator } from '../utils/pdfGenerator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetirementCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RetirementCalculatorInputs>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2,
    desiredRetirementIncome: 80000,
  });

  const [projections, setProjections] = useState<RetirementProjection[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateProjections = async () => {
    setIsLoading(true);
    try {
      const results = FinancialCalculator.calculateRetirementProjection(inputs);
      setProjections(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating projections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const pdfBytes = await PDFGenerator.generateRetirementReport('John Doe', inputs);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'retirement-report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Retirement Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Age</label>
            <input
              type="number"
              name="currentAge"
              value={inputs.currentAge}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
            <input
              type="number"
              name="retirementAge"
              value={inputs.retirementAge}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min={inputs.currentAge}
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Savings ($)</label>
            <input
              type="number"
              name="currentSavings"
              value={inputs.currentSavings}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Contribution ($)</label>
            <input
              type="number"
              name="monthlyContribution"
              value={inputs.monthlyContribution}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Return (%)</label>
            <input
              type="number"
              name="expectedReturn"
              value={inputs.expectedReturn}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              max="20"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
            <input
              type="number"
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              max="10"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Desired Retirement Income ($)</label>
            <input
              type="number"
              name="desiredRetirementIncome"
              value={inputs.desiredRetirementIncome}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="pt-4">
            <button
              onClick={calculateProjections}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Calculating...' : 'Calculate Retirement Projections'}
            </button>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Retirement Projections</h2>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projections}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom' }} />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(value).replace('.00', '')}
                    label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="savingsBalance"
                    name="Savings Balance"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download PDF Report
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projections.map((projection, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(projection.savingsBalance)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(projection.contributionsThisYear)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(projection.interestEarned)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;