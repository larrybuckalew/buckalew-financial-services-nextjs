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

    if (!admin || !hasPermission(admin, 'view_audit_logs')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const action = url.searchParams.get('action');
    const userId = url.searchParams.get('userId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const resourceType = url.searchParams.get('resourceType');

    // Build where clause
    const where: any = {};
    if (action) where.action = action;
    if (userId) where.userId = userId;
    if (resourceType) where.resourceType = resourceType;
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    // Get total count for pagination
    const total = await prisma.auditLog.count({ where });

    // Get paginated results
    const logs = await prisma.auditLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });

    // Format response
    const formattedLogs = logs.map(log => ({
      id: log.id,
      action: log.action,
      userId: log.userId,
      userName: log.user.name,
      details: log.details,
      timestamp: log.timestamp,
      ipAddress: log.ipAddress,
      resourceType: log.resourceType,
      resourceId: log.resourceId
    }));

    return NextResponse.json({
      logs: formattedLogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    const logData = await request.json();

    // Create audit log
    const log = await prisma.auditLog.create({
      data: {
        action: logData.action,
        userId: payload.sub,
        details: logData.details,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        resourceType: logData.resourceType,
        resourceId: logData.resourceId
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}