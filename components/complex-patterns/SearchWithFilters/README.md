# SearchWithFilters

## Description
SearchWithFilters component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { SearchWithFilters } from '@design-system/components';

<SearchWithFilters variant="primary" size="md">
  Your content here
</SearchWithFilters>
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
<SearchWithFilters>Default SearchWithFilters</SearchWithFilters>
```

### With Variant
```jsx
<SearchWithFilters variant="primary">Primary SearchWithFilters</SearchWithFilters>
```

### Different Sizes
```jsx
<SearchWithFilters size="sm">Small SearchWithFilters</SearchWithFilters>
<SearchWithFilters size="lg">Large SearchWithFilters</SearchWithFilters>
```
