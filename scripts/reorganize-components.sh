#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Create temporary backup directory
echo "Creating backup..."
mkdir -p .components-backup
cp -r src/components/* .components-backup/

# Create new directory structure
echo "Creating new directory structure..."
mkdir -p src/components/{calculators,charts,common,dashboard,error,insurance,layout,ui}/__tests__

# Move calculator components
echo "Organizing calculator components..."
mv src/components/calculators/*.tsx src/components/calculators/
mv src/components/calculators/__tests__/* src/components/calculators/__tests__/

# Move chart components
echo "Organizing chart components..."
mv src/components/charts/*.tsx src/components/charts/
mv src/components/charts/__tests__/* src/components/charts/__tests__/

# Move common components
echo "Organizing common components..."
mv src/components/{BlogPreview,ServiceCard,TestimonialCard}.tsx src/components/common/

# Move error components
echo "Organizing error components..."
mv src/components/ErrorBoundary.tsx src/components/error/
mv src/components/error/*.tsx src/components/error/

# Move insurance components
echo "Organizing insurance components..."
mv src/components/insurance/*.tsx src/components/insurance/
mv src/components/insurance/__tests__/* src/components/insurance/__tests__/

# Consolidate layout components
echo "Consolidating layout components..."
mkdir -p src/components/layout/{footer,header,navigation}
mv src/components/layouts/* src/components/layout/ 2>/dev/null || true
mv src/components/Layout.tsx src/components/layout/
rm -rf src/components/layouts

# Move UI components
echo "Organizing UI components..."
mv src/components/ui/*.tsx src/components/ui/

# Clean up empty directories
echo "Cleaning up..."
find src/components -type d -empty -delete

# Create index files for each directory
echo "Creating index files..."
for dir in src/components/*/; do
  if [ -d "$dir" ]; then
    echo "Creating index.ts for ${dir%/}"
    find "$dir" -maxdepth 1 -name "*.tsx" -exec basename {} .tsx \; | \
    awk '{print "export * from \"./" $1 "\""}' > "${dir}index.ts"
  fi
done

# Create main components index file
echo "Creating main index file..."
cat > src/components/index.ts << EOF
// Generated index file
export * from './calculators';
export * from './charts';
export * from './common';
export * from './dashboard';
export * from './error';
export * from './insurance';
export * from './layout';
export * from './ui';
EOF

# Log completed changes
echo "Creating change log..."
cat > component-reorganization.log << EOF
Component Directory Reorganization Log
====================================
Date: $(date)

Changes Made:
1. Created structured component directories
2. Consolidated layout components
3. Organized components by type
4. Created index files for exports
5. Backup created in .components-backup

New Structure:
$(tree src/components --dirsfirst)

Note: Original files backed up to .components-backup/
EOF

echo "Reorganization complete! Check component-reorganization.log for details."
echo "Please review changes and run tests before committing."
echo "To revert changes: rm -rf src/components/* && mv .components-backup/* src/components/"
