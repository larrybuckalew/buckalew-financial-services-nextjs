import { NextResponse } from 'next/server';
import { withAuth } from '../../middleware/auth';
import { createRateLimiter } from '../../middleware/rateLimiter';
import { withCache, cacheResponse } from '../../middleware/cache';
import { prisma } from '@/lib/db';
import { WebSocket } from '@/lib/websocket';

const rateLimiter = createRateLimiter({
  windowMs: 60000,
  max: 50
});

export async function GET(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const cacheResult = await withCache({
    ttl: 60,
    varyByUser: true,
    tags: ['notifications']
  })(req);

  if (cacheResult instanceof NextResponse) return cacheResult;

  const notifications = await prisma.notification.findMany({
    where: { 
      userId: authResult.userId,
      read: false
    },
    orderBy: { createdAt: 'desc' }
  });

  return cacheResponse(cacheResult.cacheKey, notifications, cacheResult.config);
}

export async function POST(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const rateLimit = await rateLimiter(req);
  if (rateLimit instanceof NextResponse) return rateLimit;

  try {
    const { type, message } = await req.json();

    const notification = await prisma.notification.create({
      data: {
        type,
        message,
        userId: authResult.userId
      }
    });

    // Send real-time notification
    WebSocket.sendToUser(authResult.userId, {
      type: 'NEW_NOTIFICATION',
      payload: notification
    });

    await cache.invalidateByTag('notifications');
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid notification data' },
      { status: 400 }
    );
  }
}