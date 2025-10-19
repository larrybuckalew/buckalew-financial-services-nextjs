import { getToken } from 'next-auth/jwt';
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["AGENT"] = "AGENT";
    UserRole["CLIENT"] = "CLIENT";
})(UserRole || (UserRole = {}));
export const ROLE_HIERARCHY = {
    [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.MANAGER, UserRole.AGENT, UserRole.CLIENT],
    [UserRole.MANAGER]: [UserRole.MANAGER, UserRole.AGENT, UserRole.CLIENT],
    [UserRole.AGENT]: [UserRole.AGENT, UserRole.CLIENT],
    [UserRole.CLIENT]: [UserRole.CLIENT]
};
export class RBACMiddleware {
    static async authorize(req, res, options) {
        const token = await getToken({ req });
        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }
        const userRole = token.role;
        // Check if user has required roles
        const hasAccess = options.requiredRoles.some(requiredRole => ROLE_HIERARCHY[userRole].includes(requiredRole));
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
    static apiMiddleware(options) {
        return async (req, res, next) => {
            const authResult = await this.authorize(req, res, options);
            if (authResult === true) {
                next();
            }
        };
    }
    // Higher-order component for React components
    static withRBAC(WrappedComponent, requiredRoles) {
        return (props) => {
            const { data: session } = useSession();
            const router = useRouter();
            useEffect(() => {
                if (!session) {
                    router.push('/auth/signin');
                    return;
                }
                const userRole = session.user.role;
                const hasAccess = requiredRoles.some(requiredRole => ROLE_HIERARCHY[userRole].includes(requiredRole));
                if (!hasAccess) {
                    router.push('/unauthorized');
                }
            }, [session, router]);
            if (!session)
                return null;
            const userRole = session.user.role;
            const hasAccess = requiredRoles.some(requiredRole => ROLE_HIERARCHY[userRole].includes(requiredRole));
            return hasAccess ? { ...props } /  >  : null;
        };
    }
}
