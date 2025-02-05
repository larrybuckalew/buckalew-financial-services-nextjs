import { AuthService } from '@/lib/auth/auth-service';
import { SessionService } from '@/lib/auth/session-service';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRepository } from '@/lib/db/repositories/user-repository';
import { User } from '@/lib/types/user';

// Mock dependencies
jest.mock('@/lib/auth/session-service');
jest.mock('@/lib/db/db-service');
jest.mock('@/lib/db/repositories/user-repository');

describe('AuthService', () => {
  let authService: AuthService;
  let sessionService: jest.Mocked<SessionService>;
  let userRepository: jest.Mocked<UserRepository>;
  let db: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    sessionService = new SessionService(null) as jest.Mocked<SessionService>;
    userRepository = new UserRepository(null) as jest.Mocked<UserRepository>;
    db = new DatabaseService() as jest.Mocked<DatabaseService>;
    authService = new AuthService(sessionService, userRepository, db);
  });

  describe('signUp', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        full_name: 'Test User',
      };

      const expectedUser: Partial<User> = {
        id: '123',
        email: userData.email,
        full_name: userData.full_name,
        password_hash: expect.any(String),
      };

      userRepository.findOne.mockResolvedValueOnce(null);
      userRepository.create.mockResolvedValueOnce(expectedUser as User);

      const result = await authService.signUp('test@example.com', 'password123', userData);

      expect(userRepository.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(userRepository.create).toHaveBeenCalled();
      expect(result).toEqual(expectedUser);
    });

    it('should throw error if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        full_name: 'Test User',
      };

      userRepository.findOne.mockResolvedValueOnce({ id: '123' } as User);

      await expect(
        authService.signUp('test@example.com', 'password123', userData)
      ).rejects.toThrow('User already exists');
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        password_hash: await authService.hashPassword('password123'),
      } as User;

      const mockSession = {
        id: 'session-123',
        token: 'token-123',
      };

      userRepository.findOne.mockResolvedValueOnce(mockUser);
      sessionService.createSession.mockResolvedValueOnce(mockSession);

      const result = await authService.signIn('test@example.com', 'password123');

      expect(userRepository.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(sessionService.createSession).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockSession);
    });

    it('should throw error for invalid credentials', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        authService.signIn('test@example.com', 'password123')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signOut', () => {
    it('should revoke session successfully', async () => {
      const sessionId = 'session-123';
      
      await authService.signOut(sessionId);

      expect(sessionService.revokeSession).toHaveBeenCalledWith(sessionId);
    });
  });
});
