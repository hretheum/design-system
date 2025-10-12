# DateRangePicker

## Description
DateRangePicker component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { DateRangePicker } from '@design-system/components';

<DateRangePicker variant="primary" size="md">
  Your content here
</DateRangePicker>
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
<DateRangePicker>Default DateRangePicker</DateRangePicker>
```

### With Variant
```jsx
<DateRangePicker variant="primary">Primary DateRangePicker</DateRangePicker>
```

### Different Sizes
```jsx
<DateRangePicker size="sm">Small DateRangePicker</DateRangePicker>
<DateRangePicker size="lg">Large DateRangePicker</DateRangePicker>
```
