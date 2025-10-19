#!/bin/bash

# Exit on any error
set -e

# Determine environment
ENV=${1:-development}

echo "Running database setup for $ENV environment"

# Validate environment
if [[ "$ENV" != "development" && "$ENV" != "production" ]]; then
    echo "Invalid environment. Use 'development' or 'production'."
    exit 1
fi

# Load environment-specific .env file
if [[ "$ENV" == "production" ]]; then
    source .env.production
else
    source .env.development
fi

# Validate database connection
if [[ -z "$DATABASE_URL" ]]; then
    echo "ERROR: DATABASE_URL is not set in the environment file"
    exit 1
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run migrations
if [[ "$ENV" == "production" ]]; then
    echo "Applying production migrations..."
    npx prisma migrate deploy
else
    echo "Running development migrations..."
    npx prisma migrate dev
fi

# Optional: Seed database
if [[ "$ENV" == "development" ]]; then
    read -p "Do you want to seed the database? (y/n) " SEED
    if [[ "$SEED" == "y" ]]; then
        npx prisma db seed
    fi
fi

echo "Database setup completed successfully for $ENV environment!"