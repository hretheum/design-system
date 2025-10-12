# LoadingOverlay

## Description
LoadingOverlay component for the design system.

## Category
progress-loading

## Usage

```jsx
import { LoadingOverlay } from '@design-system/components';

<LoadingOverlay variant="primary" size="md">
  Your content here
</LoadingOverlay>
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
<LoadingOverlay>Default LoadingOverlay</LoadingOverlay>
```

### With Variant
```jsx
<LoadingOverlay variant="primary">Primary LoadingOverlay</LoadingOverlay>
```

### Different Sizes
```jsx
<LoadingOverlay size="sm">Small LoadingOverlay</LoadingOverlay>
<LoadingOverlay size="lg">Large LoadingOverlay</LoadingOverlay>
```
