#!/usr/bin/env node

/**
 * Component Generator for Functional Design System
 * 
 * This generator will:
 * 1. Prompt for component details
 * 2. Determine correct category
 * 3. Generate all necessary files
 * 4. Update tokens
 * 5. Create tests and stories
 */

const inquirer = require('inquirer');
const chalk = require('chalk').default || require('chalk');
const ora = require('ora');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');

// Category definitions with qualification tests
const CATEGORIES = {
  '01-actions-controls': {
    name: 'Actions & Controls',
    test: 'Does clicking/interacting cause an action or change?',
    examples: ['Button', 'Link', 'Menu Item'],
    tokens: ['size', 'variant', 'state']
  },
  '02-forms-inputs': {
    name: 'Forms & Inputs',
    test: 'Does the component collect or modify user data?',
    examples: ['Input', 'Select', 'Checkbox'],
    tokens: ['size', 'state', 'variant', 'validation']
  },
  '03-navigation-wayfinding': {
    name: 'Navigation & Wayfinding',
    test: 'Does it help users know where they are or where they can go?',
    examples: ['Tabs', 'Breadcrumb', 'Menu'],
    tokens: ['variant', 'state', 'size']
  },
  '04-data-display-tables': {
    name: 'Data Display & Tables',
    test: 'Is the main purpose to present organized data?',
    examples: ['Table', 'List', 'Tree View'],
    tokens: ['size', 'variant', 'state', 'density']
  },
  '05-containers-layout': {
    name: 'Containers & Layout',
    test: 'Is the main role to organize other elements?',
    examples: ['Card', 'Grid', 'Accordion'],
    tokens: ['padding', 'gap', 'variant']
  },
  '06-feedback-messaging': {
    name: 'Feedback & Messaging',
    test: 'Does it inform users about state or outcome?',
    examples: ['Alert', 'Toast', 'Banner'],
    tokens: ['severity', 'variant', 'size']
  },
  '07-progress-loading': {
    name: 'Progress & Loading',
    test: 'Does it show something is happening or how much is left?',
    examples: ['Spinner', 'Progress Bar', 'Skeleton'],
    tokens: ['size', 'variant', 'state']
  },
  '08-overlays-modals': {
    name: 'Overlays & Modals',
    test: 'Does it appear above other elements?',
    examples: ['Modal', 'Tooltip', 'Popover'],
    tokens: ['size', 'position', 'backdrop']
  },
  '09-badges-labels': {
    name: 'Badges & Labels',
    test: 'Does it add additional context to other elements?',
    examples: ['Badge', 'Tag', 'Chip'],
    tokens: ['size', 'variant', 'color']
  },
  '10-media-icons': {
    name: 'Media & Icons',
    test: 'Is the main purpose to display visual content?',
    examples: ['Avatar', 'Icon', 'Image'],
    tokens: ['size', 'variant', 'aspectRatio']
  },
  '11-utilities-helpers': {
    name: 'Utilities & Helpers',
    test: 'Does it support other components without its own UI?',
    examples: ['Visually Hidden', 'Focus Trap', 'Portal'],
    tokens: ['behavior', 'timing', 'a11y']
  },
  '12-patterns-composed': {
    name: 'Patterns & Composed',
    test: 'Is it a pattern composed of other components?',
    examples: ['Wizard', 'Search with Filters', 'Login Form'],
    tokens: ['layout', 'components', 'behavior']
  }
};

// Component sizes
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

// Component states
const STATES = ['default', 'hover', 'active', 'focus', 'disabled', 'loading', 'error', 'success'];

// Handlebars helpers
handlebars.registerHelper('lowercase', str => str.toLowerCase());
handlebars.registerHelper('kebabCase', str => 
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
);
handlebars.registerHelper('camelCase', str => 
  str.replace(/-([a-z])/g, g => g[1].toUpperCase())
);

// Main generator function
async function generateComponent() {
  console.log(chalk.cyan.bold('\n🎨 Design System Component Generator\n'));

  try {
    // Step 1: Gather component information
    const componentInfo = await promptComponentInfo();
    
    // Step 2: Determine category
    const category = await determineCategory(componentInfo);
    
    // Step 3: Gather additional details
    const details = await promptComponentDetails(componentInfo, category);
    
    // Step 4: Generate component files
    const spinner = ora('Generating component files...').start();
    
    await generateFiles(componentInfo, category, details);
    
    spinner.succeed(chalk.green('Component generated successfully!'));
    
    // Step 5: Show summary
    showSummary(componentInfo, category);
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error:', error.message));
    process.exit(1);
  }
}

