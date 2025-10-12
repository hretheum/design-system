# Skeleton

## Description
Skeleton component for the design system.

## Category
progress-loading

## Usage

```jsx
import { Skeleton } from '@design-system/components';

<Skeleton variant="primary" size="md">
  Your content here
</Skeleton>
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
<Skeleton>Default Skeleton</Skeleton>
```

### With Variant
```jsx
<Skeleton variant="primary">Primary Skeleton</Skeleton>
```

### Different Sizes
```jsx
<Skeleton size="sm">Small Skeleton</Skeleton>
<Skeleton size="lg">Large Skeleton</Skeleton>
```
