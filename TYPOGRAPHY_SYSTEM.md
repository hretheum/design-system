# Typography System - Complete Implementation

## Overview
Complete typography token structure across all levels: Primitives → Semantic → Functional → Component

---

## 1️⃣ PRIMITIVES LEVEL (`primitives.json`)

### Raw values without business context

```
fontFamily:
  - text: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  - code: "'Geist Mono', 'SF Mono', Monaco, Consolas, monospace"
  - emphasis: "Newsreader, Georgia, 'Times New Roman', serif"

fontWeight:
  - light: 300
  - normal: 400
  - medium: 500
  - semibold: 600
  - bold: 700

fontSize:
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)
  - 5xl: 3rem (48px)
  - 6xl: 3.75rem (60px)

lineHeight:
  - xs: 16
  - sm: 20
  - base: 24
  - lg: 28
  - xl: 28
  - 2xl: 32
  - 3xl: 36
  - 4xl: 40
  - 5xl: 48
  - 6xl: 60

letterSpacing:
  - tighter: -0.05em
  - tight: -0.025em
  - normal: 0em
  - wide: 0.025em
```

---

## 2️⃣ SEMANTIC LEVEL (`semantic.json`)

### Meaningful names referencing primitives

```
typography.family:
  - body: {fontFamily.text}
  - heading: {fontFamily.text}
  - code: {fontFamily.code}
  - emphasis: {fontFamily.emphasis}

typography.weight:
  - light: {fontWeight.light}
  - regular: {fontWeight.normal}
  - medium: {fontWeight.medium}
  - semibold: {fontWeight.semibold}
  - bold: {fontWeight.bold}

typography.size:
  - caption: {fontSize.xs}
  - body: {fontSize.base}
  - lead: {fontSize.lg}
  - h6: {fontSize.lg}
  - h5: {fontSize.xl}
  - h4: {fontSize.2xl}
  - h3: {fontSize.3xl}
  - h2: {fontSize.4xl}
  - h1: {fontSize.5xl}
  - display: {fontSize.6xl}

typography.lineHeight:
  - tight: {lineHeight.sm}
  - normal: {lineHeight.base}
  - relaxed: {lineHeight.lg}

typography.letterSpacing:
  - tight: {letterSpacing.tight}
  - normal: {letterSpacing.normal}
  - wide: {letterSpacing.wide}
```

---

## 3️⃣ FUNCTIONAL LEVEL (`functional.json`)

### Complete typography styles for UI roles

### Headings (h1-h6 + display)

#### H1 - Main Page Title (48px)
```json
typography.heading.h1:
  - fontSize: {typography.size.h1}
  - lineHeight: {lineHeight.5xl}
  - fontWeight: {typography.weight.bold} (700)
  - letterSpacing: {typography.letterSpacing.tight}
  - fontFamily: {typography.family.heading}
  - marginBottom: {spacing.6} (24px)
```

#### H2 - Section Title (36px)
```json
typography.heading.h2:
  - fontSize: {typography.size.h2}
  - lineHeight: {lineHeight.4xl}
  - fontWeight: {typography.weight.bold} (700)
  - letterSpacing: {typography.letterSpacing.tight}
  - marginBottom: {spacing.5} (20px)
```

#### H3 - Subsection Title (30px)
```json
typography.heading.h3:
  - fontSize: {typography.size.h3}
  - lineHeight: {lineHeight.3xl}
  - fontWeight: {typography.weight.semibold} (600)
  - letterSpacing: {typography.letterSpacing.tight}
  - marginBottom: {spacing.4} (16px)
```

#### H4 - Component Title (24px)
```json
typography.heading.h4:
  - fontSize: {typography.size.h4}
  - lineHeight: {lineHeight.2xl}
  - fontWeight: {typography.weight.semibold} (600)
  - letterSpacing: {typography.letterSpacing.normal}
  - marginBottom: {spacing.3} (12px)
```

#### H5 - Small Heading (20px)
```json
typography.heading.h5:
  - fontSize: {typography.size.h5}
  - lineHeight: {lineHeight.xl}
  - fontWeight: {typography.weight.semibold} (600)
  - marginBottom: {spacing.2} (8px)
```

#### H6 - Smallest Heading (18px)
```json
typography.heading.h6:
  - fontSize: {typography.size.h6}
  - lineHeight: {lineHeight.lg}
  - fontWeight: {typography.weight.semibold} (600)
  - marginBottom: {spacing.2} (8px)
```

#### Display - Hero/Marketing (60px)
```json
typography.heading.display:
  - fontSize: {typography.size.display}
  - lineHeight: {lineHeight.6xl}
  - fontWeight: {typography.weight.bold} (700)
  - letterSpacing: {letterSpacing.tighter} (-0.05em)
  - marginBottom: {spacing.8} (32px)
```

### Body Text

