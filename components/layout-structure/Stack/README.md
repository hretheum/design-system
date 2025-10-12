# Stack

## Description
Stack component for the design system.

## Category
layout-structure

## Usage

```jsx
import { Stack } from '@design-system/components';

<Stack variant="primary" size="md">
  Your content here
</Stack>
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
<Stack>Default Stack</Stack>
```

### With Variant
```jsx
<Stack variant="primary">Primary Stack</Stack>
```

### Different Sizes
```jsx
<Stack size="sm">Small Stack</Stack>
<Stack size="lg">Large Stack</Stack>
```
