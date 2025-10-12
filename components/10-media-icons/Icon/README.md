# Icon

## Description
Icon component for the design system.

## Category
10-media-icons

## Usage

```jsx
import { Icon } from '@design-system/components';

<Icon variant="primary" size="md">
  Your content here
</Icon>
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
<Icon>Default Icon</Icon>
```

### With Variant
```jsx
<Icon variant="primary">Primary Icon</Icon>
```

### Different Sizes
```jsx
<Icon size="sm">Small Icon</Icon>
<Icon size="lg">Large Icon</Icon>
```
