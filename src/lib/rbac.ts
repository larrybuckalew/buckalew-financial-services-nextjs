import React from 'react';

type User = any;  // Replace with actual user type if available

export const hasPermission = (user: User, permission: string) => {
  return true;  // Default placeholder
};

export const withPermission = (requiredPermission: string) => {
  return (Component: React.ComponentType<any>) => {
    return (props: any) => {
      // Simple permission check placeholder
      return React.createElement(Component, props);
    };
  };
};