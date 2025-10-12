# Gauges

## Description
Gauges component for the design system.

## Category
data-visualization

## Usage

```jsx
import { Gauges } from '@design-system/components';

<Gauges variant="primary" size="md">
  Your content here
</Gauges>
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
<Gauges>Default Gauges</Gauges>
```

### With Variant
```jsx
<Gauges variant="primary">Primary Gauges</Gauges>
```

### Different Sizes
```jsx
<Gauges size="sm">Small Gauges</Gauges>
<Gauges size="lg">Large Gauges</Gauges>
```
