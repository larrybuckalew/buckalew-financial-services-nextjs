# Enable error handling
$ErrorActionPreference = "Stop"

function Write-Step {
    param(
        [string]$Message
    )
    Write-Host "
=== $Message ===" -ForegroundColor Cyan
}

Write-Step "Installing dependencies"

# Core dependencies
$dependencies = @(
    "@prisma/client",
    "next",
    "react",
    "react-dom",
    "@next-auth/prisma-adapter",
    "next-auth",
    "bcrypt",
    "lucide-react",
    "recharts",
    "zod",
    "@hookform/resolvers",
    "react-hook-form",
    "tailwindcss",
    "postcss",
    "autoprefixer"
)

# Dev dependencies
$devDependencies = @(
    "prisma",
    "typescript",
    "@types/react",
    "@types/node",
    "@types/bcrypt",
    "eslint",
    "eslint-config-next"
)

try {
    # Remove existing node_modules and lock files
    Write-Step "Cleaning existing installations"
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue

    # Install dependencies
    Write-Step "Installing core dependencies"
    $dependencies | ForEach-Object {
        Write-Host "Installing $_..."
        npm install $_ --save
    }

    # Install dev dependencies
    Write-Step "Installing dev dependencies"
    $devDependencies | ForEach-Object {
        Write-Host "Installing $_..."
        npm install $_ --save-dev
    }

    # Initialize Prisma
    Write-Step "Initializing Prisma"
    npx prisma generate

    Write-Host "
All dependencies installed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "Error installing dependencies: $_" -ForegroundColor Red
    exit 1
}
