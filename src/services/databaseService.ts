import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export type QueryOptions = {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
};

export class DatabaseService {
  private static instance: DatabaseService;
  private client: PrismaClient;

  private constructor() {
    this.client = prisma;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async executeQuery<T>(
    queryFn: (client: PrismaClient) => Promise<T>,
    req?: NextApiRequest
  ): Promise<T> {
    try {
      // Add any query logging or metrics here
      const startTime = Date.now();
      const result = await queryFn(this.client);
      const endTime = Date.now();
      
      // Log query metrics
      console.log(`Query executed in ${endTime - startTime}ms`);
      
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  public getPaginationParams(options?: QueryOptions) {
    const page = Math.max(1, options?.page || 1);
    const limit = Math.max(1, Math.min(100, options?.limit || 10));
    const skip = (page - 1) * limit;

    return {
      take: limit,
      skip,
    };
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

export const db = DatabaseService.getInstance();