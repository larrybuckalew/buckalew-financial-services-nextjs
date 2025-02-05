'use client';

import React, { useState, useCallback } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';
import { ExportButton } from './shared/ExportButton';

interface ExpenseCategory {
  name: string;
  monthlyAmount: number;
  isEssential: boolean;
}

interface CoverageAnalysis {
  period: string;
  expenses: number;
  income: number;
  gap: number;
}

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const IncomeProtectionCalculator: React.FC = () => {
  // Income and Expense Inputs
  const [salary, setSalary] = useState<number>(75000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState<number>(5000);
  const [essentialMonthlyExpenses, setEssentialMonthlyExpenses] = useState<number>(3500);
  const [emergencyFund, setEmergencyFund] = useState<number>(15000);

  // Employer Benefit Details
  const [employerSTD, setEmployerSTD] = useState<number>(60);
  const [stdDuration, setStdDuration] = useState<number>(90);
  const [employerLTD, setEmployerLTD] = useState<number>(50);
  const [ltdWaitingPeriod, setLtdWaitingPeriod] = useState<number>(90);

  // State for analysis results
  const [analysisResults, setAnalysisResults] = useState<CoverageAnalysis[]>([
    {
      period: '0-90 Days',
      expenses: totalMonthlyExpenses,
      income: salary * employerSTD / 100,
      gap: Math.max(0, totalMonthlyExpenses - (salary * employerSTD / 100))
    },
    {
      period: '91-180 Days',
      expenses: totalMonthlyExpenses,
      income: salary * employerLTD / 100,
      gap: Math.max(0, totalMonthlyExpenses - (salary * employerLTD / 100))
    },
    {
      period: '181+ Days',
      expenses: totalMonthlyExpenses,
      income: Math.max(salary * employerLTD / 100, 0),
      gap: Math.max(0, totalMonthlyExpenses - (salary * employerLTD / 100))
    }
  ]);

  // Calculation function
  const calculateCoverageGaps = useCallback(() => {
    const newAnalysisResults: CoverageAnalysis[] = [
      {
        period: '0-90 Days',
        expenses: totalMonthlyExpenses,
        income: salary * employerSTD / 100,
        gap: Math.max(0, totalMonthlyExpenses - (salary * employerSTD / 100))
      },
      {
        period: '91-180 Days',
        expenses: totalMonthlyExpenses,
        income: salary * employerLTD / 100,
        gap: Math.max(0, totalMonthlyExpenses - (salary * employerLTD / 100))
      },
      {
        period: '181+ Days',
        expenses: totalMonthlyExpenses,
        income: Math.max(salary * employerLTD / 100, 0),
        gap: Math.max(0, totalMonthlyExpenses - (salary * employerLTD / 100))
      }
    ];

    setAnalysisResults(newAnalysisResults);
  }, [salary, totalMonthlyExpenses, employerSTD, employerLTD]);

  return (
    <div className="space-y-6">
      {/* Input Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input 
          label="Annual Salary" 
          type="number" 
          value={salary} 
          onChange={(e) => setSalary(Number(e.target.value))} 
        />
        <Input 
          label="Other Monthly Income" 
          type="number" 
          value={otherIncome} 
          onChange={(e) => setOtherIncome(Number(e.target.value))} 
        />
        <Input 
          label="Total Monthly Expenses" 
          type="number" 
          value={totalMonthlyExpenses} 
          onChange={(e) => setTotalMonthlyExpenses(Number(e.target.value))} 
        />
        <Input 
          label="Essential Monthly Expenses" 
          type="number" 
          value={essentialMonthlyExpenses} 
          onChange={(e) => setEssentialMonthlyExpenses(Number(e.target.value))} 
        />
        <Input 
          label="Emergency Fund" 
          type="number" 
          value={emergencyFund} 
          onChange={(e) => setEmergencyFund(Number(e.target.value))} 
        />
        <Input 
          label="Employer Short-Term Disability %" 
          type="number" 
          value={employerSTD} 
          onChange={(e) => setEmployerSTD(Number(e.target.value))} 
        />
        <Input 
          label="Short-Term Disability Duration (Days)" 
          type="number" 
          value={stdDuration} 
          onChange={(e) => setStdDuration(Number(e.target.value))} 
        />
        <Input 
          label="Employer Long-Term Disability %" 
          type="number" 
          value={employerLTD} 
          onChange={(e) => setEmployerLTD(Number(e.target.value))} 
        />
        <Input 
          label="Long-Term Disability Waiting Period (Days)" 
          type="number" 
          value={ltdWaitingPeriod} 
          onChange={(e) => setLtdWaitingPeriod(Number(e.target.value))} 
        />
      </div>

      {/* Calculate Button */}
      <div className="text-center my-6">
        <button 
          onClick={calculateCoverageGaps}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate Coverage Gaps
        </button>
      </div>

      {/* Analysis Results Section */}
      {analysisResults.length > 0 && (
        <>
          <div className="bg-yellow-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Coverage Recommendations</h3>
            <div className="space-y-4">
              {analysisResults.some(period => period.gap > 0) ? (
                <>
                  <p className="text-yellow-800">
                    Based on your current situation, you have coverage gaps that should be addressed:
                  </p>
                  <ul className="space-y-2">
                    {analysisResults.map((period, index) => 
                      period.gap > 0 ? (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">⚠</span>
                          <span className="text-yellow-800">
                            {period.period}: {formatCurrency(period.gap)} coverage gap
                          </span>
                        </li>
                      ) : null
                    )}
                  </ul>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">1.</span>
                        <span>Consider supplemental disability insurance to cover these gaps</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">2.</span>
                        <span>Build your emergency fund to at least {formatCurrency(essentialMonthlyExpenses * 6)}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">3.</span>
                        <span>Review opportunities to maximize your employer disability benefits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">4.</span>
                        <span>Consider refinancing debts to lower essential monthly expenses</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <span className="text-green-500 text-xl mr-2">✓</span>
                    <p className="text-green-800 font-semibold">
                      Your current coverage appears adequate for your needs
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">
                    While your current coverage is sufficient, consider these steps to maintain your financial security:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Review coverage annually as income and expenses change</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Keep building your emergency fund for additional security</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Consider inflation when planning future coverage needs</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Coverage Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Current Protection</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Emergency fund covers {Math.round(emergencyFund / essentialMonthlyExpenses)} months
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    STD coverage: {employerSTD}% for {stdDuration} days
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    LTD coverage: {employerLTD}% after {ltdWaitingPeriod} days
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Monthly Budget</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Essential expenses: {formatCurrency(essentialMonthlyExpenses)}
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Discretionary: {formatCurrency(totalMonthlyExpenses - essentialMonthlyExpenses)}
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Current income: {formatCurrency((salary + otherIncome) / 12)}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 mt-6">
            <button
              onClick={() => window.location.href = '/contact'}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Schedule a Consultation
            </button>
            <ExportButton
              data={{
                currentSituation: {
                  income: { salary, otherIncome },
                  expenses: { total: totalMonthlyExpenses, essential: essentialMonthlyExpenses },
                  benefits: { std: employerSTD, ltd: employerLTD },
                  emergencyFund
                },
                coverageAnalysis: analysisResults,
                calculationDate: new Date().toISOString()
              }}
              filename="income-protection-analysis"
              type="csv"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeProtectionCalculator;