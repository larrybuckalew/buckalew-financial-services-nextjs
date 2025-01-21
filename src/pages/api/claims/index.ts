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
        const claims = await prisma.claim.findMany({
          where: {
            userId: session.user.id
          },
          include: {
            policy: true
          },
          orderBy: {
            submittedAt: 'desc'
          }
        });
        return res.status(200).json(claims);
      } catch (error) {
        console.error('Error fetching claims:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { policyId, amount, description } = req.body;
        
        // Verify policy belongs to user
        const policy = await prisma.policy.findFirst({
          where: {
            id: policyId,
            userId: session.user.id
          }
        });

        if (!policy) {
          return res.status(404).json({ message: 'Policy not found' });
        }

        const claim = await prisma.claim.create({
          data: {
            policyId,
            userId: session.user.id,
            amount,
            description,
            status: 'PENDING'
          }
        });
        return res.status(201).json(claim);
      } catch (error) {
        console.error('Error creating claim:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}