#### Default Body (16px)
```json
typography.body.default:
  - fontSize: {typography.size.body}
  - lineHeight: {typography.lineHeight.normal} (24px, 1.5 ratio)
  - fontWeight: {typography.weight.regular}
  - marginBottom: {spacing.4} (16px)
```

#### Lead Paragraph (18px)
```json
typography.body.lead:
  - fontSize: {typography.size.lead}
  - lineHeight: {typography.lineHeight.relaxed} (28px)
  - fontWeight: {typography.weight.regular}
  - marginBottom: {spacing.5} (20px)
```

#### Small Text (14px)
```json
typography.body.small:
  - fontSize: {fontSize.sm}
  - lineHeight: {lineHeight.sm} (20px)
  - fontWeight: {typography.weight.regular}
```

#### Caption/Helper (12px)
```json
typography.body.caption:
  - fontSize: {typography.size.caption}
  - lineHeight: {lineHeight.xs} (16px)
  - fontWeight: {typography.weight.regular}
```

### Form Labels

#### Default Label (14px)
```json
typography.label.default:
  - fontSize: {fontSize.sm}
  - lineHeight: {lineHeight.sm}
  - fontWeight: {typography.weight.medium} (500)
  - marginBottom: {spacing.1-5} (6px)
```

#### Required Label
```json
typography.label.required:
  - fontWeight: {typography.weight.semibold} (600)
```

### Links

#### Default Link
```json
typography.link.default:
  - fontSize: inherit
  - fontWeight: {typography.weight.medium} (500)
  - textDecoration: underline
  - textDecorationThickness: 1px
  - textUnderlineOffset: 2px
```

#### Hover State
```json
typography.link.hover:
  - textDecorationThickness: 2px (thicker)
```

#### Standalone Link
```json
typography.link.standalone:
  - fontSize: {fontSize.base}
  - fontWeight: {typography.weight.semibold} (600)
```

### Code

#### Inline Code
```json
typography.code.inline:
  - fontSize: 0.875em (87.5% of parent)
  - fontFamily: {typography.family.code}
  - padding: 0.2em 0.4em
```

#### Code Block
```json
typography.code.block:
  - fontSize: {fontSize.sm} (14px)
  - lineHeight: {lineHeight.lg} (28px)
  - fontFamily: {typography.family.code}
  - padding: {spacing.4}
```

### Quotes

```json
typography.quote.default:
  - fontSize: {fontSize.lg} (18px)
  - lineHeight: {typography.lineHeight.relaxed}
  - fontFamily: {typography.family.emphasis} (serif)
  - fontStyle: italic
  - padding: {spacing.4} {spacing.6}
  - marginY: {spacing.6}
```

### Emphasis

```json
typography.emphasis.strong:
  - fontWeight: {typography.weight.semibold} (600)

typography.emphasis.em:
  - fontStyle: italic
```

---

## 4️⃣ COMPONENT LEVEL (`component.json`)

### Component-specific typography tokens

### Page Header
```json
typography.pageHeader.title:
  - Uses: typography.heading.h1
  - Additional: paddingTop: 48px, maxWidth: 800px

typography.pageHeader.subtitle:
  - Uses: typography.body.lead
  - Color: text.body.secondary
```

### Card
```json
typography.card.title:
  - Uses: typography.heading.h4 (24px)
  - Color: text.heading.primary

typography.card.subtitle:
  - fontSize: 14px
  - fontWeight: medium
  - Color: text.body.secondary

typography.card.description:
  - Uses: typography.body.default
```

### Modal
```json
typography.modal.title:
  - Uses: typography.heading.h3 (30px)
  - Additional: paddingBottom: 12px

typography.modal.description:
  - Uses: typography.body.default
  - Color: text.body.secondary
```

### Alert
```json
typography.alert.title:
  - fontSize: 16px
  - fontWeight: semibold (600)

typography.alert.description:
  - fontSize: 14px
  - fontWeight: regular
```

### Toast
```json
typography.toast.title:
  - fontSize: 16px
  - fontWeight: semibold

typography.toast.message:
  - fontSize: 14px
  - fontWeight: regular
```

### Button
```json
typography.button.label:
  - fontWeight: medium (500)
  - letterSpacing: 0.01em
```

### Input
```json
typography.input.label:
  - Uses: typography.label.default
  - Color: text.label.primary

typography.input.helperText:
  - Uses: typography.body.caption (12px)
  - Color: text.body.secondary

typography.input.errorText:
  - Uses: typography.body.caption (12px)
  - fontWeight: medium
  - Color: feedback.error
```

### Table
```json
typography.table.header:
  - fontSize: 14px
  - fontWeight: semibold (600)
  - letterSpacing: wide
  - textTransform: uppercase
  - Color: text.body.secondary

typography.table.cell:
  - fontSize: 16px
  - fontWeight: regular
  - Color: text.body.primary
```

### Navigation
```json
typography.navigationBar.link:
  - fontSize: 16px
  - fontWeight: medium (500)
  - letterSpacing: 0.01em

typography.navigationBar.activeLink:
  - fontWeight: semibold (600)
```

