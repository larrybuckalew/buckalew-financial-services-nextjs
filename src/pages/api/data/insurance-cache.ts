import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Fetch from KV store
        const kvId = process.env.KV_NAMESPACE_ID;
        if (!kvId) {
          throw new Error('KV namespace not configured');
        }
        
        const data = await kv_get({
          namespaceId: kvId,
          key: `insurance_rates_${new Date().toISOString().slice(0, 10)}`
        });

        if (!data) {
          return res.status(404).json({ message: 'No cached data found' });
        }

        return res.status(200).json(JSON.parse(data));
      } catch (error) {
        console.error('Error fetching cached data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      try {
        const { rates } = req.body;
        const kvId = process.env.KV_NAMESPACE_ID;
        
        if (!kvId) {
          throw new Error('KV namespace not configured');
        }

        // Store in KV with 24-hour expiration
        await kv_put({
          namespaceId: kvId,
          key: `insurance_rates_${new Date().toISOString().slice(0, 10)}`,
          value: JSON.stringify(rates),
          expirationTtl: 86400 // 24 hours
        });

        return res.status(200).json({ message: 'Rates cached successfully' });
      } catch (error) {
        console.error('Error caching rates:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}