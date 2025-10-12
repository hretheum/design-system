# ButtonGroup

## Description
ButtonGroup component for the design system.

## Category
01-actions-controls

## Usage

```jsx
import { ButtonGroup } from '@design-system/components';

<ButtonGroup variant="primary" size="md">
  Your content here
</ButtonGroup>
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
<ButtonGroup>Default ButtonGroup</ButtonGroup>
```

### With Variant
```jsx
<ButtonGroup variant="primary">Primary ButtonGroup</ButtonGroup>
```

### Different Sizes
```jsx
<ButtonGroup size="sm">Small ButtonGroup</ButtonGroup>
<ButtonGroup size="lg">Large ButtonGroup</ButtonGroup>
```
