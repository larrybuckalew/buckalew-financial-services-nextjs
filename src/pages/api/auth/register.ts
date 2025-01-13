import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser, validatePassword } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
      });
    }

    const { user, emailVerifyToken } = await registerUser({
      email,
      password,
      name,
    });

    return res.status(201).json({
      message: 'Registration successful',
      user,
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}