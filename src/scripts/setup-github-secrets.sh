#!/bin/bash

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI not found. Please install gh CLI first."
    exit 1
fi

# Ensure you're logged in to GitHub
gh auth status || { 
    echo "You're not logged in to GitHub. Please run 'gh auth login'."
    exit 1
}

# Function to prompt for secret
prompt_secret() {
    local prompt_text="$1"
    local secret=""
    while [ -z "$secret" ]; do
        read -sp "$prompt_text" secret
        echo
        if [ -z "$secret" ]; then
            echo "Secret cannot be empty. Please try again."
        fi
    done
    echo "$secret"
}

# Repository details
read -p "Enter GitHub repository owner (username/org): " REPO_OWNER
read -p "Enter GitHub repository name: " REPO_NAME

# Sentry Secrets
SENTRY_AUTH_TOKEN=$(prompt_secret "Enter Sentry Auth Token: ")
SENTRY_ORG=$(prompt_secret "Enter Sentry Organization Slug: ")
SENTRY_PROJECT=$(prompt_secret "Enter Sentry Project Slug: ")

# Database Secrets
PRODUCTION_DATABASE_URL=$(prompt_secret "Enter Production Database URL: ")

# Authentication Secrets
PRODUCTION_NEXTAUTH_SECRET=$(prompt_secret "Enter Production NextAuth Secret: ")

# SMTP Secrets
PRODUCTION_SMTP_HOST=$(prompt_secret "Enter Production SMTP Host: ")
PRODUCTION_SMTP_USER=$(prompt_secret "Enter Production SMTP Username: ")
PRODUCTION_SMTP_PASSWORD=$(prompt_secret "Enter Production SMTP Password: ")

# OAuth Secrets
PRODUCTION_GOOGLE_CLIENT_ID=$(prompt_secret "Enter Production Google Client ID: ")
PRODUCTION_GOOGLE_CLIENT_SECRET=$(prompt_secret "Enter Production Google Client Secret: ")

# Set GitHub Secrets
echo "Setting up GitHub Secrets..."

# Sentry Secrets
gh secret set SENTRY_AUTH_TOKEN "$SENTRY_AUTH_TOKEN" -R "$REPO_OWNER/$REPO_NAME"
gh secret set SENTRY_ORG "$SENTRY_ORG" -R "$REPO_OWNER/$REPO_NAME"
gh secret set SENTRY_PROJECT "$SENTRY_PROJECT" -R "$REPO_OWNER/$REPO_NAME"

# Database Secrets
gh secret set PRODUCTION_DATABASE_URL "$PRODUCTION_DATABASE_URL" -R "$REPO_OWNER/$REPO_NAME"

# Authentication Secrets
gh secret set PRODUCTION_NEXTAUTH_SECRET "$PRODUCTION_NEXTAUTH_SECRET" -R "$REPO_OWNER/$REPO_NAME"

# SMTP Secrets
gh secret set PRODUCTION_SMTP_HOST "$PRODUCTION_SMTP_HOST" -R "$REPO_OWNER/$REPO_NAME"
gh secret set PRODUCTION_SMTP_USER "$PRODUCTION_SMTP_USER" -R "$REPO_OWNER/$REPO_NAME"
gh secret set PRODUCTION_SMTP_PASSWORD "$PRODUCTION_SMTP_PASSWORD" -R "$REPO_OWNER/$REPO_NAME"

# OAuth Secrets
gh secret set PRODUCTION_GOOGLE_CLIENT_ID "$PRODUCTION_GOOGLE_CLIENT_ID" -R "$REPO_OWNER/$REPO_NAME"
gh secret set PRODUCTION_GOOGLE_CLIENT_SECRET "$PRODUCTION_GOOGLE_CLIENT_SECRET" -R "$REPO_OWNER/$REPO_NAME"

echo "GitHub Secrets setup completed successfully!"