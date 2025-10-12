# Charts

## Description
Charts component for the design system.

## Category
data-visualization

## Usage

```jsx
import { Charts } from '@design-system/components';

<Charts variant="primary" size="md">
  Your content here
</Charts>
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
<Charts>Default Charts</Charts>
```

### With Variant
```jsx
<Charts variant="primary">Primary Charts</Charts>
```

### Different Sizes
```jsx
<Charts size="sm">Small Charts</Charts>
<Charts size="lg">Large Charts</Charts>
```
