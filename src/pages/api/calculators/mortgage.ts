import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { mortgageCalculatorSchema } from '@/lib/validations/calculator';
import { calculateMortgage } from '@/lib/calculations';

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
      const validatedData = mortgageCalculatorSchema.parse(req.body);
      const result = calculateMortgage(
        validatedData.principal,
        validatedData.interestRate,
        validatedData.loanTerm,
        validatedData.downPayment
      );

      const savedCalc = await prisma.mortgageCalc.create({
        data: {
          userId: session.user.id,
          principal: validatedData.principal,
          interestRate: validatedData.interestRate,
          loanTerm: validatedData.loanTerm,
          downPayment: validatedData.downPayment,
          monthlyPayment: result.monthlyPayment,
          totalPayment: result.totalPayment,
          totalInterest: result.totalInterest,
        },
      });

      return res.status(201).json(savedCalc);
    } catch (error) {
      console.error('Error saving mortgage calculation:', error);
      return res.status(400).json({ error: 'Invalid calculation data' });
    }
  }

  if (req.method === 'GET') {
    try {
      const calculations = await prisma.mortgageCalc.findMany({
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
      console.error('Error fetching mortgage calculations:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}