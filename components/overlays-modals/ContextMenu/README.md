# ContextMenu

## Description
ContextMenu component for the design system.

## Category
overlays-modals

## Usage

```jsx
import { ContextMenu } from '@design-system/components';

<ContextMenu variant="primary" size="md">
  Your content here
</ContextMenu>
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
<ContextMenu>Default ContextMenu</ContextMenu>
```

### With Variant
```jsx
<ContextMenu variant="primary">Primary ContextMenu</ContextMenu>
```

### Different Sizes
```jsx
<ContextMenu size="sm">Small ContextMenu</ContextMenu>
<ContextMenu size="lg">Large ContextMenu</ContextMenu>
```
