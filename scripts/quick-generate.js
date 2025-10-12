#!/usr/bin/env node

/**
 * Quick component generator
 * Usage: npm run generate:quick -- ComponentName category
 * Example: npm run generate:quick -- Icon 10-media-icons
 */

const fs = require('fs').promises;
const path = require('path');

const CATEGORY_MAP = {
  'actions': '01-actions-controls',
  'forms': '02-forms-inputs',
  'navigation': '03-navigation-wayfinding',
  'data': '04-data-display-tables',
  'containers': '05-containers-layout',
  'feedback': '06-feedback-messaging',
  'progress': '07-progress-loading',
  'overlays': '08-overlays-modals',
  'badges': '09-badges-labels',
  'media': '10-media-icons',
  'utilities': '11-utilities-helpers',
  'patterns': '12-patterns-composed'
};

async function quickGenerate(componentName, categoryInput) {
  if (!componentName || !categoryInput) {
    console.log('Usage: npm run generate:quick -- ComponentName category');
    console.log('Example: npm run generate:quick -- Icon media');
    console.log('\nCategories:', Object.keys(CATEGORY_MAP).join(', '));
    process.exit(1);
  }
  
  // Resolve category
  const category = CATEGORY_MAP[categoryInput] || categoryInput;
  
  const componentDir = path.join(process.cwd(), 'components', category, componentName);
  
  // Create directory
  await fs.mkdir(componentDir, { recursive: true });
  
  // Component file
  const componentContent = `import React from 'react';
import PropTypes from 'prop-types';

/**
 * ${componentName} Component
 */
export const ${componentName} = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    '${componentName.toLowerCase()}',
    \`${componentName.toLowerCase()}--\${variant}\`,
    \`${componentName.toLowerCase()}--\${size}\`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

${componentName}.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ${componentName};
`;

  // Stories file
  const storiesContent = `import React from 'react';
import { ${componentName} } from './${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    category: '${category}',
  },
};

const Template = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '${componentName} Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: '${componentName} Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: '${componentName} Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ${componentName}',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ${componentName}',
  size: 'lg',
};
`;

  // Test file
  const testContent = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<${componentName} variant="primary">Test</${componentName}>);
    expect(container.firstChild).toHaveClass('${componentName.toLowerCase()}--primary');
  });

  it('applies size class', () => {
    const { container } = render(<${componentName} size="lg">Test</${componentName}>);
    expect(container.firstChild).toHaveClass('${componentName.toLowerCase()}--lg');
  });
});
`;

  // README file
  const readmeContent = `# ${componentName}

## Description
${componentName} component for the design system.

## Category
${category}

## Usage

\`\`\`jsx
import { ${componentName} } from '@design-system/components';

<${componentName} variant="primary" size="md">
  Your content here
</${componentName}>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | \`default \\| primary \\| secondary\` | \`default\` | Visual variant |
| size | \`sm \\| md \\| lg\` | \`md\` | Component size |
| className | \`string\` | \`''\` | Additional CSS classes |

## Examples

### Basic Usage
\`\`\`jsx
<${componentName}>Default ${componentName}</${componentName}>
\`\`\`

### With Variant
\`\`\`jsx
<${componentName} variant="primary">Primary ${componentName}</${componentName}>
\`\`\`

### Different Sizes
\`\`\`jsx
<${componentName} size="sm">Small ${componentName}</${componentName}>
<${componentName} size="lg">Large ${componentName}</${componentName}>
\`\`\`
`;

  // Index file
  const indexContent = `export { ${componentName} } from './${componentName}';
export { default } from './${componentName}';
`;

  // Tokens file
  const tokensContent = `{
  "${componentName.toLowerCase()}": {
    "size": {
      "sm": {
        "padding": { "value": "{spacing.2}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" }
      },
      "md": {
        "padding": { "value": "{spacing.3}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" }
      },
      "lg": {
        "padding": { "value": "{spacing.4}", "type": "dimension" },
        "fontSize": { "value": "{fontSize.lg}", "type": "dimension" }
      }
    },
    "variant": {
      "default": {
        "background": { "value": "{color.gray.100}", "type": "color" },
        "color": { "value": "{color.gray.900}", "type": "color" }
      },
      "primary": {
        "background": { "value": "{brand.primary}", "type": "color" },
        "color": { "value": "{color.white}", "type": "color" }
      },
      "secondary": {
        "background": { "value": "{brand.secondary}", "type": "color" },
        "color": { "value": "{color.white}", "type": "color" }
      }
    }
  }
}
`;

  // Write all files
  await fs.writeFile(path.join(componentDir, `${componentName}.jsx`), componentContent);
  await fs.writeFile(path.join(componentDir, `${componentName}.stories.jsx`), storiesContent);
  await fs.writeFile(path.join(componentDir, `${componentName}.test.js`), testContent);
  await fs.writeFile(path.join(componentDir, `${componentName}.tokens.json`), tokensContent);
  await fs.writeFile(path.join(componentDir, 'README.md'), readmeContent);
  await fs.writeFile(path.join(componentDir, 'index.js'), indexContent);
  
  console.log(`✅ ${componentName} component generated successfully!`);
  console.log(`📁 Location: components/${category}/${componentName}/`);
  console.log('\nGenerated files:');
  console.log(`  - ${componentName}.jsx`);
  console.log(`  - ${componentName}.stories.jsx`);
  console.log(`  - ${componentName}.test.js`);
  console.log(`  - ${componentName}.tokens.json`);
  console.log('  - README.md');
  console.log('  - index.js');
  console.log('\n🚀 Next steps:');
  console.log('  1. Run: npm run storybook');
  console.log(`  2. Navigate to: Components/${componentName}`);
  console.log('  3. Customize the component as needed');
}

// Get arguments
const args = process.argv.slice(2);
quickGenerate(args[0], args[1]).catch(console.error);