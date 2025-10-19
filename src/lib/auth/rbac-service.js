export class RBACService {
    constructor(db) {
        this.db = db;
    }
    async assignRole(userId, role) {
        await this.db.executeQuery(`INSERT INTO user_roles (user_id, role_id)
       VALUES ($1, (SELECT id FROM roles WHERE name = $2))`, [userId, role]);
    }
    async checkPermission(userId, permission) {
        const result = await this.db.executeQuery(`SELECT EXISTS (
         SELECT 1 FROM user_roles ur
         JOIN role_permissions rp ON ur.role_id = rp.role_id
         JOIN permissions p ON rp.permission_id = p.id
         WHERE ur.user_id = $1 AND p.name = $2
       ) as has_permission`, [userId, permission]);
        return result.has_permission;
    }
    async getRoles(userId) {
        const roles = await this.db.executeQuery(`SELECT r.name
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = $1`, [userId]);
        return roles.map(r => r.name);
    }
}
