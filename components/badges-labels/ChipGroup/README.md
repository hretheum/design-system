# ChipGroup

## Description
ChipGroup component for the design system.

## Category
badges-labels

## Usage

```jsx
import { ChipGroup } from '@design-system/components';

<ChipGroup variant="primary" size="md">
  Your content here
</ChipGroup>
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
<ChipGroup>Default ChipGroup</ChipGroup>
```

### With Variant
```jsx
<ChipGroup variant="primary">Primary ChipGroup</ChipGroup>
```

### Different Sizes
```jsx
<ChipGroup size="sm">Small ChipGroup</ChipGroup>
<ChipGroup size="lg">Large ChipGroup</ChipGroup>
```
