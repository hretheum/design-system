# Popover

## Description
Popover component for the design system.

## Category
overlays-modals

## Usage

```jsx
import { Popover } from '@design-system/components';

<Popover variant="primary" size="md">
  Your content here
</Popover>
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
<Popover>Default Popover</Popover>
```

### With Variant
```jsx
<Popover variant="primary">Primary Popover</Popover>
```

### Different Sizes
```jsx
<Popover size="sm">Small Popover</Popover>
<Popover size="lg">Large Popover</Popover>
```
