import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user?.email?.includes('@buckalewfinancial.com')) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const result = await analytics_get({
      zoneId: process.env.CLOUDFLARE_ZONE_ID!,
      since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
      until: new Date().toISOString()
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}