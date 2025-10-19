import { PrismaClient } from '@prisma/client'

// Create a custom Prisma client with query logging and optimization
export const optimizedPrisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' }
  ]
})

// Add query logging and performance tracking
optimizedPrisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

// Utility for adding database indexes
export async function optimizeDatabaseIndexes() {
  // Programmatically create indexes for frequently queried fields
  await optimizedPrisma.$executeRaw`
    -- Create index for user calculations
    CREATE INDEX IF NOT EXISTS idx_user_calculations 
    ON "Calculation" ("userId", "createdAt");

    -- Create index for calculation types
    CREATE INDEX IF NOT EXISTS idx_calculation_type 
    ON "Calculation" ("type");
  `
}

// Batch query optimization
export async function batchGetCalculations(userId: string, take: number = 10) {
  return optimizedPrisma.calculation.findMany({
    where: { userId },
    take,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      type: true,
      createdAt: true,
      results: true
    }
  })
}