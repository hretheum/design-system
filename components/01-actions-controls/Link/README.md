# Link

## Description
Link component for the design system.

## Category
01-actions-controls

## Usage

```jsx
import { Link } from '@design-system/components';

<Link variant="primary" size="md">
  Your content here
</Link>
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
<Link>Default Link</Link>
```

### With Variant
```jsx
<Link variant="primary">Primary Link</Link>
```

### Different Sizes
```jsx
<Link size="sm">Small Link</Link>
<Link size="lg">Large Link</Link>
```
