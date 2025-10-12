# Accordion

## Description
Accordion component for the design system.

## Category
layout-structure

## Usage

```jsx
import { Accordion } from '@design-system/components';

<Accordion variant="primary" size="md">
  Your content here
</Accordion>
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
<Accordion>Default Accordion</Accordion>
```

### With Variant
```jsx
<Accordion variant="primary">Primary Accordion</Accordion>
```

### Different Sizes
```jsx
<Accordion size="sm">Small Accordion</Accordion>
<Accordion size="lg">Large Accordion</Accordion>
```
