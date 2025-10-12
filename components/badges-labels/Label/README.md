# Label

## Description
Label component for the design system.

## Category
badges-labels

## Usage

```jsx
import { Label } from '@design-system/components';

<Label variant="primary" size="md">
  Your content here
</Label>
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
<Label>Default Label</Label>
```

### With Variant
```jsx
<Label variant="primary">Primary Label</Label>
```

### Different Sizes
```jsx
<Label size="sm">Small Label</Label>
<Label size="lg">Large Label</Label>
```
