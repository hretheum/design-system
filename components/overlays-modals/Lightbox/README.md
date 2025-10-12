# Lightbox

## Description
Lightbox component for the design system.

## Category
overlays-modals

## Usage

```jsx
import { Lightbox } from '@design-system/components';

<Lightbox variant="primary" size="md">
  Your content here
</Lightbox>
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
<Lightbox>Default Lightbox</Lightbox>
```

### With Variant
```jsx
<Lightbox variant="primary">Primary Lightbox</Lightbox>
```

### Different Sizes
```jsx
<Lightbox size="sm">Small Lightbox</Lightbox>
<Lightbox size="lg">Large Lightbox</Lightbox>
```
