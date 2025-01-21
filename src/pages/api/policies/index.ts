import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const policies = await prisma.policy.findMany({
          where: {
            userId: session.user.id
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        return res.status(200).json(policies);
      } catch (error) {
        console.error('Error fetching policies:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { type, coverage, premium, startDate, endDate } = req.body;
        const policy = await prisma.policy.create({
          data: {
            userId: session.user.id,
            type,
            coverage,
            premium,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            status: 'ACTIVE'
          }
        });
        return res.status(201).json(policy);
      } catch (error) {
        console.error('Error creating policy:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}