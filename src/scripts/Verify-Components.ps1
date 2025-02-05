# Ensure we're in the right directory
Set-Location $PSScriptRoot\..

# Check for critical components
Write-Host "Checking for critical components..."
$criticalComponents = @(
    "src\components\calculators\MortgageCalculator.tsx",
    "src\components\calculators\RetirementCalculator.tsx",
    "src\components\calculators\InvestmentCalculator.tsx",
    "src\components\calculators\InsuranceQuoteCalculator.tsx",
    "src\components\insurance\DrugFormularySearch.tsx",
    "src\components\insurance\ProviderSearch.tsx",
    "src\components\layout\Layout.tsx",
    "src\components\error\ErrorBoundary.tsx"
)

$missingComponents = @()
foreach ($component in $criticalComponents) {
    if (-not (Test-Path $component)) {
        $missingComponents += $component
    }
}

# Check for duplicate components
Write-Host "Checking for duplicates..."
$duplicates = Get-ChildItem -Path src\components -Recurse -Filter "*.tsx" | 
    Group-Object Name | 
    Where-Object { $_.Count -gt 1 }

# Check index files
Write-Host "Verifying index files..."
$missingIndexFiles = @()
Get-ChildItem -Path src\components -Directory | ForEach-Object {
    if (-not (Test-Path "$($_.FullName)\index.ts")) {
        $missingIndexFiles += "$($_.FullName)\index.ts"
    }
}

# Check test files
Write-Host "Checking test coverage..."
$missingTests = @()
Get-ChildItem -Path src\components -Recurse -Filter "*.tsx" | ForEach-Object {
    $testFile = $_.FullName -replace "components\\", "components\__tests__\" -replace ".tsx", ".test.tsx"
    if (-not (Test-Path $testFile)) {
        $missingTests += $_.FullName
    }
}

# Generate report
$report = @"
Component Verification Report
===========================
Date: $(Get-Date)

1. Missing Critical Components:
$($missingComponents -join "`n")

2. Duplicate Components:
$($duplicates | ForEach-Object { "$($_.Name) ($($_.Count) instances)" })

3. Missing Index Files:
$($missingIndexFiles -join "`n")

4. Components Missing Tests:
$($missingTests -join "`n")

Recommendations:
$(if ($missingComponents) { "- Restore missing critical components from backup or repository" })
$(if ($duplicates) { "- Remove duplicate components" })
$(if ($missingIndexFiles) { "- Create missing index files" })
$(if ($missingTests) { "- Add tests for untested components" })
"@

Set-Content "component-verification.log" $report

Write-Host "Verification complete! Check component-verification.log for results."

# Exit with error if there are any issues
if ($missingComponents -or $duplicates -or $missingIndexFiles) {
    exit 1
}

exit 0
