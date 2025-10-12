# KanbanBoard

## Description
KanbanBoard component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { KanbanBoard } from '@design-system/components';

<KanbanBoard variant="primary" size="md">
  Your content here
</KanbanBoard>
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
<KanbanBoard>Default KanbanBoard</KanbanBoard>
```

### With Variant
```jsx
<KanbanBoard variant="primary">Primary KanbanBoard</KanbanBoard>
```

### Different Sizes
```jsx
<KanbanBoard size="sm">Small KanbanBoard</KanbanBoard>
<KanbanBoard size="lg">Large KanbanBoard</KanbanBoard>
```
