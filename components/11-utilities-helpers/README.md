# 🛠️ Utilities & Helpers

## Definition
Components that support other components or provide utility functions.

## Characteristics
- Helper functionality
- Often invisible to users
- Support accessibility
- Enhance other components
- Technical utilities

## Qualification Test
> "Does it support other components without its own UI?"

## Components in this category

### ✅ Currently Implemented (0)
*No utility components implemented yet*

### 🔜 Planned Components
- **Visually Hidden** - Screen reader only content
- **Skip Link** - Keyboard navigation aid
- **Focus Trap** - Contain focus in region
- **Portal** - Render outside DOM hierarchy
- **Transition** - Animation wrapper
- **Resize Observer** - Size change detection
- **Click Outside** - Detect outside clicks
- **Scroll Lock** - Prevent body scroll
- **Intersection Observer** - Viewport detection
- **Copy to Clipboard** - Copy functionality

## Usage Guidelines

### When to use
- Accessibility improvements
- Focus management
- Event handling
- Animation control
- DOM manipulation
- Performance optimization

### Best Practices
1. **Invisible but essential** - Critical for a11y
2. **Reusable patterns** - DRY principle
3. **Performance conscious** - Optimize handlers
4. **Framework agnostic** - When possible
5. **Well documented** - Clear usage examples

## Accessibility Requirements
- **Screen reader support** - Primary purpose
- **Keyboard navigation** - Enable keyboard users
- **Focus management** - Logical focus flow
- **ARIA attributes** - Proper implementation
- **Motion preferences** - Respect settings
- **High contrast** - Support modes

## Token Structure
```json
{
  "utilities": {
    "[component]": {
      "behavior": { /* component specific */ },
      "timing": { /* animation/transition */ },
      "a11y": { /* accessibility tokens */ }
    }
  }
}
```

## Utility Patterns
- **A11y Utilities** - Accessibility helpers
- **DOM Utilities** - DOM manipulation
- **Event Utilities** - Event handling
- **Animation Utilities** - Motion control
- **Layout Utilities** - Layout helpers

## Implementation Examples
```javascript
// Visually Hidden
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

// Focus Trap
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  // Trap implementation
};
```

## Related Categories
- **Overlays & Modals** - Focus trap usage
- **Navigation** - Skip links
- **All Categories** - Support all components