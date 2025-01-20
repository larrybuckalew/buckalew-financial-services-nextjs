import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { retirementCalculatorSchema } from '@/lib/validations/calculator';
import { calculateRetirement } from '@/lib/calculations';

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
      const validatedData = retirementCalculatorSchema.parse(req.body);
      const result = calculateRetirement(
        validatedData.currentAge,
        validatedData.retirementAge,
        validatedData.currentSavings,
        validatedData.monthlyContribution,
        validatedData.annualReturn,
        validatedData.desiredRetirementIncome
      );

      const savedCalc = await prisma.retirementCalc.create({
        data: {
          userId: session.user.id,
          currentAge: validatedData.currentAge,
          retirementAge: validatedData.retirementAge,
          currentSavings: validatedData.currentSavings,
          monthlyContribution: validatedData.monthlyContribution,
          annualReturn: validatedData.annualReturn,
          desiredRetirementIncome: validatedData.desiredRetirementIncome,
          savingsAtRetirement: result.savingsAtRetirement,
          monthlyRetirementIncome: result.monthlyRetirementIncome,
          savingsGap: result.savingsGap,
          additionalMonthlySavingsNeeded: result.additionalMonthlySavingsNeeded,
        },
      });

      return res.status(201).json({
        ...savedCalc,
        projectedBreakdown: result.projectedBreakdown,
      });
    } catch (error) {
      console.error('Error saving retirement calculation:', error);
      return res.status(400).json({ error: 'Invalid calculation data' });
    }
  }

  if (req.method === 'GET') {
    try {
      const calculations = await prisma.retirementCalc.findMany({
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
      console.error('Error fetching retirement calculations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}