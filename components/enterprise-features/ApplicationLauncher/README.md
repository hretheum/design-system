# ApplicationLauncher

## Description
ApplicationLauncher component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { ApplicationLauncher } from '@design-system/components';

<ApplicationLauncher variant="primary" size="md">
  Your content here
</ApplicationLauncher>
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
<ApplicationLauncher>Default ApplicationLauncher</ApplicationLauncher>
```

### With Variant
```jsx
<ApplicationLauncher variant="primary">Primary ApplicationLauncher</ApplicationLauncher>
```

### Different Sizes
```jsx
<ApplicationLauncher size="sm">Small ApplicationLauncher</ApplicationLauncher>
<ApplicationLauncher size="lg">Large ApplicationLauncher</ApplicationLauncher>
```
