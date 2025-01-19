import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req, res);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Error verifying token' });
  }
}