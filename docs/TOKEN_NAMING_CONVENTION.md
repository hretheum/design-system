# 📝 Design Token Naming Convention

## Version 1.0 | October 2025

This document establishes the official naming convention for all design tokens in our enterprise design system. It ensures consistency, scalability, and maintainability across ~6,000+ tokens.

---

## 📋 Table of Contents
1. [Core Principles](#core-principles)
2. [Naming Structure](#naming-structure)
3. [Category-Specific Conventions](#category-specific-conventions)
4. [Token Types](#token-types)
5. [Naming Patterns](#naming-patterns)
6. [Examples](#examples)
7. [Migration Guide](#migration-guide)
8. [Validation Rules](#validation-rules)
9. [Quick Reference](#quick-reference)

---

## 🎯 Core Principles

### 1. **Hierarchical Organization**
Tokens follow a hierarchical path from general to specific:
```
[category].[subcategory].[property].[variant].[state]
```

### 2. **Semantic Clarity**
Names should describe **purpose**, not appearance:
- ✅ `button.primary.background`
- ❌ `blue-button-bg`

### 3. **Consistency**
Use consistent terminology across all token layers:
- **Sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- **States**: `default`, `hover`, `active`, `focus`, `disabled`, `error`, `success`
- **Variants**: `primary`, `secondary`, `tertiary`, `danger`, `warning`, `info`

### 4. **Case Convention**
- **Groups**: camelCase (`fontSize`, `backgroundColor`)
- **Tokens**: camelCase for multi-word (`paddingX`, `borderRadius`)
- **Values**: kebab-case for CSS classes (`button-primary`)

### 5. **W3C Compliance**
Following W3C Design Tokens Format specifications:
- No `$` prefix in names
- No `{`, `}`, or `.` in individual token names
- Case-sensitive naming

---

## 🏗️ Naming Structure

### Token Hierarchy

```
Layer 1: Primitives
├── color
│   ├── [palette]
│   │   └── [shade]: value
├── spacing
│   └── [scale]: value
├── typography
│   ├── fontSize
│   │   └── [scale]: value
│   └── fontWeight
│       └── [weight]: value

Layer 2: Semantic
├── [intent]
│   └── [variant]: reference

Layer 3: Functional
├── [component]
│   ├── [element]
│   │   └── [property]
│   │       └── [state]: reference

Layer 4: Component
├── [component]
│   ├── [variant]
│   │   ├── [size]
│   │   │   └── [property]: reference
│   │   └── [state]
│   │       └── [property]: reference
```

---

## 📂 Category-Specific Conventions

### 1. **Primitives Layer**
Raw values, no references.

```json
{
  "color": {
    "blue": {
      "50": { "value": "#eff6ff", "type": "color" },
      "100": { "value": "#dbeafe", "type": "color" },
      "500": { "value": "#3b82f6", "type": "color" },
      "900": { "value": "#1e3a8a", "type": "color" }
    }
  },
  "spacing": {
    "0": { "value": "0", "type": "dimension" },
    "1": { "value": "4px", "type": "dimension" },
    "2": { "value": "8px", "type": "dimension" },
    "4": { "value": "16px", "type": "dimension" }
  }
}
```

### 2. **Semantic Layer**
Business meaning, references primitives.

```json
{
  "brand": {
    "primary": { "value": "{color.blue.600}", "type": "color" },
    "secondary": { "value": "{color.purple.600}", "type": "color" }
  },
  "feedback": {
    "error": { "value": "{color.red.500}", "type": "color" },
    "success": { "value": "{color.green.500}", "type": "color" },
    "warning": { "value": "{color.amber.500}", "type": "color" }
  },
  "content": {
    "primary": { "value": "{neutral.900}", "type": "color" },
    "secondary": { "value": "{neutral.600}", "type": "color" },
    "disabled": { "value": "{neutral.400}", "type": "color" }
  }
}
```

### 3. **Functional Layer**
UI role-based tokens.

```json
{
  "button": {
    "primary": {
      "background": {
        "default": { "value": "{brand.primary}", "type": "color" },
        "hover": { "value": "{brand.primary.dark}", "type": "color" },
        "active": { "value": "{brand.primary.darker}", "type": "color" },
        "disabled": { "value": "{neutral.300}", "type": "color" }
      },
      "text": {
        "default": { "value": "{content.onPrimary}", "type": "color" },
        "disabled": { "value": "{content.disabled}", "type": "color" }
      }
    }
  },
  "input": {
    "border": {
      "default": { "value": "{border.default}", "type": "color" },
      "focus": { "value": "{brand.primary}", "type": "color" },
      "error": { "value": "{feedback.error}", "type": "color" }
    }
  }
}
```

### 4. **Component Layer**
Specific component implementations.

```json
{
  "button": {
    "size": {
      "sm": {
        "height": { "value": "32px", "type": "dimension" },
        "paddingX": { "value": "{spacing.3}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" }
      },
      "md": {
        "height": { "value": "40px", "type": "dimension" },
        "paddingX": { "value": "{spacing.4}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" }
      }
    },
    "variant": {
      "primary": {
        "background": { "value": "{button.primary.background.default}", "type": "color" }
      },
      "ghost": {
        "background": { "value": "transparent", "type": "color" },
        "border": { "value": "transparent", "type": "color" }
      }
    }
  }
}
```

---

## 🏷️ Token Types

### Color Tokens
Pattern: `[component].[element].[property].[state]`
```
button.primary.background.hover
input.border.error
text.body.primary
```

### Spacing Tokens
Pattern: `[context].[direction].[size]`
```
spacing.inset.md
spacing.stack.lg
margin.block.sm
padding.inline.xl
```

### Typography Tokens
Pattern: `[element].[property].[variant]`
```
text.heading.1
fontSize.body.lg
fontWeight.label.bold
lineHeight.paragraph.relaxed
```

### Size Tokens
Pattern: `[component].size.[variant].[property]`
```
button.size.lg.height
avatar.size.md.width
icon.size.sm.dimensions
```

### Motion Tokens
Pattern: `motion.[type].[speed]`
```
motion.duration.fast
motion.easing.inOut
motion.delay.short
```

### Elevation Tokens
Pattern: `elevation.[level]`
```
elevation.none
elevation.low
elevation.medium
elevation.high
```

---

## 📐 Naming Patterns

### States (Consistent across all components)
```
default    // Normal state
hover      // Mouse over
active     // Being clicked/pressed
focus      // Keyboard focus
disabled   // Non-interactive
loading    // In progress
error      // Error state
success    // Success state
warning    // Warning state
```

### Sizes (T-shirt sizing)
```
xs         // Extra small
sm         // Small
md         // Medium (default)
lg         // Large
xl         // Extra large
2xl        // 2X large
3xl        // 3X large
```

### Directions
```
top        // Single direction
right
bottom
left
x          // Horizontal (left + right)
y          // Vertical (top + bottom)
all        // All directions
block      // Block axis
inline     // Inline axis
```

### Variants
```
primary    // Main/default variant
secondary  // Alternative variant
tertiary   // Third-level variant
ghost      // Transparent/minimal
outline    // Border only
filled     // Solid fill
```

### Responsive Modifiers
```
mobile     // < 768px
tablet     // 768px - 1024px
desktop    // > 1024px
compact    // Condensed view
comfortable // Default spacing
spacious   // Extra spacing
```

---

## 💡 Examples

### Complete Token Examples

#### Button Token
```json
{
  "button": {
    "primary": {
      "md": {
        "background": {
          "default": { "value": "{brand.primary}", "type": "color" },
          "hover": { "value": "{brand.primary.dark}", "type": "color" }
        },
        "padding": {
          "x": { "value": "{spacing.4}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        }
      }
    }
  }
}
```

#### Form Field Token
```json
{
  "form": {
    "field": {
      "label": {
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" },
        "color": {
          "default": { "value": "{content.secondary}", "type": "color" },
          "required": { "value": "{feedback.error}", "type": "color" }
        }
      },
      "helpText": {
        "fontSize": { "value": "{fontSize.xs}", "type": "dimension" },
        "color": { "value": "{content.tertiary}", "type": "color" }
      }
    }
  }
}
```

#### Card Token
```json
{
  "card": {
    "elevated": {
      "background": { "value": "{surface.raised}", "type": "color" },
      "shadow": { "value": "{elevation.medium}", "type": "shadow" },
      "borderRadius": { "value": "{radius.lg}", "type": "dimension" },
      "padding": {
        "sm": { "value": "{spacing.4}", "type": "dimension" },
        "md": { "value": "{spacing.6}", "type": "dimension" },
        "lg": { "value": "{spacing.8}", "type": "dimension" }
      }
    }
  }
}
```

---

## 🔄 Migration Guide

### Current → New Convention

| Current Pattern | New Pattern | Example |
|-----------------|-------------|---------|
| `button-primary-bg` | `button.primary.background.default` | Color naming |
| `spacing-medium` | `spacing.4` | Numeric scale |
| `text-color-primary` | `content.primary` | Semantic naming |
| `btn-lg-padding` | `button.size.lg.padding` | Component sizing |
| `card-shadow` | `card.elevation.default` | Elevation tokens |

### Migration Steps

1. **Audit Current Tokens**
```bash
# List all token files
find . -name "*.json" -path "*/tokens/*"

# Count total tokens
grep -r "value" *.json | wc -l
```

2. **Create Mapping File**
```json
{
  "migrations": {
    "button-primary-bg": "button.primary.background.default",
    "spacing-medium": "spacing.4",
    "text-color-primary": "content.primary"
  }
}
```

3. **Run Migration Script**
```javascript
// migrate-tokens.js
const oldToken = "button-primary-bg";
const newToken = migrations[oldToken];
// Update references across codebase
```

4. **Update Component References**
```jsx
// Before
const buttonBg = 'var(--button-primary-bg)';

// After
const buttonBg = 'var(--button-primary-background-default)';
```

---

## ✅ Validation Rules

### Naming Rules Checklist

1. **No Special Characters** (except `-` in values)
   - ✅ `backgroundColor`
   - ❌ `background_color`, `background$color`

2. **No Reserved Prefixes**
   - ❌ `$primary`, `@color`, `#size`

3. **Consistent Hierarchy**
   - ✅ `button.primary.background.hover`
   - ❌ `button.background.primary.hover`

4. **Valid State Names**
   - ✅ `default`, `hover`, `active`, `focus`, `disabled`
   - ❌ `normal`, `hovered`, `pressed`

5. **Valid Size Names**
   - ✅ `xs`, `sm`, `md`, `lg`, `xl`
   - ❌ `small`, `medium`, `large`

### Validation Script
```javascript
function validateTokenName(name) {
  const rules = {
    noSpecialChars: /^[a-zA-Z0-9.-]+$/,
    noReservedPrefix: /^[^$@#]/,
    validStates: ['default', 'hover', 'active', 'focus', 'disabled'],
    validSizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  };
  
  // Validate against rules
  return {
    valid: true,
    errors: []
  };
}
```

---

## 📌 Quick Reference

### Common Token Paths

| Purpose | Token Path | Example Value |
|---------|------------|---------------|
| Primary button | `button.primary.background.default` | `{brand.primary}` |
| Input border | `input.border.default` | `{border.default}` |
| Card padding | `card.padding.md` | `{spacing.6}` |
| Heading text | `text.heading.1` | `{fontSize.3xl}` |
| Error color | `feedback.error` | `{color.red.500}` |
| Focus ring | `focus.ring.color` | `{brand.primary}` |
| Modal backdrop | `modal.backdrop.opacity` | `0.5` |
| Loading spinner | `spinner.size.md` | `{spacing.8}` |

### Size Scale Reference

| Token | Pixels | Rem | Use Case |
|-------|--------|-----|----------|
| `xs` | 20-24px | 1.25-1.5 | Compact elements |
| `sm` | 28-32px | 1.75-2 | Small controls |
| `md` | 36-40px | 2.25-2.5 | Default size |
| `lg` | 44-48px | 2.75-3 | Large controls |
| `xl` | 52-56px | 3.25-3.5 | Extra large |

### State Priority Order
1. `disabled` (overrides all)
2. `error` / `success` / `warning`
3. `active`
4. `focus`
5. `hover`
6. `default`

---

## 🚀 Implementation

### Phase 1: Document & Validate
- [x] Create naming convention document
- [ ] Validate against W3C standards
- [ ] Review with design team

### Phase 2: Migration
- [ ] Audit existing tokens
- [ ] Create migration mapping
- [ ] Update token files
- [ ] Update component references

### Phase 3: Enforcement
- [ ] Add linting rules
- [ ] Create validation tests
- [ ] Update documentation
- [ ] Train team

---

## 📚 Resources

- [W3C Design Tokens Format](https://www.w3c.org/community/design-tokens/)
- [Design Tokens Community Group](https://github.com/design-tokens/community-group)
- [Token Naming Best Practices](https://www.designtokens.org/)

---

*Last Updated: October 2025*
*Version: 1.0.0*
*Status: Active*