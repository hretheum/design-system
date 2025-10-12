#!/bin/bash

# Batch Component Generation Script for Priority 1 Components
# This script generates all 20 Priority 1 components

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Starting batch generation of 20 Priority 1 components${NC}"
echo "================================================"

# Component definitions: name:category
COMPONENTS=(
  # Actions & Controls (5)
  "Link:actions"
  "IconButton:actions"
  "SplitButton:actions"
  "ButtonGroup:actions"
  "ActionMenu:actions"
  
  # Forms & Inputs (7)
  "FileUpload:forms"
  "Slider:forms"
  "ColorPicker:forms"
  "SearchInput:forms"
  "NumberInput:forms"
  "PinInput:forms"
  "Form:forms"
  
  # Navigation (4)
  "NavigationBar:navigation"
  "Sidebar:navigation"
  "Menu:navigation"
  "SkipLink:navigation"
  
  # Data Display (4)
  "List:data"
  "TreeView:data"
  "DescriptionList:data"
  "EmptyState:data"
)

TOTAL=${#COMPONENTS[@]}
SUCCESS=0
FAILED=0

echo -e "${YELLOW}📦 Generating $TOTAL components...${NC}"
echo ""

# Generate each component
for component_def in "${COMPONENTS[@]}"; do
  IFS=':' read -r name category <<< "$component_def"
  
  echo -e "${CYAN}[$((SUCCESS + FAILED + 1))/$TOTAL] Generating $name in $category...${NC}"
  
  if npm run generate:quick -- "$name" "$category" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ $name generated successfully${NC}"
    SUCCESS=$((SUCCESS + 1))
  else
    echo -e "${RED}❌ Failed to generate $name${NC}"
    FAILED=$((FAILED + 1))
  fi
  
  # Small delay to prevent overwhelming the system
  sleep 0.5
done

echo ""
echo "================================================"
echo -e "${CYAN}📊 Generation Summary${NC}"
echo "================================================"
echo -e "${GREEN}✅ Successfully generated: $SUCCESS components${NC}"
if [ $FAILED -gt 0 ]; then
  echo -e "${RED}❌ Failed: $FAILED components${NC}"
fi
echo ""

# Run validation on generated components
echo -e "${CYAN}🔍 Validating generated components...${NC}"
echo "================================================"

for component_def in "${COMPONENTS[@]}"; do
  IFS=':' read -r name category <<< "$component_def"
  
  echo -e "${YELLOW}Validating $name...${NC}"
  if ./scripts/validate-component.sh "$name" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ $name is valid${NC}"
  else
    echo -e "${YELLOW}⚠️  $name needs attention${NC}"
  fi
done

echo ""
echo "================================================"
echo -e "${CYAN}🎉 Batch generation complete!${NC}"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Review generated components in components/*"
echo "2. Implement business logic for each component"
echo "3. Add comprehensive tests"
echo "4. Update Storybook stories"
echo "5. Run quality gates: npm run quality:all"
echo ""