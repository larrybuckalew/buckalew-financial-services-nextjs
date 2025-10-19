import { DatabaseService } from '../db/db-service';
import { UserRole, Permission } from '../types/auth';

export class RBACService {
  constructor(private db: DatabaseService) {}

  async assignRole(userId: string, role: UserRole): Promise<void> {
    await this.db.executeQuery(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES ($1, (SELECT id FROM roles WHERE name = $2))`,
      [userId, role]
    );
  }

  async checkPermission(userId: string, permission: Permission): Promise<boolean> {
    const result = await this.db.executeQuery<{ has_permission: boolean }>(
      `SELECT EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN role_permissions rp ON ur.role_id = rp.role_id
         JOIN permissions p ON rp.permission_id = p.id
         WHERE ur.user_id = $1 AND p.name = $2
       ) as has_permission`,
      [userId, permission]
    );

    return result.has_permission;
  }

  async getRoles(userId: string): Promise<UserRole[]> {
    const roles = await this.db.executeQuery<{ name: UserRole }[]>(
      `SELECT r.name
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = $1`,
      [userId]
    );

    return roles.map(r => r.name);
  }
}
