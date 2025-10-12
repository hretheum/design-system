# UserProfile

## Description
UserProfile component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { UserProfile } from '@design-system/components';

<UserProfile variant="primary" size="md">
  Your content here
</UserProfile>
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
<UserProfile>Default UserProfile</UserProfile>
```

### With Variant
```jsx
<UserProfile variant="primary">Primary UserProfile</UserProfile>
```

### Different Sizes
```jsx
<UserProfile size="sm">Small UserProfile</UserProfile>
<UserProfile size="lg">Large UserProfile</UserProfile>
```
