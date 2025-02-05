import { useAuth } from '@/AuthContext';
import { hasPermission, Permission } from '@/lib/rbac';

export function usePermissions() {
  const { user, isLoading } = useAuth();

  const checkPermission = (permission: Permission): boolean => {
    if (!user || isLoading) return false;
    return hasPermission(user, permission);
  };

  const checkPermissions = (permissions: Permission[]): boolean => {
    if (!user || isLoading) return false;
    return permissions.every(permission => hasPermission(user, permission));
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user || isLoading) return false;
    return permissions.some(permission => hasPermission(user, permission));
  };

  return {
    checkPermission,
    checkPermissions,
    checkAnyPermission,
    isLoading,
  };
}

// HOC for conditional rendering based on permissions
export function withPermissions(
  WrappedComponent: React.ComponentType,
  requiredPermissions: Permission[],
  requireAll: boolean = true
) {
  return function PermissionsWrapper(props: any) {
    const { checkPermissions, checkAnyPermission, isLoading } = usePermissions();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }

    const hasRequiredPermissions = requireAll
      ? checkPermissions(requiredPermissions)
      : checkAnyPermission(requiredPermissions);

    if (!hasRequiredPermissions) {
      return null; // Or return an unauthorized component
    }

    return <WrappedComponent {...props} />;
  };
}