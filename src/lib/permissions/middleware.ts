import { NextApiRequest, NextApiResponse } from 'next';
import { Permission, checkPermission } from '.';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const withPermissions = (permissions: Permission[]) => {
  return (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      for (const permission of permissions) {
        await checkPermission(req, permission);
      }
      return handler(req, res);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message
          }
        });
      }
      return res.status(500).json({
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred'
        }
      });
    }
  };
};