import { NextApiRequest, NextApiResponse } from 'next';
import { verifyEmail } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: 'Token is required',
      });
    }

    const user = await verifyEmail(token);
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      message: 'Email verified successfully',
      user: safeUser,
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(400).json({
      error: 'Invalid or expired verification token',
    });
  }
}