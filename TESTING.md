# Testing Guide

## Overview

This design system includes comprehensive automated testing at multiple levels:

1. **Accessibility Tests** - WCAG 2.1 AA/AAA compliance
2. **Contrast Tests** - Color contrast ratios
3. **Interaction Tests** - Component behavior via Storybook

---

## 🧪 Interaction Tests (Storybook)

### What are Interaction Tests?

Interaction tests use Storybook's **play functions** to simulate user interactions and verify component behavior. They run automatically in the test-runner using Playwright.

### Running Tests

```bash
# Run all tests (including Storybook)
npm test

# Run only Storybook interaction tests
npm run test:storybook

# Run tests in CI mode (build + serve + test)
npm run test:storybook:ci
```

### Writing Interaction Tests

Example from `Input.stories.jsx`:

```javascript
import { expect, userEvent, within } from '@storybook/test';

export const InteractiveTest = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find element
    const input = canvas.getByPlaceholderText('Type here...');
    
    // Perform actions
    await userEvent.type(input, 'Hello');
    
    // Assert expectations
    await expect(input).toHaveValue('Hello');
  },
};
```

### Test Utilities

- **`within(canvasElement)`** - Query elements within the story
- **`userEvent`** - Simulate user interactions (click, type, etc.)
- **`expect`** - Make assertions about component state
- **`waitFor`** - Wait for async changes

### Available Queries

```javascript
// By role (preferred - most accessible)
canvas.getByRole('button', { name: /submit/i })

// By label text
canvas.getByLabelText('Email')

// By placeholder
canvas.getByPlaceholderText('Enter email...')

// By test ID
canvas.getByTestId('my-element')

// By text content
canvas.getByText('Hello World')
```

### User Interactions

```javascript
// Click
await userEvent.click(button);

// Type
await userEvent.type(input, 'text');

// Clear
await userEvent.clear(input);

// Select option
await userEvent.selectOptions(select, 'value');

// Hover
await userEvent.hover(element);

// Tab navigation
await userEvent.tab();
```

### Assertions

```javascript
// Value checks
await expect(input).toHaveValue('text');
await expect(checkbox).toBeChecked();
await expect(button).toBeDisabled();

// Visibility
await expect(element).toBeInTheDocument();
await expect(element).toBeVisible();
await expect(element).not.toBeInTheDocument();

// Text content
await expect(element).toHaveTextContent('Hello');
await expect(element).toContainHTML('<span>');

// Accessibility
await expect(element).toHaveAccessibleName('Submit');
await expect(element).toHaveAccessibleDescription('Click to submit');
```

---

## 📊 Test Coverage

### Components with Interaction Tests

- ✅ **Input** - Type, clear, validation
- ✅ **Button** - Click, state changes
- ✅ **Checkbox** - Toggle, checked state
- ✅ **Select** - Option selection
- ✅ **Modal** - Open/close, backdrop clicks

### Adding Tests to New Components

1. Import test utilities:
```javascript
import { expect, userEvent, within } from '@storybook/test';
```

2. Create a test story:
```javascript
export const InteractiveTest = {
  render: () => <YourComponent />,
  play: async ({ canvasElement }) => {
    // Your test logic
  },
};
```

3. Run tests:
```bash
npm run test:storybook
```

---

## 🔄 CI/CD Integration

Tests run automatically on every push and pull request:

```yaml
# .github/workflows/ci.yml
storybook-tests:
  name: Storybook Interaction Tests
  runs-on: ubuntu-latest
  steps:
    - Install dependencies
    - Install Playwright
    - Build Storybook
    - Run interaction tests
```

### Test Results

- ✅ All tests pass → PR can be merged
- ❌ Tests fail → Fix issues before merging
- 💬 Results posted as PR comment

---

## 🎯 Best Practices

### 1. Test User Interactions, Not Implementation

```javascript
// ❌ Bad - testing implementation
await expect(component.state.isOpen).toBe(true);

// ✅ Good - testing behavior
await expect(canvas.getByRole('dialog')).toBeInTheDocument();
```

### 2. Use Accessible Queries

```javascript
// ❌ Avoid - fragile
canvas.querySelector('.my-button')

// ✅ Prefer - accessible
canvas.getByRole('button', { name: /submit/i })
```

### 3. Wait for Async Changes

```javascript
// For async operations
await waitFor(() => {
  expect(canvas.getByText('Success')).toBeInTheDocument();
});
```

### 4. Keep Tests Focused

```javascript
// ✅ One concept per test
export const ClickTest = { /* test clicks */ };
export const ValidationTest = { /* test validation */ };

// ❌ Don't combine unrelated tests
export const AllTheThings = { /* tests everything */ };
```

### 5. Use Meaningful Test IDs

```javascript
<button data-testid="submit-button">Submit</button>

// Then in test
canvas.getByTestId('submit-button')
```

---

## 🐛 Debugging Tests

### View Tests in Storybook UI

1. Start Storybook: `npm run storybook`
2. Open story with `play` function
3. Click **Interactions** panel
4. See step-by-step execution

### Run Tests in Watch Mode

```bash
npm run test:storybook -- --watch
```

### Debug Failing Tests

```javascript
// Add console.log
play: async ({ canvasElement }) => {
  console.log('Current state:', await canvas.findByRole('button'));
  // ... rest of test
}
```

### Take Screenshots on Failure

Configure in `.storybook/test-runner.js`:

```javascript
module.exports = {
  async postVisit(page, context) {
    if (context.failureReason) {
      await page.screenshot({
        path: `test-results/${context.id}-failure.png`
      });
    }
  },
};
```

---

## 📚 Resources

- [Storybook Testing Docs](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Jest-DOM Matchers](https://github.com/testing-library/jest-dom)

---

## ✅ Quick Reference

```bash
# Run all tests
npm test

# Run only interaction tests
npm run test:storybook

# Run in CI mode
npm run test:storybook:ci

# Run accessibility tests
npm run test:a11y

# Run contrast tests
npm run test:contrast
```

**Test Count**: 5 interaction tests across 5 components  
**Coverage**: Input, Button, Checkbox, Select, Modal  
**Framework**: Storybook Test Runner + Playwright  
**Assertions**: Testing Library + Jest-DOM
