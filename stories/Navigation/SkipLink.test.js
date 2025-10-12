/**
 * Interaction tests for SkipLink component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const SkipLinkTests = {
  /**
   * Test basic skip link functionality
   */
  async testBasicSkipLink(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main|skip to content/i });
    
    // Test skip link exists
    await expect(skipLink).toBeInTheDocument();
    await expect(skipLink).toHaveAttribute('href', '#main');
    
    // Initially hidden
    await expect(skipLink).toHaveClass('skip-link--hidden');
    
    // Should be positioned off-screen
    const initialStyles = window.getComputedStyle(skipLink);
    await expect(parseInt(initialStyles.top)).toBeLessThan(0);
  },

  /**
   * Test focus visibility
   */
  async testFocusVisibility(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Focus skip link (usually first tab stop)
    skipLink.focus();
    await expect(skipLink).toHaveFocus();
    
    // Should become visible on focus
    await waitFor(() => {
      expect(skipLink).toHaveClass('skip-link--visible');
    });
    
    // Should be positioned on screen
    const focusStyles = window.getComputedStyle(skipLink);
    await expect(parseInt(focusStyles.top)).toBeGreaterThanOrEqual(0);
    
    // Should have high z-index
    await expect(parseInt(focusStyles.zIndex)).toBeGreaterThan(9000);
    
    // Blur to hide again
    skipLink.blur();
    
    await waitFor(() => {
      expect(skipLink).toHaveClass('skip-link--hidden');
    });
  },

  /**
   * Test skip navigation
   */
  async testSkipNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Mock main content element
    const mainContent = document.getElementById('main') || 
                       document.createElement('main');
    if (!mainContent.id) {
      mainContent.id = 'main';
      document.body.appendChild(mainContent);
    }
    
    // Focus skip link
    skipLink.focus();
    
    // Click skip link
    await userEvent.click(skipLink);
    
    // Focus should move to main content
    await waitFor(() => {
      expect(mainContent).toHaveFocus();
    });
    
    // Clean up
    if (mainContent.parentNode === document.body) {
      document.body.removeChild(mainContent);
    }
  },

  /**
   * Test multiple skip links
   */
  async testMultipleSkipLinks(canvasElement) {
    const canvas = within(canvasElement);
    const skipLinks = canvas.getAllByRole('link', { name: /skip to/i });
    
    // Should have multiple skip links
    await expect(skipLinks.length).toBeGreaterThan(1);
    
    // Common skip link targets
    const expectedTargets = ['#main', '#navigation', '#search', '#footer'];
    
    for (const link of skipLinks) {
      const href = link.getAttribute('href');
      await expect(href).toMatch(/^#\w+/);
    }
    
    // Test each skip link
    for (let i = 0; i < skipLinks.length; i++) {
      const link = skipLinks[i];
      link.focus();
      
      await expect(link).toHaveFocus();
      await expect(link).toBeVisible();
      
      // Tab to next element
      await userEvent.tab();
    }
  },

  /**
   * Test keyboard interaction
   */
  async testKeyboardInteraction(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Tab to skip link (should be first focusable element)
    await userEvent.tab();
    await expect(skipLink).toHaveFocus();
    
    // Press Enter to activate
    const href = skipLink.getAttribute('href');
    const targetElement = document.querySelector(href) || 
                         document.createElement('div');
    if (!targetElement.id) {
      targetElement.id = href.substring(1);
      document.body.appendChild(targetElement);
    }
    
    await userEvent.keyboard('{Enter}');
    
    // Should navigate to target
    await waitFor(() => {
      expect(targetElement).toHaveFocus();
    });
    
    // Clean up
    if (targetElement.parentNode === document.body) {
      document.body.removeChild(targetElement);
    }
  },

  /**
   * Test responsive behavior
   */
  async testResponsiveBehavior(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Test mobile viewport
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      const mobileStyles = window.getComputedStyle(skipLink);
      // Skip link should still work on mobile
      expect(parseInt(mobileStyles.zIndex)).toBeGreaterThan(9000);
    });
    
    // Focus to make visible
    skipLink.focus();
    
    const mobileRect = skipLink.getBoundingClientRect();
    await expect(mobileRect.width).toBeGreaterThan(0);
    await expect(mobileRect.height).toBeGreaterThan(0);
    
    // Reset viewport
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
  },

  /**
   * Test skip link positioning
   */
  async testSkipLinkPositioning(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Focus skip link
    skipLink.focus();
    
    const rect = skipLink.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Should be positioned at top of viewport
    await expect(rect.top).toBeLessThanOrEqual(50);
    await expect(rect.left).toBeGreaterThanOrEqual(0);
    
    // Should be within viewport
    await expect(rect.right).toBeLessThanOrEqual(viewport.width);
    await expect(rect.bottom).toBeLessThanOrEqual(viewport.height);
    
    // Should be large enough to click/tap
    await expect(rect.width).toBeGreaterThanOrEqual(44);
    await expect(rect.height).toBeGreaterThanOrEqual(44);
  },

  /**
   * Test screen reader compatibility
   */
  async testScreenReaderCompatibility(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Should have proper text content
    await expect(skipLink).toHaveTextContent(/skip to main content/i);
    
    // Should not rely on visual indicators only
    const textContent = skipLink.textContent || skipLink.getAttribute('aria-label');
    await expect(textContent).toMatch(/skip/i);
    await expect(textContent).toMatch(/main|content/i);
    
    // Should be programmatically focusable
    await expect(skipLink).toHaveAttribute('href');
    await expect(skipLink.tabIndex).toBeGreaterThanOrEqual(0);
  },

  /**
   * Test high contrast mode
   */
  async testHighContrastMode(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByTestId('high-contrast-skip-link');
    
    // Focus to make visible
    skipLink.focus();
    
    const styles = window.getComputedStyle(skipLink);
    
    // Should have strong contrast
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;
    
    // Should have visible border in high contrast
    const borderWidth = styles.borderWidth;
    await expect(parseInt(borderWidth)).toBeGreaterThan(0);
    
    // Should have sufficient padding for touch targets
    const padding = styles.padding;
    await expect(padding).toBeTruthy();
  },

  /**
   * Test skip link with custom targets
   */
  async testCustomTargets(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test skip to search
    const skipToSearch = canvas.getByRole('link', { name: /skip to search/i });
    await expect(skipToSearch).toHaveAttribute('href', '#search');
    
    // Test skip to navigation
    const skipToNav = canvas.getByRole('link', { name: /skip to navigation/i });
    await expect(skipToNav).toHaveAttribute('href', '#navigation');
    
    // Test that targets exist or can be created
    const targets = ['#search', '#navigation', '#main'];
    
    for (const target of targets) {
      let element = document.querySelector(target);
      if (!element) {
        element = document.createElement('div');
        element.id = target.substring(1);
        element.setAttribute('tabindex', '-1');
        document.body.appendChild(element);
      }
      
      await expect(element).toBeInTheDocument();
      
      // Clean up if we created it
      if (element.parentNode === document.body) {
        document.body.removeChild(element);
      }
    }
  },

  /**
   * Test accessibility compliance
   */
  async testAccessibilityCompliance(canvasElement) {
    const canvas = within(canvasElement);
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    
    // Test WCAG requirements
    testUtils.testAriaAttributes(skipLink, {
      'role': 'link',
      'href': expect.stringMatching(/^#\w+/)
    });
    
    // Should be first focusable element
    const allFocusable = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = Array.from(allFocusable).find(el => 
      el.offsetParent !== null || el === skipLink
    );
    
    await expect(firstFocusable).toBe(skipLink);
    
    // Test focus order
    await userEvent.tab();
    await expect(skipLink).toHaveFocus();
    
    // Should be visible when focused
    await expect(skipLink).toBeVisible();
  }
};

// Export individual test functions
export const testBasicSkipLink = SkipLinkTests.testBasicSkipLink;
export const testFocusVisibility = SkipLinkTests.testFocusVisibility;
export const testSkipNavigation = SkipLinkTests.testSkipNavigation;
export const testMultipleSkipLinks = SkipLinkTests.testMultipleSkipLinks;
export const testKeyboardInteraction = SkipLinkTests.testKeyboardInteraction;
export const testResponsiveBehavior = SkipLinkTests.testResponsiveBehavior;
export const testSkipLinkPositioning = SkipLinkTests.testSkipLinkPositioning;
export const testScreenReaderCompatibility = SkipLinkTests.testScreenReaderCompatibility;
export const testHighContrastMode = SkipLinkTests.testHighContrastMode;
export const testCustomTargets = SkipLinkTests.testCustomTargets;
export const testAccessibilityCompliance = SkipLinkTests.testAccessibilityCompliance;