export type UserRole = 'admin' | 'manager' | 'user';

export type Permission = 
  | 'read:users'
  | 'write:users'
  | 'delete:users'
  | 'manage:users'
  | 'read:reports'
  | 'write:reports'
  | 'manage:reports'
  | 'manage:system';

export interface AuthenticationResult {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  session: {
    token: string;
    expiresAt: Date;
  };
  roles: UserRole[];
}
