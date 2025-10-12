# Form

## Description
Form component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { Form } from '@design-system/components';

<Form variant="primary" size="md">
  Your content here
</Form>
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
<Form>Default Form</Form>
```

### With Variant
```jsx
<Form variant="primary">Primary Form</Form>
```

### Different Sizes
```jsx
<Form size="sm">Small Form</Form>
<Form size="lg">Large Form</Form>
```
