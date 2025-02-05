#!/bin/bash

# Check if Sentry CLI is installed
if ! command -v sentry-cli &> /dev/null
then
    echo "Sentry CLI not found. Installing..."
    npm install -g @sentry/cli
fi

# Prompt for Sentry configuration
read -p "Enter your Sentry organization slug: " SENTRY_ORG
read -p "Enter your Sentry project slug: " SENTRY_PROJECT
read -p "Enter your Sentry auth token: " SENTRY_AUTH_TOKEN

# Create or update .sentryclirc
cat > .sentryclirc << EOL
[defaults]
org = $SENTRY_ORG
project = $SENTRY_PROJECT

[auth]
token = $SENTRY_AUTH_TOKEN
EOL

# Create .env file with Sentry configuration
cat >> .env.local << EOL

# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
SENTRY_ORG=$SENTRY_ORG
SENTRY_PROJECT=$SENTRY_PROJECT
EOL

# Add Sentry to .gitignore to prevent sensitive info from being committed
if ! grep -q "# Sentry" .gitignore; then
    echo -e "\n# Sentry\n.sentryclirc" >> .gitignore
fi

echo "Sentry configuration completed successfully!"
echo "Please review and update .env.local with your specific Sentry DSN"