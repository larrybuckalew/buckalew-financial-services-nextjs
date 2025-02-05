import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        preferences: true,
        role: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    const updateData = await request.json();

    // Validate the update data
    const allowedFields = ['name', 'phone', 'address', 'preferences'];
    const sanitizedData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {} as any);

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: payload.sub },
      data: sanitizedData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        preferences: true,
        role: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}