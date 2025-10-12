# NavigationBar

## Description
NavigationBar component for the design system.

## Category
03-navigation-wayfinding

## Usage

```jsx
import { NavigationBar } from '@design-system/components';

<NavigationBar variant="primary" size="md">
  Your content here
</NavigationBar>
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
<NavigationBar>Default NavigationBar</NavigationBar>
```

### With Variant
```jsx
<NavigationBar variant="primary">Primary NavigationBar</NavigationBar>
```

### Different Sizes
```jsx
<NavigationBar size="sm">Small NavigationBar</NavigationBar>
<NavigationBar size="lg">Large NavigationBar</NavigationBar>
```
