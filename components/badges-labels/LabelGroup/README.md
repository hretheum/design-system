# LabelGroup

## Description
LabelGroup component for the design system.

## Category
badges-labels

## Usage

```jsx
import { LabelGroup } from '@design-system/components';

<LabelGroup variant="primary" size="md">
  Your content here
</LabelGroup>
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
<LabelGroup>Default LabelGroup</LabelGroup>
```

### With Variant
```jsx
<LabelGroup variant="primary">Primary LabelGroup</LabelGroup>
```

### Different Sizes
```jsx
<LabelGroup size="sm">Small LabelGroup</LabelGroup>
<LabelGroup size="lg">Large LabelGroup</LabelGroup>
```
