#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Check for critical components
echo "Checking for critical components..."
critical_components=(
  "src/components/calculators/MortgageCalculator.tsx"
  "src/components/calculators/RetirementCalculator.tsx"
  "src/components/calculators/InvestmentCalculator.tsx"
  "src/components/calculators/InsuranceQuoteCalculator.tsx"
  "src/components/insurance/DrugFormularySearch.tsx"
  "src/components/insurance/ProviderSearch.tsx"
  "src/components/layout/Layout.tsx"
  "src/components/error/ErrorBoundary.tsx"
)

missing_components=()
for component in "${critical_components[@]}"; do
  if [ ! -f "$component" ]; then
    missing_components+=("$component")
  fi
done

# Check for duplicate components
echo "Checking for duplicates..."
duplicates=$(find src/components -type f -name "*.tsx" | sort | uniq -d)

# Check index files
echo "Verifying index files..."
missing_index_files=()
for dir in src/components/*/; do
  if [ ! -f "${dir}index.ts" ]; then
    missing_index_files+=("${dir}index.ts")
  fi
done

# Check test files
echo "Checking test coverage..."
missing_tests=()
for component in $(find src/components -name "*.tsx"); do
  test_file="${component%.*}.test.tsx"
  test_file="${test_file/components/components\/__tests__}"
  if [ ! -f "$test_file" ]; then
    missing_tests+=("$component")
  fi
done

# Generate report
cat > component-verification.log << EOF
Component Verification Report
===========================
Date: $(date)

1. Missing Critical Components:
$(printf '%s\n' "${missing_components[@]}" || echo "None")

2. Duplicate Components:
$duplicates

3. Missing Index Files:
$(printf '%s\n' "${missing_index_files[@]}" || echo "None")

4. Components Missing Tests:
$(printf '%s\n' "${missing_tests[@]}" || echo "None")

Recommendations:
$([ ${#missing_components[@]} -gt 0 ] && echo "- Restore missing critical components from backup or repository")
$([ -n "$duplicates" ] && echo "- Remove duplicate components")
$([ ${#missing_index_files[@]} -gt 0 ] && echo "- Create missing index files")
$([ ${#missing_tests[@]} -gt 0 ] && echo "- Add tests for untested components")
EOF

echo "Verification complete! Check component-verification.log for results."

# Exit with error if there are any issues
if [ ${#missing_components[@]} -gt 0 ] || [ -n "$duplicates" ] || [ ${#missing_index_files[@]} -gt 0 ]; then
  exit 1
fi

exit 0
