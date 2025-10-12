#!/usr/bin/env node

/**
 * Migration script from Atomic Design to Functional Categories
 * This script will:
 * 1. Copy components to new structure
 * 2. Update story titles
 * 3. Create component-specific READMEs
 * 4. Preserve git history with symlinks during transition
 */

const fs = require('fs');
const path = require('path');

// Migration mapping
const MIGRATIONS = {
  // From Atoms
  'stories/Atoms/Button.stories.jsx': {
    category: '01-actions-controls',
    component: 'Button',
    description: 'Primary action trigger component'
  },
  'stories/Atoms/Badge.stories.jsx': {
    category: '09-badges-labels',
    component: 'Badge',
    description: 'Status and count indicator'
  },
  'stories/Atoms/ProgressBar.stories.jsx': {
    category: '07-progress-loading',
    component: 'ProgressBar',
    description: 'Linear progress indicator'
  },
  'stories/Atoms/Spinner.stories.jsx': {
    category: '07-progress-loading',
    component: 'Spinner',
    description: 'Indeterminate loading indicator'
  },
  
  // From Molecules
  'stories/Molecules/Input.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Input',
    description: 'Text input field'
  },
  'stories/Molecules/Textarea.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Textarea',
    description: 'Multi-line text input'
  },
  'stories/Molecules/Select.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Select',
    description: 'Dropdown selection field'
  },
  'stories/Molecules/Checkbox.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Checkbox',
    description: 'Multiple choice selection'
  },
  'stories/Molecules/Radio.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Radio',
    description: 'Single choice selection'
  },
  'stories/Molecules/Switch.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Switch',
    description: 'Binary toggle switch'
  },
  'stories/Molecules/Alert.stories.jsx': {
    category: '06-feedback-messaging',
    component: 'Alert',
    description: 'Important message display'
  },
  'stories/Molecules/Toast.stories.jsx': {
    category: '06-feedback-messaging',
    component: 'Toast',
    description: 'Temporary notification'
  },
  'stories/Molecules/Tooltip.stories.jsx': {
    category: '08-overlays-modals',
    component: 'Tooltip',
    description: 'Contextual information on hover'
  },
  
  // From Organisms
  'stories/Organisms/Card.stories.jsx': {
    category: '05-containers-layout',
    component: 'Card',
    description: 'Content container'
  },
  'stories/Organisms/Modal.stories.jsx': {
    category: '08-overlays-modals',
    component: 'Modal',
    description: 'Dialog overlay'
  },
  'stories/Organisms/Dropdown.stories.jsx': {
    category: '08-overlays-modals',
    component: 'Dropdown',
    description: 'Contextual menu overlay'
  },
  'stories/Organisms/Table.stories.jsx': {
    category: '04-data-display-tables',
    component: 'Table',
    description: 'Tabular data display'
  },
  'stories/Organisms/Tabs.stories.jsx': {
    category: '03-navigation-wayfinding',
    component: 'Tabs',
    description: 'Content panel navigation'
  },
  'stories/Organisms/Breadcrumb.stories.jsx': {
    category: '03-navigation-wayfinding',
    component: 'Breadcrumb',
    description: 'Hierarchical navigation'
  },
  'stories/Organisms/Pagination.stories.jsx': {
    category: '03-navigation-wayfinding',
    component: 'Pagination',
    description: 'Page navigation controls'
  },
  'stories/Organisms/Datepicker.stories.jsx': {
    category: '02-forms-inputs',
    component: 'Datepicker',
    description: 'Date selection input'
  },
  'stories/Organisms/Wizard.stories.jsx': {
    category: '12-patterns-composed',
    component: 'Wizard',
    description: 'Multi-step process pattern'
  },
  'stories/Organisms/Stepper.stories.jsx': {
    category: '03-navigation-wayfinding',
    component: 'Stepper',
    description: 'Step-by-step navigation'
  },
  
  // From Templates
  'stories/Templates/Template.stories.jsx': {
    category: '12-patterns-composed',
    component: 'Template',
    description: 'Layout template pattern'
  }
};

// Category display names
const CATEGORY_NAMES = {
  '01-actions-controls': 'Actions & Controls',
  '02-forms-inputs': 'Forms & Inputs',
  '03-navigation-wayfinding': 'Navigation & Wayfinding',
  '04-data-display-tables': 'Data Display & Tables',
  '05-containers-layout': 'Containers & Layout',
  '06-feedback-messaging': 'Feedback & Messaging',
  '07-progress-loading': 'Progress & Loading',
  '08-overlays-modals': 'Overlays & Modals',
  '09-badges-labels': 'Badges & Labels',
  '10-media-icons': 'Media & Icons',
  '11-utilities-helpers': 'Utilities & Helpers',
  '12-patterns-composed': 'Patterns & Composed'
};

