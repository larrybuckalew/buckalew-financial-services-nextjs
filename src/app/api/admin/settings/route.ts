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

    if (!admin || !hasPermission(admin, 'manage_settings')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get current settings
    const settings = await prisma.systemSettings.findFirst();

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!admin || !hasPermission(admin, 'manage_settings')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const updateData = await request.json();

    // Update settings
    const settings = await prisma.systemSettings.upsert({
      where: { id: 1 }, // Assuming single settings record
      update: updateData,
      create: updateData
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'update',
        userId: payload.sub,
        details: 'Updated system settings',
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        resourceType: 'settings',
        resourceId: settings.id.toString()
      }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}