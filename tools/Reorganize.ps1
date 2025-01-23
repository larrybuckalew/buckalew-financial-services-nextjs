# Enable strict mode for better error handling
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Function to write to log file and console
function Write-Log {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message,
        [string]$Type = "INFO"
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "$timestamp [$Type] $Message"
    Write-Host $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

# Function to perform rollback
function Invoke-Rollback {
    param(
        [string]$Reason = "Unknown error occurred"
    )
    
    Write-Log "STARTING ROLLBACK - Reason: $Reason" "ERROR"
    
    try {
        if (Test-Path $componentsDir) {
            Write-Log "Checking if components directory needs cleanup..." "ROLLBACK"
            $newDirs = $directories | ForEach-Object { Join-Path $componentsDir $_ }
            foreach ($dir in $newDirs) {
                if (Test-Path $dir) {
                    Write-Log "Removing $dir..." "ROLLBACK"
                    Remove-Item $dir -Recurse -Force
                }
            }
        }

        if (Test-Path $backupDir) {
            Write-Log "Restoring from backup..." "ROLLBACK"
            Copy-Item "$backupDir\*" $componentsDir -Recurse -Force
            Write-Log "Backup restored successfully" "ROLLBACK"
        }

        Write-Log "Rollback completed" "ROLLBACK"
    }
    catch {
        Write-Log "CRITICAL: Rollback failed! Error: $_" "ERROR"
        Write-Log "Manual intervention may be required." "ERROR"
    }
}

# Get the directory where the script is located
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
$componentsDir = Join-Path $projectRoot "src\components"
$backupDir = Join-Path $projectRoot "components-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$logFile = Join-Path $projectRoot "reorganize-log.txt"

# Define the directory structure
$directories = @(
    "calculators",
    "charts",
    "common",
    "error",
    "insurance",
    "layout",
    "ui"
)

# Start the script
Write-Log "Starting component reorganization..."
Write-Log "Project root: $projectRoot"
Write-Log "Components directory: $componentsDir"

try {
    # Check if components directory exists
    if (-not (Test-Path $componentsDir)) {
        Write-Log "Components directory not found. Creating it..." "WARN"
        New-Item -Path $componentsDir -ItemType Directory -Force
    }

    # Create backup
    Write-Log "Creating backup at: $backupDir"
    New-Item -Path $backupDir -ItemType Directory -Force
    if (Test-Path $componentsDir) {
        Copy-Item "$componentsDir\*" $backupDir -Recurse -Force
    }

    # Create new directory structure
    foreach ($dir in $directories) {
        $path = Join-Path $componentsDir $dir
        Write-Log "Creating directory: $path"
        if (-not (Test-Path $path)) {
            New-Item -Path $path -ItemType Directory -Force
            New-Item -Path "$path\__tests__" -ItemType Directory -Force
        }
    }

    # Search for and move calculator files
    Write-Log "Looking for calculator components..."
    $calculatorFiles = Get-ChildItem -Path $componentsDir -Recurse -Filter "*Calculator.tsx"
    
    if ($calculatorFiles.Count -eq 0) {
        Write-Log "No calculator components found. They may need to be created." "WARN"
    }
    else {
        Write-Log "Found $($calculatorFiles.Count) calculator component(s)"
        foreach ($file in $calculatorFiles) {
            $destination = Join-Path $componentsDir "calculators\$($file.Name)"
            Write-Log "Moving $($file.Name) to calculators directory"
            Move-Item $file.FullName $destination -Force
        }
    }

    # Move error boundary if it exists
    Write-Log "Looking for ErrorBoundary component..."
    $errorBoundaryFiles = Get-ChildItem -Path $componentsDir -Recurse -Filter "ErrorBoundary.tsx"
    if ($errorBoundaryFiles.Count -gt 0) {
        foreach ($file in $errorBoundaryFiles) {
            $destination = Join-Path $componentsDir "error\$($file.Name)"
            Write-Log "Moving $($file.Name) to error directory"
            Move-Item $file.FullName $destination -Force
        }
    }
    else {
        Write-Log "No ErrorBoundary component found. It may need to be created." "WARN"
    }

    # Create index files
    Write-Log "Creating index files..."
    foreach ($dir in $directories) {
        $dirPath = Join-Path $componentsDir $dir
        $indexPath = Join-Path $dirPath "index.ts"
        $exports = Get-ChildItem -Path $dirPath -Filter "*.tsx" | ForEach-Object {
            "export * from './$($_.BaseName)';"
        }
        if ($exports) {
            Set-Content -Path $indexPath -Value $exports
            Write-Log "Created index file for $dir with $($exports.Count) export(s)"
        }
        else {
            Set-Content -Path $indexPath -Value "// No components to export yet"
            Write-Log "Created empty index file for $dir" "WARN"
        }
    }

    # Create main index.ts
    $mainIndexContent = @"
// Generated index file
$($directories | ForEach-Object { "export * from './$_';" })
"@
    Set-Content -Path (Join-Path $componentsDir "index.ts") -Value $mainIndexContent
    Write-Log "Created main index.ts file"

    Write-Log "Reorganization completed successfully!"
    Write-Log "Backup location: $backupDir"
}
catch {
    Write-Log "Error occurred: $_" "ERROR"
    Invoke-Rollback -Reason $_
    exit 1
}
finally {
    Write-Log "Script execution completed"
    Write-Log "=== Reorganization Summary ==="
    Write-Log "Backup created: $backupDir"
    Write-Log "Log file: $logFile"
}
