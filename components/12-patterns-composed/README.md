# 🎨 Patterns & Composed

## Definition
Complex UI patterns composed of multiple components working together.

## Characteristics
- Multi-component compositions
- Solve specific use cases
- Often configurable
- Reusable patterns
- Business logic included

## Qualification Test
> "Is it a pattern composed of other components?"

## Components in this category

### ✅ Currently Implemented (2)
- **Wizard** - Multi-step process
- **Template** - Layout template

### 🔜 Planned Components
- **Search with Filters** - Advanced search
- **Date Range Picker** - Date selection pattern
- **Login Form** - Authentication pattern
- **Comment Thread** - Discussion pattern
- **Product Card** - E-commerce pattern
- **User Profile** - Profile display pattern
- **Dashboard Widget** - Analytics pattern
- **File Manager** - File browsing pattern
- **Checkout Flow** - Payment pattern
- **Data Export** - Export functionality

## Usage Guidelines

### When to use
- Common UI patterns needed
- Complex interactions
- Multi-component coordination
- Standardized workflows
- Repeated patterns

### Best Practices
1. **Composable** - Built from primitives
2. **Configurable** - Flexible options
3. **Complete** - All states handled
4. **Documented** - Clear examples
5. **Tested** - E2E test coverage
6. **Performant** - Optimized bundles

## Accessibility Requirements
- **Complete a11y** - All parts accessible
- **Keyboard flow** - Logical navigation
- **Screen reader** - Full journey support
- **Error handling** - Clear feedback
- **Focus management** - Between components
- **ARIA patterns** - Standard implementations

## Token Structure
```json
{
  "patterns": {
    "[pattern]": {
      "layout": { /* spacing, sizing */ },
      "components": { /* component overrides */ },
      "behavior": { /* interaction tokens */ }
    }
  }
}
```

## Pattern Types
- **Forms** - Multi-step, login, checkout
- **Navigation** - Menus, breadcrumbs
- **Data** - Tables with filters
- **Content** - Cards, media displays
- **Feedback** - Notifications, confirmations

## Composition Examples
```javascript
// Wizard Pattern
<Wizard>
  <WizardStep>
    <Form>
      <Input />
      <Select />
    </Form>
  </WizardStep>
  <WizardStep>
    <DataTable />
  </WizardStep>
  <WizardStep>
    <Summary />
  </WizardStep>
</Wizard>
```

## Pattern Documentation
Each pattern should include:
1. **Use case** - When to use
2. **Anatomy** - Component parts
3. **Behavior** - Interactions
4. **Variations** - Different configs
5. **Examples** - Live demos
6. **Code** - Implementation

## Related Categories
- **All Categories** - Patterns use all component types
- Patterns are compositions of components from other categories