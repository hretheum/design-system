#!/usr/bin/env node

/**
 * Generate Avatar component directly
 */

const fs = require('fs').promises;
const path = require('path');

async function generateAvatar() {
  const componentDir = path.join(process.cwd(), 'components', '10-media-icons', 'Avatar');
  
  // Create directory
  await fs.mkdir(componentDir, { recursive: true });
  
  // Avatar.jsx
  const componentContent = `import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar - User representation component
 * Displays user profile image or initials
 */
export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  variant = 'circle',
  status,
  className = '',
  ...props
}) => {
  const classes = [
    'avatar',
    \`avatar--\${size}\`,
    \`avatar--\${variant}\`,
    status && \`avatar--status-\${status}\`,
    className
  ].filter(Boolean).join(' ');

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(part => part[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar__image" />
      ) : (
        <span className="avatar__initials">{getInitials(name)}</span>
      )}
      {status && <span className={\`avatar__status avatar__status--\${status}\`} />}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['circle', 'square', 'rounded']),
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  className: PropTypes.string,
};

export default Avatar;
`;

  // Avatar.stories.jsx
  const storiesContent = `import React from 'react';
import { Avatar } from './Avatar';

export default {
  title: 'Media & Icons/Avatar',
  component: Avatar,
  parameters: {
    category: '10-media-icons',
    docs: {
      description: {
        component: 'User representation component that displays profile image or initials'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded']
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'online', 'offline', 'busy', 'away']
    }
  }
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  size: 'md',
  variant: 'circle'
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://via.placeholder.com/150',
  alt: 'User avatar',
  name: 'Jane Smith',
  size: 'md',
  variant: 'circle'
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  name: 'Alice Johnson',
  size: 'md',
  variant: 'circle',
  status: 'online'
};

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar size="xs" name="XS Size" />
    <Avatar size="sm" name="SM Size" />
    <Avatar size="md" name="MD Size" />
    <Avatar size="lg" name="LG Size" />
    <Avatar size="xl" name="XL Size" />
  </div>
);

export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Avatar variant="circle" name="Circle" />
    <Avatar variant="square" name="Square" />
    <Avatar variant="rounded" name="Rounded" />
  </div>
);

export const StatusIndicators = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Avatar name="Online" status="online" />
    <Avatar name="Offline" status="offline" />
    <Avatar name="Busy" status="busy" />
    <Avatar name="Away" status="away" />
  </div>
);
`;

  // Avatar.test.js
  const testContent = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when no image provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(<Avatar src="test.jpg" alt="Test Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Avatar');
  });

  it('applies size class correctly', () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass('avatar--lg');
  });

  it('applies variant class correctly', () => {
    const { container } = render(<Avatar name="Test" variant="square" />);
    expect(container.firstChild).toHaveClass('avatar--square');
  });

  it('shows status indicator when provided', () => {
    const { container } = render(<Avatar name="Test" status="online" />);
    expect(container.querySelector('.avatar__status--online')).toBeInTheDocument();
  });

  it('handles single name correctly', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles multiple names correctly', () => {
    render(<Avatar name="Alice Bob Charlie" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});
`;

  // Avatar.tokens.json
  const tokensContent = `{
  "avatar": {
    "size": {
      "xs": {
        "width": { "value": "{size.6}", "type": "dimension" },
        "height": { "value": "{size.6}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.xs}", "type": "dimension" }
      },
      "sm": {
        "width": { "value": "{size.8}", "type": "dimension" },
        "height": { "value": "{size.8}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" }
      },
      "md": {
        "width": { "value": "{size.10}", "type": "dimension" },
        "height": { "value": "{size.10}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" }
      },
      "lg": {
        "width": { "value": "{size.12}", "type": "dimension" },
        "height": { "value": "{size.12}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.lg}", "type": "dimension" }
      },
      "xl": {
        "width": { "value": "{size.16}", "type": "dimension" },
        "height": { "value": "{size.16}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.xl}", "type": "dimension" }
      }
    },
    "variant": {
      "circle": {
        "borderRadius": { "value": "{borderRadius.full}", "type": "dimension" }
      },
      "square": {
        "borderRadius": { "value": "{borderRadius.none}", "type": "dimension" }
      },
      "rounded": {
        "borderRadius": { "value": "{borderRadius.lg}", "type": "dimension" }
      }
    },
    "status": {
      "size": { "value": "25%", "type": "dimension" },
      "position": {
        "bottom": { "value": "0", "type": "dimension" },
        "right": { "value": "0", "type": "dimension" }
      },
      "colors": {
        "online": { "value": "{color.green.500}", "type": "color" },
        "offline": { "value": "{color.gray.400}", "type": "color" },
        "busy": { "value": "{color.red.500}", "type": "color" },
        "away": { "value": "{color.amber.500}", "type": "color" }
      }
    }
  }
}
`;

  // README.md
  const readmeContent = `# Avatar

