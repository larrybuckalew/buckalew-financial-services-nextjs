# Buckalew Financial Services Web Application

## Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- Sentry account (optional)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/larrybuckalew/buckalew-financial-services-nextjs.git
cd buckalew-financial-services-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in the required configuration:
   - Database connection details
   - Authentication secrets
   - Sentry configuration

### 4. Database Setup
```bash
# Run database migrations
./scripts/db-setup.sh development

# For production
./scripts/db-setup.sh production
```

### 5. Sentry Configuration (Optional)
```bash
# Run Sentry setup script
./scripts/setup-sentry.sh
```

### 6. Development Server
```bash
npm run dev
```

## Deployment

### Local Production Build
```bash
npm run build
npm start
```

### Sentry Release
```bash
# Create a new Sentry release
npm run sentry:release

# Upload source maps
npm run sentry:sourcemaps
```

## Testing
```bash
# Run unit tests
npm test

# Run test coverage
npm run test:coverage
```

## Error Handling
The application includes:
- Global error handling middleware
- Sentry error tracking
- Error boundary for React components
- Comprehensive logging

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Environment Variables
Key environment variables to configure:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Authentication secret
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry project DSN
- `LOG_LEVEL`: Logging verbosity

## Troubleshooting
- Ensure all environment variables are set
- Check database connection
- Verify Sentry configuration
- Review application logs

## License
Distributed under the MIT License.

## Contact
Larry Buckalew - support@buckalew-financial.com