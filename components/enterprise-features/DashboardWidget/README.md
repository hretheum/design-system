# DashboardWidget

## Description
DashboardWidget component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { DashboardWidget } from '@design-system/components';

<DashboardWidget variant="primary" size="md">
  Your content here
</DashboardWidget>
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
<DashboardWidget>Default DashboardWidget</DashboardWidget>
```

### With Variant
```jsx
<DashboardWidget variant="primary">Primary DashboardWidget</DashboardWidget>
```

### Different Sizes
```jsx
<DashboardWidget size="sm">Small DashboardWidget</DashboardWidget>
<DashboardWidget size="lg">Large DashboardWidget</DashboardWidget>
```
