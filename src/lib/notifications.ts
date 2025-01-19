import { PrismaClient, NotificationType } from '@prisma/client';
import { getEmailTemplate } from './notificationTemplates';
import { sendEmail } from './email';
import { emitToUser } from './socket';

const prisma = new PrismaClient();

interface NotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  email?: boolean;
  data?: Record<string, any>;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  email = false,
  data = {}
}: NotificationData) {
  try {
    // Create notification in database
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
      },
    });

    // Send real-time notification via WebSocket
    emitToUser(userId, 'newNotification', notification);

    // Send email if requested
    if (email) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user?.email) {
        const emailTemplate = getEmailTemplate(type, data);
        await sendEmail({
          to: user.email,
          ...emailTemplate
        });
      }
    }

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function markNotificationAsRead(id: string, userId: string) {
  const notification = await prisma.notification.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      read: true,
    },
  });

  // Emit update via WebSocket
  emitToUser(userId, 'notificationRead', id);

  return notification;
}

export async function getUserNotifications(userId: string) {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function deleteNotification(id: string, userId: string) {
  return prisma.notification.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function clearAllNotifications(userId: string) {
  return prisma.notification.deleteMany({
    where: {
      userId,
    },
  });
}