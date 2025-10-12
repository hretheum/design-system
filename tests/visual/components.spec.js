import { test, expect } from '@playwright/test';

const COMPONENTS = {
  // Phase 1 Components (24)
  'Atoms/Button': ['Default', 'Primary', 'Secondary', 'Danger', 'Small', 'Large'],
  'Atoms/Badge': ['Default', 'Primary', 'Secondary', 'Success', 'Warning', 'Error'],
  'Atoms/ProgressBar': ['Default', 'Primary', 'Success', 'Warning', 'Error'],
  'Atoms/Spinner': ['Default', 'Primary', 'Small', 'Large'],
  
  'Molecules/Input': ['Default', 'WithLabel', 'WithError', 'Disabled'],
  'Molecules/Textarea': ['Default', 'WithLabel', 'WithError', 'Disabled'],
  'Molecules/Select': ['Default', 'WithOptions', 'WithError', 'Disabled'],
  'Molecules/Checkbox': ['Default', 'Checked', 'Indeterminate', 'Disabled'],
  'Molecules/Radio': ['Default', 'Selected', 'Disabled'],
  'Molecules/Switch': ['Default', 'Checked', 'Disabled'],
  'Molecules/Alert': ['Default', 'Success', 'Warning', 'Error'],
  'Molecules/Toast': ['Default', 'Success', 'Warning', 'Error'],
  'Molecules/Tooltip': ['Default', 'Top', 'Right', 'Bottom', 'Left'],
  
  'Organisms/Card': ['Default', 'WithHeader', 'WithActions'],
  'Organisms/Modal': ['Default', 'WithHeader', 'WithFooter'],
  'Organisms/Table': ['Default', 'WithSorting', 'WithPagination'],
  'Organisms/Tabs': ['Default', 'Vertical', 'WithBadges'],
  'Organisms/Breadcrumb': ['Default', 'WithIcons', 'Collapsed'],
  'Organisms/Pagination': ['Default', 'WithInfo', 'Compact'],
  'Organisms/Dropdown': ['Default', 'WithSearch', 'MultiSelect'],
  'Organisms/Datepicker': ['Default', 'WithTime', 'Range'],
  'Organisms/Stepper': ['Default', 'Vertical', 'WithIcons'],
  'Organisms/Wizard': ['Default', 'Linear', 'WithValidation'],
  
  // Phase 2 Priority 1 Components (20)
  'Actions/Link': ['Default', 'External', 'Disabled'],
  'Actions/IconButton': ['Default', 'Primary', 'Secondary', 'Small', 'Large'],
  'Actions/SplitButton': ['Default', 'Primary', 'WithDropdown'],
  'Actions/ButtonGroup': ['Default', 'Attached', 'Separated'],
  'Actions/ActionMenu': ['Default', 'WithIcons', 'WithSeparators'],
  
  'Forms/FileUpload': ['Default', 'DragDrop', 'Multiple'],
  'Forms/Slider': ['Default', 'Range', 'WithMarks'],
  'Forms/ColorPicker': ['Default', 'WithPresets', 'HSL'],
  'Forms/SearchInput': ['Default', 'WithSuggestions', 'WithFilters'],
  'Forms/NumberInput': ['Default', 'WithControls', 'Currency'],
  'Forms/PinInput': ['Default', 'FourDigit', 'SixDigit'],
  'Forms/Form': ['Default', 'WithValidation', 'MultiStep'],
  
  'Navigation/NavigationBar': ['Default', 'WithLogo', 'WithSearch'],
  'Navigation/Sidebar': ['Default', 'Collapsed', 'WithSubmenus'],
  'Navigation/Menu': ['Default', 'Vertical', 'WithIcons'],
  'Navigation/SkipLink': ['Default', 'Focused'],
  
  'DataDisplay/List': ['Default', 'WithIcons', 'WithActions'],
  'DataDisplay/TreeView': ['Default', 'Expanded', 'WithIcons'],
  'DataDisplay/DescriptionList': ['Default', 'Horizontal', 'WithDividers'],
  'DataDisplay/EmptyState': ['Default', 'WithAction', 'NoResults'],
  
  // Phase 3 Priority 2 Components (25)
  'OverlaysModals/Drawer': ['Default', 'Left', 'Right', 'Top', 'Bottom'],
  'OverlaysModals/Popover': ['Default', 'Top', 'Right', 'Bottom', 'Left'],
  'OverlaysModals/ContextMenu': ['Default', 'WithMenuItems', 'Primary'],
  'OverlaysModals/Lightbox': ['Default', 'WithGallery', 'WithZoom'],
  'OverlaysModals/NotificationDrawer': ['Default', 'WithNotifications', 'WithFilters'],
  
  'MediaIcons/Avatar': ['Default', 'WithImage', 'WithInitials', 'Small', 'Large'],
  'MediaIcons/AvatarGroup': ['Default', 'WithOverflow', 'Small', 'Large'],
  'MediaIcons/Icon': ['Default', 'Small', 'Large', 'Primary', 'Secondary'],
  'MediaIcons/Image': ['Default', 'WithAspectRatio', 'WithFallback'],
  'MediaIcons/Gallery': ['Default', 'Grid', 'WithThumbnails'],
  
  'BadgesLabels/Tag': ['Default', 'Removable', 'Primary', 'Secondary'],
  'BadgesLabels/ChipGroup': ['Default', 'Filterable', 'MultiSelect'],
  'BadgesLabels/Label': ['Default', 'Required', 'WithTooltip'],
  'BadgesLabels/LabelGroup': ['Default', 'WithTags', 'Wrapped'],
  'BadgesLabels/StatusBadge': ['Default', 'Success', 'Warning', 'Error'],
  
  'ProgressLoading/Skeleton': ['Default', 'Text', 'Circle', 'Rectangle'],
  'ProgressLoading/ProgressCircle': ['Default', 'WithValue', 'Large'],
  'ProgressLoading/ProgressSteps': ['Default', 'Active', 'Completed'],
  'ProgressLoading/LoadingOverlay': ['Default', 'WithMessage', 'Fullscreen'],
  'ProgressLoading/BusyIndicator': ['Default', 'Small', 'Inline'],
  
  'LayoutStructure/Grid': ['Default', 'Responsive', 'WithGaps'],
  'LayoutStructure/Stack': ['Default', 'Horizontal', 'WithSpacing'],
  'LayoutStructure/Divider': ['Default', 'Vertical', 'WithText'],
  'LayoutStructure/Panel': ['Default', 'Collapsible', 'WithHeader'],
  'LayoutStructure/Accordion': ['Default', 'MultipleOpen', 'WithIcons'],
};

