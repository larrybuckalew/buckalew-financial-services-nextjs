<<<<<<< HEAD
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
=======
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
