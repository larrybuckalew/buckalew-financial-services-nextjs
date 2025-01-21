import { Pool, PoolClient } from 'pg';

export interface Transaction {
  executeQuery<T>(query: string, params?: any[]): Promise<T>;
}

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production',
    });
  }

  async connect(): Promise<void> {
    try {
      await this.pool.connect();
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }

  async executeQuery<T>(query: string, params?: any[]): Promise<T> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async executeTransaction<T>(
    callback: (transaction: Transaction) => Promise<T>
  ): Promise<T> {
    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const transaction: Transaction = {
        executeQuery: async <U>(query: string, params?: any[]): Promise<U> => {
          const result = await client.query(query, params);
          return result.rows[0];
        },
      };

      const result = await callback(transaction);
      
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}