const VIEWPORTS = {
  desktop: { width: 1024, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// Test each component in each story variant
Object.entries(COMPONENTS).forEach(([component, stories]) => {
  test.describe(`Visual: ${component}`, () => {
    stories.forEach(story => {
      test(`${story} - Desktop`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--${story.toLowerCase()}&viewMode=story`);
        
        // Wait for any animations to complete
        await page.waitForTimeout(1000);
        
        // Take screenshot of the story
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-${story}-desktop.png`);
      });
      
      test(`${story} - Mobile`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--${story.toLowerCase()}&viewMode=story`);
        
        // Wait for any animations to complete
        await page.waitForTimeout(1000);
        
        // Take screenshot of the story
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-${story}-mobile.png`);
      });
    });
    
    // Test hover states for interactive components
    if (component.includes('Button') || component.includes('Link') || component.includes('Icon')) {
      test(`Hover states - Desktop`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--default&viewMode=story`);
        
        // Wait for loading
        await page.waitForTimeout(1000);
        
        // Find interactive element and hover
        const interactive = page.locator('button, a, [role="button"]').first();
        await interactive.hover();
        
        // Wait for hover animations
        await page.waitForTimeout(500);
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-hover-desktop.png`);
      });
    }
    
    // Test focus states for interactive components  
    if (component.includes('Button') || component.includes('Input') || component.includes('Select')) {
      test(`Focus states - Desktop`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--default&viewMode=story`);
        
        // Wait for loading
        await page.waitForTimeout(1000);
        
        // Find focusable element and focus
        const focusable = page.locator('button, input, select, [tabindex="0"]').first();
        await focusable.focus();
        
        // Wait for focus styles
        await page.waitForTimeout(200);
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-focus-desktop.png`);
      });
    }
  });
});

// Test dark mode variants for key components
const DARK_MODE_COMPONENTS = [
  'Atoms/Button',
  'Molecules/Input', 
  'Molecules/Alert',
  'Organisms/Card',
  'Organisms/Modal',
  'Navigation/NavigationBar',
  'OverlaysModals/Drawer',
  'MediaIcons/Avatar'
];

DARK_MODE_COMPONENTS.forEach(component => {
  test.describe(`Dark Mode: ${component}`, () => {
    test('Default - Dark Theme', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      // Add dark mode class to enable dark theme
      await page.addInitScript(() => {
        document.documentElement.classList.add('dark-theme');
      });
      
      await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--default&viewMode=story`);
      
      // Wait for theme application
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-default-dark.png`);
    });
  });
});

// Test high contrast mode for accessibility
const HIGH_CONTRAST_COMPONENTS = [
  'Atoms/Button',
  'Molecules/Input',
  'Molecules/Alert',
  'Navigation/NavigationBar'
];

HIGH_CONTRAST_COMPONENTS.forEach(component => {
  test.describe(`High Contrast: ${component}`, () => {
    test('Default - High Contrast', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      // Add high contrast class
      await page.addInitScript(() => {
        document.documentElement.classList.add('high-contrast-theme');
      });
      
      await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--default&viewMode=story`);
      
      // Wait for theme application
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-default-high-contrast.png`);
    });
  });
});

// Test animation states
const ANIMATED_COMPONENTS = [
  'Atoms/Spinner',
  'Atoms/ProgressBar', 
  'ProgressLoading/Skeleton',
  'ProgressLoading/ProgressCircle',
  'ProgressLoading/BusyIndicator'
];

ANIMATED_COMPONENTS.forEach(component => {
  test.describe(`Animation: ${component}`, () => {
    test('Animation States', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`/iframe.html?args=&id=${component.toLowerCase().replace('/', '-')}--default&viewMode=story`);
      
      // Wait for initial render
      await page.waitForTimeout(1000);
      
      // Capture initial state
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-animation-start.png`);
      
      // Wait for animation cycle
      await page.waitForTimeout(2000);
      
      // Capture mid-animation state
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component.replace('/', '-')}-animation-mid.png`);
    });
  });
});