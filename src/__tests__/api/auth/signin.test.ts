import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/auth/signin';
import { AuthService } from '@/lib/auth/auth-service';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRepository } from '@/lib/db/repositories/user-repository';
import { SessionService } from '@/lib/auth/session-service';
import { RBACService } from '@/lib/auth/rbac-service';

jest.mock('@/lib/auth/auth-service');
jest.mock('@/lib/db/db-service');
jest.mock('@/lib/db/repositories/user-repository');
jest.mock('@/lib/auth/session-service');
jest.mock('@/lib/auth/rbac-service');

describe('/api/auth/signin', () => {
  let mockAuthService: jest.Mocked<AuthService>;
  let mockDbService: jest.Mocked<DatabaseService>;
  let mockUserRepo: jest.Mocked<UserRepository>;
  let mockSessionService: jest.Mocked<SessionService>;
  let mockRbacService: jest.Mocked<RBACService>;

  beforeEach(() => {
    mockDbService = new DatabaseService() as jest.Mocked<DatabaseService>;
    mockUserRepo = new UserRepository(null) as jest.Mocked<UserRepository>;
    mockSessionService = new SessionService(null) as jest.Mocked<SessionService>;
    mockAuthService = new AuthService(null, null, null) as jest.Mocked<AuthService>;
    mockRbacService = new RBACService(null) as jest.Mocked<RBACService>;
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed',
    });
  });

  it('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'invalid-email',
        password: '',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toHaveProperty('message');
  });

  it('should handle successful signin', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      full_name: 'Test User',
      password_hash: 'hashed_password',
    };

    const mockSession = {
      id: 'session-123',
      user_id: mockUser.id,
      token: 'test-token',
      expires_at: new Date(),
      created_at: new Date(),
    };

    mockAuthService.signIn.mockResolvedValueOnce(mockSession);
    mockUserRepo.findById.mockResolvedValueOnce(mockUser);
    mockRbacService.getRoles.mockResolvedValueOnce(['user']);

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({
      user: {
        id: mockUser.id,
        email: mockUser.email,
        full_name: mockUser.full_name,
      },
      session: {
        token: mockSession.token,
        expiresAt: mockSession.expires_at,
      },
      roles: ['user'],
    });
  });

  it('should handle invalid credentials', async () => {
    mockAuthService.signIn.mockRejectedValueOnce(
      new Error('Invalid credentials')
    );

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrong-password',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Invalid credentials',
    });
  });

  it('should set security headers', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await handler(req, res);

    expect(res.getHeader('X-Content-Type-Options')).toBe('nosniff');
    expect(res.getHeader('X-Frame-Options')).toBe('DENY');
    expect(res.getHeader('X-XSS-Protection')).toBe('1; mode=block');
    expect(res.getHeader('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains');
  });

  it('should handle internal errors gracefully', async () => {
    mockAuthService.signIn.mockRejectedValueOnce(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Internal server error',
    });
  });
});
