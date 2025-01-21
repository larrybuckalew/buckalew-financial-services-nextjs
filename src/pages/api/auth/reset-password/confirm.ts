import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/lib/auth/auth-service';
import { confirmResetPasswordSchema } from '@/lib/validation/schemas/auth-schema';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRepository } from '@/lib/db/repositories/user-repository';
import { SessionService } from '@/lib/auth/session-service';

const db = new DatabaseService();
const userRepository = new UserRepository(db);
const sessionService = new SessionService(db);
const authService = new AuthService(sessionService, userRepository, db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = confirmResetPasswordSchema.parse(req.body);
    await authService.confirmResetPassword(
      validatedData.token,
      validatedData.password
    );
    
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset confirmation error:', error);
    
    if (error.message === 'Invalid or expired token') {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
}