import { Pool } from 'pg';
export class DatabaseService {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production',
        });
    }
    async connect() {
        try {
            await this.pool.connect();
        }
        catch (error) {
            console.error('Failed to connect to database:', error);
            throw error;
        }
    }
    async disconnect() {
        await this.pool.end();
    }
    async executeQuery(query, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows[0];
        }
        finally {
            client.release();
        }
    }
    async executeTransaction(callback) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const transaction = {
                executeQuery: async (query, params) => {
                    const result = await client.query(query, params);
                    return result.rows[0];
                },
            };
            const result = await callback(transaction);
            await client.query('COMMIT');
            return result;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
}