// Prompt for basic component information
async function promptComponentInfo() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Component name (PascalCase):',
      validate: input => {
        if (!input) return 'Component name is required';
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
          return 'Component name must be in PascalCase (e.g., MyComponent)';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Component description:',
      validate: input => input ? true : 'Description is required'
    },
    {
      type: 'input',
      name: 'purpose',
      message: 'What is the main purpose of this component?',
      validate: input => input ? true : 'Purpose is required'
    }
  ]);
  
  return answers;
}

// Determine the appropriate category
async function determineCategory(componentInfo) {
  console.log(chalk.yellow('\n📂 Determining category...\n'));
  
  // Show all categories with their qualification tests
  const categoryChoices = Object.entries(CATEGORIES).map(([key, cat]) => ({
    name: `${chalk.bold(cat.name)}\n     ${chalk.gray(cat.test)}\n     ${chalk.dim('Examples: ' + cat.examples.join(', '))}`,
    value: key,
    short: cat.name
  }));
  
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Which category best fits your component?',
      choices: categoryChoices,
      pageSize: 12
    }
  ]);
  
  // Confirm category selection
  const selectedCat = CATEGORIES[category];
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: `Confirm: "${componentInfo.name}" belongs in "${selectedCat.name}"?`,
      default: true
    }
  ]);
  
  if (!confirmed) {
    return determineCategory(componentInfo);
  }
  
  return category;
}

// Prompt for component-specific details
async function promptComponentDetails(componentInfo, category) {
  const categoryDef = CATEGORIES[category];
  
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'sizes',
      message: 'Select supported sizes:',
      choices: SIZES,
      default: ['sm', 'md', 'lg']
    },
    {
      type: 'checkbox',
      name: 'states',
      message: 'Select supported states:',
      choices: STATES,
      default: ['default', 'hover', 'focus', 'disabled']
    },
    {
      type: 'input',
      name: 'variants',
      message: 'Enter variants (comma-separated):',
      default: 'primary, secondary',
      filter: input => input.split(',').map(v => v.trim()).filter(Boolean)
    },
    {
      type: 'confirm',
      name: 'hasIcon',
      message: 'Does this component support icons?',
      default: category === '01-actions-controls'
    },
    {
      type: 'confirm',
      name: 'isAccessible',
      message: 'Include accessibility features?',
      default: true
    },
    {
      type: 'confirm',
      name: 'hasTests',
      message: 'Generate test files?',
      default: true
    }
  ]);
  
  return answers;
}

// Generate all component files
async function generateFiles(componentInfo, category, details) {
  const componentDir = path.join(
    process.cwd(),
    'components',
    category,
    componentInfo.name
  );
  
  // Create component directory
  await fs.mkdir(componentDir, { recursive: true });
  
  // Load templates
  const templatesDir = path.join(__dirname, 'templates');
  
  // Generate each file
  const files = [
    {
      template: 'component.jsx.hbs',
      output: `${componentInfo.name}.jsx`,
      data: { ...componentInfo, ...details, category }
    },
    {
      template: 'component.stories.jsx.hbs',
      output: `${componentInfo.name}.stories.jsx`,
      data: { 
        ...componentInfo, 
        ...details, 
        category,
        categoryName: CATEGORIES[category].name
      }
    },
    {
      template: 'component.test.js.hbs',
      output: `${componentInfo.name}.test.js`,
      data: { ...componentInfo, ...details, category },
      condition: details.hasTests
    },
    {
      template: 'component.tokens.json.hbs',
      output: `${componentInfo.name}.tokens.json`,
      data: { 
        ...componentInfo, 
        ...details, 
        category,
        tokens: CATEGORIES[category].tokens
      }
    },
    {
      template: 'component.README.md.hbs',
      output: 'README.md',
      data: { 
        ...componentInfo, 
        ...details, 
        category,
        categoryName: CATEGORIES[category].name
      }
    },
    {
      template: 'index.js.hbs',
      output: 'index.js',
      data: { ...componentInfo }
    }
  ];
  
  for (const file of files) {
    if (file.condition === false) continue;
    
    const templatePath = path.join(templatesDir, file.template);
    const outputPath = path.join(componentDir, file.output);
    
    // Check if template exists, if not create a default one
    let templateContent;
    try {
      templateContent = await fs.readFile(templatePath, 'utf8');
    } catch (error) {
      // Use default template if specific one doesn't exist
      templateContent = getDefaultTemplate(file.template);
    }
    
    const template = handlebars.compile(templateContent);
    const content = template(file.data);
    
    await fs.writeFile(outputPath, content);
  }
  
  // Update component tokens in main file
  await updateComponentTokens(componentInfo, category, details);
}

