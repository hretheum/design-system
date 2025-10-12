# 📦 Containers & Layout

## Definition
Components that organize space and group content.

## Characteristics
- Define structure
- Group related elements
- Provide visual hierarchy
- No standalone functionality
- Create spatial relationships

## Qualification Test
> "Is the main role to organize other elements?"

## Components in this category

### ✅ Currently Implemented (1)
- **Card** - Content container with padding

### 🔜 Planned Components
- **Panel** - Basic container
- **Accordion** - Collapsible content sections
- **Collapsible** - Show/hide content
- **Grid** - Grid layout system
- **Stack** - Vertical/horizontal stacking
- **Divider** - Visual separation
- **Section** - Page sections
- **Layout Templates** - Page layouts
- **Split View** - Resizable panes
- **Flex Container** - Flexible layouts
- **Aspect Ratio Box** - Maintain proportions

## Usage Guidelines

### When to use
- Grouping related content
- Creating visual hierarchy
- Organizing page layout
- Separating content sections
- Managing whitespace

### Best Practices
1. **Consistent spacing** - Use spacing tokens
2. **Clear hierarchy** - Visual weight differences
3. **Responsive behavior** - Adapt to viewports
4. **Semantic grouping** - Logical content groups
5. **Avoid nesting** - Maximum 2-3 levels deep

## Accessibility Requirements
- **Semantic HTML** - section, article, aside
- **ARIA landmarks** - When semantic HTML insufficient
- **Heading hierarchy** - Logical h1-h6 structure
- **Focus containment** - For modal containers
- **Screen reader** - Announce sections
- **Keyboard navigation** - For interactive containers

## Token Structure
```json
{
  "containers": {
    "[component]": {
      "size": { "sm", "md", "lg" },
      "padding": { "none", "sm", "md", "lg", "xl" },
      "gap": { "none", "sm", "md", "lg", "xl" },
      "variant": { "outlined", "filled", "elevated" }
    }
  }
}
```

## Layout Patterns
- **Fixed Width** - Consistent sizing
- **Fluid** - Percentage based
- **Responsive** - Breakpoint based
- **Intrinsic** - Content-driven sizing
- **Extrinsic** - Container-driven sizing

## Spacing System
- **Inset** - Internal padding
- **Stack** - Vertical spacing
- **Inline** - Horizontal spacing
- **Squish** - Asymmetric padding
- **Stretch** - Extended padding

## Related Categories
- **Data Display** - Tables in containers
- **Overlays & Modals** - Floating containers
- **Patterns & Composed** - Complex layouts