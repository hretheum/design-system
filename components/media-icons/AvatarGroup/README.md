# AvatarGroup

## Description
AvatarGroup component for the design system.

## Category
media-icons

## Usage

```jsx
import { AvatarGroup } from '@design-system/components';

<AvatarGroup variant="primary" size="md">
  Your content here
</AvatarGroup>
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
<AvatarGroup>Default AvatarGroup</AvatarGroup>
```

### With Variant
```jsx
<AvatarGroup variant="primary">Primary AvatarGroup</AvatarGroup>
```

### Different Sizes
```jsx
<AvatarGroup size="sm">Small AvatarGroup</AvatarGroup>
<AvatarGroup size="lg">Large AvatarGroup</AvatarGroup>
```
