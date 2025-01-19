import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const profile = await prisma.profile.findUnique({
        where: { userId: session.user.id },
        include: { user: { select: { email: true, name: true, role: true } } },
      });

      return res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { phoneNumber, address, city, state, zip, dateOfBirth, riskProfile, investmentGoals } = req.body;

      const updatedProfile = await prisma.profile.update({
        where: { userId: session.user.id },
        data: {
          phoneNumber,
          address,
          city,
          state,
          zip,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
          riskProfile,
          investmentGoals,
        },
      });

      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}