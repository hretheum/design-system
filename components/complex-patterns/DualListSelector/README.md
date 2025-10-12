# DualListSelector

## Description
DualListSelector component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { DualListSelector } from '@design-system/components';

<DualListSelector variant="primary" size="md">
  Your content here
</DualListSelector>
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
<DualListSelector>Default DualListSelector</DualListSelector>
```

### With Variant
```jsx
<DualListSelector variant="primary">Primary DualListSelector</DualListSelector>
```

### Different Sizes
```jsx
<DualListSelector size="sm">Small DualListSelector</DualListSelector>
<DualListSelector size="lg">Large DualListSelector</DualListSelector>
```
