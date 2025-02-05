import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';

export async function GET(request: Request) {
  try {
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!admin || !hasPermission(admin, 'manage_users')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Fetch all users with their roles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, ...userData } = await request.json();
    
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!admin || !hasPermission(admin, 'manage_users')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}