### Sidebar
```json
typography.sidebar.groupTitle:
  - fontSize: 12px
  - fontWeight: semibold
  - letterSpacing: wide
  - textTransform: uppercase
  - Color: text.body.tertiary

typography.sidebar.item:
  - fontSize: 14px
  - fontWeight: regular

typography.sidebar.activeItem:
  - fontWeight: semibold
```

### Badge
```json
typography.badge.label:
  - fontWeight: medium (500)
  - letterSpacing: 0.01em
  - textTransform: uppercase (optional)
```

### Breadcrumb
```json
typography.breadcrumb.item:
  - fontSize: 14px
  - fontWeight: regular
  - Color: text.body.secondary

typography.breadcrumb.current:
  - fontWeight: medium
  - Color: text.body.primary
```

### Empty State
```json
typography.emptyState.title:
  - Uses: typography.heading.h4
  - Color: text.heading.primary

typography.emptyState.description:
  - Uses: typography.body.default
  - Color: text.body.secondary
  - maxWidth: 400px
```

---

## Token Flow Example: H1 Usage

```
1. PRIMITIVE
   └─ fontSize.5xl = "3rem" (48px)
   └─ fontWeight.bold = "700"
   └─ lineHeight.5xl = 48
   └─ letterSpacing.tight = "-0.025em"

2. SEMANTIC
   └─ typography.size.h1 → {fontSize.5xl}
   └─ typography.weight.bold → {fontWeight.bold}
   └─ typography.family.heading → {fontFamily.text}

3. FUNCTIONAL
   └─ typography.heading.h1 = {
        fontSize: {typography.size.h1},
        fontWeight: {typography.weight.bold},
        lineHeight: {lineHeight.5xl},
        letterSpacing: {typography.letterSpacing.tight},
        marginBottom: {spacing.6}
      }

4. COMPONENT
   └─ typography.pageHeader.title = {
        ...typography.heading.h1,
        paddingTop: {spacing.12},
        maxWidth: "800px"
      }
```

---

## Usage in Code

### CSS Variables
```css
.h1 {
  font-size: var(--typography-heading-h1-fontSize);
  font-weight: var(--typography-heading-h1-fontWeight);
  line-height: var(--typography-heading-h1-lineHeight);
  letter-spacing: var(--typography-heading-h1-letterSpacing);
  font-family: var(--typography-heading-h1-fontFamily);
  margin-bottom: var(--typography-heading-h1-marginBottom);
  color: var(--text-heading-primary);
}

.page-header__title {
  font-size: var(--typography-pageHeader-title-fontSize);
  padding-top: var(--typography-pageHeader-title-paddingTop);
  max-width: var(--typography-pageHeader-title-maxWidth);
}
```

### React/JSX
```jsx
import tokens from './tokens';

<h1 style={{
  fontSize: tokens.typography.heading.h1.fontSize,
  fontWeight: tokens.typography.heading.h1.fontWeight,
  lineHeight: tokens.typography.heading.h1.lineHeight,
  letterSpacing: tokens.typography.heading.h1.letterSpacing,
  color: tokens.text.heading.primary
}}>
  Main Title
</h1>

<div className="page-header">
  <h1 style={tokens.typography.pageHeader.title}>
    Page Title
  </h1>
</div>
```

---

## Typography Scale Summary

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| **Display** | 60px | Bold (700) | 60px | Hero sections |
| **H1** | 48px | Bold (700) | 48px | Page titles |
| **H2** | 36px | Bold (700) | 40px | Section titles |
| **H3** | 30px | Semibold (600) | 36px | Subsection titles |
| **H4** | 24px | Semibold (600) | 32px | Component titles |
| **H5** | 20px | Semibold (600) | 28px | Small headings |
| **H6** | 18px | Semibold (600) | 28px | Smallest headings |
| **Lead** | 18px | Regular (400) | 28px | Lead paragraphs |
| **Body** | 16px | Regular (400) | 24px | Default text |
| **Small** | 14px | Regular (400) | 20px | Small text |
| **Caption** | 12px | Regular (400) | 16px | Helper text |

---

## Benefits of This Structure

1. **Separation of Concerns**
   - Primitives: Raw values
   - Semantic: Meaningful names
   - Functional: UI roles
   - Component: Specific implementations

2. **Maintainability**
   - Change once in primitives, propagates everywhere
   - Easy to update entire scale

3. **Consistency**
   - All components use same tokens
   - Predictable spacing and sizing

4. **Scalability**
   - Easy to add new components
   - Clear inheritance hierarchy

5. **Developer Experience**
   - Clear naming conventions
   - Self-documenting tokens
   - Type-safe with TypeScript

---

## Files Modified

1. ✅ `primitives.json` - Already complete
2. ✅ `semantic.json` - Already complete
3. ✅ `functional.json` - Added complete typography section
4. ✅ `component.json` - Added typography for all components

All typography tokens are now fully implemented across all levels! 🎉
