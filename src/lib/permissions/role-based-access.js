// Role-based access control utility
class RoleBasedAccessControl {
  // Predefined permission sets
  static PERMISSIONS = {
    ADMIN: [
      'view_all_portfolios',
      'edit_all_portfolios',
      'create_user',
      'delete_user',
      'view_system_logs',
      'manage_system_settings'
    ],
    FINANCIAL_ADVISOR: [
      'view_client_portfolios',
      'edit_client_portfolios',
      'generate_reports',
      'create_investment_recommendations'
    ],
    CLIENT: [
      'view_own_portfolio',
      'edit_personal_info',
      'view_transactions',
      'request_advisor_consultation'
    ],
    GUEST: [
      'view_public_information',
      'create_account'
    ]
  };

  // Role hierarchy
  static ROLE_HIERARCHY = {
    ADMIN: ['FINANCIAL_ADVISOR', 'CLIENT', 'GUEST'],
    FINANCIAL_ADVISOR: ['CLIENT', 'GUEST'],
    CLIENT: ['GUEST'],
    GUEST: []
  };

  // Check if a user has a specific permission
  static hasPermission(userRole, permission) {
    // If the role is not defined, default to GUEST
    const role = userRole || 'GUEST';

    // Check if the role has the permission directly
    if (this.PERMISSIONS[role]?.includes(permission)) {
      return true;
    }

    // Check hierarchical permissions
    const roleHierarchy = this.ROLE_HIERARCHY[role] || [];
    return roleHierarchy.some(hierarchicalRole => 
      this.PERMISSIONS[hierarchicalRole]?.includes(permission)
    );
  }

  // Get all permissions for a role (including hierarchical)
  static getRolePermissions(userRole) {
    const role = userRole || 'GUEST';
    const permissions = new Set(this.PERMISSIONS[role] || []);

    // Add permissions from hierarchical roles
    const roleHierarchy = this.ROLE_HIERARCHY[role] || [];
    roleHierarchy.forEach(hierarchicalRole => {
      (this.PERMISSIONS[hierarchicalRole] || []).forEach(p => permissions.add(p));
    });

    return Array.from(permissions);
  }

  // Create access control middleware for server-side rendering
  static createMiddleware(requiredPermissions) {
    return async (req, res, next) => {
      const userRole = req.user?.role;

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every(permission => 
        this.hasPermission(userRole, permission)
      );

      if (hasAllPermissions) {
        next();
      } else {
        // Unauthorized access
        res.status(403).json({
          error: 'Insufficient permissions',
          requiredPermissions,
          userRole
        });
      }
    };
  }

  // Utility to check if a user can access a specific resource
  static canAccessResource(user, resourceOwnerId) {
    // Admin can access everything
    if (this.hasPermission(user.role, 'view_all_portfolios')) {
      return true;
    }

    // User can access their own resources
    return user.id === resourceOwnerId;
  }

  // Generate a permission-based menu
  static generateMenu(userRole) {
    const permissions = this.getRolePermissions(userRole);

    const menuItems = [
      {
        label: 'Dashboard',
        href: '/dashboard',
        requiredPermission: 'view_own_portfolio'
      },
      {
        label: 'Portfolios',
        href: '/portfolios',
        requiredPermission: 'view_own_portfolio'
      },
      {
        label: 'Transactions',
        href: '/transactions',
        requiredPermission: 'view_transactions'
      },
      {
        label: 'User Management',
        href: '/admin/users',
        requiredPermission: 'create_user'
      },
      {
        label: 'System Settings',
        href: '/admin/settings',
        requiredPermission: 'manage_system_settings'
      }
    ];

    return menuItems.filter(item => 
      this.hasPermission(userRole, item.requiredPermission)
    );
  }
}

// Export as default
export default RoleBasedAccessControl;