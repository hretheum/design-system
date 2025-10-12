# NotificationCenter

## Description
NotificationCenter component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { NotificationCenter } from '@design-system/components';

<NotificationCenter variant="primary" size="md">
  Your content here
</NotificationCenter>
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
<NotificationCenter>Default NotificationCenter</NotificationCenter>
```

### With Variant
```jsx
<NotificationCenter variant="primary">Primary NotificationCenter</NotificationCenter>
```

### Different Sizes
```jsx
<NotificationCenter size="sm">Small NotificationCenter</NotificationCenter>
<NotificationCenter size="lg">Large NotificationCenter</NotificationCenter>
```
