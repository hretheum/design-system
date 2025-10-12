# PinInput

## Description
PinInput component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { PinInput } from '@design-system/components';

<PinInput variant="primary" size="md">
  Your content here
</PinInput>
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
<PinInput>Default PinInput</PinInput>
```

### With Variant
```jsx
<PinInput variant="primary">Primary PinInput</PinInput>
```

### Different Sizes
```jsx
<PinInput size="sm">Small PinInput</PinInput>
<PinInput size="lg">Large PinInput</PinInput>
```
