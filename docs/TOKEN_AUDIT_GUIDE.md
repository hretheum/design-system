# Token Reference Audit Guide

## 🔍 Overview

This guide ensures maintaining token reference consistency across all layers when adding new components or modifying existing tokens.

## ⚠️ CRITICAL REQUIREMENT

**Every time new tokens are added or modified, a full token reference audit MUST be performed.**

## 🏗️ Token Layer Hierarchy

Tokens follow a strict hierarchical structure where each layer can only reference lower layers:

```
primitives.json (base layer - no references)
    ↓
semantic.json (can reference: primitives)
    ↓
functional.json (can reference: primitives, semantic)
    ↓
component.json (can reference: primitives, semantic, functional)
    ↓
accessibility.json (can reference: primitives, semantic)
theme.json (can reference: all layers)
```

## 🔄 Audit Process

### 1. Before Adding New Tokens

```bash
# Create backup of current token files
npm run tokens:backup

# Run initial validation
npm run tokens:validate
```

### 2. After Adding New Tokens

```bash
# Run the audit script
node scripts/audit-token-references.js

# If errors found, review the detailed report
cat token-audit-report.json
```

### 3. Common Reference Errors

#### ❌ Circular References
```json
// BAD - Circular reference in same file
"semantic.json": {
  "brand.primary": "{interactive.primary.default}",
  "interactive.primary.default": "{brand.primary}"
}
```

#### ❌ Cross-Layer Violations
```json
// BAD - primitives referencing semantic
"primitives.json": {
  "color.custom": "{brand.primary}" // primitives can't reference semantic!
}
```

#### ❌ Non-Existent References
```json
// BAD - Reference doesn't exist
"functional.json": {
  "button.color": "{color.magic}" // color.magic doesn't exist
}
```

### 4. Fixing Reference Errors

#### Step 1: Identify the error type
```bash
# Run audit with verbose output
node scripts/audit-token-references.js --verbose
```

#### Step 2: Fix based on error type

**For circular references:**
- Replace with direct primitive values
- Break the cycle by removing one reference

**For missing references:**
- Add the missing token definition
- Or update reference to existing token

**For hierarchy violations:**
- Move token to appropriate layer
- Or change reference to respect hierarchy

#### Step 3: Re-run validation
```bash
npm run tokens:validate
```

## 📋 Audit Checklist

### For Each Token Update:

- [ ] **Pre-update validation**
  ```bash
  npm run tokens:validate
  ```

- [ ] **Add/modify tokens**
  - Follow naming convention
  - Use proper value/type structure
  - Reference only allowed layers

- [ ] **Run merge script**
  ```bash
  npm run merge-tokens
  ```

- [ ] **Run reference audit**
  ```bash
  node scripts/audit-token-references.js
  ```

- [ ] **Fix any errors found**
  - Review audit report
  - Fix broken references
  - Ensure hierarchy compliance

- [ ] **Validate W3C compliance**
  ```bash
  npm run tokens:validate
  ```

- [ ] **Test in Figma**
  - Import tokens in Figma Tokens plugin
  - Verify all references resolve

## 🛠️ Audit Script

Create `scripts/audit-token-references.js`:

```javascript
#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Define layer hierarchy
const LAYER_HIERARCHY = {
  'primitives.json': [],
  'semantic.json': ['primitives.json'],
  'functional.json': ['primitives.json', 'semantic.json'],
  'component.json': ['primitives.json', 'semantic.json', 'functional.json'],
  'accessibility.json': ['primitives.json', 'semantic.json'],
  'theme.json': ['primitives.json', 'semantic.json', 'functional.json', 'component.json', 'accessibility.json']
};

async function auditTokenReferences() {
  const errors = [];
  const warnings = [];
  
  // Load all token files
  const tokens = {};
  for (const file of Object.keys(LAYER_HIERARCHY)) {
    const content = await fs.readFile(path.join(process.cwd(), file), 'utf8');
    tokens[file] = JSON.parse(content);
  }
  
  // Check each file's references
  for (const [file, allowedLayers] of Object.entries(LAYER_HIERARCHY)) {
    const fileErrors = checkFileReferences(
      tokens[file], 
      file,
      allowedLayers.map(f => tokens[f]),
      allowedLayers
    );
    errors.push(...fileErrors);
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalErrors: errors.length,
    errors: errors,
    warnings: warnings
  };
  
  // Save report
  await fs.writeFile(
    'token-audit-report.json',
    JSON.stringify(report, null, 2)
  );
  
  // Display summary
  console.log(`\n🔍 Token Reference Audit Complete`);
  console.log(`Found ${errors.length} errors`);
  
  if (errors.length > 0) {
    console.log('\nTop issues:');
    errors.slice(0, 5).forEach(error => {
      console.log(`  ❌ ${error.file}: ${error.message}`);
    });
    console.log('\nRun "cat token-audit-report.json" for full report');
    process.exit(1);
  } else {
    console.log('✅ All token references are valid!');
  }
}

function checkFileReferences(tokens, fileName, allowedTokens, allowedFiles) {
  const errors = [];
  
  function checkReferences(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = path ? `${path}.${key}` : key;
      
      if (value && typeof value === 'object') {
        if (value.value && typeof value.value === 'string') {
          // Check for references
          const matches = value.value.match(/\{([^}]+)\}/g);
          if (matches) {
            matches.forEach(ref => {
              const refPath = ref.slice(1, -1);
              if (!isValidReference(refPath, allowedTokens)) {
                errors.push({
                  file: fileName,
                  token: fullPath,
                  reference: refPath,
                  message: `Invalid reference: ${ref}`
                });
              }
            });
          }
        } else {
          checkReferences(value, fullPath);
        }
      }
    }
  }
  
  checkReferences(tokens);
  return errors;
}

function isValidReference(refPath, allowedTokens) {
  const parts = refPath.split('.');
  
  for (const tokenFile of allowedTokens) {
    let current = tokenFile;
    let found = true;
    
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }
    
    if (found) return true;
  }
  
  return false;
}

// Run audit
auditTokenReferences();
```

## 📊 Audit Metrics

Track these metrics after each audit:

| Metric | Target | Description |
|--------|--------|-------------|
| Reference Errors | 0 | Broken or invalid references |
| Circular Dependencies | 0 | Self-referencing tokens |
| Hierarchy Violations | 0 | Cross-layer reference violations |
| W3C Compliance | 100% | Valid token format |
| Figma Import Success | 100% | Successful import to Figma |

## 🚨 Common Issues & Solutions

### Issue: Circular reference detected
**Solution:** Replace with direct primitive value or restructure token hierarchy

### Issue: Reference not found
**Solution:** Add missing token or correct reference path

### Issue: Type mismatch after reference
**Solution:** Ensure referenced token has compatible type

### Issue: Too many reference levels
**Solution:** Flatten deep references for better performance

## 🔗 Related Documentation

- [Token Naming Convention](./TOKEN_NAMING_CONVENTION.md)
- [Figma Token Sync Guide](./FIGMA_TOKEN_SYNC_GUIDE.md)
- [Component Generator Guide](./COMPONENT_GENERATOR_GUIDE.md)

## 💡 Best Practices

1. **Always audit after bulk changes** - Don't wait until the end of a sprint
2. **Fix immediately** - Don't let broken references accumulate
3. **Document decisions** - Note why certain references were chosen
4. **Test in context** - Verify tokens work in both code and design tools
5. **Maintain hierarchy** - Respect the layer structure

---

**Remember**: Token consistency is CRITICAL for maintaining a scalable design system! 🎨