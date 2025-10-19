export class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const result = await this.db.executeQuery(`INSERT INTO users (
        email,
        password_hash,
        full_name,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`, [data.email, data.password_hash, data.full_name]);
        return result;
    }
    async findById(id) {
        const result = await this.db.executeQuery('SELECT * FROM users WHERE id = $1', [id]);
        return result;
    }
    async findOne(filter) {
        const conditions = Object.entries(filter)
            .map(([key, _], index) => `${key} = $${index + 1}`)
            .join(' AND ');
        const result = await this.db.executeQuery(`SELECT * FROM users WHERE ${conditions}`, Object.values(filter));
        return result;
    }
    async findMany(filter) {
        const conditions = Object.entries(filter)
            .map(([key, _], index) => `${key} = $${index + 1}`)
            .join(' AND ');
        const result = await this.db.executeQuery(`SELECT * FROM users ${conditions ? `WHERE ${conditions}` : ''}`, Object.values(filter));
        return result;
    }
    async update(id, data) {
        const setClause = Object.entries(data)
            .map(([key, _], index) => `${key} = $${index + 2}`)
            .join(', ');
        const result = await this.db.executeQuery(`UPDATE users
       SET ${setClause}, updated_at = NOW()
       WHERE id = $1
       RETURNING *`, [id, ...Object.values(data)]);
        return result;
    }
    async delete(id) {
        await this.db.executeQuery('DELETE FROM users WHERE id = $1', [id]);
    }
}
