import { PrismaClient, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

// Define notification payload interface
interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

// Notification service
export class NotificationService {
  // Create a new notification
  static async create(payload: NotificationPayload) {
    try {
      return await prisma.notification.create({
        data: {
          userId: payload.userId,
          type: payload.type,
          title: payload.title,
          message: payload.message,
          link: payload.link,
          isRead: false
        }
      });
    } catch (error) {
      console.error('Notification creation failed:', error);
      throw new Error('Failed to create notification');
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId: string) {
    try {
      return await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true }
      });
    } catch (error) {
      console.error('Marking notification as read failed:', error);
      throw new Error('Failed to mark notification as read');
    }
  }

  // Get user notifications
  static async getUserNotifications(userId: string, limit = 10) {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit
      });
    } catch (error) {
      console.error('Fetching notifications failed:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  // Create investment-related notifications
  static async createInvestmentNotification(userId: string, investmentData: any) {
    try {
      return await this.create({
        userId,
        type: 'INVESTMENT',
        title: 'New Investment Added',
        message: `You've added a new ${investmentData.type} investment of $${investmentData.amount.toLocaleString()}`,
        link: '/investments'
      });
    } catch (error) {
      console.error('Investment notification creation failed:', error);
    }
  }

  // Create account-related notifications
  static async createAccountNotification(userId: string, notificationType: 'LOGIN' | 'PROFILE_UPDATE') {
    const notificationMap = {
      'LOGIN': {
        title: 'New Login Detected',
        message: 'A new login was detected on your account'
      },
      'PROFILE_UPDATE': {
        title: 'Profile Updated',
        message: 'Your profile information was recently updated'
      }
    };

    try {
      return await this.create({
        userId,
        type: 'ACCOUNT',
        ...notificationMap[notificationType],
        link: '/profile'
      });
    } catch (error) {
      console.error('Account notification creation failed:', error);
    }
  }
}