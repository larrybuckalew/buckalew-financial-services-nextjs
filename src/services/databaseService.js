export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development')
    global.prisma = prisma;
export class DatabaseService {
    constructor() {
        this.client = prisma;
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    async executeQuery(queryFn, req) {
        try {
            // Add any query logging or metrics here
            const startTime = Date.now();
            const result = await queryFn(this.client);
            const endTime = Date.now();
            // Log query metrics
            console.log(`Query executed in ${endTime - startTime}ms`);
            return result;
        }
        catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
    getPaginationParams(options) {
        const page = Math.max(1, options?.page || 1);
        const limit = Math.max(1, Math.min(100, options?.limit || 10));
        const skip = (page - 1) * limit;
        return {
            take: limit,
            skip,
        };
    }
    async healthCheck() {
        try {
            await this.client.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('Database health check failed:', error);
            return false;
        }
    }
}
export const db = DatabaseService.getInstance();
