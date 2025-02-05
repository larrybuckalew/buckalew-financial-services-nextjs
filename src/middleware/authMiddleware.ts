<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthMiddleware {
  // Validate JWT token
  static async validateToken(token: string): Promise<JWTPayload | null> {
    try {
      const decoded = verify(
        token, 
        process.env.JWT_SECRET || 'fallback_secret'
      ) as JWTPayload;

      // Additional database check
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) return null;

      return decoded;
    } catch (error) {
      return null;
    }
  }

  // Check user role authorization
  static checkAuthorization(
    userRole: string, 
    requiredRoles: string[]
  ): boolean {
    return requiredRoles.includes(userRole);
  }

  // Middleware for protecting routes
  static async protectRoute(
    req: NextRequest, 
    requiredRoles: string[] = ['ADMIN', 'AGENT']
  ): Promise<NextResponse | null> {
    // Extract token from cookies or Authorization header
    const token = 
      req.cookies.get('auth_token')?.value || 
      req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: No token provided' }, 
        { status: 401 }
      );
    }

    // Validate token
    const decoded = await this.validateToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid token' }, 
        { status: 401 }
      );
    }

    // Check role authorization
    if (!this.checkAuthorization(decoded.role, requiredRoles)) {
      return NextResponse.json(
        { message: 'Forbidden: Insufficient permissions' }, 
        { status: 403 }
      );
    }

    // Attach user info to request for further processing
    req.user = decoded;

    return null;
  }

  // Generate authentication token
  static generateToken(user: {
    id: string;
    email: string;
    role: string;
  }): string {
    return sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );
  }
}

// Extend NextRequest to include user property
declare module 'next/server' {
  interface NextRequest {
    user?: JWTPayload;
  }
}
=======
// src/middleware/authMiddleware.ts
export const validateUserLogin = (req, res, next) => {
  // Your validation logic
  next();
};

export const checkAccountLockout = (req, res, next) => {
  // Your lockout check logic
  next();
};
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
