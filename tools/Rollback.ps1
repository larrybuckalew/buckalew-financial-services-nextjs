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

# Get the directory where the script is located
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
$componentsDir = Join-Path $projectRoot "src\components"
$logFile = Join-Path $projectRoot "rollback-log.txt"

# Find the most recent backup
$backupDir = Get-ChildItem -Path $projectRoot -Directory -Filter "components-backup-*" | 
    Sort-Object CreationTime -Descending | 
    Select-Object -First 1

if (-not $backupDir) {
    Write-Log "No backup directory found!" "ERROR"
    exit 1
}

Write-Log "Starting rollback process..."
Write-Log "Using backup: $($backupDir.FullName)"

try {
    # Create a backup of current state before rollback
    $preRollbackBackup = Join-Path $projectRoot "pre-rollback-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Write-Log "Creating pre-rollback backup at: $preRollbackBackup"
    New-Item -Path $preRollbackBackup -ItemType Directory -Force
    Copy-Item "$componentsDir\*" $preRollbackBackup -Recurse -Force

    # Remove current components
    Write-Log "Removing current components..."
    Remove-Item $componentsDir -Recurse -Force

    # Restore from backup
    Write-Log "Restoring from backup..."
    New-Item -Path $componentsDir -ItemType Directory -Force
    Copy-Item "$($backupDir.FullName)\*" $componentsDir -Recurse -Force

    # Verify restoration
    Write-Log "Verifying restoration..."
    $criticalFiles = @(
        "MortgageCalculator.tsx",
        "RetirementCalculator.tsx",
        "InvestmentCalculator.tsx"
    )

    $missingFiles = @()
    foreach ($file in $criticalFiles) {
        if (-not (Test-Path (Join-Path $componentsDir "*$file"))) {
            $missingFiles += $file
        }
    }

    if ($missingFiles.Count -gt 0) {
        throw "Rollback verification failed! Missing files: $($missingFiles -join ', ')"
    }

    Write-Log "Rollback completed successfully!"
    Write-Log "Pre-rollback backup saved at: $preRollbackBackup"
}
catch {
    Write-Log "Error during rollback: $_" "ERROR"
    Write-Log "Attempting to restore from pre-rollback backup..." "WARN"
    
    try {
        Remove-Item $componentsDir -Recurse -Force
        Copy-Item "$preRollbackBackup\*" $componentsDir -Recurse -Force
        Write-Log "Restored to pre-rollback state" "WARN"
    }
    catch {
        Write-Log "CRITICAL: Failed to restore to pre-rollback state! Error: $_" "ERROR"
        Write-Log "Manual intervention required." "ERROR"
        Write-Log "Pre-rollback backup: $preRollbackBackup" "ERROR"
        Write-Log "Original backup: $($backupDir.FullName)" "ERROR"
    }
    
    exit 1
}
finally {
    Write-Log "Script execution completed"
}

# Add completion summary
Write-Log "=== Rollback Summary ==="
Write-Log "Original backup used: $($backupDir.FullName)"
Write-Log "Pre-rollback backup: $preRollbackBackup"
Write-Log "Log file: $logFile"
