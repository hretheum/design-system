# Visual Regression Testing

This directory contains comprehensive visual regression tests for our design system components using Playwright.

## Overview

Visual regression testing helps ensure that UI changes don't inadvertently break the visual appearance of components. Our test suite covers:

- **All 69 components** across 3 phases of development
- **Multiple viewports** (mobile, tablet, desktop, wide)
- **Cross-browser compatibility** (Chromium, Firefox, WebKit)
- **Theme variations** (light, dark, high-contrast)
- **Interactive states** (hover, focus, active)
- **Accessibility modes** (reduced motion, high contrast)
- **User journeys** (form flows, navigation, modals)

## Test Structure

### Component Tests (`components.spec.js`)
- Individual component screenshots in different states
- Responsive breakpoint testing
- Theme and accessibility variations
- Hover and focus state capture

### Regression Tests (`regression.spec.js`)
- Complete user journey flows
- Cross-browser consistency checks
- Theme switching validation
- Print style verification

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:visual:install
```

### Basic Usage
```bash
# Run all visual tests
npm run test:visual

# Run with browser UI (headed mode)
npm run test:visual:headed

# Run with Playwright UI for debugging
npm run test:visual:ui

# View test results
npm run test:visual:report
```

### Advanced Usage
```bash
# Update all screenshots (when designs change)
npm run test:visual:update

# Update specific component screenshots
node scripts/visual-tests.js update Button

# Clean test results
node scripts/visual-tests.js clean

# Run specific test file
npx playwright test components.spec.js

# Run tests for specific browser
npx playwright test --project=chromium

# Run tests with specific grep pattern
npx playwright test --grep="Button"
```

## Test Configuration

### Browsers Tested
- **Chromium** (Chrome/Edge equivalent)
- **Firefox**
- **WebKit** (Safari equivalent)

### Viewports
- **Mobile**: 375×667 (iPhone SE)
- **Tablet**: 768×1024 (iPad)
- **Desktop**: 1024×768 (Standard laptop)
- **Wide**: 1440×900 (Large desktop)

### Themes
- **Light** (default)
- **Dark** (`.dark-theme` class)
- **High Contrast** (`.high-contrast-theme` class)

## Screenshot Naming Convention

Screenshots are organized by:
```
{category}-{component}-{variant}-{viewport}.png
{category}-{component}-{state}-{browser}.png
{category}-{component}-{theme}.png
```

Examples:
- `atoms-button-default-desktop.png`
- `molecules-input-focus-chromium.png`
- `organisms-modal-default-dark.png`

## Updating Screenshots

When you make intentional visual changes to components:

1. **Review changes**: Ensure changes are intentional
2. **Update screenshots**: Run `npm run test:visual:update`
3. **Verify results**: Check that only expected screenshots changed
4. **Commit changes**: Include new screenshots in your commit

### Selective Updates
```bash
# Update specific component
npm run test:visual:update Button

# Update specific theme
npx playwright test --update-snapshots --grep="dark"

# Update specific viewport
npx playwright test --update-snapshots --grep="mobile"
```

## CI/CD Integration

### GitHub Actions
```yaml
- name: Run Visual Tests
  run: |
    npm run build-storybook
    npm run test:visual
    
- name: Upload Test Results
  uses: actions/upload-artifact@v3
  if: failure()
  with:
    name: visual-test-results
    path: test-results/
```

### Test Results
- **HTML Report**: `test-results/index.html`
- **JSON Results**: `test-results/visual-test-results.json`
- **Screenshots**: `test-results/` (on failures)

## Best Practices

### Writing Visual Tests
1. **Wait for animations**: Always `await page.waitForTimeout(1000)` after navigation
2. **Stable selectors**: Use `#storybook-root` as the main locator
3. **Consistent naming**: Follow the established naming convention
4. **Test real scenarios**: Include hover, focus, and error states

### Managing Screenshots
1. **Small changes**: Update only affected component screenshots
2. **Large changes**: Review all screenshots before updating
3. **Cross-browser**: Ensure consistency across all browsers
4. **Documentation**: Document intentional visual changes in PRs

### Performance
1. **Parallel execution**: Tests run in parallel by default
2. **Selective testing**: Use grep patterns for faster iteration
3. **CI optimization**: Run critical tests first in CI

## Troubleshooting

### Common Issues

**Flaky tests due to animations**
```javascript
// Wait for animations to complete
await page.waitForTimeout(1000);

// Or disable animations
await page.addInitScript(() => {
  document.documentElement.style.setProperty('--animation-duration', '0ms');
});
```

**Font rendering differences**
```javascript
// Ensure fonts are loaded
await page.waitForLoadState('networkidle');
```

**Timing issues**
```javascript
// Wait for specific element
await page.waitForSelector('[data-testid="component"]');

// Wait for network requests
await page.waitForLoadState('networkidle');
```

### Debug Mode
```bash
# Run single test with debug
npx playwright test --debug components.spec.js -g "Button Default"

# Run with headed browser
npx playwright test --headed --slowMo=1000
```

## Component Coverage

### Phase 1 (24 components) ✅
- Atoms: Button, Badge, ProgressBar, Spinner
- Molecules: Input, Textarea, Select, Checkbox, Radio, Switch, Alert, Toast, Tooltip
- Organisms: Card, Modal, Table, Tabs, Breadcrumb, Pagination, Dropdown, Datepicker, Stepper, Wizard

### Phase 2 Priority 1 (20 components) ✅
- Actions: Link, IconButton, SplitButton, ButtonGroup, ActionMenu
- Forms: FileUpload, Slider, ColorPicker, SearchInput, NumberInput, PinInput, Form
- Navigation: NavigationBar, Sidebar, Menu, SkipLink
- DataDisplay: List, TreeView, DescriptionList, EmptyState

### Phase 3 Priority 2 (25 components) ✅
- OverlaysModals: Drawer, Popover, ContextMenu, Lightbox, NotificationDrawer
- MediaIcons: Avatar, AvatarGroup, Icon, Image, Gallery
- BadgesLabels: Tag, ChipGroup, Label, LabelGroup, StatusBadge
- ProgressLoading: Skeleton, ProgressCircle, ProgressSteps, LoadingOverlay, BusyIndicator
- LayoutStructure: Grid, Stack, Divider, Panel, Accordion

**Total: 69 components with comprehensive visual coverage**

## Metrics

- **Screenshot count**: ~800+ unique screenshots
- **Test scenarios**: 300+ test cases
- **Browser coverage**: 3 browsers × 4 viewports = 12 combinations
- **Theme coverage**: 3 themes × key components
- **Execution time**: ~15-20 minutes (full suite)

## Future Enhancements

1. **Percy integration** for advanced visual diffing
2. **Mobile device testing** with real device viewports
3. **Animation frame testing** for complex transitions
4. **PDF comparison** for print stylesheets
5. **Color contrast validation** in screenshots