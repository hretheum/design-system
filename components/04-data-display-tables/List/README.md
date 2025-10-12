# List

## Description
List component for the design system.

## Category
04-data-display-tables

## Usage

```jsx
import { List } from '@design-system/components';

<List variant="primary" size="md">
  Your content here
</List>
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
<List>Default List</List>
```

### With Variant
```jsx
<List variant="primary">Primary List</List>
```

### Different Sizes
```jsx
<List size="sm">Small List</List>
<List size="lg">Large List</List>
```
