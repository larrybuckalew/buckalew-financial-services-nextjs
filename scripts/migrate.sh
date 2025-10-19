#!/bin/bash

# Make script executable
chmod +x "$0"

# Exit on any error
set -e

# Check if NODE_ENV is set, default to development
NODE_ENV=${NODE_ENV:-development}

echo "Running Prisma migrations for $NODE_ENV environment"

# Generate Prisma client
npx prisma generate

# Run migrations
if [ "$NODE_ENV" = "production" ]; then
  # In production, apply migrations without prompting
  npx prisma migrate deploy
else
  # In development, allow interactive migrations
  npx prisma migrate dev
fi

# Optional: Seed database if needed
# npx prisma db seed

echo "Migrations completed successfully!"