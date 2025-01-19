import { NextResponse } from 'next/server';
import { withAuth } from '../../middleware/auth';
import { createRateLimiter } from '../../middleware/rateLimiter';
import { withCache, cacheResponse } from '../../middleware/cache';
import { prisma } from '@/lib/db';

const rateLimiter = createRateLimiter({
  windowMs: 60000,
  max: 30
});

export async function GET(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const cacheResult = await withCache({
    ttl: 300,
    varyByUser: true,
    tags: ['user-settings']
  })(req);

  if (cacheResult instanceof NextResponse) return cacheResult;

  const settings = await prisma.userSettings.findUnique({
    where: { userId: authResult.userId }
  });

  return cacheResponse(cacheResult.cacheKey, settings, cacheResult.config);
}

export async function PATCH(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const rateLimit = await rateLimiter(req);
  if (rateLimit instanceof NextResponse) return rateLimit;

  try {
    const updates = await req.json();
    
    const settings = await prisma.userSettings.upsert({
      where: { userId: authResult.userId },
      update: updates,
      create: { ...updates, userId: authResult.userId }
    });

    await cache.invalidateByTag('user-settings');
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid settings data' },
      { status: 400 }
    );
  }
}