# NumberInput

## Description
NumberInput component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { NumberInput } from '@design-system/components';

<NumberInput variant="primary" size="md">
  Your content here
</NumberInput>
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
<NumberInput>Default NumberInput</NumberInput>
```

### With Variant
```jsx
<NumberInput variant="primary">Primary NumberInput</NumberInput>
```

### Different Sizes
```jsx
<NumberInput size="sm">Small NumberInput</NumberInput>
<NumberInput size="lg">Large NumberInput</NumberInput>
```
