# Environment Configuration Guide

## Getting Started

### 1. Environment File Setup
1. Copy `.env.example` to `.env`
2. Fill in the required configuration values
3. NEVER commit `.env` to version control

### 2. Required Configurations

#### Database Configuration
- `DATABASE_URL`: Full connection string for PostgreSQL
- Example: `postgresql://username:password@localhost:5432/buckalew_financial_services`

#### Security Secrets
- `NEXTAUTH_SECRET`: Long, random string for NextAuth
- `ENCRYPTION_SECRET_KEY`: Another long, random string for data encryption

### 3. Generating Secure Secrets

#### Using OpenSSL
```bash
# Generate a 32-byte base64 encoded secret
openssl rand -base64 32

# Generate a hex-encoded secret
openssl rand -hex 64
```

#### Using Node.js
```javascript
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('base64'));
console.log(crypto.randomBytes(64).toString('hex'));
```

### 4. Environment Modes
- `development`: Local development
- `test`: Testing environment
- `production`: Live production environment

### 5. Feature Flags
- Control application features via environment variables
- Easy to enable/disable features without code changes

### 6. Security Best Practices
- Use strong, unique secrets
- Rotate secrets periodically
- Limit secret access
- Use secret management tools in production

### 7. Troubleshooting
- Verify all required variables are set
- Check database connection string
- Ensure secrets are sufficiently long and random

### 8. Deployment Considerations
- Use environment-specific configurations
- Use secret management services (e.g., Vercel Secrets, AWS Secrets Manager)
- Never hard-code sensitive information

## Example Secret Generation Script

```bash
#!/bin/bash

# Generate secure secrets
generate_secret() {
  openssl rand -base64 32
}

echo "NEXTAUTH_SECRET=$(generate_secret)"
echo "ENCRYPTION_SECRET_KEY=$(generate_secret)"
echo "CSRF_SECRET=$(generate_secret)"
```
