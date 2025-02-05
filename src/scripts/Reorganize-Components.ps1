# Ensure we're in the right directory
Set-Location $PSScriptRoot\..

# Create temporary backup directory
Write-Host "Creating backup..."
New-Item -Path ".components-backup" -ItemType Directory -Force
Copy-Item "src\components\*" ".components-backup" -Recurse -Force

# Create new directory structure
Write-Host "Creating new directory structure..."
$directories = @(
    "src\components\calculators",
    "src\components\charts",
    "src\components\common",
    "src\components\dashboard",
    "src\components\error",
    "src\components\insurance",
    "src\components\layout",
    "src\components\ui"
)

foreach ($dir in $directories) {
    New-Item -Path "$dir\__tests__" -ItemType Directory -Force
}

# Move calculator components
Write-Host "Organizing calculator components..."
Move-Item "src\components\calculators\*.tsx" "src\components\calculators\" -ErrorAction SilentlyContinue
if (Test-Path "src\components\calculators\__tests__") {
    Move-Item "src\components\calculators\__tests__\*" "src\components\calculators\__tests__\" -ErrorAction SilentlyContinue
}

# Move common components
Write-Host "Organizing common components..."
@("BlogPreview.tsx", "ServiceCard.tsx", "TestimonialCard.tsx") | ForEach-Object {
    if (Test-Path "src\components\$_") {
        Move-Item "src\components\$_" "src\components\common\" -ErrorAction SilentlyContinue
    }
}

# Move error components
Write-Host "Organizing error components..."
if (Test-Path "src\components\ErrorBoundary.tsx") {
    Move-Item "src\components\ErrorBoundary.tsx" "src\components\error\" -ErrorAction SilentlyContinue
}

# Consolidate layout components
Write-Host "Consolidating layout components..."
New-Item -Path "src\components\layout\footer" -ItemType Directory -Force
New-Item -Path "src\components\layout\header" -ItemType Directory -Force
New-Item -Path "src\components\layout\navigation" -ItemType Directory -Force

if (Test-Path "src\components\layouts") {
    Move-Item "src\components\layouts\*" "src\components\layout\" -ErrorAction SilentlyContinue
    Remove-Item "src\components\layouts" -Recurse -ErrorAction SilentlyContinue
}

if (Test-Path "src\components\Layout.tsx") {
    Move-Item "src\components\Layout.tsx" "src\components\layout\" -ErrorAction SilentlyContinue
}

# Create index files
Write-Host "Creating index files..."
foreach ($dir in $directories) {
    $components = Get-ChildItem -Path $dir -Filter "*.tsx" | ForEach-Object { "export * from './$($_.BaseName)';" }
    $components | Set-Content "$dir\index.ts"
}

# Create main components index file
$mainIndex = @"
// Generated index file
export * from './calculators';
export * from './charts';
export * from './common';
export * from './dashboard';
export * from './error';
export * from './insurance';
export * from './layout';
export * from './ui';
"@
Set-Content "src\components\index.ts" $mainIndex

# Create change log
$changeLog = @"
Component Directory Reorganization Log
====================================
Date: $(Get-Date)

Changes Made:
1. Created structured component directories
2. Consolidated layout components
3. Organized components by type
4. Created index files for exports
5. Backup created in .components-backup

New Structure:
$(Get-ChildItem src\components -Recurse | Select-Object FullName)

Note: Original files backed up to .components-backup\
"@
Set-Content "component-reorganization.log" $changeLog

Write-Host "Reorganization complete! Check component-reorganization.log for details."
Write-Host "Please review changes and run tests before committing."
Write-Host "To revert changes: Remove-Item src\components\* -Recurse; Copy-Item .components-backup\* src\components -Recurse"
