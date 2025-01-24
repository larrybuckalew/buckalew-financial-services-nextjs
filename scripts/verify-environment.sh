#!/bin/bash

echo "🔍 Verifying Buckalew Financial Services Development Environment"
echo "============================================================"

# Check Git repository
echo "📦 Checking Git repository..."
if [ -d ".git" ]; then
    echo "✅ Git repository found"
    echo "Current branch: $(git branch --show-current)"
    echo "Remote repositories:"
    git remote -v
else
    echo "❌ Not a Git repository"
    exit 1
fi

# Check Node.js and npm
echo -e "\n📦 Checking Node.js and npm..."
if command -v node &> /dev/null; then
    echo "✅ Node.js version: $(node -v)"
else
    echo "❌ Node.js not found"
    exit 1
fi

if command -v npm &> /dev/null; then
    echo "✅ npm version: $(npm -v)"
else
    echo "❌ npm not found"
    exit 1
fi

# Check project structure
echo -e "\n📁 Checking project structure..."
required_directories=(
    "src/components"
    "src/lib"
    "src/pages"
    "prisma"
    "docs"
    ".github/workflows"
)

for dir in "${required_directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Found directory: $dir"
    else
        echo "❌ Missing directory: $dir"
    fi
done

# Check core components
echo -e "\n🧩 Checking core components..."
component_types=(
    "calculators"
    "charts"
    "dashboard"
    "error"
    "layouts"
    "tables"
)

for type in "${component_types[@]}"; do
    if [ -d "src/components/$type" ]; then
        echo "✅ Found component type: $type"
        ls -1 "src/components/$type" | grep -E ".tsx$" | sed 's/\.tsx$//'
    else
        echo "❌ Missing component type: $type"
    fi
done

# Check configuration files
echo -e "\n⚙️ Checking configuration files..."
config_files=(
    "package.json"
    "tsconfig.json"
    ".env.example"
    "jest.config.js"
    "next.config.js"
    "prisma/schema.prisma"
)

for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found config file: $file"
    else
        echo "❌ Missing config file: $file"
    fi
done

# Check dependencies
echo -e "\n📦 Checking dependencies..."
if [ -f "package.json" ]; then
    echo "Required dependencies:"
    jq '.dependencies' package.json
    echo -e "\nDevelopment dependencies:"
    jq '.devDependencies' package.json
else
    echo "❌ package.json not found"
fi

# Check documentation
echo -e "\n📚 Checking documentation..."
if [ -d "docs" ]; then
    echo "Available documentation:"
    find docs -type f -name "*.md" -exec basename {} \;
else
    echo "❌ Documentation directory not found"
fi

# Summary
echo -e "\n📋 Environment Verification Summary"
echo "=================================="
echo "1. Ensure all ❌ items are addressed"
echo "2. Review the PROJECT_STATUS.md file"
echo "3. Check existing components before creating new ones"
echo "4. Follow the established coding patterns"
echo "5. Write tests for any new features"

# Final notes
echo -e "\n💡 Next Steps"
echo "1. Run 'npm install' to install dependencies"
echo "2. Copy .env.example to .env and configure"
echo "3. Run 'npx prisma migrate dev' for database setup"
echo "4. Run 'npm test' to verify functionality"
echo "5. Run 'npm run dev' to start development server"