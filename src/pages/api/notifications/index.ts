import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { NotificationService } from '../../../lib/notifications';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch user notifications
      const notifications = await NotificationService.getUserNotifications(session.user.id);
      return res.status(200).json(notifications);
    } 
    else if (req.method === 'PUT') {
      // Mark a specific notification as read
      const { notificationId } = req.body;
      
      if (!notificationId) {
        return res.status(400).json({ error: 'Notification ID is required' });
      }

      const updatedNotification = await NotificationService.markAsRead(notificationId);
      return res.status(200).json(updatedNotification);
    } 
    else {
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Notifications API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}