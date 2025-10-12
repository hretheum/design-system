# Panel

## Description
Panel component for the design system.

## Category
layout-structure

## Usage

```jsx
import { Panel } from '@design-system/components';

<Panel variant="primary" size="md">
  Your content here
</Panel>
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
<Panel>Default Panel</Panel>
```

### With Variant
```jsx
<Panel variant="primary">Primary Panel</Panel>
```

### Different Sizes
```jsx
<Panel size="sm">Small Panel</Panel>
<Panel size="lg">Large Panel</Panel>
```
