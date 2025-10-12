# ScrollLock

## Description
ScrollLock component for the design system.

## Category
11-utilities-helpers

## Usage

```jsx
import { ScrollLock } from '@design-system/components';

<ScrollLock variant="primary" size="md">
  Your content here
</ScrollLock>
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
<ScrollLock>Default ScrollLock</ScrollLock>
```

### With Variant
```jsx
<ScrollLock variant="primary">Primary ScrollLock</ScrollLock>
```

### Different Sizes
```jsx
<ScrollLock size="sm">Small ScrollLock</ScrollLock>
<ScrollLock size="lg">Large ScrollLock</ScrollLock>
```
