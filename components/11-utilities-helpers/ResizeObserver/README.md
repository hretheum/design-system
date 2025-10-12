# ResizeObserver

## Description
ResizeObserver component for the design system.

## Category
11-utilities-helpers

## Usage

```jsx
import { ResizeObserver } from '@design-system/components';

<ResizeObserver variant="primary" size="md">
  Your content here
</ResizeObserver>
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
<ResizeObserver>Default ResizeObserver</ResizeObserver>
```

### With Variant
```jsx
<ResizeObserver variant="primary">Primary ResizeObserver</ResizeObserver>
```

### Different Sizes
```jsx
<ResizeObserver size="sm">Small ResizeObserver</ResizeObserver>
<ResizeObserver size="lg">Large ResizeObserver</ResizeObserver>
```
