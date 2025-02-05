import { DatabaseService } from '../db-service';
import { User, UserData } from '../../types/user';

export class UserRepository {
  constructor(private db: DatabaseService) {}

  async create(data: Partial<User>): Promise<User> {
    const result = await this.db.executeQuery<User>(
      `INSERT INTO users (
        email,
        password_hash,
        full_name,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [data.email, data.password_hash, data.full_name]
    );

    return result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.executeQuery<User | null>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    return result;
  }

  async findOne(filter: Partial<User>): Promise<User | null> {
    const conditions = Object.entries(filter)
      .map(([key, _], index) => `${key} = $${index + 1}`)
      .join(' AND ');

    const result = await this.db.executeQuery<User | null>(
      `SELECT * FROM users WHERE ${conditions}`,
      Object.values(filter)
    );

    return result;
  }

  async findMany(filter: Partial<User>): Promise<User[]> {
    const conditions = Object.entries(filter)
      .map(([key, _], index) => `${key} = $${index + 1}`)
      .join(' AND ');

    const result = await this.db.executeQuery<User[]>(
      `SELECT * FROM users ${conditions ? `WHERE ${conditions}` : ''}`,
      Object.values(filter)
    );

    return result;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const setClause = Object.entries(data)
      .map(([key, _], index) => `${key} = $${index + 2}`)
      .join(', ');

    const result = await this.db.executeQuery<User>(
      `UPDATE users
       SET ${setClause}, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, ...Object.values(data)]
    );

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.executeQuery(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
  }
}