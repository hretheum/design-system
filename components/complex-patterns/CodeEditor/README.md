# CodeEditor

## Description
CodeEditor component for the design system.

## Category
complex-patterns

## Usage

```jsx
import { CodeEditor } from '@design-system/components';

<CodeEditor variant="primary" size="md">
  Your content here
</CodeEditor>
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
<CodeEditor>Default CodeEditor</CodeEditor>
```

### With Variant
```jsx
<CodeEditor variant="primary">Primary CodeEditor</CodeEditor>
```

### Different Sizes
```jsx
<CodeEditor size="sm">Small CodeEditor</CodeEditor>
<CodeEditor size="lg">Large CodeEditor</CodeEditor>
```
