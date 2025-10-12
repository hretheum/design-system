# LoginPage

## Description
LoginPage component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { LoginPage } from '@design-system/components';

<LoginPage variant="primary" size="md">
  Your content here
</LoginPage>
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
<LoginPage>Default LoginPage</LoginPage>
```

### With Variant
```jsx
<LoginPage variant="primary">Primary LoginPage</LoginPage>
```

### Different Sizes
```jsx
<LoginPage size="sm">Small LoginPage</LoginPage>
<LoginPage size="lg">Large LoginPage</LoginPage>
```
