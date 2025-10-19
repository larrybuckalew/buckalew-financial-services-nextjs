import { RBACService } from '@/lib/auth/rbac-service';
import { DatabaseService } from '@/lib/db/db-service';
import { UserRole, Permission } from '@/lib/types/auth';

jest.mock('@/lib/db/db-service');

describe('RBACService', () => {
  let rbacService: RBACService;
  let db: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    db = new DatabaseService() as jest.Mocked<DatabaseService>;
    rbacService = new RBACService(db);
  });

  describe('assignRole', () => {
    it('should assign role to user successfully', async () => {
      const userId = 'user-123';
      const role: UserRole = 'admin';

      db.executeQuery.mockResolvedValueOnce(undefined);

      await rbacService.assignRole(userId, role);

      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO user_roles'),
        [userId, role]
      );
    });
  });

  describe('checkPermission', () => {
    it('should return true when user has permission', async () => {
      const userId = 'user-123';
      const permission: Permission = 'read:users';

      db.executeQuery.mockResolvedValueOnce({ has_permission: true });

      const result = await rbacService.checkPermission(userId, permission);

      expect(result).toBe(true);
      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('SELECT EXISTS'),
        [userId, permission]
      );
    });

    it('should return false when user does not have permission', async () => {
      const userId = 'user-123';
      const permission: Permission = 'manage:system';

      db.executeQuery.mockResolvedValueOnce({ has_permission: false });

      const result = await rbacService.checkPermission(userId, permission);

      expect(result).toBe(false);
    });
  });

  describe('getRoles', () => {
    it('should return user roles successfully', async () => {
      const userId = 'user-123';
      const expectedRoles: UserRole[] = ['admin', 'manager'];

      db.executeQuery.mockResolvedValueOnce(
        expectedRoles.map(name => ({ name }))
      );

      const result = await rbacService.getRoles(userId);

      expect(result).toEqual(expectedRoles);
      expect(db.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('SELECT r.name'),
        [userId]
      );
    });

    it('should return empty array when user has no roles', async () => {
      const userId = 'user-123';

      db.executeQuery.mockResolvedValueOnce([]);

      const result = await rbacService.getRoles(userId);

      expect(result).toEqual([]);
    });
  });
});
