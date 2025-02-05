import { Role } from '@prisma/client';

type Permission = 
  | 'view:clients'
  | 'create:clients'
  | 'edit:clients'
  | 'delete:clients'
  | 'view:policies'
  | 'create:policies'
  | 'edit:policies'
  | 'delete:policies'
  | 'view:commissions'
  | 'manage:users'
  | 'view:analytics'
  | 'manage:settings';

type RolePermissions = {
  [key in Role]: Permission[];
};

export const ROLE_PERMISSIONS: RolePermissions = {
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
  static hasPermission(role: Role, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role].includes(permission);
  }

  static hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(role, permission));
  }

  static hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(role, permission));
  }

  static getAllPermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role];
  }
}

// React hook for checking permissions
import { useSession } from 'next-auth/react';

export function usePermissions() {
  const { data: session } = useSession();
  const role = session?.user?.role as Role | undefined;

  return {
    hasPermission: (permission: Permission) => 
      role ? RBACService.hasPermission(role, permission) : false,
    hasAllPermissions: (permissions: Permission[]) =>
      role ? RBACService.hasAllPermissions(role, permissions) : false,
    hasAnyPermission: (permissions: Permission[]) =>
      role ? RBACService.hasAnyPermission(role, permissions) : false,
    getAllPermissions: () =>
      role ? RBACService.getAllPermissions(role) : [],
  };
}

// Higher-order component for protecting components with permissions
import { ComponentType } from 'react';
import { useRouter } from 'next/navigation';

export function withPermission(
  WrappedComponent: ComponentType<any>,
  requiredPermission: Permission
) {
  return function PermissionWrapper(props: any) {
    const { hasPermission } = usePermissions();
    const router = useRouter();

    if (!hasPermission(requiredPermission)) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Component for conditionally rendering based on permissions
interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({ 
  permission, 
  children, 
  fallback = null 
}: PermissionGateProps) {
  const { hasPermission } = usePermissions();

  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
}