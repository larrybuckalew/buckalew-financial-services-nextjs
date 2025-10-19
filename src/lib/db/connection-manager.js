import { logger, ErrorType } from '../logging/logger';
class DatabaseConnectionManager {
    constructor() {
        this.connectionAttempts = 0;
        this.maxConnectionAttempts = 3;
        this.reconnectInterval = 5000; // 5 seconds
        this.prisma = new PrismaClient({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' }
            ]
        });
        // Setup event listeners for database operations
        this.setupEventListeners();
    }
    // Singleton pattern
    static getInstance() {
        if (!DatabaseConnectionManager.instance) {
            DatabaseConnectionManager.instance = new DatabaseConnectionManager();
        }
        return DatabaseConnectionManager.instance;
    }
    // Setup event listeners for database operations
    setupEventListeners() {
        // Log slow queries
        this.prisma.$on('query', (e) => {
            if (e.duration > 1000) { // Log queries taking more than 1 second
                logger.warn('Slow Database Query', {
                    query: e.query,
                    duration: e.duration,
                    params: e.params
                });
            }
        });
        // Handle database errors
        this.prisma.$on('error', (e) => {
            logger.logError(logger.createError('Database Operation Error', ErrorType.DATABASE, { errorDetails: e }));
        });
    }
    // Establish database connection with retry mechanism
    async connect() {
        try {
            await this.prisma.$connect();
            this.connectionAttempts = 0;
            logger.info('Database connection established successfully');
            return true;
        }
        catch (error) {
            this.connectionAttempts++;
            const errorDetails = logger.createError('Database Connection Failed', ErrorType.DATABASE, {
                attempts: this.connectionAttempts,
                maxAttempts: this.maxConnectionAttempts
            });
            logger.logError(errorDetails);
            if (this.connectionAttempts < this.maxConnectionAttempts) {
                await this.waitAndRetry();
                return this.connect();
            }
            return false;
        }
    }
    // Disconnect from database
    async disconnect() {
        try {
            await this.prisma.$disconnect();
            logger.info('Database disconnected successfully');
        }
        catch (error) {
            logger.logError(logger.createError('Database Disconnection Failed', ErrorType.DATABASE));
        }
    }
    // Wait before retrying connection
    async waitAndRetry() {
        return new Promise(resolve => {
            setTimeout(() => {
                logger.info(`Retrying database connection (Attempt ${this.connectionAttempts})`);
                resolve();
            }, this.reconnectInterval);
        });
    }
    // Transaction wrapper with error handling
    async transaction(operation) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                return await operation(prisma);
            });
        }
        catch (error) {
            const errorDetails = logger.createError('Database Transaction Failed', ErrorType.DATABASE, { originalError: String(error) });
            logger.logError(errorDetails);
            return null;
        }
    }
    // Getter for Prisma client
    getPrisma() {
        return this.prisma;
    }
}
// Export singleton instance
export const dbConnectionManager = DatabaseConnectionManager.getInstance();