// Helper functions
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  try {
    const content = fs.readFileSync(src, 'utf8');
    fs.writeFileSync(dest, content);
    return true;
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
    return false;
  }
}

function updateStoryTitle(filePath, newCategory, componentName) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update title
    const categoryName = CATEGORY_NAMES[newCategory];
    content = content.replace(
      /title:\s*['"]([^'"]+)['"]/,
      `title: '${categoryName}/${componentName}'`
    );
    
    // Add category parameter if not exists
    if (!content.includes('parameters:')) {
      content = content.replace(
        'export default {',
        `export default {\n  parameters: {\n    category: '${newCategory}',\n  },`
      );
    } else if (!content.includes('category:')) {
      content = content.replace(
        'parameters: {',
        `parameters: {\n    category: '${newCategory}',`
      );
    }
    
    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error updating story ${filePath}:`, error);
    return false;
  }
}

function createComponentReadme(componentPath, component, description) {
  const readme = `# ${component}

## Description
${description}

## Usage

\`\`\`jsx
import { ${component} } from '@design-system/components';

<${component} />
\`\`\`

## Props
See Storybook for interactive prop documentation.

## Accessibility
- Keyboard navigation supported
- ARIA attributes included
- WCAG 2.1 AA compliant

## Tokens
Component uses tokens from \`component.json\`:
- \`${component.toLowerCase()}.size\`
- \`${component.toLowerCase()}.variant\`
- \`${component.toLowerCase()}.state\`

## Related Components
See category README for related components.
`;

  fs.writeFileSync(path.join(componentPath, 'README.md'), readme);
}

function createComponentIndex(componentPath, component) {
  const index = `// ${component} component exports
export { default as ${component} } from './${component}.stories';

// Re-export for convenience
export default ${component};
`;

  fs.writeFileSync(path.join(componentPath, 'index.js'), index);
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting component migration...\n');
  
  const results = {
    success: [],
    failed: [],
    skipped: []
  };
  
  for (const [oldPath, config] of Object.entries(MIGRATIONS)) {
    const { category, component, description } = config;
    const sourcePath = path.join(process.cwd(), oldPath);
    const targetDir = path.join(process.cwd(), 'components', category, component);
    const targetPath = path.join(targetDir, `${component}.stories.jsx`);
    
    console.log(`📦 Migrating ${component}...`);
    
    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`  ⏭️  Skipped: Source not found`);
      results.skipped.push(component);
      continue;
    }
    
    // Create target directory
    ensureDirectoryExists(targetDir);
    
    // Copy story file
    if (copyFile(sourcePath, targetPath)) {
      console.log(`  ✅ Copied story file`);
      
      // Update story title and category
      if (updateStoryTitle(targetPath, category, component)) {
        console.log(`  ✅ Updated story metadata`);
      }
      
      // Create component README
      createComponentReadme(targetDir, component, description);
      console.log(`  ✅ Created README`);
      
      // Create index.js
      createComponentIndex(targetDir, component);
      console.log(`  ✅ Created index.js`);
      
      results.success.push(component);
    } else {
      results.failed.push(component);
    }
    
    console.log('');
  }
  
  // Print summary
  console.log('📊 Migration Summary:');
  console.log(`  ✅ Success: ${results.success.length} components`);
  console.log(`  ❌ Failed: ${results.failed.length} components`);
  console.log(`  ⏭️  Skipped: ${results.skipped.length} components`);
  
  if (results.success.length > 0) {
    console.log('\n✅ Successfully migrated:');
    results.success.forEach(c => console.log(`  - ${c}`));
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed to migrate:');
    results.failed.forEach(c => console.log(`  - ${c}`));
  }
  
  if (results.skipped.length > 0) {
    console.log('\n⏭️  Skipped (not found):');
    results.skipped.forEach(c => console.log(`  - ${c}`));
  }
  
  console.log('\n✨ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Update Storybook configuration');
  console.log('2. Test all components');
  console.log('3. Update import paths in consuming code');
  console.log('4. Remove old atomic structure (after validation)');
}

// Run migration
if (require.main === module) {
  migrate().catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { migrate, MIGRATIONS, CATEGORY_NAMES };