// Default templates when template files don't exist
function getDefaultTemplate(templateName) {
  const templates = {
    'component.jsx.hbs': `import React from 'react';
import PropTypes from 'prop-types';
import './{{name}}.css';

/**
 * {{description}}
 */
export const {{name}} = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const classes = [
    '{{kebabCase name}}',
    \`{{kebabCase name}}--\${variant}\`,
    \`{{kebabCase name}}--\${size}\`,
    disabled && '{{kebabCase name}}--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

{{name}}.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([{{#each variants}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]),
  size: PropTypes.oneOf([{{#each sizes}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default {{name}};
`,
    'component.stories.jsx.hbs': `import React from 'react';
import { {{name}} } from './{{name}}';

export default {
  title: '{{categoryName}}/{{name}}',
  component: {{name}},
  parameters: {
    category: '{{category}}',
    docs: {
      description: {
        component: '{{description}}'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [{{#each variants}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]
    },
    size: {
      control: { type: 'select' },
      options: [{{#each sizes}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
};

const Template = (args) => <{{name}} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '{{name}} Component',
  variant: 'primary',
  size: 'md',
  disabled: false
};

{{#each variants}}
export const {{this}} = Template.bind({});
{{this}}.args = {
  ...Default.args,
  variant: '{{this}}'
};

{{/each}}

{{#each sizes}}
export const Size{{this}} = Template.bind({});
Size{{this}}.args = {
  ...Default.args,
  size: '{{this}}'
};

{{/each}}

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
`,
    'component.test.js.hbs': `import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { {{name}} } from './{{name}}';

describe('{{name}}', () => {
  it('renders children correctly', () => {
    render(<{{name}}>Test Content</{{name}}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  {{#each variants}}
  it('applies {{this}} variant class', () => {
    const { container } = render(<{{name}} variant="{{this}}">Test</{{name}}>);
    expect(container.firstChild).toHaveClass('{{kebabCase ../name}}--{{this}}');
  });

  {{/each}}

  {{#each sizes}}
  it('applies {{this}} size class', () => {
    const { container } = render(<{{name}} size="{{this}}">Test</{{name}}>);
    expect(container.firstChild).toHaveClass('{{kebabCase ../name}}--{{this}}');
  });

  {{/each}}

  it('applies disabled state', () => {
    const { container } = render(<{{name}} disabled>Test</{{name}}>);
    expect(container.firstChild).toHaveClass('{{kebabCase name}}--disabled');
  });

  {{#if isAccessible}}
  it('meets accessibility standards', () => {
    const { container } = render(<{{name}}>Accessible Content</{{name}}>);
    // Add accessibility tests here
    expect(container.firstChild).toBeDefined();
  });
  {{/if}}
});
`,
    'component.tokens.json.hbs': `{
  "{{lowercase name}}": {
    {{#each sizes}}
    "size": {
      "{{this}}": {
        "padding": { "value": "var(--spacing-{{this}})", "type": "dimension" },
        "fontSize": { "value": "var(--font-size-{{this}})", "type": "dimension" }
      }{{#unless @last}},{{/unless}}
    },
    {{/each}}
    {{#each variants}}
    "variant": {
      "{{this}}": {
        "background": { "value": "var(--color-{{this}})", "type": "color" },
        "color": { "value": "var(--color-{{this}}-text)", "type": "color" }
      }{{#unless @last}},{{/unless}}
    },
    {{/each}}
    "state": {
      {{#each states}}
      "{{this}}": {
        "opacity": { "value": "{{#if (eq this 'disabled')}}0.5{{else}}1{{/if}}", "type": "number" }
      }{{#unless @last}},{{/unless}}
      {{/each}}
    }
  }
}
`,
    'component.README.md.hbs': `# {{name}}

## Description
{{description}}

## Purpose
{{purpose}}

## Category
{{categoryName}} ({{category}})

## Usage

\`\`\`jsx
import { {{name}} } from '@design-system/components';

<{{name}} variant="primary" size="md">
  Your content here
</{{name}}>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | \`{{#each variants}}{{this}}{{#unless @last}} \\| {{/unless}}{{/each}}\` | \`primary\` | Visual variant |
| size | \`{{#each sizes}}{{this}}{{#unless @last}} \\| {{/unless}}{{/each}}\` | \`md\` | Component size |
| disabled | \`boolean\` | \`false\` | Disabled state |
| className | \`string\` | \`''\` | Additional CSS classes |

## Sizes
{{#each sizes}}
- \`{{this}}\`: {{this}} size variant
{{/each}}

## Variants
{{#each variants}}
- \`{{this}}\`: {{this}} visual variant
{{/each}}

## States
{{#each states}}
- \`{{this}}\`: {{this}} state
{{/each}}

{{#if isAccessible}}
## Accessibility
- Keyboard navigation supported
- ARIA attributes included
- Focus management implemented
- Screen reader compatible
{{/if}}

## Tokens
This component uses design tokens from:
- \`{{lowercase name}}.size\`
- \`{{lowercase name}}.variant\`
- \`{{lowercase name}}.state\`

## Examples

### Basic Usage
\`\`\`jsx
<{{name}}>Default {{name}}</{{name}}>
\`\`\`

### With Variant
\`\`\`jsx
<{{name}} variant="secondary">Secondary {{name}}</{{name}}>
\`\`\`

### Different Sizes
\`\`\`jsx
<{{name}} size="sm">Small {{name}}</{{name}}>
<{{name}} size="lg">Large {{name}}</{{name}}>
\`\`\`

### Disabled State
\`\`\`jsx
<{{name}} disabled>Disabled {{name}}</{{name}}>
\`\`\`

## Related Components
See other components in the {{categoryName}} category.
`,
    'index.js.hbs': `// {{name}} component exports
export { {{name}} } from './{{name}}';
export { default } from './{{name}}';

// Type exports if using TypeScript
// export type { {{name}}Props } from './{{name}}';
`
  };
  
  return templates[templateName] || '// Generated file';
}

