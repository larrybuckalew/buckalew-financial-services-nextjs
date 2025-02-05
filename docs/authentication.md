# Authentication System Documentation

## Overview

The authentication system provides a secure, role-based access control system for Buckalew Financial Services. It includes user authentication, session management, and permission-based access control.

## Features

- User authentication (signup, signin, signout)
- Session management with token-based authentication
- Role-based access control (RBAC)
- Password reset functionality
- Rate limiting
- Email notifications
- Security measures (password hashing, session management)

## Technical Architecture

### Core Components

1. **AuthService**: Handles user authentication operations
   - User registration
   - Login/logout
   - Password reset

2. **SessionService**: Manages user sessions
   - Session creation
   - Session validation
   - Session revocation

3. **RBACService**: Handles role-based access control
   - Role assignment
   - Permission checking
   - Role management

### Database Schema

```sql
users
  - id (UUID)
  - email (VARCHAR)
  - password_hash (VARCHAR)
  - full_name (VARCHAR)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
  - last_login (TIMESTAMP)

sessions
  - id (UUID)
  - user_id (UUID)
  - token (VARCHAR)
  - expires_at (TIMESTAMP)
  - created_at (TIMESTAMP)

roles
  - id (UUID)
  - name (VARCHAR)
  - description (TEXT)

permissions
  - id (UUID)
  - name (VARCHAR)
  - description (TEXT)

user_roles
  - user_id (UUID)
  - role_id (UUID)
  - assigned_at (TIMESTAMP)

role_permissions
  - role_id (UUID)
  - permission_id (UUID)
```

## Security Measures

1. **Password Security**
   - Argon2 hashing
   - Minimum password requirements
   - Regular password rotation policies

2. **Session Security**
   - Token-based authentication
   - Session expiration
   - Secure session storage

3. **Rate Limiting**
   - IP-based rate limiting
   - Endpoint-specific limits
   - Database-backed rate limit tracking

4. **Input Validation**
   - Zod schema validation
   - SQL injection prevention
   - XSS protection

## API Endpoints

### Authentication

```typescript
POST /api/auth/signup
{
  email: string;
  password: string;
  fullName: string;
}

POST /api/auth/signin
{
  email: string;
  password: string;
}

POST /api/auth/signout
{
  sessionId: string;
}

POST /api/auth/reset-password
{
  email: string;
}

POST /api/auth/reset-password/confirm
{
  token: string;
  password: string;
}
```

### Response Format

```typescript
// Success Response
{
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  session: {
    token: string;
    expiresAt: string;
  };
  roles: string[];
}

// Error Response
{
  message: string;
  code?: string;
}
```

## Usage Examples

### Protected API Route

```typescript
import { withAuth } from '@/middleware/auth-middleware';

export default withAuth(
  async function handler(req, res) {
    // Handler implementation
  },
  ['read:users'] // Required permissions
);
```

### Role-Based Access Control

```typescript
const rbacService = new RBACService(db);

// Check permission
const canAccessUsers = await rbacService.checkPermission(
  userId,
  'read:users'
);

// Assign role
await rbacService.assignRole(userId, 'manager');
```

## Testing

1. **Unit Tests**
   - Service tests
   - Middleware tests
   - Validation tests

2. **Integration Tests**
   - API endpoint tests
   - Authentication flow tests
   - RBAC tests

3. **E2E Tests**
   - User registration flow
   - Login/logout flow
   - Password reset flow

## Environment Configuration

Required environment variables:
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
SMTP_FROM_ADDRESS=noreply@example.com

# Security
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

## Error Handling

1. **Authentication Errors**
   - Invalid credentials
   - Session expired
   - Invalid tokens

2. **Authorization Errors**
   - Insufficient permissions
   - Invalid roles

3. **Rate Limiting Errors**
   - Too many requests
   - IP blocked

## Deployment Considerations

1. **Security**
   - Enable HTTPS
   - Set secure cookie options
   - Configure CORS properly

2. **Scaling**
   - Session storage scaling
   - Rate limit storage scaling
   - Database indexing

3. **Monitoring**
   - Failed login attempts
   - Session statistics
   - Rate limit hits

## Maintenance

1. **Regular Tasks**
   - Session cleanup
   - Rate limit cleanup
   - Security audits

2. **Updates**
   - Password hashing algorithm
   - Token generation method
   - Security dependencies
