export const ROLE_PERMISSIONS = {
    ADMIN: [
        'view:clients',
        'create:clients',
        'edit:clients',
        'delete:clients',
        'view:policies',
        'create:policies',
        'edit:policies',
        'delete:policies',
        'view:commissions',
        'manage:users',
        'view:analytics',
        'manage:settings',
    ],
    AGENT: [
        'view:clients',
        'create:clients',
        'edit:clients',
        'view:policies',
        'create:policies',
        'edit:policies',
        'view:commissions',
    ],
    STAFF: [
        'view:clients',
        'view:policies',
        'view:commissions',
    ],
};
export class RBACService {
    static hasPermission(role, permission) {
        return ROLE_PERMISSIONS[role].includes(permission);
    }
    static hasAllPermissions(role, permissions) {
        return permissions.every(permission => this.hasPermission(role, permission));
    }
    static hasAnyPermission(role, permissions) {
        return permissions.some(permission => this.hasPermission(role, permission));
    }
    static getAllPermissions(role) {
        return ROLE_PERMISSIONS[role];
    }
}
// React hook for checking permissions
import { useSession } from 'next-auth/react';
export function usePermissions() {
    const { data: session } = useSession();
    const role = session?.user?.role;
    return {
        hasPermission: (permission) => role ? RBACService.hasPermission(role, permission) : false,
        hasAllPermissions: (permissions) => role ? RBACService.hasAllPermissions(role, permissions) : false,
        hasAnyPermission: (permissions) => role ? RBACService.hasAnyPermission(role, permissions) : false,
        getAllPermissions: () => role ? RBACService.getAllPermissions(role) : [],
    };
}
import { useRouter } from 'next/navigation';
export function withPermission(WrappedComponent, requiredPermission) {
    return function PermissionWrapper(props) {
        const { hasPermission } = usePermissions();
        const router = useRouter();
        if (!hasPermission(requiredPermission)) {
            router.push('/unauthorized');
            return null;
        }
        return { ...props } /  > ;
    };
}
export function PermissionGate({ permission, children, fallback = null }) {
    const { hasPermission } = usePermissions();
    return hasPermission(permission) ? { children } < /> : <>{fallback}</ >  : ;
}
