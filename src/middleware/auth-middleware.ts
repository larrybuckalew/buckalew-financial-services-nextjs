import { NextApiRequest, NextApiResponse } from 'next';
import { SessionService } from '@/lib/auth/session-service';
import { RBACService } from '@/lib/auth/rbac-service';
import { DatabaseService } from '@/lib/db/db-service';
import { Permission } from '@/lib/types/auth';

<<<<<<< HEAD
const db = new DatabaseService();
const sessionService = new SessionService(db);
const rbacService = new RBACService(db);

=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>,
  requiredPermissions: Permission[] = []
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = authHeader.substring(7);
<<<<<<< HEAD
=======
      const db = new DatabaseService();
      const sessionService = new SessionService(db);
      const rbacService = new RBACService(db);

>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
      const session = await sessionService.validateSession(token);

      if (!session) {
        return res.status(401).json({ message: 'Invalid session' });
      }

<<<<<<< HEAD
      // Add user information to the request
      req.user = {
        id: session.user_id,
        email: '', // You might want to fetch this from the database
        roles: await rbacService.getRoles(session.user_id),
      };

      // Check permissions if required
=======
      req.user = {
        id: session.user_id,
        email: '', // Fetch from database if needed
        roles: await rbacService.getRoles(session.user_id),
      };

>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
      if (requiredPermissions.length > 0) {
        const hasAllPermissions = await Promise.all(
          requiredPermissions.map(permission =>
            rbacService.checkPermission(session.user_id, permission)
          )
        ).then(results => results.every(Boolean));

        if (!hasAllPermissions) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      }

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
