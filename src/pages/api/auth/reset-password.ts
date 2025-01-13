import { NextApiRequest, NextApiResponse } from 'next';
import { initiatePasswordReset } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    await initiatePasswordReset(email);

    return res.status(200).json({
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}