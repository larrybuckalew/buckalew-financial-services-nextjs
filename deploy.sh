#!/bin/bash

# Buckalew Financial Services - Deployment Script

set -e  # Exit immediately if a command exits with a non-zero status

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Deployment Configuration
PROJECT_NAME="buckalew-financial-services"
VERCEL_PROJECT_ID="your-vercel-project-id"
ENVIRONMENT="production"

# Logging function
log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Pre-deployment checks
pre_deploy_checks() {
    log "Running pre-deployment checks..."
    
    # Check if all required environment variables are set
    if [ -z "$VERCEL_TOKEN" ]; then
        error "Vercel token is not set"
    fi

    # Check git status
    if [[ -n $(git status -s) ]]; then
        error "Working directory is not clean. Commit or stash changes before deploying."
    fi

    # Ensure main branch
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        error "Deployments must be from main branch"
    fi
}

# Run tests
run_tests() {
    log "Running test suite..."
    npm run test || error "Tests failed"
    npm run lint || error "Linting failed"
}

# Build application
build_app() {
    log "Building application..."
    npm run build || error "Build failed"
}

# Deploy to Vercel
deploy_to_vercel() {
    log "Deploying to Vercel..."
    vercel --prod --token=$VERCEL_TOKEN || error "Vercel deployment failed"
}

# Post-deployment verification
post_deploy_verification() {
    log "Verifying deployment..."
    
    # Perform a simple health check
    DEPLOY_URL=$(vercel ls | grep "$PROJECT_NAME" | awk '{print $2}')
    HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL/api/health")
    
    if [ "$HEALTH_CHECK" != "200" ]; then
        error "Health check failed. Deployment might be incomplete."
    fi
}

# Rollback function (in case of critical issues)
rollback() {
    log "Initiating rollback..."
    vercel rollback --token=$VERCEL_TOKEN
}

# Main deployment workflow
main() {
    log "Starting deployment for ${PROJECT_NAME}"
    
    pre_deploy_checks
    run_tests
    build_app
    deploy_to_vercel
    post_deploy_verification
    
    log "${GREEN}Deployment Successful!${NC}"
}

# Error handling trap
trap 'error "Deployment failed at line $LINENO"' ERR

# Execute main deployment function
main
