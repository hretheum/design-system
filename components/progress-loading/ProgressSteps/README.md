# ProgressSteps

## Description
ProgressSteps component for the design system.

## Category
progress-loading

## Usage

```jsx
import { ProgressSteps } from '@design-system/components';

<ProgressSteps variant="primary" size="md">
  Your content here
</ProgressSteps>
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
<ProgressSteps>Default ProgressSteps</ProgressSteps>
```

### With Variant
```jsx
<ProgressSteps variant="primary">Primary ProgressSteps</ProgressSteps>
```

### Different Sizes
```jsx
<ProgressSteps size="sm">Small ProgressSteps</ProgressSteps>
<ProgressSteps size="lg">Large ProgressSteps</ProgressSteps>
```
