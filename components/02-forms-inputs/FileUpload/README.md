# FileUpload

## Description
FileUpload component for the design system.

## Category
02-forms-inputs

## Usage

```jsx
import { FileUpload } from '@design-system/components';

<FileUpload variant="primary" size="md">
  Your content here
</FileUpload>
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
<FileUpload>Default FileUpload</FileUpload>
```

### With Variant
```jsx
<FileUpload variant="primary">Primary FileUpload</FileUpload>
```

### Different Sizes
```jsx
<FileUpload size="sm">Small FileUpload</FileUpload>
<FileUpload size="lg">Large FileUpload</FileUpload>
```
