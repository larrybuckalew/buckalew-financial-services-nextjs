import { hash, verify } from 'argon2';
import { SessionService } from './session-service';
import { DatabaseService } from '../db/db-service';
import { UserRepository } from '../db/repositories/user-repository';
import { User, UserData } from '../types/user';
import { Session } from '../types/session';

export class AuthService {
  constructor(
    private sessionService: SessionService,
    private userRepository: UserRepository,
    private db: DatabaseService
  ) {}

  async signUp(email: string, password: string, userData: UserData): Promise<User> {
    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password);
    const user = await this.userRepository.create({
      ...userData,
      email,
      password_hash: passwordHash,
    });

    return user;
  }

  async signIn(email: string, password: string): Promise<Session> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await verify(user.password_hash, password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const session = await this.sessionService.createSession(user.id);
    await this.userRepository.update(user.id, { last_login: new Date() });

    return session;
  }

  async signOut(sessionId: string): Promise<void> {
    await this.sessionService.revokeSession(sessionId);
  }

  async resetPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      // Return silently to prevent email enumeration
      return;
    }

    // TODO: Implement password reset token generation and email sending
    throw new Error('Not implemented');
  }

  async confirmResetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Implement password reset confirmation
    throw new Error('Not implemented');
  }
}