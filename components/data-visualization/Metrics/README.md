# Metrics

## Description
Metrics component for the design system.

## Category
data-visualization

## Usage

```jsx
import { Metrics } from '@design-system/components';

<Metrics variant="primary" size="md">
  Your content here
</Metrics>
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
<Metrics>Default Metrics</Metrics>
```

### With Variant
```jsx
<Metrics variant="primary">Primary Metrics</Metrics>
```

### Different Sizes
```jsx
<Metrics size="sm">Small Metrics</Metrics>
<Metrics size="lg">Large Metrics</Metrics>
```
