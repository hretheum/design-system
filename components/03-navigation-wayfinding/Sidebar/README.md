# Sidebar

## Description
Sidebar component for the design system.

## Category
03-navigation-wayfinding

## Usage

```jsx
import { Sidebar } from '@design-system/components';

<Sidebar variant="primary" size="md">
  Your content here
</Sidebar>
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
<Sidebar>Default Sidebar</Sidebar>
```

### With Variant
```jsx
<Sidebar variant="primary">Primary Sidebar</Sidebar>
```

### Different Sizes
```jsx
<Sidebar size="sm">Small Sidebar</Sidebar>
<Sidebar size="lg">Large Sidebar</Sidebar>
```
