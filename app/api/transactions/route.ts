import { NextResponse } from 'next/server';
import { withAuth } from '../middleware/auth';
import { withCache, cacheResponse } from '../middleware/cache';
import { createRateLimiter } from '../middleware/rateLimiter';
import { prisma } from '@/lib/db';
import { validateUserInput } from '@/lib/security/validation';
import { financialDataSchema } from '@/lib/security/validation';

const rateLimiter = createRateLimiter({
  windowMs: 60000,
  max: 100
});

export async function GET(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const rateLimit = await rateLimiter(req);
  if (rateLimit instanceof NextResponse) return rateLimit;

  const cacheResult = await withCache({
    ttl: 300,
    varyByUser: true,
    tags: ['transactions']
  })(req);

  if (cacheResult instanceof NextResponse) return cacheResult;

  const transactions = await prisma.transaction.findMany({
    where: { userId: authResult.userId },
    orderBy: { createdAt: 'desc' }
  });

  return cacheResponse(cacheResult.cacheKey, transactions, cacheResult.config);
}

export async function POST(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const rateLimit = await rateLimiter(req);
  if (rateLimit instanceof NextResponse) return rateLimit;

  try {
    const data = await req.json();
    const validatedData = validateUserInput(financialDataSchema, data);

    const transaction = await prisma.transaction.create({
      data: {
        ...validatedData,
        userId: authResult.userId
      }
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}