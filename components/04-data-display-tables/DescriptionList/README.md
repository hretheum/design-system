# DescriptionList

## Description
DescriptionList component for the design system.

## Category
04-data-display-tables

## Usage

```jsx
import { DescriptionList } from '@design-system/components';

<DescriptionList variant="primary" size="md">
  Your content here
</DescriptionList>
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
<DescriptionList>Default DescriptionList</DescriptionList>
```

### With Variant
```jsx
<DescriptionList variant="primary">Primary DescriptionList</DescriptionList>
```

### Different Sizes
```jsx
<DescriptionList size="sm">Small DescriptionList</DescriptionList>
<DescriptionList size="lg">Large DescriptionList</DescriptionList>
```
