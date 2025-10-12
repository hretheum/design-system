# Divider

## Description
Divider component for the design system.

## Category
layout-structure

## Usage

```jsx
import { Divider } from '@design-system/components';

<Divider variant="primary" size="md">
  Your content here
</Divider>
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
<Divider>Default Divider</Divider>
```

### With Variant
```jsx
<Divider variant="primary">Primary Divider</Divider>
```

### Different Sizes
```jsx
<Divider size="sm">Small Divider</Divider>
<Divider size="lg">Large Divider</Divider>
```
