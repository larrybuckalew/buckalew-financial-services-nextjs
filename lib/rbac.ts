import { User } from '@prisma/client';
import { useAuth } from '../AuthContext';
import React from 'react';

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

export type Permission = keyof typeof rolePermissions;
export type Role = keyof typeof roleHierarchy;

export function hasRole(user: User, requiredRole: Role): boolean {
  if (!user.role) return false;
  return roleHierarchy[user.role as Role].includes(requiredRole);
}

export function hasPermission(user: User, requiredPermission: string): boolean {
  if (!user.role) return false;
  const userRole = user.role as Role;
  return rolePermissions[userRole].includes(requiredPermission);
}

// React hook for checking permissions
export function usePermission(permission: string) {
  const { user } = useAuth();
  return user ? hasPermission(user, permission) : false;
}

// Higher Order Component for protecting routes based on permissions
export function withPermission(WrappedComponent: any, requiredPermission: string) {
  return function PermissionGuard(props: any) {
    return <WrappedComponent {...props} />;
  };
}