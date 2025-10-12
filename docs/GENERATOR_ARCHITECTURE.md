# 🏗️ Component Generator Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Component Generator                    │
├───────────────┬─────────────────────┬───────────────────┤
│  Interactive  │   Quick Generator   │  Template Engine  │
│   Generator   │                     │                   │
├───────────────┼─────────────────────┼───────────────────┤
│   Inquirer    │   CLI Arguments     │    Handlebars     │
│   Prompts     │   Processing        │    Templates      │
└───────────────┴─────────────────────┴───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   File System Layer                      │
├─────────────────────────────────────────────────────────┤
│  Component Files │ Token Files │ Documentation Files    │
└─────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Generator Engine (`generate-component.js`)

**Purpose**: Main generator with interactive prompts and intelligent categorization.

**Key Functions**:
```javascript
generateComponent()        // Main orchestrator
promptComponentInfo()      // Gather basic info
determineCategory()        // Category selection with tests
promptComponentDetails()   // Detailed configuration
generateFiles()           // File generation
updateComponentTokens()    // Token integration
showSummary()             // Results display
```

**Dependencies**:
- `inquirer` - Interactive command line prompts
- `chalk` - Terminal string styling
- `ora` - Elegant terminal spinners
- `handlebars` - Template engine
- `fs/path` - File system operations

### 2. Quick Generator (`quick-generate.js`)

**Purpose**: Rapid component generation with minimal configuration.

**Key Functions**:
```javascript
quickGenerate(name, category)  // Main function
- Validates input
- Resolves category shortcuts
- Creates directory structure
- Generates all files
- Shows completion status
```

**Category Mapping**:
```javascript
{
  'actions': '01-actions-controls',
  'forms': '02-forms-inputs',
  'navigation': '03-navigation-wayfinding',
  // ... etc
}
```

### 3. Template System

**Handlebars Templates**:
```handlebars
{{name}}           // Component name
{{description}}    // Component description
{{#each sizes}}    // Iteration
{{lowercase name}} // Helper functions
{{kebabCase name}} // Custom helpers
```

**Template Types**:
1. `component.jsx.hbs` - Main component
2. `component.stories.jsx.hbs` - Storybook stories
3. `component.test.js.hbs` - Unit tests
4. `component.tokens.json.hbs` - Design tokens
5. `component.README.md.hbs` - Documentation
6. `index.js.hbs` - Exports

## Data Flow

### Interactive Generator Flow

```
User Input
    │
    ▼
┌─────────────────┐
│ Component Name  │ → Validation (PascalCase)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Description    │ → Purpose documentation
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Category Selection│ → Qualification tests
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Component Props │ → Sizes, States, Variants
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│File Generation  │ → 6 files per component
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Token Updates   │ → component.json merge
└────────┬────────┘
         │
         ▼
    Summary
```

### Quick Generator Flow

```
CLI Arguments → Parse → Validate → Generate → Complete
     │            │         │          │          │
     ▼            ▼         ▼          ▼          ▼
  [Name]      [Category] [Check]   [6 Files]  [Summary]
```

## File Generation Process

### 1. Directory Creation
```javascript
const componentDir = path.join(
  process.cwd(),
  'components',
  category,
  componentName
);
await fs.mkdir(componentDir, { recursive: true });
```

### 2. Template Processing
```javascript
const template = handlebars.compile(templateContent);
const content = template(data);
await fs.writeFile(outputPath, content);
```

### 3. Token Integration
```javascript
// Read existing tokens
const tokens = JSON.parse(await fs.readFile('component.json'));

// Add new component tokens
tokens[componentKey] = {
  size: { /* ... */ },
  variant: { /* ... */ },
  state: { /* ... */ }
};

// Save updated tokens
await fs.writeFile('component.json', JSON.stringify(tokens, null, 2));
```

## Category System Architecture

### Category Definition Structure
```javascript
{
  'category-id': {
    name: 'Display Name',
    test: 'Qualification question',
    examples: ['Example1', 'Example2'],
    tokens: ['token1', 'token2']
  }
}
```

### Qualification Test Logic
Each category has a binary test question:
- **Yes** → Component belongs here
- **No** → Try next category

### Category Resolution
```
User Intent → Qualification Test → Category Assignment
                     │
                     ▼
              Confirmation Step → Final Placement
```

## Generated File Structure

### Component Module
```
ComponentName.jsx
├── Imports
├── PropTypes definition
├── Component function
├── Class name construction
├── Render logic
└── Export statements
```

### Storybook Story
```
ComponentName.stories.jsx
├── Component import
├── Story configuration
│   ├── Title (category/name)
│   ├── Component reference
│   ├── Parameters
│   └── ArgTypes
├── Template definition
├── Story variations
│   ├── Default
│   ├── Variants
│   ├── Sizes
│   └── States
└── Export statements
```

### Test Suite
```
ComponentName.test.js
├── Testing library imports
├── Component import
├── Test suite (describe)
│   ├── Render tests
│   ├── Props tests
│   ├── State tests
│   └── Accessibility tests
└── Test helpers
```

