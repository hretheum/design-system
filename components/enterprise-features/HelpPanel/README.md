# HelpPanel

## Description
HelpPanel component for the design system.

## Category
enterprise-features

## Usage

```jsx
import { HelpPanel } from '@design-system/components';

<HelpPanel variant="primary" size="md">
  Your content here
</HelpPanel>
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
<HelpPanel>Default HelpPanel</HelpPanel>
```

### With Variant
```jsx
<HelpPanel variant="primary">Primary HelpPanel</HelpPanel>
```

### Different Sizes
```jsx
<HelpPanel size="sm">Small HelpPanel</HelpPanel>
<HelpPanel size="lg">Large HelpPanel</HelpPanel>
```
