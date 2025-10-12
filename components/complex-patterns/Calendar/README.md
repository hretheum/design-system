# Calendar

## Description
Calendar component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { Calendar } from '@design-system/components';

<Calendar variant="primary" size="md">
  Your content here
</Calendar>
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
<Calendar>Default Calendar</Calendar>
```

### With Variant
```jsx
<Calendar variant="primary">Primary Calendar</Calendar>
```

### Different Sizes
```jsx
<Calendar size="sm">Small Calendar</Calendar>
<Calendar size="lg">Large Calendar</Calendar>
```
