# ActionMenu

## Description
ActionMenu component for the design system.

## Category
01-actions-controls

## Usage

```jsx
import { ActionMenu } from '@design-system/components';

<ActionMenu variant="primary" size="md">
  Your content here
</ActionMenu>
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
<ActionMenu>Default ActionMenu</ActionMenu>
```

### With Variant
```jsx
<ActionMenu variant="primary">Primary ActionMenu</ActionMenu>
```

### Different Sizes
```jsx
<ActionMenu size="sm">Small ActionMenu</ActionMenu>
<ActionMenu size="lg">Large ActionMenu</ActionMenu>
```
