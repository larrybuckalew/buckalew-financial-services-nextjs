import { NotificationService } from '../notifications';
import prisma from '../prisma';

// Mock Prisma client
jest.mock('../prisma', () => ({
  __esModule: true,
  default: {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn()
    }
  }
}));

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates a notification', async () => {
    const mockNotification = {
      id: 'test-notification-id',
      userId: 'user123',
      type: 'INVESTMENT',
      title: 'Test Notification',
      message: 'Test message',
      isRead: false
    };

    (prisma.notification.create as jest.Mock).mockResolvedValue(mockNotification);

    const result = await NotificationService.create({
      userId: 'user123',
      type: 'INVESTMENT',
      title: 'Test Notification',
      message: 'Test message'
    });

    expect(result).toEqual(mockNotification);
    expect(prisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'user123',
        type: 'INVESTMENT',
        title: 'Test Notification',
        message: 'Test message',
        isRead: false
      })
    });
  });

  test('marks notification as read', async () => {
    const mockUpdatedNotification = {
      id: 'test-notification-id',
      isRead: true
    };

    (prisma.notification.update as jest.Mock).mockResolvedValue(mockUpdatedNotification);

    const result = await NotificationService.markAsRead('test-notification-id');

    expect(result).toEqual(mockUpdatedNotification);
    expect(prisma.notification.update).toHaveBeenCalledWith({
      where: { id: 'test-notification-id' },
      data: { isRead: true }
    });
  });
});