# 🎬 Actions & Controls

## Definition
Components that enable users to perform actions or control interface behavior.

## Characteristics
- Trigger state changes
- Have clear effects  
- Often have states (hover, active, disabled)
- Primary interaction points

## Qualification Test
> "Does clicking/interacting cause an action or change?"

## Components in this category

### ✅ Currently Implemented (1)
- **Button** - Primary action trigger

### 🔜 Planned Components
- **Link** - Navigational action
- **Icon Button** - Compact action trigger
- **Split Button** - Primary + secondary actions
- **Button Group** - Related actions together
- **Menu Item** - Action in a menu context
- **Command Palette** - Quick actions interface
- **Toolbar Action** - Contextual actions
- **Keyboard Shortcut Indicator** - Keyboard action hints
- **Action Menu** - Grouped actions dropdown
- **Floating Action Button (FAB)** - Primary screen action

## Usage Guidelines

### When to use
- User needs to trigger an action
- State change is required
- Navigation to another view/page
- Submitting or canceling operations

### Best Practices
1. **Clear labels** - Action should be obvious
2. **Consistent placement** - Primary actions in predictable locations
3. **Appropriate sizing** - Touch targets min 44px (mobile), 24px (desktop)
4. **Loading states** - Show feedback during async operations
5. **Disabled states** - Clearly indicate unavailable actions

## Accessibility Requirements
- **Keyboard navigation** - All actions keyboard accessible
- **Focus indicators** - Visible focus states (2px minimum)
- **ARIA labels** - Descriptive labels for screen readers
- **Role attributes** - Proper semantic HTML or ARIA roles
- **Touch targets** - WCAG 2.5.5 compliant sizes

## Token Structure
```json
{
  "actions": {
    "[component]": {
      "size": { "xs", "sm", "md", "lg", "xl" },
      "variant": { "primary", "secondary", "danger", "ghost" },
      "state": { "default", "hover", "active", "disabled", "loading" }
    }
  }
}
```

## Related Categories
- **Forms & Inputs** - Actions often submit forms
- **Navigation** - Some actions navigate
- **Overlays & Modals** - Actions can trigger overlays