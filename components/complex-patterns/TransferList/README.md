# TransferList

## Description
TransferList component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { TransferList } from '@design-system/components';

<TransferList variant="primary" size="md">
  Your content here
</TransferList>
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
<TransferList>Default TransferList</TransferList>
```

### With Variant
```jsx
<TransferList variant="primary">Primary TransferList</TransferList>
```

### Different Sizes
```jsx
<TransferList size="sm">Small TransferList</TransferList>
<TransferList size="lg">Large TransferList</TransferList>
```
