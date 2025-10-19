# Enable error handling
$ErrorActionPreference = "Stop"

function Write-Step {
    param(
        [string]$Message,
        [string]$Status = "INFO"
    )
    Write-Host "`n[${Status}] $Message" -ForegroundColor Cyan
}

# Ensure we're in the right directory
Set-Location $PSScriptRoot\..

# Check if .env.local exists, if not create it from template
Write-Step "Checking environment configuration..."
if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "Created .env.local from example file" -ForegroundColor Green
    } else {
        $envContent = @"
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=file:./dev.db

# Authentication
NEXTAUTH_SECRET=development_secret_key_change_in_production
NEXTAUTH_URL=http://localhost:3000

# Feature Flags
ENABLE_DRUG_PRICING=true
"@
        Set-Content ".env.local" $envContent
        Write-Host "Created default .env.local file" -ForegroundColor Green
    }
}

# Clean install of dependencies
Write-Step "Installing dependencies..."
try {
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
    npm install
} catch {
    Write-Host "Error installing dependencies: $_" -ForegroundColor Red
    exit 1
}

# Setup Database
Write-Step "Setting up database..."
try {
    npx prisma generate
    if ($LASTEXITCODE -ne 0) { throw "Prisma generate failed" }
    
    npx prisma migrate reset --force
    if ($LASTEXITCODE -ne 0) { throw "Prisma migrate reset failed" }
    
    npx prisma migrate dev
    if ($LASTEXITCODE -ne 0) { throw "Prisma migrate dev failed" }
} catch {
    Write-Host "Database setup failed: $_" -ForegroundColor Red
    exit 1
}

# Build the application
Write-Step "Building application..."
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
} catch {
    Write-Host "Build failed: $_" -ForegroundColor Red
    exit 1
}

# Start development server
Write-Step "Starting development server..."
Write-Host @"

Application is ready! To start the development server, run:
    npm run dev

The site will be available at http://localhost:3000

To stop the server at any time, press Ctrl+C

"@ -ForegroundColor Green

$response = Read-Host "Would you like to start the development server now? (y/n)"
if ($response -eq 'y') {
    npm run dev
}
