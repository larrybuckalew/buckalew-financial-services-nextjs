import { SessionService } from '@/lib/auth/session-service';
import { DatabaseService } from '@/lib/db/db-service';
import { Session } from '@/lib/types/session';

jest.mock('@/lib/db/db-service');

describe('SessionService', () => {
  let sessionService: SessionService;
  let db: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    db = new DatabaseService() as jest.Mocked<DatabaseService>;
    sessionService = new SessionService(db);
  });

  describe('createSession', () => {
    it('should create a new session successfully', async () => {
      const userId = 'user-123';
      const mockSession: Session = {
        id: 'session-123',
        user_id: userId,
        token: expect.any(String),
        expires_at: expect.any(Date),
        created_at: expect.any(Date),
      };

      db.executeQuery.mockResolvedValueOnce(mockSession);

      const result = await sessionService.createSession(userId);

      expect(result).toEqual(mockSession);
      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO sessions'),
        expect.arrayContaining([userId])
      );
    });
  });

  describe('validateSession', () => {
    it('should return true for valid session', async () => {
      const sessionId = 'session-123';
      const mockSession: Session = {
        id: sessionId,
        user_id: 'user-123',
        token: 'token-123',
        expires_at: new Date(Date.now() + 3600000),
        created_at: new Date(),
      };

      db.executeQuery.mockResolvedValueOnce(mockSession);

      const result = await sessionService.validateSession(sessionId);

      expect(result).toBe(true);
      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM sessions'),
        [sessionId]
      );
    });

    it('should return false for expired session', async () => {
      const sessionId = 'session-123';

      db.executeQuery.mockResolvedValueOnce(null);

      const result = await sessionService.validateSession(sessionId);

      expect(result).toBe(false);
    });
  });

  describe('revokeSession', () => {
    it('should revoke session successfully', async () => {
      const sessionId = 'session-123';

      db.executeQuery.mockResolvedValueOnce(undefined);

      await sessionService.revokeSession(sessionId);

      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM sessions'),
        [sessionId]
      );
    });
  });

  describe('refreshSession', () => {
    it('should refresh session expiry successfully', async () => {
      const sessionId = 'session-123';
      const mockSession: Session = {
        id: sessionId,
        user_id: 'user-123',
        token: 'token-123',
        expires_at: expect.any(Date),
        created_at: new Date(),
      };

      db.executeQuery.mockResolvedValueOnce(mockSession);

      const result = await sessionService.refreshSession(sessionId);

      expect(result).toEqual(mockSession);
      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE sessions'),
        expect.arrayContaining([sessionId])
      );
    });

    it('should throw error when session not found', async () => {
      const sessionId = 'session-123';

      db.executeQuery.mockResolvedValueOnce(null);

      await expect(sessionService.refreshSession(sessionId))
        .rejects.toThrow('Session not found');
    });
  });
});
