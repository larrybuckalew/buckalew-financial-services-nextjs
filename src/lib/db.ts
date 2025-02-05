import { PrismaClient } from '@prisma/client'

// Prevent multiple Prisma Client instances in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error']
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Utility function for safe database operations
export async function safeDatabaseOperation<T>(
  operation: () => Promise<T>, 
  errorHandler?: (error: Error) => void
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    // Log the error
    console.error('Database operation failed:', error)
    
    // Call custom error handler if provided
    if (errorHandler) {
      errorHandler(error as Error)
    }
    
    // In production, you might want to use a proper logging service
    return null
  }
}

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}