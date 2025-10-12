# Menu

## Description
Menu component for the design system.

## Category
03-navigation-wayfinding

## Usage

```jsx
import { Menu } from '@design-system/components';

<Menu variant="primary" size="md">
  Your content here
</Menu>
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
<Menu>Default Menu</Menu>
```

### With Variant
```jsx
<Menu variant="primary">Primary Menu</Menu>
```

### Different Sizes
```jsx
<Menu size="sm">Small Menu</Menu>
<Menu size="lg">Large Menu</Menu>
```
