import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export function withAuth(
  handler: NextApiHandler,
  allowedRoles?: string[]
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const token = await getToken({ req });

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (allowedRoles && !allowedRoles.includes(token.role as string)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}