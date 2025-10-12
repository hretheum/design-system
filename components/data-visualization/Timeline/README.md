# Timeline

## Description
Timeline component for the design system.

## Category
data-visualization

## Usage

```jsx
import { Timeline } from '@design-system/components';

<Timeline variant="primary" size="md">
  Your content here
</Timeline>
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
<Timeline>Default Timeline</Timeline>
```

### With Variant
```jsx
<Timeline variant="primary">Primary Timeline</Timeline>
```

### Different Sizes
```jsx
<Timeline size="sm">Small Timeline</Timeline>
<Timeline size="lg">Large Timeline</Timeline>
```
