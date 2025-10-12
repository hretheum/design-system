# StatusBadge

## Description
StatusBadge component for the design system.

## Category
badges-labels

## Usage

```jsx
import { StatusBadge } from '@design-system/components';

<StatusBadge variant="primary" size="md">
  Your content here
</StatusBadge>
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
<StatusBadge>Default StatusBadge</StatusBadge>
```

### With Variant
```jsx
<StatusBadge variant="primary">Primary StatusBadge</StatusBadge>
```

### Different Sizes
```jsx
<StatusBadge size="sm">Small StatusBadge</StatusBadge>
<StatusBadge size="lg">Large StatusBadge</StatusBadge>
```
