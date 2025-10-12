# TreeView

## Description
TreeView component for the design system.

## Category
04-data-display-tables

## Usage

```jsx
import { TreeView } from '@design-system/components';

<TreeView variant="primary" size="md">
  Your content here
</TreeView>
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
<TreeView>Default TreeView</TreeView>
```

### With Variant
```jsx
<TreeView variant="primary">Primary TreeView</TreeView>
```

### Different Sizes
```jsx
<TreeView size="sm">Small TreeView</TreeView>
<TreeView size="lg">Large TreeView</TreeView>
```
