# Gallery

## Description
Gallery component for the design system.

## Category
media-icons

## Usage

```jsx
import { Gallery } from '@design-system/components';

<Gallery variant="primary" size="md">
  Your content here
</Gallery>
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
<Gallery>Default Gallery</Gallery>
```

### With Variant
```jsx
<Gallery variant="primary">Primary Gallery</Gallery>
```

### Different Sizes
```jsx
<Gallery size="sm">Small Gallery</Gallery>
<Gallery size="lg">Large Gallery</Gallery>
```
