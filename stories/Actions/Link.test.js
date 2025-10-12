/**
 * Interaction tests for Link component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const LinkTests = {
  /**
   * Test basic link functionality
   */
  async testBasicLink(canvasElement) {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /click me/i });
    
    // Test presence
    await expect(link).toBeInTheDocument();
    
    // Test href attribute
    await expect(link).toHaveAttribute('href', '#');
    
    // Test hover state
    await testUtils.testHoverState(canvas, 'link');
    
    // Test keyboard navigation
    await userEvent.tab();
    await expect(link).toHaveFocus();
    
    // Test Enter key activation
    await userEvent.keyboard('{Enter}');
  },

  /**
   * Test external link
   */
  async testExternalLink(canvasElement) {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /external/i });
    
    // Check for external link attributes
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check for external icon
    const icon = within(link).getByTestId('external-icon');
    await expect(icon).toBeInTheDocument();
  },

  /**
   * Test disabled link
   */
  async testDisabledLink(canvasElement) {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /disabled/i });
    
    // Check disabled state
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).toHaveStyle({ pointerEvents: 'none' });
    
    // Try to click - should not trigger
    const onClick = jest.fn();
    link.onclick = onClick;
    await userEvent.click(link);
    await expect(onClick).not.toHaveBeenCalled();
  },

  /**
   * Test link variants
   */
  async testLinkVariants(canvasElement) {
    const canvas = within(canvasElement);
    
    const variants = ['default', 'underline', 'hover-underline', 'no-underline'];
    
    for (const variant of variants) {
      const link = canvas.getByTestId(`link-${variant}`);
      await expect(link).toBeInTheDocument();
      
      // Test variant-specific styles
      if (variant === 'underline') {
        await expect(link).toHaveStyle({ textDecoration: 'underline' });
      } else if (variant === 'no-underline') {
        await expect(link).toHaveStyle({ textDecoration: 'none' });
      }
    }
  },

  /**
   * Test link with icon
   */
  async testLinkWithIcon(canvasElement) {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /download/i });
    
    // Check for icon presence
    const icon = within(link).getByTestId('download-icon');
    await expect(icon).toBeInTheDocument();
    
    // Check icon positioning
    const iconPosition = within(link).getByTestId('icon-start');
    await expect(iconPosition).toBeInTheDocument();
  },

  /**
   * Test link sizes
   */
  async testLinkSizes(canvasElement) {
    const canvas = within(canvasElement);
    
    const sizes = {
      sm: '14px',
      md: '16px', 
      lg: '18px'
    };
    
    for (const [size, fontSize] of Object.entries(sizes)) {
      const link = canvas.getByTestId(`link-size-${size}`);
      await expect(link).toHaveStyle({ fontSize });
    }
  },

  /**
   * Test link accessibility
   */
  async testLinkAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    // Test ARIA attributes
    testUtils.testAriaAttributes(link, {
      'role': 'link',
      'tabindex': '0'
    });
    
    // Test keyboard navigation
    await testUtils.testKeyboardNavigation(canvas, 'link');
    
    // Test screen reader text
    const srText = canvas.getByText(/opens in new window/i);
    await expect(srText).toHaveClass('sr-only');
  }
};

// Export individual test functions for Storybook
export const testBasicLink = LinkTests.testBasicLink;
export const testExternalLink = LinkTests.testExternalLink;
export const testDisabledLink = LinkTests.testDisabledLink;
export const testLinkVariants = LinkTests.testLinkVariants;
export const testLinkWithIcon = LinkTests.testLinkWithIcon;
export const testLinkSizes = LinkTests.testLinkSizes;
export const testLinkAccessibility = LinkTests.testLinkAccessibility;