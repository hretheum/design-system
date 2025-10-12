# NotificationDrawer

## Description
NotificationDrawer component for the design system.

## Category
overlays-modals

## Usage

```jsx
import { NotificationDrawer } from '@design-system/components';

<NotificationDrawer variant="primary" size="md">
  Your content here
</NotificationDrawer>
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
<NotificationDrawer>Default NotificationDrawer</NotificationDrawer>
```

### With Variant
```jsx
<NotificationDrawer variant="primary">Primary NotificationDrawer</NotificationDrawer>
```

### Different Sizes
```jsx
<NotificationDrawer size="sm">Small NotificationDrawer</NotificationDrawer>
<NotificationDrawer size="lg">Large NotificationDrawer</NotificationDrawer>
```
