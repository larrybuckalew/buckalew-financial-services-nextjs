import { NextApiRequest, NextApiResponse } from 'next';
import { handleApiError } from '@/lib/errors';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function withErrorHandler(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      const { statusCode, message } = handleApiError(error);
      res.status(statusCode).json({ error: message });
    }
  };
}