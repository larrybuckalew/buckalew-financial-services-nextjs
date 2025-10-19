import { prisma } from './prisma';

export interface AuditLogData {
  action: string;
  userId: string;
  details: string;
  ipAddress: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, any>;
}

export async function createAuditLog(data: AuditLogData) {
  try {
    const log = await prisma.auditLog.create({
      data: {
        ...data,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        timestamp: new Date()
      }
    });

    return log;
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw error - audit logging should not break main functionality
    return null;
  }
}

export const AuditActions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PASSWORD_RESET: 'password_reset',
  SETTINGS_UPDATE: 'settings_update',
  ROLE_UPDATE: 'role_update',
  PERMISSION_UPDATE: 'permission_update',
  TEST_EMAIL: 'test_email',
  BACKUP_CREATE: 'backup_create',
  BACKUP_RESTORE: 'backup_restore',
  EXPORT_DATA: 'export_data',
  IMPORT_DATA: 'import_data'
} as const;

export const ResourceTypes = {
  USER: 'user',
  ROLE: 'role',
  PERMISSION: 'permission',
  SETTINGS: 'settings',
  BACKUP: 'backup',
  APPOINTMENT: 'appointment',
  DOCUMENT: 'document',
  AUDIT_LOG: 'audit_log'
} as const;

export async function searchAuditLogs(filters: {
  action?: string;
  userId?: string;
  resourceType?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}) {
  const {
    action,
    userId,
    resourceType,
    startDate,
    endDate,
    page = 1,
    limit = 10
  } = filters;

  const where: any = {};
  
  if (action) where.action = action;
  if (userId) where.userId = userId;
  if (resourceType) where.resourceType = resourceType;
  
  if (startDate || endDate) {
    where.timestamp = {};
    if (startDate) where.timestamp.gte = startDate;
    if (endDate) where.timestamp.lte = endDate;
  }

  const [total, logs] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
  ]);

  return {
    logs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}