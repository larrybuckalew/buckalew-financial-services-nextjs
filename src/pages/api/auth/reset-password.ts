import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/lib/auth/auth-service';
import { resetPasswordSchema } from '@/lib/validation/schemas/auth-schema';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRepository } from '@/lib/db/repositories/user-repository';
import { SessionService } from '@/lib/auth/session-service';
import { EmailService } from '@/lib/email/email-service';

const db = new DatabaseService();
const userRepository = new UserRepository(db);
const sessionService = new SessionService(db);
const authService = new AuthService(sessionService, userRepository, db);
const emailService = new EmailService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = resetPasswordSchema.parse(req.body);
    await authService.resetPassword(validatedData.email);
    
    // Always return success to prevent email enumeration
    return res.status(200).json({ 
      message: 'If an account exists with this email, you will receive password reset instructions' 
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}