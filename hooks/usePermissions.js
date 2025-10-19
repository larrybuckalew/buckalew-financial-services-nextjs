import { useAuth } from '@/AuthContext';
import { hasPermission } from '@/lib/rbac';
export function usePermissions() {
    const { user, isLoading } = useAuth();
    const checkPermission = (permission) => {
        if (!user || isLoading)
            return false;
        return hasPermission(user, permission);
    };
    const checkPermissions = (permissions) => {
        if (!user || isLoading)
            return false;
        return permissions.every(permission => hasPermission(user, permission));
    };
    const checkAnyPermission = (permissions) => {
        if (!user || isLoading)
            return false;
        return permissions.some(permission => hasPermission(user, permission));
    };
    return {
        checkPermission,
        checkPermissions,
        checkAnyPermission,
        isLoading,
    };
}
export function withPermissions(WrappedComponent, requiredPermissions, requireAll = true) {
    const PermissionsWrapper = (props) => {
        const { checkPermissions, checkAnyPermission, isLoading } = usePermissions();
        if (isLoading) {
            return Loading;
            /div>;
        }
        const hasRequiredPermissions = requireAll
            ? checkPermissions(requiredPermissions)
            : checkAnyPermission(requiredPermissions);
        if (!hasRequiredPermissions) {
            return null; // Or return an unauthorized component
        }
        return { ...props } /  > ;
    };
    return PermissionsWrapper;
}
