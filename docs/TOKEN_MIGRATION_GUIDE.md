# 🔄 Token Migration Guide

## From Current System to New Naming Convention

This guide provides step-by-step instructions for migrating our existing ~2,190 tokens to the new naming convention, ensuring consistency and scalability for expansion to 6,000+ tokens.

---

## 📊 Current State Analysis

### Token Distribution by File
| File | Token Count | Migration Priority | Estimated Time |
|------|-------------|-------------------|----------------|
| `primitives.json` | ~390 | ✅ Already compliant | 0h |
| `semantic.json` | ~370 | 🟡 Minor updates | 2h |
| `functional.json` | ~900 | 🔴 Major refactor | 6h |
| `component.json` | ~390 | 🔴 Major refactor | 4h |
| `accessibility.json` | ~80 | 🟡 Minor updates | 1h |
| `theme.json` | ~60 | ✅ Already compliant | 0h |
| **TOTAL** | **~2,190** | | **~13h** |

---

## 🎯 Migration Strategy

### Phase 1: Preparation (Day 1)
1. Backup all current token files
2. Create migration mapping
3. Set up validation tools
4. Document current usage

### Phase 2: Core Migration (Day 2-3)
1. Migrate semantic tokens
2. Migrate functional tokens
3. Migrate component tokens
4. Update accessibility tokens

### Phase 3: Validation (Day 4)
1. Run validation scripts
2. Test in Storybook
3. Update documentation
4. Fix any issues

---

## 📝 Detailed Migration Mappings

### 1. Primitives Layer (No Changes Needed ✅)
Current structure already follows convention:
```json
{
  "color": {
    "blue": {
      "500": { "value": "#3b82f6", "type": "color" }
    }
  }
}
```

### 2. Semantic Layer Migrations

| Current | New | Reason |
|---------|-----|--------|
| `brand.primary` | `brand.primary` | ✅ Already correct |
| `feedback.success` | `feedback.success` | ✅ Already correct |
| `neutral.500` | `neutral.500` | ✅ Already correct |
| `content.primary` | `content.primary` | ✅ Already correct |

**Required Changes:**
```json
// Add missing semantic tokens for new components
{
  "interaction": {
    "primary": {
      "default": { "value": "{brand.primary}", "type": "color" },
      "hover": { "value": "{brand.primary.dark}", "type": "color" },
      "active": { "value": "{brand.primary.darker}", "type": "color" }
    }
  },
  "state": {
    "info": { "value": "{color.blue.500}", "type": "color" },
    "success": { "value": "{color.green.500}", "type": "color" },
    "warning": { "value": "{color.amber.500}", "type": "color" },
    "error": { "value": "{color.red.500}", "type": "color" }
  }
}
```

### 3. Functional Layer Migrations

#### Text Tokens
| Current | New | Example |
|---------|-----|---------|
| `text.heading.primary` | `text.heading.color.primary` | Clarify property |
| `text.body.primary` | `text.body.color.primary` | Clarify property |
| `text.link.default` | `text.link.color.default` | Clarify property |

#### Button Tokens
| Current | New | Example |
|---------|-----|---------|
| `button.primary.background.default` | ✅ Keep as is | Already correct |
| `button.spacing.paddingX.sm` | `button.padding.x.sm` | Simplify path |
| `button.borderRadius` | `button.radius.default` | Consistent naming |

#### Input Tokens
| Current | New | Example |
|---------|-----|---------|
| `input.background.default` | ✅ Keep as is | Already correct |
| `input.spacing.paddingX` | `input.padding.x.default` | Add default state |
| `input.borderRadius` | `input.radius.default` | Consistent naming |

### 4. Component Layer Migrations

#### Size Tokens
| Current | New | Example |
|---------|-----|---------|
| `button.size.sm.paddingX` | `button.size.sm.padding.x` | Nested property |
| `button.size.sm.paddingY` | `button.size.sm.padding.y` | Nested property |
| `button.iconOnly.sm.width` | `button.variant.iconOnly.size.sm.width` | Clear hierarchy |

