# CommandPalette

## Description
CommandPalette component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { CommandPalette } from '@design-system/components';

<CommandPalette variant="primary" size="md">
  Your content here
</CommandPalette>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `default \| primary \| secondary` | `default` | Visual variant |
| size | `sm \| md \| lg` | `md` | Component size |
| className | `string` | `''` | Additional CSS classes |

## Examples

### Basic Usage
```jsx
<CommandPalette>Default CommandPalette</CommandPalette>
```

### With Variant
```jsx
<CommandPalette variant="primary">Primary CommandPalette</CommandPalette>
```

### Different Sizes
```jsx
<CommandPalette size="sm">Small CommandPalette</CommandPalette>
<CommandPalette size="lg">Large CommandPalette</CommandPalette>
```
