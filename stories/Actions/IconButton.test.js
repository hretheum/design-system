/**
 * Interaction tests for IconButton component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const IconButtonTests = {
  /**
   * Test basic icon button functionality
   */
  async testBasicIconButton(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /settings/i });
    
    // Test presence
    await expect(button).toBeInTheDocument();
    
    // Test click interaction
    const onClick = jest.fn();
    button.onclick = onClick;
    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalledTimes(1);
    
    // Test hover state
    await testUtils.testHoverState(canvas, 'button');
  },

  /**
   * Test icon button sizes
   */
  async testIconButtonSizes(canvasElement) {
    const canvas = within(canvasElement);
    
    const sizes = {
      xs: { width: '24px', height: '24px' },
      sm: { width: '32px', height: '32px' },
      md: { width: '40px', height: '40px' },
      lg: { width: '48px', height: '48px' }
    };
    
    for (const [size, dimensions] of Object.entries(sizes)) {
      const button = canvas.getByTestId(`icon-button-${size}`);
      await expect(button).toHaveStyle(dimensions);
    }
  },

  /**
   * Test icon button variants
   */
  async testIconButtonVariants(canvasElement) {
    const canvas = within(canvasElement);
    
    const variants = ['primary', 'secondary', 'ghost', 'danger'];
    
    for (const variant of variants) {
      const button = canvas.getByTestId(`icon-button-${variant}`);
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass(`icon-button--${variant}`);
    }
  },

  /**
   * Test disabled state
   */
  async testDisabledIconButton(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });
    
    // Check disabled state
    testUtils.testDisabledState(button);
    
    // Try to click - should not trigger
    const onClick = jest.fn();
    button.onclick = onClick;
    await userEvent.click(button);
    await expect(onClick).not.toHaveBeenCalled();
  },

  /**
   * Test loading state
   */
  async testLoadingIconButton(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('loading-icon-button');
    
    // Check for spinner
    const spinner = within(button).getByRole('status');
    await expect(spinner).toBeInTheDocument();
    
    // Check aria-busy
    await expect(button).toHaveAttribute('aria-busy', 'true');
    
    // Should be disabled while loading
    await expect(button).toBeDisabled();
  },

  /**
   * Test icon button tooltip
   */
  async testIconButtonTooltip(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /edit/i });
    
    // Hover to show tooltip
    await userEvent.hover(button);
    
    await waitFor(() => {
      const tooltip = canvas.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Edit item');
    });
    
    // Unhover to hide tooltip
    await userEvent.unhover(button);
    
    await waitFor(() => {
      expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  },

  /**
   * Test keyboard navigation
   */
  async testIconButtonKeyboard(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /delete/i });
    
    // Tab to focus
    await userEvent.tab();
    await expect(button).toHaveFocus();
    
    // Test Enter key
    const onEnter = jest.fn();
    button.onclick = onEnter;
    await userEvent.keyboard('{Enter}');
    await expect(onEnter).toHaveBeenCalled();
    
    // Test Space key
    const onSpace = jest.fn();
    button.onclick = onSpace;
    await userEvent.keyboard(' ');
    await expect(onSpace).toHaveBeenCalled();
  },

  /**
   * Test icon button group
   */
  async testIconButtonGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: /formatting/i });
    
    // Check all buttons in group
    const buttons = within(group).getAllByRole('button');
    await expect(buttons).toHaveLength(3);
    
    // Test toggle behavior
    const boldButton = within(group).getByRole('button', { name: /bold/i });
    await userEvent.click(boldButton);
    await expect(boldButton).toHaveAttribute('aria-pressed', 'true');
    
    // Click again to toggle off
    await userEvent.click(boldButton);
    await expect(boldButton).toHaveAttribute('aria-pressed', 'false');
  },

  /**
   * Test accessibility
   */
  async testIconButtonAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /save/i });
    
    // Test ARIA label
    await expect(button).toHaveAttribute('aria-label', 'Save document');
    
    // Test ARIA attributes
    testUtils.testAriaAttributes(button, {
      'role': 'button',
      'tabindex': '0',
      'aria-describedby': expect.any(String)
    });
  }
};

// Export individual test functions
export const testBasicIconButton = IconButtonTests.testBasicIconButton;
export const testIconButtonSizes = IconButtonTests.testIconButtonSizes;
export const testIconButtonVariants = IconButtonTests.testIconButtonVariants;
export const testDisabledIconButton = IconButtonTests.testDisabledIconButton;
export const testLoadingIconButton = IconButtonTests.testLoadingIconButton;
export const testIconButtonTooltip = IconButtonTests.testIconButtonTooltip;
export const testIconButtonKeyboard = IconButtonTests.testIconButtonKeyboard;
export const testIconButtonGroup = IconButtonTests.testIconButtonGroup;
export const testIconButtonAccessibility = IconButtonTests.testIconButtonAccessibility;