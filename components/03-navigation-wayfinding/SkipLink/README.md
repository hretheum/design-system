# SkipLink

## Description
SkipLink component for the design system.

## Category
03-navigation-wayfinding

## Usage

```jsx
import { SkipLink } from '@design-system/components';

<SkipLink variant="primary" size="md">
  Your content here
</SkipLink>
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
<SkipLink>Default SkipLink</SkipLink>
```

### With Variant
```jsx
<SkipLink variant="primary">Primary SkipLink</SkipLink>
```

### Different Sizes
```jsx
<SkipLink size="sm">Small SkipLink</SkipLink>
<SkipLink size="lg">Large SkipLink</SkipLink>
```
