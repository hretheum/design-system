# RichTextEditor

## Description
RichTextEditor component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { RichTextEditor } from '@design-system/components';

<RichTextEditor variant="primary" size="md">
  Your content here
</RichTextEditor>
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
<RichTextEditor>Default RichTextEditor</RichTextEditor>
```

### With Variant
```jsx
<RichTextEditor variant="primary">Primary RichTextEditor</RichTextEditor>
```

### Different Sizes
```jsx
<RichTextEditor size="sm">Small RichTextEditor</RichTextEditor>
<RichTextEditor size="lg">Large RichTextEditor</RichTextEditor>
```
