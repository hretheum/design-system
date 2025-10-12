# Avatar

## Description
Avatar component for the design system.

## Category
media-icons

## Usage

```jsx
import { Avatar } from '@design-system/components';

<Avatar variant="primary" size="md">
  Your content here
</Avatar>
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
<Avatar>Default Avatar</Avatar>
```

### With Variant
```jsx
<Avatar variant="primary">Primary Avatar</Avatar>
```

### Different Sizes
```jsx
<Avatar size="sm">Small Avatar</Avatar>
<Avatar size="lg">Large Avatar</Avatar>
```
