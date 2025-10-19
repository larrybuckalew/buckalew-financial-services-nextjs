import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define role-based access control
const ROLE_PERMISSIONS = {
  GUEST: [
    '/',
    '/login',
    '/register',
    '/services',
    '/contact',
    '/medicare',
    '/health-insurance',
    '/life-insurance',
    '/terms-of-service',
    '/privacy-policy'
  ],
  USER: [
    '/dashboard',
    '/profile',
    '/appointments',
    '/quote'
  ],
  ADMIN: [
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/settings'
  ]
};

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  const path = req.nextUrl.pathname;

  // Function to check path access
  const checkPathAccess = (allowedPaths: string[]) => 
    allowedPaths.some(allowedPath => 
      path === allowedPath || path.startsWith(`${allowedPath}/`)
    );

  // Determine user role
  const userRole = token?.role || 'GUEST';

  // Check access based on role
  if (userRole === 'GUEST' && !checkPathAccess(ROLE_PERMISSIONS.GUEST)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (userRole === 'USER') {
    if (!checkPathAccess([...ROLE_PERMISSIONS.GUEST, ...ROLE_PERMISSIONS.USER])) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  if (userRole === 'ADMIN') {
    if (!checkPathAccess([
      ...ROLE_PERMISSIONS.GUEST, 
      ...ROLE_PERMISSIONS.USER, 
      ...ROLE_PERMISSIONS.ADMIN
    ])) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// Unauthorized page component
export function UnauthorizedPage() {
  return {
    title: 'Unauthorized Access',
    content: 'You do not have permission to access this page.'
  };
}
