# Graphs

## Description
Graphs component for the design system.

## Category
data-visualization

## Usage

```jsx
import { Graphs } from '@design-system/components';

<Graphs variant="primary" size="md">
  Your content here
</Graphs>
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
<Graphs>Default Graphs</Graphs>
```

### With Variant
```jsx
<Graphs variant="primary">Primary Graphs</Graphs>
```

### Different Sizes
```jsx
<Graphs size="sm">Small Graphs</Graphs>
<Graphs size="lg">Large Graphs</Graphs>
```