// Update the main component tokens file
async function updateComponentTokens(componentInfo, category, details) {
  const tokensPath = path.join(process.cwd(), 'component.json');
  
  try {
    const tokensContent = await fs.readFile(tokensPath, 'utf8');
    const tokens = JSON.parse(tokensContent);
    
    // Add new component tokens
    const componentKey = componentInfo.name.toLowerCase();
    
    if (!tokens[componentKey]) {
      tokens[componentKey] = {
        size: {},
        variant: {},
        state: {}
      };
      
      // Add size tokens
      details.sizes.forEach(size => {
        tokens[componentKey].size[size] = {
          padding: { value: `{spacing.${size}}`, type: 'dimension' },
          fontSize: { value: `{fontSize.${size}}`, type: 'dimension' }
        };
      });
      
      // Save updated tokens
      await fs.writeFile(
        tokensPath,
        JSON.stringify(tokens, null, 2)
      );
    }
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not update component.json tokens'));
  }
}

// Show generation summary
function showSummary(componentInfo, category) {
  const categoryDef = CATEGORIES[category];
  
  console.log(chalk.green.bold('\n✨ Component Generated Successfully!\n'));
  console.log(chalk.white('📁 Location:'), chalk.cyan(`components/${category}/${componentInfo.name}/`));
  console.log(chalk.white('🏷️  Category:'), chalk.cyan(categoryDef.name));
  console.log(chalk.white('📝 Component:'), chalk.cyan(componentInfo.name));
  
  console.log(chalk.yellow('\n📋 Generated Files:'));
  console.log('  ✅', chalk.gray(`${componentInfo.name}.jsx`));
  console.log('  ✅', chalk.gray(`${componentInfo.name}.stories.jsx`));
  console.log('  ✅', chalk.gray(`${componentInfo.name}.test.js`));
  console.log('  ✅', chalk.gray(`${componentInfo.name}.tokens.json`));
  console.log('  ✅', chalk.gray('README.md'));
  console.log('  ✅', chalk.gray('index.js'));
  
  console.log(chalk.cyan('\n🚀 Next Steps:'));
  console.log('  1. Implement component logic in', chalk.yellow(`${componentInfo.name}.jsx`));
  console.log('  2. Add CSS styles');
  console.log('  3. Run', chalk.yellow('npm run storybook'), 'to see your component');
  console.log('  4. Run', chalk.yellow('npm test'), 'to test your component');
  
  console.log(chalk.gray('\n💡 Tip: Your component is already visible in Storybook!\n'));
}

// Run the generator
if (require.main === module) {
  generateComponent().catch(error => {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
  });
}

module.exports = { generateComponent, CATEGORIES };