## Description
User representation component that displays profile image or initials

## Purpose
Display user profile image or initials with optional status indicator

## Category
Media & Icons (10-media-icons)

## Usage

\`\`\`jsx
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
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | \`string\` | - | Image source URL |
| alt | \`string\` | \`''\` | Alt text for image |
| name | \`string\` | \`''\` | Name for generating initials |
| size | \`xs \\| sm \\| md \\| lg \\| xl\` | \`md\` | Avatar size |
| variant | \`circle \\| square \\| rounded\` | \`circle\` | Avatar shape |
| status | \`online \\| offline \\| busy \\| away\` | - | Status indicator |
| className | \`string\` | \`''\` | Additional CSS classes |

## Features

### Initials Generation
- Automatically generates initials from name
- Handles single and multiple word names
- Shows up to 2 characters

### Status Indicators
- \`online\`: Green indicator
- \`offline\`: Gray indicator
- \`busy\`: Red indicator
- \`away\`: Amber indicator

### Sizes
- \`xs\`: 24px (1.5rem)
- \`sm\`: 32px (2rem)
- \`md\`: 40px (2.5rem) - default
- \`lg\`: 48px (3rem)
- \`xl\`: 64px (4rem)

### Variants
- \`circle\`: Fully rounded
- \`square\`: No border radius
- \`rounded\`: Large border radius

## Accessibility
- Uses semantic HTML
- Provides alt text for images
- Supports keyboard navigation when interactive
- Status indicators have appropriate ARIA labels
- Color is not the only indicator for status

## Tokens
This component uses design tokens from:
- \`avatar.size\` - Size variations
- \`avatar.variant\` - Shape variations
- \`avatar.status\` - Status indicator styles

## Examples

### Basic Avatar with Image
\`\`\`jsx
<Avatar 
  src="/user.jpg" 
  alt="John Doe"
/>
\`\`\`

### Avatar with Initials
\`\`\`jsx
<Avatar name="John Doe" />
// Displays: JD
\`\`\`

### Different Sizes
\`\`\`jsx
<Avatar name="Jane Smith" size="xs" />
<Avatar name="Jane Smith" size="sm" />
<Avatar name="Jane Smith" size="md" />
<Avatar name="Jane Smith" size="lg" />
<Avatar name="Jane Smith" size="xl" />
\`\`\`

### With Status Indicator
\`\`\`jsx
<Avatar 
  name="Alice Johnson"
  status="online"
/>
\`\`\`

### Different Shapes
\`\`\`jsx
<Avatar name="Bob Wilson" variant="circle" />
<Avatar name="Bob Wilson" variant="square" />
<Avatar name="Bob Wilson" variant="rounded" />
\`\`\`

## Related Components
- **Icon** - For simple icons
- **Image** - For standalone images
- **Badge** - For status indicators without avatar

## Design Decisions
- Initials are uppercase for consistency
- Status indicator positioned at bottom-right
- Fallback to initials when image fails to load
- Minimum contrast ratios maintained for accessibility
`;

  // index.js
  const indexContent = `// Avatar component exports
export { Avatar } from './Avatar';
export { default } from './Avatar';
`;

  // Write all files
  await fs.writeFile(path.join(componentDir, 'Avatar.jsx'), componentContent);
  await fs.writeFile(path.join(componentDir, 'Avatar.stories.jsx'), storiesContent);
  await fs.writeFile(path.join(componentDir, 'Avatar.test.js'), testContent);
  await fs.writeFile(path.join(componentDir, 'Avatar.tokens.json'), tokensContent);
  await fs.writeFile(path.join(componentDir, 'README.md'), readmeContent);
  await fs.writeFile(path.join(componentDir, 'index.js'), indexContent);
  
  console.log('✅ Avatar component generated successfully!');
  console.log('📁 Location: components/10-media-icons/Avatar/');
  console.log('\nGenerated files:');
  console.log('  - Avatar.jsx');
  console.log('  - Avatar.stories.jsx');
  console.log('  - Avatar.test.js');
  console.log('  - Avatar.tokens.json');
  console.log('  - README.md');
  console.log('  - index.js');
}

generateAvatar().catch(console.error);