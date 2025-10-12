# EmptyState

## Description
EmptyState component for the design system.

## Category
04-data-display-tables

## Usage

```jsx
import { EmptyState } from '@design-system/components';

<EmptyState variant="primary" size="md">
  Your content here
</EmptyState>
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
<EmptyState>Default EmptyState</EmptyState>
```

### With Variant
```jsx
<EmptyState variant="primary">Primary EmptyState</EmptyState>
```

### Different Sizes
```jsx
<EmptyState size="sm">Small EmptyState</EmptyState>
<EmptyState size="lg">Large EmptyState</EmptyState>
```
