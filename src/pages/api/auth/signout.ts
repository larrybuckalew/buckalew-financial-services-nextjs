import { NextApiRequest, NextApiResponse } from 'next';
import { SessionService } from '@/lib/auth/session-service';
import { DatabaseService } from '@/lib/db/db-service';

const db = new DatabaseService();
const sessionService = new SessionService(db);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    await sessionService.revokeSession(sessionId);
    
    return res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}