# 🏷️ Badges & Labels

## Definition
Components that add context or metadata to other elements.

## Characteristics
- Small, auxiliary elements
- Add information to primary content
- Often non-interactive
- Provide status or category
- Compact design

## Qualification Test
> "Does it add additional context to other elements?"

## Components in this category

### ✅ Currently Implemented (1)
- **Badge** - Status/count indicator

### 🔜 Planned Components
- **Tag/Chip** - Removable label
- **Chip Group** - Multiple chips
- **Label** - Simple text label
- **Label Group** - Grouped labels
- **Status Badge** - State indicator
- **Pill** - Rounded label
- **Count Indicator** - Numeric badge
- **Category Tag** - Classification label

## Usage Guidelines

### When to use
- Show status/state
- Display counts
- Categorize items
- Filter indicators
- Metadata display
- Quick visual scanning

### Best Practices
1. **Consistent colors** - Status mapping
2. **Readable text** - Sufficient contrast
3. **Appropriate size** - Not overwhelming
4. **Clear meaning** - Intuitive labels
5. **Scannable** - Easy to spot
6. **Limited use** - Avoid badge overload

## Accessibility Requirements
- **Color not sole indicator** - Include text/icons
- **Screen reader text** - Full context
- **Sufficient contrast** - WCAG compliance
- **Interactive badges** - Keyboard support
- **Focus indicators** - For clickable badges
- **ARIA labels** - Descriptive labels

## Token Structure
```json
{
  "badges": {
    "[component]": {
      "size": { "xs", "sm", "md", "lg" },
      "variant": { "filled", "outlined", "dot" },
      "color": { "default", "primary", "success", "warning", "error" }
    }
  }
}
```

## Badge Types
- **Status** - Active, Inactive, Pending
- **Notification** - Count badges
- **Category** - Classification tags
- **Filter** - Applied filters
- **New** - New item indicator

## Visual Patterns
- **Filled** - Solid background
- **Outlined** - Border only
- **Dot** - Simple dot indicator
- **Icon** - With icon
- **Removable** - With close button

## Related Categories
- **Data Display** - Badges in tables
- **Navigation** - Badge counts in nav
- **Forms & Inputs** - Tag inputs