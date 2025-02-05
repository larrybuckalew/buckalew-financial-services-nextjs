import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// a new instance from being created with every module update
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