#### Component-Specific
```json
// Before
{
  "button": {
    "size": {
      "sm": {
        "paddingX": { "value": "{spacing.3}" },
        "paddingY": { "value": "{spacing.1-5}" }
      }
    }
  }
}

// After
{
  "button": {
    "size": {
      "sm": {
        "padding": {
          "x": { "value": "{spacing.3}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        },
        "height": { "value": "32px", "type": "dimension" }
      }
    }
  }
}
```

---

## 🛠️ Migration Scripts

### 1. Token Reference Updater
```javascript
// scripts/migrate-token-references.js
const fs = require('fs');
const path = require('path');

const TOKEN_MAPPINGS = {
  // Old -> New mappings
  '{spacing.1-5}': '{spacing.2}',
  '{spacing.2-5}': '{spacing.3}',
  '{text.heading.primary}': '{text.heading.color.primary}',
  '{button.spacing.paddingX}': '{button.padding.x}',
  '{input.spacing.paddingX}': '{input.padding.x}',
  '{card.spacing.padding}': '{card.padding.default}',
};

function migrateTokenFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.entries(TOKEN_MAPPINGS).forEach(([oldToken, newToken]) => {
    const regex = new RegExp(oldToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, newToken);
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Migrated: ${filePath}`);
}

// Run migration
['semantic.json', 'functional.json', 'component.json'].forEach(file => {
  migrateTokenFile(path.join(process.cwd(), file));
});
```

### 2. Token Structure Validator
```javascript
// scripts/validate-token-structure.js
const fs = require('fs');

const VALID_PATTERNS = {
  color: /^[a-z]+\.[a-z]+(\.[a-z]+)?(\.(default|hover|active|focus|disabled))?$/,
  spacing: /^spacing\.\d+$/,
  size: /^[a-z]+\.size\.(xs|sm|md|lg|xl)(\.[a-z]+)?$/,
  component: /^[a-z]+(\.[a-z]+)?(\.(default|hover|active|focus|disabled))?$/
};

function validateTokenName(name, type) {
  const pattern = VALID_PATTERNS[type] || VALID_PATTERNS.component;
  return pattern.test(name);
}

function validateFile(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];
  
  function checkTokens(obj, path = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (value.value !== undefined) {
        // This is a token
        if (!validateTokenName(currentPath, value.type)) {
          errors.push(`Invalid token name: ${currentPath}`);
        }
      } else if (typeof value === 'object') {
        // Recurse into nested structure
        checkTokens(value, currentPath);
      }
    });
  }
  
  checkTokens(content);
  
  if (errors.length > 0) {
    console.error(`❌ Validation errors in ${filePath}:`);
    errors.forEach(err => console.error(`  - ${err}`));
  } else {
    console.log(`✅ ${filePath} is valid`);
  }
}

// Validate all files
['primitives.json', 'semantic.json', 'functional.json', 'component.json'].forEach(file => {
  validateFile(file);
});
```

### 3. CSS Variable Generator Update
```javascript
// scripts/generate-css-variables.js
function tokenNameToCSSVariable(tokenPath) {
  // Convert token path to CSS variable
  // button.size.sm.padding.x -> --button-size-sm-padding-x
  return `--${tokenPath.replace(/\./g, '-')}`;
}

