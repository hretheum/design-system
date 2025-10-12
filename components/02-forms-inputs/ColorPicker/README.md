# ColorPicker

## Description
ColorPicker component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { ColorPicker } from '@design-system/components';

<ColorPicker variant="primary" size="md">
  Your content here
</ColorPicker>
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
<ColorPicker>Default ColorPicker</ColorPicker>
```

### With Variant
```jsx
<ColorPicker variant="primary">Primary ColorPicker</ColorPicker>
```

### Different Sizes
```jsx
<ColorPicker size="sm">Small ColorPicker</ColorPicker>
<ColorPicker size="lg">Large ColorPicker</ColorPicker>
```
