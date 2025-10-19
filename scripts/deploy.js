const { execSync } = require('child_process');
const path = require('path');

// Configuration
const config = {
  requiredEnvVars: [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
  ],
  preDeploymentChecks: [
    'npm run lint',
    'npm run test:unit',
    'npm run build'
  ],
  prismaMigrationCommand: 'npx prisma migrate deploy',
  buildCommand: 'npm run build',
  deploymentCommand: 'npx vercel --prod'
};

// Utility functions
const log = (message) => console.log(`[DEPLOY] ${message}`);
const error = (message) => {
  console.error(`[ERROR] ${message}`);
  process.exit(1);
};

// Check environment variables
const checkEnvironment = () => {
  log('Checking environment variables...');
  config.requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      error(`Missing required environment variable: ${envVar}`);
    }
  });
};

// Run pre-deployment checks
const runPreDeploymentChecks = () => {
  log('Running pre-deployment checks...');
  config.preDeploymentChecks.forEach(check => {
    try {
      execSync(check, { stdio: 'inherit' });
    } catch (err) {
      error(`Pre-deployment check failed: ${check}`);
    }
  });
};

// Run database migrations
const runDatabaseMigrations = () => {
  log('Running database migrations...');
  try {
    execSync(config.prismaMigrationCommand, { stdio: 'inherit' });
  } catch (err) {
    error('Database migration failed');
  }
};

// Build the application
const buildApplication = () => {
  log('Building application...');
  try {
    execSync(config.buildCommand, { stdio: 'inherit' });
  } catch (err) {
    error('Build failed');
  }
};

// Deploy to production
const deployToProduction = () => {
  log('Deploying to production...');
  try {
    execSync(config.deploymentCommand, { stdio: 'inherit' });
  } catch (err) {
    error('Deployment failed');
  }
};

// Main deployment process
const deploy = async () => {
  try {
    checkEnvironment();
    runPreDeploymentChecks();
    runDatabaseMigrations();
    buildApplication();
    deployToProduction();
    log('Deployment completed successfully!');
  } catch (err) {
    error(`Deployment failed: ${err.message}`);
  }
};

// Execute deployment
deploy();