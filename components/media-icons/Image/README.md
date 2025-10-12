# Image

## Description
Image component for the design system.

## Category
media-icons

## Usage

```jsx
import { Image } from '@design-system/components';

<Image variant="primary" size="md">
  Your content here
</Image>
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
<Image>Default Image</Image>
```

### With Variant
```jsx
<Image variant="primary">Primary Image</Image>
```

### Different Sizes
```jsx
<Image size="sm">Small Image</Image>
<Image size="lg">Large Image</Image>
```
