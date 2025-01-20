import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { investmentCalculatorSchema } from '@/lib/validations/calculator';
import { calculateInvestmentGrowth } from '@/lib/calculations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const validatedData = investmentCalculatorSchema.parse(req.body);
      const result = calculateInvestmentGrowth(
        validatedData.initialInvestment,
        validatedData.monthlyContribution,
        validatedData.annualReturn,
        validatedData.investmentLength
      );

      const savedCalc = await prisma.investmentCalc.create({
        data: {
          userId: session.user.id,
          initialInvestment: validatedData.initialInvestment,
          monthlyContribution: validatedData.monthlyContribution,
          annualReturn: validatedData.annualReturn,
          investmentLength: validatedData.investmentLength,
          finalBalance: result.finalBalance,
          totalContributions: result.totalContributions,
          totalEarnings: result.totalEarnings,
        },
      });

      return res.status(201).json({
        ...savedCalc,
        yearlyBreakdown: result.yearlyBreakdown,
      });
    } catch (error) {
      console.error('Error saving investment calculation:', error);
      return res.status(400).json({ error: 'Invalid calculation data' });
    }
  }

  if (req.method === 'GET') {
    try {
      const calculations = await prisma.investmentCalc.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      });

      return res.status(200).json(calculations);
    } catch (error) {
      console.error('Error fetching investment calculations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}