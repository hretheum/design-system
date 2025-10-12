# ⏳ Progress & Loading

## Definition
Components showing operation progress or loading states.

## Characteristics
- Show time passage
- Inform about processes
- Reduce perceived wait time
- Indicate system activity
- Provide completion feedback

## Qualification Test
> "Does it show something is happening or how much is left?"

## Components in this category

### ✅ Currently Implemented (2)
- **ProgressBar** - Linear progress indicator
- **Spinner** - Indeterminate loading

### 🔜 Planned Components
- **Progress Circle** - Circular progress
- **Skeleton Screen** - Content placeholder
- **Progress Steps** - Multi-step progress
- **Loading Overlay** - Full screen loading
- **Busy Indicator** - Inline loading
- **Progress Ring** - Ring-shaped progress
- **Shimmer Effect** - Loading animation
- **Loading Dots** - Simple animation

## Usage Guidelines

### When to use
- Async operations
- File uploads/downloads
- Data fetching
- Long computations
- Multi-step processes
- Initial page loads

### Best Practices
1. **Appropriate type** - Determinate vs indeterminate
2. **Visible progress** - Show actual progress when possible
3. **Time estimates** - Provide completion time
4. **Cancel option** - For long operations
5. **Smooth animations** - No jarring movements
6. **Skeleton accuracy** - Match actual content layout

## Accessibility Requirements
- **ARIA attributes** - role="progressbar", aria-valuenow
- **Screen reader** - Announce progress updates
- **Reduced motion** - Respect user preferences
- **Alternative text** - Describe what's loading
- **Focus management** - Don't trap focus
- **Live regions** - Update status

## Token Structure
```json
{
  "progress": {
    "[component]": {
      "size": { "xs", "sm", "md", "lg", "xl" },
      "variant": { "linear", "circular", "dots" },
      "state": { "idle", "loading", "complete", "error" }
    }
  }
}
```

## Progress Patterns
- **Determinate** - Known duration/steps
- **Indeterminate** - Unknown duration
- **Staged** - Multiple phases
- **Buffered** - Show buffer ahead
- **Segmented** - Discrete steps

## Animation Considerations
- **Duration** - Appropriate to operation
- **Easing** - Smooth progression
- **Frame rate** - 60fps minimum
- **CPU usage** - Optimize for performance
- **Battery impact** - Mobile considerations

## Related Categories
- **Feedback & Messaging** - Loading messages
- **Overlays & Modals** - Loading overlays
- **Forms & Inputs** - Form submission loading