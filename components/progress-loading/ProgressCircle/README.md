# ProgressCircle

## Description
ProgressCircle component for the design system.

## Category
progress-loading

## Usage

```jsx
import { ProgressCircle } from '@design-system/components';

<ProgressCircle variant="primary" size="md">
  Your content here
</ProgressCircle>
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
<ProgressCircle>Default ProgressCircle</ProgressCircle>
```

### With Variant
```jsx
<ProgressCircle variant="primary">Primary ProgressCircle</ProgressCircle>
```

### Different Sizes
```jsx
<ProgressCircle size="sm">Small ProgressCircle</ProgressCircle>
<ProgressCircle size="lg">Large ProgressCircle</ProgressCircle>
```
