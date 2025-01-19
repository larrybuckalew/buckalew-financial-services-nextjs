import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // In a real-world scenario, you'd extract user ID from the authentication token
    const userId = request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock financial summary - in production, fetch real data from database
    const financialSummary = {
      totalAssets: 150000,
      totalLiabilities: 75000,
      netWorth: 75000,
      recentTransactions: [
        { id: 1, type: 'Income', amount: 5000 },
        { id: 2, type: 'Expense', amount: 2500 }
      ]
    }

    return NextResponse.json(financialSummary)
  } catch (error) {
    console.error('Financial summary error:', error)
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 })
  }
}
