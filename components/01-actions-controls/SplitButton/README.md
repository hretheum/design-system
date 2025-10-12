# SplitButton

## Description
SplitButton component for the design system.

## Category
01-actions-controls

## Usage

```jsx
import { SplitButton } from '@design-system/components';

<SplitButton variant="primary" size="md">
  Your content here
</SplitButton>
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
<SplitButton>Default SplitButton</SplitButton>
```

### With Variant
```jsx
<SplitButton variant="primary">Primary SplitButton</SplitButton>
```

### Different Sizes
```jsx
<SplitButton size="sm">Small SplitButton</SplitButton>
<SplitButton size="lg">Large SplitButton</SplitButton>
```
