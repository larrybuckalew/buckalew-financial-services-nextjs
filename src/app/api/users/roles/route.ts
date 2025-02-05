import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';

// Get all roles
export async function GET(request: Request) {
  try {
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!user || !hasPermission(user, 'manage_roles')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const roles = await prisma.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Get roles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user role
export async function PUT(request: Request) {
  try {
    const { userId, roleId } = await request.json();
    
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!admin || !hasPermission(admin, 'manage_roles')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update user's role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        roleId: roleId
      },
      include: { role: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}