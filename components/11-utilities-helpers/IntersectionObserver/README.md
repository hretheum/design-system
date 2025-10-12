# IntersectionObserver

## Description
IntersectionObserver component for the design system.

## Category
11-utilities-helpers

## Usage

```jsx
import { IntersectionObserver } from '@design-system/components';

<IntersectionObserver variant="primary" size="md">
  Your content here
</IntersectionObserver>
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
<IntersectionObserver>Default IntersectionObserver</IntersectionObserver>
```

### With Variant
```jsx
<IntersectionObserver variant="primary">Primary IntersectionObserver</IntersectionObserver>
```

### Different Sizes
```jsx
<IntersectionObserver size="sm">Small IntersectionObserver</IntersectionObserver>
<IntersectionObserver size="lg">Large IntersectionObserver</IntersectionObserver>
```
