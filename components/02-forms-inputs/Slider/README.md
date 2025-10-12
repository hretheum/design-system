# Slider

## Description
Slider component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { Slider } from '@design-system/components';

<Slider variant="primary" size="md">
  Your content here
</Slider>
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
<Slider>Default Slider</Slider>
```

### With Variant
```jsx
<Slider variant="primary">Primary Slider</Slider>
```

### Different Sizes
```jsx
<Slider size="sm">Small Slider</Slider>
<Slider size="lg">Large Slider</Slider>
```
