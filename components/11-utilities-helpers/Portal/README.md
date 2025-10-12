# Portal

## Description
Portal component for the design system.

## Category
11-utilities-helpers

## Usage

```jsx
import { Portal } from '@design-system/components';

<Portal variant="primary" size="md">
  Your content here
</Portal>
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
<Portal>Default Portal</Portal>
```

### With Variant
```jsx
<Portal variant="primary">Primary Portal</Portal>
```

### Different Sizes
```jsx
<Portal size="sm">Small Portal</Portal>
<Portal size="lg">Large Portal</Portal>
```
