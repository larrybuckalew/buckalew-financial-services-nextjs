import { PrismaClient } from '@prisma/client';
import { sendEmail } from './email';

const prisma = new PrismaClient();

export enum NotificationType {
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  INVESTMENT_UPDATE = 'INVESTMENT_UPDATE',
  SECURITY_ALERT = 'SECURITY_ALERT',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  sendEmail: shouldSendEmail = false,
}: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  sendEmail?: boolean;
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
      },
    });

    if (shouldSendEmail) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user?.email) {
        await sendEmail({
          to: user.email,
          subject: title,
          text: message,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">${title}</h1>
              <p>${message}</p>
              <p style="color: #666;">You can view this notification in your dashboard.</p>
            </div>
          `,
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
  return prisma.notification.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      read: true,
    },
  });
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