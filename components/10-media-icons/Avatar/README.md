# Avatar

## Description
User representation component that displays profile image or initials

## Purpose
Display user profile image or initials with optional status indicator

## Category
Media & Icons (10-media-icons)

## Usage

```jsx
import { Avatar } from '@design-system/components';

// With image
<Avatar 
  src="/path/to/image.jpg" 
  alt="User name"
  size="md"
/>

// With initials
<Avatar 
  name="John Doe"
  size="md"
/>

// With status
<Avatar 
  name="Jane Smith"
  status="online"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | `string` | - | Image source URL |
| alt | `string` | `''` | Alt text for image |
| name | `string` | `''` | Name for generating initials |
| size | `xs \| sm \| md \| lg \| xl` | `md` | Avatar size |
| variant | `circle \| square \| rounded` | `circle` | Avatar shape |
| status | `online \| offline \| busy \| away` | - | Status indicator |
| className | `string` | `''` | Additional CSS classes |

## Features

### Initials Generation
- Automatically generates initials from name
- Handles single and multiple word names
- Shows up to 2 characters

### Status Indicators
- `online`: Green indicator
- `offline`: Gray indicator
- `busy`: Red indicator
- `away`: Amber indicator

### Sizes
- `xs`: 24px (1.5rem)
- `sm`: 32px (2rem)
- `md`: 40px (2.5rem) - default
- `lg`: 48px (3rem)
- `xl`: 64px (4rem)

### Variants
- `circle`: Fully rounded
- `square`: No border radius
- `rounded`: Large border radius

## Accessibility
- Uses semantic HTML
- Provides alt text for images
- Supports keyboard navigation when interactive
- Status indicators have appropriate ARIA labels
- Color is not the only indicator for status

## Tokens
This component uses design tokens from:
- `avatar.size` - Size variations
- `avatar.variant` - Shape variations
- `avatar.status` - Status indicator styles

## Examples

### Basic Avatar with Image
```jsx
<Avatar 
  src="/user.jpg" 
  alt="John Doe"
/>
```

### Avatar with Initials
```jsx
<Avatar name="John Doe" />
// Displays: JD
```

### Different Sizes
```jsx
<Avatar name="Jane Smith" size="xs" />
<Avatar name="Jane Smith" size="sm" />
<Avatar name="Jane Smith" size="md" />
<Avatar name="Jane Smith" size="lg" />
<Avatar name="Jane Smith" size="xl" />
```

### With Status Indicator
```jsx
<Avatar 
  name="Alice Johnson"
  status="online"
/>
```

### Different Shapes
```jsx
<Avatar name="Bob Wilson" variant="circle" />
<Avatar name="Bob Wilson" variant="square" />
<Avatar name="Bob Wilson" variant="rounded" />
```

## Related Components
- **Icon** - For simple icons
- **Image** - For standalone images
- **Badge** - For status indicators without avatar

## Design Decisions
- Initials are uppercase for consistency
- Status indicator positioned at bottom-right
- Fallback to initials when image fails to load
- Minimum contrast ratios maintained for accessibility
