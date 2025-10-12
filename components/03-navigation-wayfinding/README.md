# 🧭 Navigation & Wayfinding

## Definition
Components that help users orient and move through the application.

## Characteristics
- Show current location
- Enable movement between views
- Organize content hierarchy
- Provide context
- Support user journey

## Qualification Test
> "Does it help users know where they are or where they can go?"

## Components in this category

### ✅ Currently Implemented (4)
- **Tabs** - Switch between content panels
- **Breadcrumb** - Show hierarchical location
- **Pagination** - Navigate through pages
- **Stepper** - Multi-step process navigation

### 🔜 Planned Components
- **Navigation Bar** - Primary app navigation
- **Sidebar** - Vertical navigation menu
- **Menu** - Hierarchical navigation options
- **Skip Link** - Accessibility navigation
- **Table of Contents** - Document navigation
- **Jump Links** - In-page navigation
- **Back to Top** - Quick return navigation
- **Progress Steps** - Wizard/form progress

## Usage Guidelines

### When to use
- Multiple sections/pages exist
- Users need orientation
- Content has hierarchy
- Multi-step processes
- Large content sets (pagination)

### Best Practices
1. **Consistent placement** - Navigation in expected locations
2. **Clear current location** - Highlight active state
3. **Logical grouping** - Related items together
4. **Depth indicators** - Show hierarchy levels
5. **Mobile adaptation** - Responsive navigation patterns

## Accessibility Requirements
- **Keyboard navigation** - Arrow keys for menus
- **ARIA landmarks** - nav, main, aside roles
- **Screen reader announcements** - Current page/step
- **Skip navigation** - Jump to main content
- **Focus management** - Trap focus in mobile menus
- **Semantic HTML** - nav, ul/li structures

## Token Structure
```json
{
  "navigation": {
    "[component]": {
      "variant": { "horizontal", "vertical", "mobile" },
      "state": { "default", "active", "hover", "disabled" },
      "size": { "sm", "md", "lg" }
    }
  }
}
```

## Navigation Patterns
- **Global** - Site-wide navigation
- **Local** - Section navigation
- **Contextual** - Related content
- **Supplemental** - Additional options
- **Utility** - User account, settings

## Related Categories
- **Actions & Controls** - Navigation triggers
- **Containers & Layout** - Navigation containers
- **Media & Icons** - Navigation icons