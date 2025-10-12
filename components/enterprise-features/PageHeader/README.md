# PageHeader

## Description
PageHeader component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { PageHeader } from '@design-system/components';

<PageHeader variant="primary" size="md">
  Your content here
</PageHeader>
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
<PageHeader>Default PageHeader</PageHeader>
```

### With Variant
```jsx
<PageHeader variant="primary">Primary PageHeader</PageHeader>
```

### Different Sizes
```jsx
<PageHeader size="sm">Small PageHeader</PageHeader>
<PageHeader size="lg">Large PageHeader</PageHeader>
```
