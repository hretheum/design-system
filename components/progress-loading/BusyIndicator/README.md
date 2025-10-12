# BusyIndicator

## Description
BusyIndicator component for the design system.

## Category
progress-loading

## Usage

```jsx
import { BusyIndicator } from '@design-system/components';

<BusyIndicator variant="primary" size="md">
  Your content here
</BusyIndicator>
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
<BusyIndicator>Default BusyIndicator</BusyIndicator>
```

### With Variant
```jsx
<BusyIndicator variant="primary">Primary BusyIndicator</BusyIndicator>
```

### Different Sizes
```jsx
<BusyIndicator size="sm">Small BusyIndicator</BusyIndicator>
<BusyIndicator size="lg">Large BusyIndicator</BusyIndicator>
```
