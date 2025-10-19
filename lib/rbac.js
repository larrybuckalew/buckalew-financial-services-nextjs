import { useAuth } from '../AuthContext';
// Define role hierarchy
const roleHierarchy = {
    ADMIN: ['ADMIN', 'MANAGER', 'USER'],
    MANAGER: ['MANAGER', 'USER'],
    USER: ['USER']
};
// Define permissions for each role
const rolePermissions = {
    ADMIN: [
        'manage_users',
        'manage_roles',
        'view_analytics',
        'manage_content',
        'manage_settings',
        'create_appointments',
        'view_appointments',
        'manage_appointments',
    ],
    MANAGER: [
        'view_analytics',
        'manage_content',
        'create_appointments',
        'view_appointments',
        'manage_appointments',
    ],
    USER: [
        'create_appointments',
        'view_appointments',
    ]
};
export function hasRole(user, requiredRole) {
    if (!user.role)
        return false;
    return roleHierarchy[user.role].includes(requiredRole);
}
export function hasPermission(user, requiredPermission) {
    if (!user.role)
        return false;
    const userRole = user.role;
    return rolePermissions[userRole].includes(requiredPermission);
}
// React hook for checking permissions
export function usePermission(permission) {
    const { user } = useAuth();
    return user ? hasPermission(user, permission) : false;
}
export function withPermission(WrappedComponent, requiredPermission) {
    const PermissionGuard = (props) => {
        const hasRequiredPermission = usePermission(requiredPermission);
        if (!hasRequiredPermission) {
            return null; // Or return an unauthorized component
        }
        return { ...props } /  > ;
    };
    return PermissionGuard;
}
