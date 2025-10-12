# FocusTrap

## Description
FocusTrap component for the design system.

## Category
11-utilities-helpers

## Usage

```jsx
import { FocusTrap } from '@design-system/components';

<FocusTrap variant="primary" size="md">
  Your content here
</FocusTrap>
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
<FocusTrap>Default FocusTrap</FocusTrap>
```

### With Variant
```jsx
<FocusTrap variant="primary">Primary FocusTrap</FocusTrap>
```

### Different Sizes
```jsx
<FocusTrap size="sm">Small FocusTrap</FocusTrap>
<FocusTrap size="lg">Large FocusTrap</FocusTrap>
```
