#!/bin/bash

# Component Validation Script
# Usage: ./validate-component.sh ComponentName

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

COMPONENT=$1

if [ -z "$COMPONENT" ]; then
  echo -e "${RED}❌ Error: Component name required${NC}"
  echo "Usage: ./validate-component.sh ComponentName"
  exit 1
fi

echo -e "${YELLOW}🔍 Validating component: $COMPONENT${NC}"
echo "================================================"

# Find component directory
COMPONENT_DIR=$(find components -type d -name "$COMPONENT" | head -n 1)

if [ -z "$COMPONENT_DIR" ]; then
  echo -e "${RED}❌ Component not found: $COMPONENT${NC}"
  exit 1
fi

echo -e "📁 Found component at: $COMPONENT_DIR"
echo ""

# Initialize validation results
ERRORS=0
WARNINGS=0

# Function to check file exists
check_file() {
  local file=$1
  local description=$2
  
  if [ -f "$COMPONENT_DIR/$file" ]; then
    echo -e "${GREEN}✅ $description${NC}"
    return 0
  else
    echo -e "${RED}❌ Missing: $description ($file)${NC}"
    ERRORS=$((ERRORS + 1))
    return 1
  fi
}

# Function to check file size
check_file_size() {
  local file=$1
  local max_size=$2
  local description=$3
  
  if [ -f "$COMPONENT_DIR/$file" ]; then
    size=$(wc -c < "$COMPONENT_DIR/$file")
    if [ $size -le $max_size ]; then
      echo -e "${GREEN}✅ $description size OK (${size} bytes)${NC}"
    else
      echo -e "${YELLOW}⚠️  $description is large (${size} bytes, max: ${max_size})${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
}

echo "📋 Checking required files..."
echo "------------------------------"

# Check required files
check_file "$COMPONENT.jsx" "Component implementation"
check_file "$COMPONENT.stories.jsx" "Storybook stories"
check_file "$COMPONENT.test.js" "Unit tests"
check_file "$COMPONENT.tokens.json" "Design tokens"
check_file "README.md" "Documentation"
check_file "index.js" "Export file"

echo ""
echo "📏 Checking file sizes..."
echo "------------------------"

# Check file sizes (example thresholds)
check_file_size "$COMPONENT.jsx" 10000 "Component"
check_file_size "$COMPONENT.tokens.json" 5000 "Tokens"

echo ""
echo "🧪 Running tests..."
echo "------------------"

# Run component tests
if npm test -- "$COMPONENT" --passWithNoTests > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Unit tests passed${NC}"
else
  echo -e "${RED}❌ Unit tests failed${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check test coverage
echo ""
echo "📊 Checking test coverage..."
echo "---------------------------"

COVERAGE_OUTPUT=$(npm test -- "$COMPONENT" --coverage --silent 2>&1 | grep -A 4 "Coverage summary" || echo "")
if [ ! -z "$COVERAGE_OUTPUT" ]; then
  echo "$COVERAGE_OUTPUT"
  
  # Extract coverage percentage (simplified check)
  if echo "$COVERAGE_OUTPUT" | grep -q "Statements.*: [8-9][0-9]\|100"; then
    echo -e "${GREEN}✅ Coverage meets threshold (>80%)${NC}"
  else
    echo -e "${YELLOW}⚠️  Coverage below 80%${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo -e "${YELLOW}⚠️  Could not determine coverage${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "🎨 Validating tokens..."
echo "----------------------"

# Validate token structure
if [ -f "$COMPONENT_DIR/$COMPONENT.tokens.json" ]; then
  if node -e "JSON.parse(require('fs').readFileSync('$COMPONENT_DIR/$COMPONENT.tokens.json'))" 2>/dev/null; then
    echo -e "${GREEN}✅ Tokens are valid JSON${NC}"
  else
    echo -e "${RED}❌ Invalid JSON in tokens file${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

echo ""
echo "📝 Checking documentation..."
echo "---------------------------"

# Check README content
if [ -f "$COMPONENT_DIR/README.md" ]; then
  README_LENGTH=$(wc -l < "$COMPONENT_DIR/README.md")
  if [ $README_LENGTH -gt 10 ]; then
    echo -e "${GREEN}✅ README has content ($README_LENGTH lines)${NC}"
  else
    echo -e "${YELLOW}⚠️  README is minimal ($README_LENGTH lines)${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

echo ""
echo "♿ Running accessibility checks..."
echo "---------------------------------"

# Check for ARIA attributes in component
if [ -f "$COMPONENT_DIR/$COMPONENT.jsx" ]; then
  if grep -q "aria-\|role=" "$COMPONENT_DIR/$COMPONENT.jsx"; then
    echo -e "${GREEN}✅ Component has ARIA attributes${NC}"
  else
    echo -e "${YELLOW}⚠️  No ARIA attributes found${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

echo ""
echo "================================================"
echo "📊 Validation Summary for $COMPONENT"
echo "================================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}🎉 Perfect! Component passed all validations!${NC}"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}✅ Component is valid with $WARNINGS warning(s)${NC}"
  exit 0
else
  echo -e "${RED}❌ Component validation failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
  echo ""
  echo "Please fix the errors before proceeding."
  exit 1
fi