### Token File
```
ComponentName.tokens.json
├── Component namespace
│   ├── Size tokens
│   ├── Variant tokens
│   ├── State tokens
│   └── Custom tokens
└── Token references
```

## Error Handling

### Input Validation
```javascript
// Name validation
if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
  return 'Component name must be in PascalCase';
}

// Category validation
if (!CATEGORIES[category]) {
  throw new Error(`Unknown category: ${category}`);
}
```

### File System Errors
```javascript
try {
  await fs.writeFile(path, content);
} catch (error) {
  console.error(`Failed to write ${path}:`, error);
  // Rollback or recovery logic
}
```

### Template Errors
```javascript
try {
  const template = handlebars.compile(templateContent);
  const content = template(data);
} catch (error) {
  // Fallback to default template
  const content = getDefaultTemplate(templateName);
}
```

## Extension Points

### 1. Custom Templates
Place custom templates in `scripts/templates/`:
```
scripts/templates/
├── component.jsx.hbs
├── component.stories.jsx.hbs
└── component.test.js.hbs
```

### 2. Additional Categories
Add to `CATEGORIES` object:
```javascript
const CATEGORIES = {
  'new-category': {
    name: 'New Category',
    test: 'Does it do X?',
    examples: ['A', 'B'],
    tokens: ['size']
  }
};
```

### 3. Custom Prompts
Extend `promptComponentDetails()`:
```javascript
{
  type: 'input',
  name: 'customField',
  message: 'Custom question?'
}
```

### 4. Token Schemes
Modify `updateComponentTokens()`:
```javascript
tokens[componentKey] = {
  // Custom token structure
  customNamespace: {
    customToken: { value: '...', type: '...' }
  }
};
```

## Performance Considerations

### Async Operations
All file operations are async to prevent blocking:
```javascript
await Promise.all([
  fs.writeFile(file1, content1),
  fs.writeFile(file2, content2),
  // ...
]);
```

### Template Caching
Templates are compiled once and reused:
```javascript
const compiledTemplates = {};
if (!compiledTemplates[templateName]) {
  compiledTemplates[templateName] = handlebars.compile(template);
}
```

### Minimal Dependencies
Generator uses lightweight libraries:
- No heavy frameworks
- Minimal npm dependencies
- Fast startup time

## Security Considerations

### Input Sanitization
- PascalCase validation prevents path traversal
- Category validation prevents arbitrary folder creation
- Template compilation is sandboxed

### File System Safety
- Uses `path.join()` for safe path construction
- Creates files only in designated directories
- No file deletion operations

### Token Protection
- Backs up existing tokens before modification
- Validates JSON structure
- Atomic write operations

## Testing the Generator

### Unit Tests
```javascript
describe('Generator', () => {
  it('validates component names', () => {
    expect(isValidName('Button')).toBe(true);
    expect(isValidName('button')).toBe(false);
  });
  
  it('resolves categories correctly', () => {
    expect(resolveCategory('actions')).toBe('01-actions-controls');
  });
});
```

### Integration Tests
```bash
# Test interactive generator
echo -e "TestComponent\nTest description\n..." | npm run generate

# Test quick generator
npm run generate:quick -- TestComponent actions

# Verify files created
ls components/01-actions-controls/TestComponent/
```

### End-to-End Tests
```javascript
// Test full generation flow
const { exec } = require('child_process');
exec('npm run generate:quick -- E2ETest actions', (error, stdout) => {
  // Verify output
  // Check files exist
  // Validate content
});
```

## Maintenance

### Version Updates
```javascript
// package.json
{
  "version": "1.0.0",
  "generators": {
    "version": "1.0.0",
    "lastUpdated": "2025-10-12"
  }
}
```

### Deprecation Handling
```javascript
if (options.deprecated) {
  console.warn('This option is deprecated and will be removed in v2.0');
}
```

### Backwards Compatibility
- Template changes are backwards compatible
- New categories don't affect existing ones
- Token structure is additive only

## Future Enhancements

### Planned Features
1. **TypeScript Support**
   - `.tsx` templates
   - Type definitions
   - Interface generation

2. **CSS Modules**
   - `.module.css` generation
   - Style token integration
   - CSS-in-JS option

3. **Component Composition**
   - Detect component dependencies
   - Generate compound components
   - Parent-child relationships

4. **AI Integration**
   - Auto-categorization
   - Props suggestion
   - Documentation generation

5. **Visual Preview**
   - Generate component preview
   - Screenshot in README
   - Figma integration

### Architecture Evolution
```
Current: File-based templates
    ↓
Next: Plugin architecture
    ↓
Future: AI-powered generation
```

## Metrics and Analytics

### Usage Tracking (Optional)
```javascript
// Track generator usage
const analytics = {
  componentsGenerated: 0,
  categoriesUsed: {},
  averageGenerationTime: 0,
  // ...
};
```

### Performance Metrics
- Generation time: <2 seconds
- Memory usage: <50MB
- File I/O: 6 writes per component

### Success Metrics
- Adoption rate: % of components using generator
- Consistency score: Adherence to patterns
- Documentation coverage: 100%

---

*Architecture Document v1.0 | October 2025*