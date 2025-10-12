# IconButton

## Description
IconButton component for the design system.

## Category
01-actions-controls

## Usage

```jsx
import { IconButton } from '@design-system/components';

<IconButton variant="primary" size="md">
  Your content here
</IconButton>
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
<IconButton>Default IconButton</IconButton>
```

### With Variant
```jsx
<IconButton variant="primary">Primary IconButton</IconButton>
```

### Different Sizes
```jsx
<IconButton size="sm">Small IconButton</IconButton>
<IconButton size="lg">Large IconButton</IconButton>
```
