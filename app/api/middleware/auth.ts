import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { rateLimit } from '@/lib/security/rateLimit';

export async function withAuth(req: Request) {
  // Rate limiting
  const rateLimitResult = await rateLimit.check(req);
  if (!rateLimitResult.success) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  // Token validation
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = await verifyToken(token);
    return { userId: payload.sub };
  } catch (error) {
    return new NextResponse('Invalid token', { status: 401 });
  }
}

export function withRole(allowedRoles: string[]) {
  return async (req: Request) => {
    const authResult = await withAuth(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
      select: { role: true }
    });

    if (!user || !allowedRoles.includes(user.role)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return { userId: authResult.userId, role: user.role };
  };
}