# 👨‍💻 Developer Workflow Guide

## Complete Guide for Design System Component Development

This guide provides step-by-step instructions for developers working on the design system, from initial setup to production deployment.

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/design-system.git
cd design-system

# Install dependencies
npm install

# Start development
npm run storybook

# Generate new component
npm run generate
```

---

## 📋 Table of Contents
1. [Environment Setup](#environment-setup)
2. [Daily Workflow](#daily-workflow)
3. [Component Development Process](#component-development-process)
4. [Testing Workflow](#testing-workflow)
5. [Git Workflow](#git-workflow)
6. [Review Process](#review-process)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting](#troubleshooting)

---

## 🛠️ Environment Setup

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git
- VS Code (recommended)

### Initial Setup
```bash
# 1. Clone repository
git clone https://github.com/your-org/design-system.git
cd design-system

# 2. Install dependencies
npm install

# 3. Install recommended VS Code extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension jpoissonnier.vscode-styled-components

# 4. Verify setup
npm run storybook         # Should open at http://localhost:6006
npm test                  # All tests should pass
npm run validate:tokens   # Tokens should be valid
```

### Environment Configuration
```bash
# Create local environment file
cp .env.example .env.local

# Configure Git hooks
npx husky install
```

---

## 📅 Daily Workflow

### Morning Routine
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Check for updates
npm install  # In case package.json changed

# 3. Create feature branch
git checkout -b feature/component-name

# 4. Start development environment
npm run storybook
```

### During Development
```bash
# Keep Storybook running
npm run storybook

# In another terminal, run tests in watch mode
npm run test:watch

# Check your changes
npm run lint
npm run format
```

### End of Day
```bash
# 1. Run all checks
npm test
npm run lint
npm run build

# 2. Commit your work
git add .
git commit -m "feat(component): add ComponentName

- Implemented base functionality
- Added tests and stories
- Updated documentation"

# 3. Push to remote
git push origin feature/component-name
```

---

## 🔨 Component Development Process

### Step 1: Planning (30 mins)
```markdown
## Component Planning Checklist
- [ ] Review design specifications in Figma
- [ ] Identify component category
- [ ] List all props and variants
- [ ] Define accessibility requirements
- [ ] Check for similar existing components
- [ ] Document acceptance criteria
```

### Step 2: Generation (5 mins)
```bash
# Interactive mode (recommended for new components)
npm run generate

# Answer prompts:
# - Component name: Button
# - Description: Primary action trigger
# - Category: Actions & Controls
# - Sizes: xs, sm, md, lg, xl
# - States: default, hover, active, disabled
# - Variants: primary, secondary, danger

# OR Quick mode (for simple components)
npm run generate:quick -- Button actions
```

### Step 3: Implementation (2-4 hours)

#### 3.1 Component Logic
```jsx
// components/01-actions-controls/Button/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  // Component implementation
  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-busy={loading}
      aria-disabled={disabled}
      {...props}
    >
      {loading && <Spinner size={size} />}
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};
```

#### 3.2 Storybook Stories
```jsx
// Button.stories.jsx
export default {
  title: 'Actions & Controls/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary action trigger component'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  }
};

// Create stories for all variants
export const Primary = {
  args: {
    children: 'Click me',
    variant: 'primary'
  }
};

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <Button key={size} size={size}>Size {size}</Button>
    ))}
  </div>
);
```

#### 3.3 Tests
```jsx
// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.firstChild).toHaveClass('btn--danger');
  });

  it('disables when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

### Step 4: Documentation (30 mins)
```markdown
# Button Component

## Usage
\```jsx
import { Button } from '@design-system/components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
\```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | required | Button content |
| variant | string | 'primary' | Visual style variant |
| size | string | 'md' | Button size |
| disabled | bool | false | Disable interactions |
| loading | bool | false | Show loading state |

## Accessibility
- Supports keyboard navigation (Enter/Space)
- Includes ARIA attributes
- Focus visible indication
- Proper contrast ratios

## Examples
[Add 3-5 usage examples]
```

### Step 5: Validation (15 mins)
```bash
# Run quality gates
node scripts/quality-gates.js Button

# Validate component structure
./scripts/validate-component.sh Button

# Check accessibility
npm run test:a11y Button

# Verify in Storybook
npm run storybook
# Navigate to your component
```

---

## 🧪 Testing Workflow

### Test Types & When to Run

#### Unit Tests (Run frequently)
```bash
# Single component
npm test Button

# Watch mode during development
npm test -- --watch

# With coverage
npm test -- --coverage
```

#### Integration Tests (Before commit)
```bash
# Run integration tests
npm run test:integration

# Test with other components
npm run test:integration -- --grep "Form"
```

#### Visual Tests (Before PR)
```bash
# Capture visual snapshots
npm run test:visual

# Update snapshots if intentional changes
npm run test:visual -- --update-snapshots
```

#### Accessibility Tests (Always)
```bash
# Run a11y tests
npm run test:a11y

# Test specific component
npm run test:a11y Button
```

