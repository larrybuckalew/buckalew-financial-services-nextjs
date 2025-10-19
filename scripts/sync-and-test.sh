#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Fetch latest changes
echo "Fetching latest changes..."
git fetch origin

# Sync calculator components
echo "Syncing calculator components..."
git checkout origin/main -- src/components/calculators/InsuranceQuoteCalculator.tsx
git checkout origin/main -- src/components/calculators/RiskAssessment.tsx
git checkout origin/main -- src/components/calculators/__tests__/

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Setup jest.setup.js if it doesn't exist
if [ ! -f jest.setup.js ]; then
  echo "Creating jest.setup.js..."
  echo "import '@testing-library/jest-dom';" > jest.setup.js
fi

# Run tests
echo "Running tests..."
npm run test

# Run test coverage
echo "Running test coverage..."
npm run test:coverage

echo "Sync and test complete!"
