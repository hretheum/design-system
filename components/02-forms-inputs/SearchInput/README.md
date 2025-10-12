# SearchInput

## Description
SearchInput component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { SearchInput } from '@design-system/components';

<SearchInput variant="primary" size="md">
  Your content here
</SearchInput>
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
<SearchInput>Default SearchInput</SearchInput>
```

### With Variant
```jsx
<SearchInput variant="primary">Primary SearchInput</SearchInput>
```

### Different Sizes
```jsx
<SearchInput size="sm">Small SearchInput</SearchInput>
<SearchInput size="lg">Large SearchInput</SearchInput>
```
