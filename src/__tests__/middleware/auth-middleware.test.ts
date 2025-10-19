import { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth-middleware';
import { SessionService } from '@/lib/auth/session-service';
import { RBACService } from '@/lib/auth/rbac-service';
import { Permission } from '@/lib/types/auth';

jest.mock('@/lib/auth/session-service');
jest.mock('@/lib/auth/rbac-service');

describe('Auth Middleware', () => {
  let mockReq: Partial<AuthenticatedRequest>;
  let mockRes: Partial<NextApiResponse>;
  let mockHandler: jest.Mock;
  let sessionService: jest.Mocked<SessionService>;
  let rbacService: jest.Mocked<RBACService>;

  beforeEach(() => {
    mockReq = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockHandler = jest.fn();
    sessionService = new SessionService(null) as jest.Mocked<SessionService>;
    rbacService = new RBACService(null) as jest.Mocked<RBACService>;
  });

  it('should pass authentication with valid token', async () => {
    const mockSession = {
      user_id: 'user-123',
      token: 'test-token',
    };

    sessionService.validateSession.mockResolvedValueOnce(mockSession);
    rbacService.getRoles.mockResolvedValueOnce(['user']);

    const handler = withAuth(mockHandler);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockHandler).toHaveBeenCalled();
    expect(mockReq.user).toBeDefined();
    expect(mockReq.user?.id).toBe('user-123');
  });

  it('should reject requests without authorization header', async () => {
    mockReq.headers = {};

    const handler = withAuth(mockHandler);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should handle malformed authorization header', async () => {
    mockReq.headers = {
      authorization: 'InvalidFormat',
    };

    const handler = withAuth(mockHandler);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should reject requests with invalid session', async () => {
    sessionService.validateSession.mockResolvedValueOnce(null);

    const handler = withAuth(mockHandler);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid session' });
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should check permissions when required', async () => {
    const mockSession = {
      user_id: 'user-123',
      token: 'test-token',
    };
    const requiredPermissions: Permission[] = ['read:users'];

    sessionService.validateSession.mockResolvedValueOnce(mockSession);
    rbacService.getRoles.mockResolvedValueOnce(['user']);
    rbacService.checkPermission.mockResolvedValueOnce(true);

    const handler = withAuth(mockHandler, requiredPermissions);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(rbacService.checkPermission).toHaveBeenCalledWith('user-123', 'read:users');
    expect(mockHandler).toHaveBeenCalled();
  });

  it('should reject requests with insufficient permissions', async () => {
    const mockSession = {
      user_id: 'user-123',
      token: 'test-token',
    };
    const requiredPermissions: Permission[] = ['manage:system'];

    sessionService.validateSession.mockResolvedValueOnce(mockSession);
    rbacService.getRoles.mockResolvedValueOnce(['user']);
    rbacService.checkPermission.mockResolvedValueOnce(false);

    const handler = withAuth(mockHandler, requiredPermissions);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Insufficient permissions' });
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should handle internal errors gracefully', async () => {
    sessionService.validateSession.mockRejectedValueOnce(new Error('Database error'));

    const handler = withAuth(mockHandler);
    await handler(mockReq as AuthenticatedRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
