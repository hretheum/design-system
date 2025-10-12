# Grid

## Description
Grid component for the design system.

## Category
layout-structure

## Usage

```jsx
import { Grid } from '@design-system/components';

<Grid variant="primary" size="md">
  Your content here
</Grid>
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
<Grid>Default Grid</Grid>
```

### With Variant
```jsx
<Grid variant="primary">Primary Grid</Grid>
```

### Different Sizes
```jsx
<Grid size="sm">Small Grid</Grid>
<Grid size="lg">Large Grid</Grid>
```
