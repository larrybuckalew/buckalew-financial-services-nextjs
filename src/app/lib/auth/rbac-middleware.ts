import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT'
}

export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.MANAGER, UserRole.AGENT, UserRole.CLIENT],
  [UserRole.MANAGER]: [UserRole.MANAGER, UserRole.AGENT, UserRole.CLIENT],
  [UserRole.AGENT]: [UserRole.AGENT, UserRole.CLIENT],
  [UserRole.CLIENT]: [UserRole.CLIENT]
};

export interface RBACOptions {
  requiredRoles: UserRole[];
  strict?: boolean;
}

export class RBACMiddleware {
  static async authorize(
    req: NextApiRequest, 
    res: NextApiResponse, 
    options: RBACOptions
  ) {
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Authentication required' 
      });
    }

    const userRole = token.role as UserRole;

    // Check if user has required roles
    const hasAccess = options.requiredRoles.some(requiredRole => 
      ROLE_HIERARCHY[userRole].includes(requiredRole)
    );

    if (!hasAccess) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Insufficient permissions',
        requiredRoles: options.requiredRoles,
        userRole 
      });
    }

    return true;
  }

  // Middleware for API routes
  static apiMiddleware(options: RBACOptions) {
    return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
      const authResult = await this.authorize(req, res, options);
      if (authResult === true) {
        next();
      }
    };
  }

  // Higher-order component for React components
  static withRBAC<P>(
    WrappedComponent: React.ComponentType<P>, 
    requiredRoles: UserRole[]
  ) {
    return (props: P) => {
      const { data: session } = useSession();
      const router = useRouter();

      useEffect(() => {
        if (!session) {
          router.push('/auth/signin');
          return;
        }

        const userRole = session.user.role as UserRole;
        const hasAccess = requiredRoles.some(requiredRole => 
          ROLE_HIERARCHY[userRole].includes(requiredRole)
        );

        if (!hasAccess) {
          router.push('/unauthorized');
        }
      }, [session, router]);

      if (!session) return null;

      const userRole = session.user.role as UserRole;
      const hasAccess = requiredRoles.some(requiredRole => 
        ROLE_HIERARCHY[userRole].includes(requiredRole)
      );

      return hasAccess ? <WrappedComponent {...props} /> : null;
    };
  }
}
