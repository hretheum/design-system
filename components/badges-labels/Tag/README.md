# Tag

## Description
Tag component for the design system.

## Category
badges-labels

## Usage

```jsx
import { Tag } from '@design-system/components';

<Tag variant="primary" size="md">
  Your content here
</Tag>
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
<Tag>Default Tag</Tag>
```

### With Variant
```jsx
<Tag variant="primary">Primary Tag</Tag>
```

### Different Sizes
```jsx
<Tag size="sm">Small Tag</Tag>
<Tag size="lg">Large Tag</Tag>
```
