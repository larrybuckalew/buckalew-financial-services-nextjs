import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// Zod validation schema for profile update
const ProfileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  address: z.string().optional(),
  occupation: z.string().optional()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'PUT') {
      // Validate input
      const validatedData = ProfileUpdateSchema.parse(req.body);

      // Update user and profile
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: validatedData.name,
          email: validatedData.email,
          profile: {
            upsert: {
              create: {
                phoneNumber: validatedData.phoneNumber,
                address: validatedData.address,
                occupation: validatedData.occupation
              },
              update: {
                phoneNumber: validatedData.phoneNumber,
                address: validatedData.address,
                occupation: validatedData.occupation
              }
            }
          }
        },
        include: { profile: true }
      });

      return res.status(200).json(updatedUser);
    } else {
      res.setHeader('Allow', ['PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Profile Update Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation Failed',
        details: error.errors
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}