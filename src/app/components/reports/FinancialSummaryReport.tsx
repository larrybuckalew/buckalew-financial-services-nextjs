import React, { useState, useEffect } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// Types for report data
interface ReportData {
  reportType: string
  data: any
  metadata: {
    generatedAt: string
    dateRange: {
      from: string
      to: string
    }
  }
}

interface FinancialSummaryReportProps {
  userId: string
  reportType?: 'summary' | 'trends' | 'type-breakdown' | 'comparative' | 'risk-assessment'
  dateFrom?: Date
  dateTo?: Date
}

export const FinancialSummaryReport: React.FC<FinancialSummaryReportProps> = ({
  userId,
  reportType = 'summary',
  dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  dateTo = new Date()
}) => {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReportData() {
      setIsLoading(true)
      setError(null)

      try {
        const queryParams = new URLSearchParams({
          reportType,
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString()
        })

        const response = await fetch(
          `/api/reports/financial-summary?${queryParams}`, 
          { method: 'GET' }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch report')
        }

        const data = await response.json()
        setReportData(data)
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : 'An unexpected error occurred'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [userId, reportType, dateFrom, dateTo])

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading report...</p>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    )
  }

  // Risk assessment report rendering
  const renderRiskAssessmentReport = () => {
    const { data } = reportData || {}
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Risk Assessment</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Calculation Type</th>
              <th className="border p-2">Calculation Count</th>
              <th className="border p-2">Avg Risk Score</th>
              <th className="border p-2">Max Risk Score</th>
              <th className="border p-2">Min Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.type} className="hover:bg-gray-50">
                <td className="border p-2">{item.type}</td>
                <td className="border p-2 text-right">{item.calculation_count}</td>
                <td className="border p-2 text-right">
                  {item.avg_risk_score ? item.avg_risk_score.toFixed(2) : 'N/A'}
                </td>
                <td className="border p-2 text-right">
                  {item.max_risk_score ? item.max_risk_score.toFixed(2) : 'N/A'}
                </td>
                <td className="border p-2 text-right">
                  {item.min_risk_score ? item.min_risk_score.toFixed(2) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-blue-700">
            Risk Score Interpretation:
            <ul className="list-disc pl-5">
              <li>0-3: Low Risk</li>
              <li>4-6: Moderate Risk</li>
              <li>7-10: High Risk</li>
            </ul>
          </p>
        </div>
      </div>
    )
  }

  // Metadata and additional context
  const renderReportMetadata = () => {
    if (!reportData || !reportData.metadata) return null

    return (
      <div className="text-sm text-gray-600 mt-4">
        <p>Generated: {new Date(reportData.metadata.generatedAt).toLocaleString()}</p>
        <p>
          Date Range: {new Date(reportData.metadata.dateRange.from).toLocaleDateString()} 
          {' '} to {' '}
          {new Date(reportData.metadata.dateRange.to).toLocaleDateString()}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold capitalize">
          {reportType.replace('-', ' ')} Report
        </h2>
      </div>

      {/* Render report content based on type */}
      <div className="report-content">
        {renderReportContent()}
      </div>

      {/* Render report metadata */}
      {renderReportMetadata()}
    </div>
  )

  // Render different report types
  function renderReportContent() {
    switch (reportType) {
      case 'summary':
        return renderSummaryReport()
      case 'trends':
        return renderTrendsReport()
      case 'type-breakdown':
        return renderTypeBreakdownReport()
      case 'comparative':
        return renderComparativeReport()
      case 'risk-assessment':
        return renderRiskAssessmentReport()
      default:
        return <p>Unsupported report type</p>
    }
  }

  // Summary report rendering (previous implementation)
  function renderSummaryReport() {
    const { data } = reportData || {}
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-2">Total Calculations</h3>
          <p>{data.totalCalculations}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-2">Total Amount</h3>
          <p>${data.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-2">Average Interest Rate</h3>
          <p>{(data.averageInterestRate * 100).toFixed(2)}%</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-2">Interest Earned</h3>
          <p>${data.interestEarned.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  // Trends report rendering (previous implementation)
  function renderTrendsReport() {
    const { data } = reportData || {}
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="calculation_count" 
            stroke="#8884d8" 
            name="Calculation Count" 
          />
          <Line 
            type="monotone" 
            dataKey="total_amount" 
            stroke="#82ca9d" 
            name="Total Amount" 
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  // Type breakdown report rendering (previous implementation)
  function renderTypeBreakdownReport() {
    const { data } = reportData || {}
    return (
      <div>
        {data.map((item) => (
          <div key={item.type} className="mb-2">
            <span>{item.type}: {item.count} calculations</span>
          </div>
        ))}
      </div>
    )
  }

  // Comparative report rendering (previous implementation)
  function renderComparativeReport() {
    const { data } = reportData || {}
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Avg Amount</th>
            <th>Avg Interest Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.type}>
              <td>{item.type}</td>
              <td>{item.calculation_count}</td>
              <td>${item.avg_amount.toLocaleString()}</td>
              <td>{(item.avg_interest_rate * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}