'use client'

import { useAuth } from '@/lib/auth/authContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [financialSummary, setFinancialSummary] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Fetch financial summary
    async function fetchFinancialSummary() {
      try {
        const response = await fetch('/api/financial-summary')
        const data = await response.json()
        setFinancialSummary(data)
      } catch (error) {
        console.error('Failed to fetch financial summary')
      }
    }

    fetchFinancialSummary()
  }, [user, router])

  if (!user) return null

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          {financialSummary ? (
            <div>
              <p>Total Assets: ${financialSummary.totalAssets}</p>
              <p>Total Liabilities: ${financialSummary.totalLiabilities}</p>
              <p>Net Worth: ${financialSummary.netWorth}</p>
            </div>
          ) : (
            <p>Loading financial data...</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={() => router.push('/calculators/retirement')}
            >
              Retirement Calculator
            </button>
            <button 
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={() => router.push('/calculators/investment')}
            >
              Investment Calculator
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role || 'User'}</p>
        </div>
      </div>
    </div>
  )
}