### Test Coverage Requirements
```javascript
// Minimum coverage thresholds
{
  "statements": 80,
  "branches": 70,
  "functions": 80,
  "lines": 80
}
```

---

## 🌿 Git Workflow

### Branch Naming Convention
```bash
feature/component-name     # New component
fix/component-bug-desc     # Bug fix
refactor/component-update  # Refactoring
docs/component-docs        # Documentation
test/component-tests       # Test updates
```

### Commit Message Format
```bash
# Format: type(scope): description

feat(button): add loading state
fix(input): correct focus styles
docs(card): update usage examples
test(modal): add integration tests
refactor(tooltip): optimize performance
style(badge): adjust spacing
```

### Pull Request Process

#### 1. Create Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/new-component
```

#### 2. Make Changes
```bash
# Develop component
npm run generate
# ... implement component ...

# Commit regularly
git add .
git commit -m "feat(component): add base implementation"
```

#### 3. Prepare for PR
```bash
# Update from main
git checkout main
git pull origin main
git checkout feature/new-component
git rebase main

# Run all checks
npm test
npm run lint
npm run build

# Push to remote
git push origin feature/new-component
```

#### 4. Create Pull Request
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New component
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Storybook stories added
- [ ] Accessibility checked
- [ ] Design approved

## Screenshots
[Add screenshots if visual changes]

## Related Issues
Fixes #123
```

---

## 👀 Review Process

### Self-Review Checklist
Before requesting review:
- [ ] Code follows style guidelines
- [ ] Tests pass with >80% coverage
- [ ] Documentation is complete
- [ ] Storybook stories work
- [ ] No console errors/warnings
- [ ] Accessibility tests pass
- [ ] Bundle size is acceptable

### Review Response Times
- **Critical fixes**: 2-4 hours
- **New components**: 1-2 days
- **Minor updates**: 2-3 days

### Addressing Review Comments
```bash
# Make requested changes
# ... edit files ...

# Commit with descriptive message
git add .
git commit -m "fix: address review comments

- Update prop types
- Add missing tests
- Improve documentation"

# Push changes
git push origin feature/new-component
```

---

## 🚀 Deployment Process

### Development → Staging
Automatic on PR merge to main:
1. Tests run automatically
2. Preview deployed to staging
3. Storybook updated
4. Team notified in Slack

### Staging → Production

#### 1. Version Bump
```bash
# For new features
npm version minor

# For bug fixes
npm version patch

# For breaking changes
npm version major
```

#### 2. Create Release
```bash
# Generate changelog
npm run changelog

# Create release notes
npm run release:notes

# Tag release
git tag v1.2.0
git push --tags
```

#### 3. Deploy
```bash
# Build for production
npm run build:production

# Deploy to CDN
npm run deploy:production

# Publish to npm
npm publish
```

#### 4. Post-Deployment
- [ ] Verify in production
- [ ] Update documentation site
- [ ] Notify teams
- [ ] Monitor for issues

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Storybook Won't Start
```bash
# Clear cache and rebuild
rm -rf node_modules/.cache
rm -rf storybook-static
npm run storybook
```

#### Tests Failing Locally but Pass in CI
```bash
# Ensure clean environment
rm -rf node_modules
npm ci
npm test
```

#### Component Not Appearing in Storybook
```bash
# Check story exports
# Ensure default export exists
# Restart Storybook
npm run storybook
```

#### ESLint Errors
```bash
# Auto-fix what's possible
npm run lint:fix

# Check specific file
npx eslint path/to/file.jsx
```

#### Git Merge Conflicts
```bash
# Update from main
git checkout main
git pull origin main
git checkout your-branch
git rebase main

# Resolve conflicts
# Edit conflicted files
git add .
git rebase --continue
```

---

## 📚 Resources

### Documentation
- [Component Development Pipeline](./docs/COMPONENT_DEVELOPMENT_PIPELINE.md)
- [Token Naming Convention](./docs/TOKEN_NAMING_CONVENTION.md)
- [Generator Guide](./docs/GENERATOR_GUIDE.md)
- [Testing Strategy](./docs/TESTING_STRATEGY.md)

### Tools & References
- [Storybook Docs](https://storybook.js.org/docs)
- [Testing Library](https://testing-library.com/)
- [React Docs](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Getting Help
- **Slack**: #design-system channel
- **Office Hours**: Tuesdays & Thursdays, 2-3 PM
- **Documentation**: [Internal Wiki](https://wiki.company.com/design-system)
- **Issues**: [GitHub Issues](https://github.com/your-org/design-system/issues)

---

## 🎯 Pro Tips

1. **Use the Generator**: Always start with `npm run generate` for consistency
2. **Test Early**: Write tests as you develop, not after
3. **Check Storybook Often**: Visual feedback helps catch issues early
4. **Small Commits**: Make frequent, focused commits
5. **Ask Questions**: When in doubt, ask in Slack
6. **Document Everything**: Future you will thank present you
7. **Review Others' PRs**: Great way to learn and stay informed

---

*Developer Workflow Guide v1.0 | October 2025*
*Questions? Ask in #design-system*