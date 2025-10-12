# TimePicker

## Description
TimePicker component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { TimePicker } from '@design-system/components';

<TimePicker variant="primary" size="md">
  Your content here
</TimePicker>
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
<TimePicker>Default TimePicker</TimePicker>
```

### With Variant
```jsx
<TimePicker variant="primary">Primary TimePicker</TimePicker>
```

### Different Sizes
```jsx
<TimePicker size="sm">Small TimePicker</TimePicker>
<TimePicker size="lg">Large TimePicker</TimePicker>
```
