import { test, expect } from '@playwright/test';

// Test comprehensive visual regression for key user journeys
test.describe('Visual Regression - User Journeys', () => {
  
  test('Form Flow - Complete Registration', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=forms-form--multi-step&viewMode=story');
    
    // Step 1: Initial state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('form-flow-01-initial.png');
    
    // Step 2: Fill first step
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('form-flow-02-filled.png');
    
    // Step 3: Validation error state
    await page.fill('input[name="email"]', 'invalid-email');
    await page.blur();
    await page.waitForTimeout(500);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('form-flow-03-error.png');
    
    // Step 4: Valid state
    await page.fill('input[name="email"]', 'john@example.com');
    await page.blur();
    await page.waitForTimeout(500);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('form-flow-04-valid.png');
  });
  
  test('Navigation Flow - Menu Interactions', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=navigation-navigationbar--with-submenu&viewMode=story');
    
    // Initial state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('nav-flow-01-initial.png');
    
    // Hover over menu item
    await page.hover('[role="menuitem"]');
    await page.waitForTimeout(300);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('nav-flow-02-hover.png');
    
    // Open submenu
    await page.click('[role="menuitem"]');
    await page.waitForTimeout(300);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('nav-flow-03-submenu.png');
  });
  
  test('Modal Flow - Complete Interaction', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=organisms-modal--with-form&viewMode=story');
    
    // Initial state (modal closed)
    await expect(page.locator('#storybook-root')).toHaveScreenshot('modal-flow-01-closed.png');
    
    // Open modal
    await page.click('button:has-text("Open Modal")');
    await page.waitForTimeout(500);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('modal-flow-02-opened.png');
    
    // Fill form in modal
    await page.fill('[role="dialog"] input[name="name"]', 'Test User');
    await page.fill('[role="dialog"] textarea[name="message"]', 'Test message');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('modal-flow-03-filled.png');
    
    // Submit form
    await page.click('[role="dialog"] button:has-text("Submit")');
    await page.waitForTimeout(300);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('modal-flow-04-submitted.png');
  });
  
  test('Data Display Flow - Table Interactions', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=organisms-table--with-sorting&viewMode=story');
    
    // Initial state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('table-flow-01-initial.png');
    
    // Sort by column
    await page.click('th:has-text("Name")');
    await page.waitForTimeout(300);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('table-flow-02-sorted-asc.png');
    
    // Sort descending
    await page.click('th:has-text("Name")');
    await page.waitForTimeout(300);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('table-flow-03-sorted-desc.png');
    
    // Select row
    await page.click('tr[data-row="0"] input[type="checkbox"]');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('table-flow-04-row-selected.png');
  });
  
  test('Loading States Flow', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=progressloading-loadingoverlay--with-steps&viewMode=story');
    
    // Initial loading state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('loading-flow-01-initial.png');
    
    // Progress step 1
    await page.waitForTimeout(1000);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('loading-flow-02-step1.png');
    
    // Progress step 2
    await page.waitForTimeout(1000);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('loading-flow-03-step2.png');
    
    // Completion
    await page.waitForTimeout(1000);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('loading-flow-04-complete.png');
  });
});

test.describe('Cross-Browser Consistency', () => {
  const components = [
    'atoms-button--default',
    'molecules-input--default', 
    'organisms-card--default',
    'navigation-navigationbar--default',
    'overlaysmodals-drawer--default'
  ];
  
  components.forEach(component => {
    test(`${component} - Cross Browser`, async ({ page, browserName }) => {
      await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component}-${browserName}.png`);
    });
  });
});

test.describe('Responsive Breakpoints', () => {
  const breakpoints = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1024, height: 768 },
    wide: { width: 1440, height: 900 }
  };
  
  const responsiveComponents = [
    'layoutstructure-grid--responsive',
    'navigation-navigationbar--default',
    'organisms-card--default',
    'forms-form--default'
  ];
  
  responsiveComponents.forEach(component => {
    Object.entries(breakpoints).forEach(([name, viewport]) => {
      test(`${component} - ${name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
        await page.waitForTimeout(1000);
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component}-${name}.png`);
      });
    });
  });
});

test.describe('Theme Consistency', () => {
  const themes = ['light', 'dark', 'high-contrast'];
  const themeComponents = [
    'atoms-button--default',
    'molecules-alert--default',
    'organisms-modal--default',
    'navigation-navigationbar--default'
  ];
  
  themes.forEach(theme => {
    themeComponents.forEach(component => {
      test(`${component} - ${theme} theme`, async ({ page }) => {
        await page.addInitScript((theme) => {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
          } else if (theme === 'high-contrast') {
            document.documentElement.classList.add('high-contrast-theme');
          }
        }, theme);
        
        await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
        await page.waitForTimeout(1000);
        
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${component}-${theme}.png`);
      });
    });
  });
});

test.describe('Accessibility Visual States', () => {
  test('Focus indicators - Keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=forms-form--with-validation&viewMode=story');
    
    // Tab through form elements
    const focusableElements = [
      'input[name="firstName"]',
      'input[name="lastName"]', 
      'input[name="email"]',
      'select[name="country"]',
      'button[type="submit"]'
    ];
    
    for (let i = 0; i < focusableElements.length; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`focus-indicator-${i + 1}.png`);
    }
  });
  
  test('High contrast mode - All interactive elements', async ({ page }) => {
    await page.addInitScript(() => {
      document.documentElement.classList.add('high-contrast-theme');
    });
    
    const components = [
      'atoms-button--primary',
      'molecules-input--default',
      'molecules-checkbox--default',
      'molecules-select--default',
      'organisms-card--with-actions'
    ];
    
    for (const component of components) {
      await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
      await page.waitForTimeout(1000);
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`high-contrast-${component}.png`);
    }
  });
  
  test('Reduced motion - Animation disabled', async ({ page }) => {
    await page.addInitScript(() => {
      // Simulate prefers-reduced-motion
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    });
    
    const animatedComponents = [
      'atoms-spinner--default',
      'progressloading-skeleton--default',
      'progressloading-progresscircle--default',
      'overlaysmodals-drawer--default'
    ];
    
    for (const component of animatedComponents) {
      await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
      await page.waitForTimeout(500);
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`reduced-motion-${component}.png`);
    }
  });
});

test.describe('Print Styles', () => {
  test('Print layout - Key components', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    
    const printComponents = [
      'organisms-card--default',
      'organisms-table--default',
      'forms-form--default',
      'datadisplay-list--default'
    ];
    
    for (const component of printComponents) {
      await page.goto(`/iframe.html?args=&id=${component}&viewMode=story`);
      await page.waitForTimeout(1000);
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`print-${component}.png`);
    }
  });
});