function generateCSSFromTokens(tokens, prefix = '') {
  let css = '';
  
  Object.entries(tokens).forEach(([key, value]) => {
    const path = prefix ? `${prefix}-${key}` : key;
    
    if (value.value !== undefined) {
      css += `  ${tokenNameToCSSVariable(path)}: ${value.value};\n`;
    } else if (typeof value === 'object') {
      css += generateCSSFromTokens(value, path);
    }
  });
  
  return css;
}
```

---

## 📋 Migration Checklist

### Pre-Migration
- [ ] Backup all token files
- [ ] Document current token usage in components
- [ ] Create migration branch in Git
- [ ] Notify team about migration

### During Migration
- [ ] Run migration scripts
- [ ] Validate token structure
- [ ] Update token references in components
- [ ] Test in Storybook
- [ ] Run accessibility tests

### Post-Migration
- [ ] Update documentation
- [ ] Generate new CSS variables
- [ ] Update component generator templates
- [ ] Create migration report
- [ ] Train team on new convention

---

## 🔍 Component Update Examples

### Button Component
```jsx
// Before
const Button = ({ variant, size }) => {
  const paddingX = `var(--button-spacing-paddingX-${size})`;
  const paddingY = `var(--button-spacing-paddingY-${size})`;
  
// After
const Button = ({ variant, size }) => {
  const paddingX = `var(--button-size-${size}-padding-x)`;
  const paddingY = `var(--button-size-${size}-padding-y)`;
```

### Input Component
```jsx
// Before
<input 
  style={{
    padding: 'var(--input-spacing-paddingX)',
    borderRadius: 'var(--input-borderRadius)'
  }}
/>

// After
<input 
  style={{
    padding: 'var(--input-padding-x-default)',
    borderRadius: 'var(--input-radius-default)'
  }}
/>
```

### Card Component
```jsx
// Before
const cardPadding = 'var(--card-spacing-padding-md)';

// After
const cardPadding = 'var(--card-size-md-padding)';
```

---

## ⚠️ Breaking Changes

### For Developers
1. **CSS Variable Names Change**
   - Update all hardcoded CSS variable references
   - Use migration script to update automatically

2. **Token Path Changes**
   - Update design token imports
   - Modify theme providers if applicable

3. **Component Props**
   - No changes to component APIs
   - Internal implementation updates only

### For Designers
1. **Token Names in Figma**
   - Will need to update token references
   - Provide mapping document

2. **Documentation Updates**
   - All design documentation needs updating
   - Create visual mapping guide

---

## 📊 Migration Metrics

### Success Criteria
- [ ] 100% of tokens follow new convention
- [ ] All components render correctly
- [ ] No regression in accessibility scores
- [ ] Storybook stories all functional
- [ ] CSS bundle size unchanged or smaller

### Tracking Progress
```bash
# Count migrated tokens
grep -r "value" *.json | grep -E "^[a-z]+\." | wc -l

# Find non-compliant tokens
grep -r "value" *.json | grep -v -E "^[a-z]+\." 

# Test components
npm test

# Check Storybook
npm run storybook
```

---

## 🆘 Rollback Plan

If migration causes issues:

1. **Immediate Rollback**
```bash
git checkout main -- primitives.json semantic.json functional.json component.json
npm run build
npm run storybook
```

2. **Partial Rollback**
- Keep primitives and semantic changes
- Revert only functional and component layers

3. **Gradual Migration**
- Migrate one file at a time
- Test thoroughly between each file

---

## 📅 Timeline

| Day | Task | Owner | Status |
|-----|------|-------|--------|
| Day 1 | Backup & Preparation | DevOps | ⏳ |
| Day 2 | Semantic & Accessibility Migration | Dev Team | ⏳ |
| Day 3 | Functional & Component Migration | Dev Team | ⏳ |
| Day 4 | Testing & Validation | QA Team | ⏳ |
| Day 5 | Documentation & Training | All | ⏳ |

---

## 📚 Resources

- [Token Naming Convention](./TOKEN_NAMING_CONVENTION.md)
- [W3C Design Tokens Spec](https://www.w3.org/community/design-tokens/)
- [Migration Scripts](/scripts/migration/)
- [Backup Location](/backups/tokens/)

---

*Migration Guide v1.0 | October 2025*
*Estimated Completion: 5 days*
*Risk Level: Medium*