import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/lib/auth/auth-service';
import { signInSchema } from '@/lib/validation/schemas/auth-schema';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRepository } from '@/lib/db/repositories/user-repository';
import { SessionService } from '@/lib/auth/session-service';
import { RBACService } from '@/lib/auth/rbac-service';

const db = new DatabaseService();
const userRepository = new UserRepository(db);
const sessionService = new SessionService(db);
const authService = new AuthService(sessionService, userRepository, db);
const rbacService = new RBACService(db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = signInSchema.parse(req.body);
    
    const session = await authService.signIn(
      validatedData.email,
      validatedData.password
    );

    const user = await userRepository.findById(session.user_id);
    const roles = await rbacService.getRoles(user.id);

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      user: userWithoutPassword,
      session: {
        token: session.token,
        expiresAt: session.expires_at,
      },
      roles,
    });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}