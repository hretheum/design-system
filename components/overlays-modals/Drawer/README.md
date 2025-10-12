# Drawer

## Description
Drawer component for the design system.

## Category
overlays-modals

## Usage

```jsx
import { Drawer } from '@design-system/components';

<Drawer variant="primary" size="md">
  Your content here
</Drawer>
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
<Drawer>Default Drawer</Drawer>
```

### With Variant
```jsx
<Drawer variant="primary">Primary Drawer</Drawer>
```

### Different Sizes
```jsx
<Drawer size="sm">Small Drawer</Drawer>
<Drawer size="lg">Large Drawer</Drawer>
```
