# Figma Token Synchronization Guide

## 🎨 Overview

This guide ensures proper synchronization between our design system tokens and Figma for seamless designer-developer collaboration.

## ⚠️ CRITICAL REQUIREMENT

**Every time new components are added to the design system, the Figma token files MUST be updated.**

## 📁 Token Files for Figma

The following files are consumed by Figma Tokens plugin:

1. **`component.json`** - All component-specific tokens
2. **`functional.json`** - Functional layer tokens (navigation, forms, data display)
3. **`semantic.json`** - Semantic layer tokens (brand, feedback, typography)
4. **`primitives.json`** - Base tokens (colors, spacing, typography)
5. **`accessibility.json`** - Accessibility tokens (contrast, focus, touch)
6. **`theme.json`** - Theme variations (light, dark, high-contrast)

## 🔄 Token Update Process

### Automatic Method (Recommended)

```bash
# After adding new components, run:
npm run merge-tokens

# This will:
# 1. Merge new component tokens into component.json
# 2. Update functional.json with related tokens
# 3. Create backups of original files
# 4. Validate W3C Design Token Format
```

### Manual Method

1. **Create component tokens** in a separate file:
   ```json
   {
     "newComponent": {
       "size": {
         "sm": { "value": "{spacing.2}", "type": "dimension" }
       }
     }
   }
   ```

2. **Merge into main files**:
   - Add to `component.json` for component-specific tokens
   - Add to `functional.json` for category-level tokens

3. **Validate format**:
   - Ensure all tokens have `value` and `type` properties
   - Use proper token references with `{}` syntax

## 📋 Checklist for Each Component Batch

### Before Development
- [ ] Review existing tokens to avoid duplication
- [ ] Plan token structure following naming convention

### During Development
- [ ] Create tokens alongside component implementation
- [ ] Use token references instead of hard-coded values
- [ ] Document token purpose in comments

### After Development
- [ ] Run `npm run merge-tokens` to update main files
- [ ] Verify token count increased as expected
- [ ] Test token references work correctly
- [ ] Create backup before major changes

### Figma Validation
- [ ] Import updated tokens in Figma Tokens plugin
- [ ] Verify new tokens appear in correct categories
- [ ] Test token application on design components
- [ ] Ensure no breaking changes to existing designs

## 🏗️ Token Structure Example

When adding a new component, structure tokens like this:

```json
{
  "componentName": {
    "size": {
      "xs": { "value": "16px", "type": "dimension" },
      "sm": { "value": "24px", "type": "dimension" },
      "md": { "value": "32px", "type": "dimension" },
      "lg": { "value": "40px", "type": "dimension" },
      "xl": { "value": "48px", "type": "dimension" }
    },
    "variant": {
      "primary": {
        "background": { "value": "{color.primary.500}", "type": "color" },
        "text": { "value": "{color.white}", "type": "color" }
      },
      "secondary": {
        "background": { "value": "{color.gray.100}", "type": "color" },
        "text": { "value": "{color.gray.900}", "type": "color" }
      }
    },
    "state": {
      "hover": {
        "opacity": { "value": "0.9", "type": "number" }
      },
      "disabled": {
        "opacity": { "value": "0.5", "type": "number" }
      }
    }
  }
}
```

## 🛠️ Token Merge Script

The `scripts/merge-tokens.js` script handles:

1. **Reading** new component token files
2. **Merging** into existing token files
3. **Backup** creation before changes
4. **Validation** of W3C format
5. **Statistics** reporting

### Script Usage

```bash
# Standard merge (looks for component-priority*.json files)
npm run merge-tokens

# Custom file merge
node scripts/merge-tokens.js --input custom-tokens.json

# Dry run (preview changes without applying)
node scripts/merge-tokens.js --dry-run
```

## 📊 Token Statistics Tracking

After each update, track:

- **Component tokens**: Current count in component.json
- **Functional tokens**: Current count in functional.json  
- **New tokens added**: Difference from previous version
- **Total tokens**: Sum across all token files

## 🚨 Common Issues & Solutions

### Issue: Tokens not appearing in Figma
**Solution**: Ensure W3C format with `value` and `type` fields

### Issue: Token references broken
**Solution**: Use `{}` syntax for references, verify referenced token exists

### Issue: Duplicate token names
**Solution**: Follow naming convention, check existing tokens before adding

### Issue: Merge conflicts in token files
**Solution**: Use backup files to restore, re-run merge process

## 📈 Progress Tracking

| Phase | Components | Tokens Added | Figma Updated | Status |
|-------|------------|--------------|---------------|---------|
| Phase 1 | 24 initial | ~390 | ✅ | Complete |
| Phase 2 | 20 Priority 1 | ~400 | ✅ | Complete |
| Phase 3 | 25 Priority 2 | ~600 | ⏳ | Pending |
| Phase 4 | 27 Priority 3 | ~800 | ⏳ | Pending |

## 🔗 Related Documentation

- [Token Naming Convention](./TOKEN_NAMING_CONVENTION.md)
- [Component Generator Guide](./COMPONENT_GENERATOR_GUIDE.md)
- [Gap Analysis to PatternFly](../benchmarking/analysis/gap_analysis_to_patternfly.md)

## 💡 Best Practices

1. **Batch Updates**: Group multiple component tokens before merging
2. **Version Control**: Commit token changes separately from code changes
3. **Documentation**: Comment complex token relationships
4. **Testing**: Verify in both Storybook and Figma
5. **Backup**: Always backup before major token updates

---

**Remember**: Token synchronization is CRITICAL for designer-developer collaboration. Never skip the Figma update step! 🎨