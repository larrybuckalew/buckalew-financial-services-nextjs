import { getSession } from 'next-auth/react';
import { AppError } from '../error';

export enum Permission {
  VIEW_POLICIES = 'view_policies',
  MANAGE_POLICIES = 'manage_policies',
  VIEW_CLAIMS = 'view_claims',
  MANAGE_CLAIMS = 'manage_claims',
  VIEW_PROVIDERS = 'view_providers',
  MANAGE_PROVIDERS = 'manage_providers',
  VIEW_DRUG_FORMULARY = 'view_drug_formulary',
  MANAGE_DRUG_FORMULARY = 'manage_drug_formulary',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_USERS = 'manage_users',
  MANAGE_ROLES = 'manage_roles'
}

const rolePermissions = {
  USER: [
    Permission.VIEW_POLICIES,
    Permission.VIEW_CLAIMS,
    Permission.VIEW_PROVIDERS,
    Permission.VIEW_DRUG_FORMULARY
  ],
  AGENT: [
    ...rolePermissions.USER,
    Permission.MANAGE_POLICIES,
    Permission.MANAGE_CLAIMS,
    Permission.VIEW_ANALYTICS
  ],
  ADMIN: Object.values(Permission)
};

export const checkPermission = async (req: Request, permission: Permission) => {
  const session = await getSession({ req });
  
  if (!session) {
    throw AppError.Unauthorized();
  }

  const userRole = session.user.role || 'USER';
  const userPermissions = rolePermissions[userRole] || [];

  if (!userPermissions.includes(permission)) {
    throw AppError.Forbidden('Insufficient permissions');
  }

  return true;
};

export const withPermission = (permission: Permission) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await checkPermission(req, permission);
      return next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message
          }
        });
      }
      return res.status(500).json({
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred'
        }
      });
    }
  };
};