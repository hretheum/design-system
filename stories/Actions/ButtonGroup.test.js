/**
 * Interaction tests for ButtonGroup component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const ButtonGroupTests = {
  /**
   * Test basic button group functionality
   */
  async testBasicButtonGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: /button group/i });
    
    // Check group exists
    await expect(group).toBeInTheDocument();
    
    // Check buttons in group
    const buttons = within(group).getAllByRole('button');
    await expect(buttons).toHaveLength(3);
    
    // Test clicking each button
    for (const button of buttons) {
      const onClick = jest.fn();
      button.onclick = onClick;
      await userEvent.click(button);
      await expect(onClick).toHaveBeenCalled();
    }
  },

  /**
   * Test toggle group behavior
   */
  async testToggleGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByTestId('toggle-button-group');
    const buttons = within(group).getAllByRole('button');
    
    // Initially none selected
    for (const button of buttons) {
      await expect(button).toHaveAttribute('aria-pressed', 'false');
    }
    
    // Click first button
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    
    // Click second button - first should deselect
    await userEvent.click(buttons[1]);
    await expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
  },

  /**
   * Test multi-select group
   */
  async testMultiSelectGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByTestId('multi-select-button-group');
    const buttons = within(group).getAllByRole('button');
    
    // Click multiple buttons
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    
    // Both should be selected
    await expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    
    // Click again to deselect
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
  },

  /**
   * Test button group orientation
   */
  async testGroupOrientation(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test horizontal group
    const horizontalGroup = canvas.getByTestId('horizontal-button-group');
    await expect(horizontalGroup).toHaveStyle({ flexDirection: 'row' });
    
    // Test vertical group
    const verticalGroup = canvas.getByTestId('vertical-button-group');
    await expect(verticalGroup).toHaveStyle({ flexDirection: 'column' });
  },

  /**
   * Test button group sizes
   */
  async testGroupSizes(canvasElement) {
    const canvas = within(canvasElement);
    
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    for (const size of sizes) {
      const group = canvas.getByTestId(`button-group-${size}`);
      const buttons = within(group).getAllByRole('button');
      
      for (const button of buttons) {
        await expect(button).toHaveClass(`button--${size}`);
      }
    }
  },

  /**
   * Test button group variants
   */
  async testGroupVariants(canvasElement) {
    const canvas = within(canvasElement);
    
    const variants = ['primary', 'secondary', 'ghost', 'danger'];
    
    for (const variant of variants) {
      const group = canvas.getByTestId(`button-group-${variant}`);
      const buttons = within(group).getAllByRole('button');
      
      for (const button of buttons) {
        await expect(button).toHaveClass(`button--${variant}`);
      }
    }
  },

  /**
   * Test disabled group
   */
  async testDisabledGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByTestId('disabled-button-group');
    const buttons = within(group).getAllByRole('button');
    
    // All buttons should be disabled
    for (const button of buttons) {
      await expect(button).toBeDisabled();
      
      // Try to click - should not work
      const onClick = jest.fn();
      button.onclick = onClick;
      await userEvent.click(button);
      await expect(onClick).not.toHaveBeenCalled();
    }
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group');
    const buttons = within(group).getAllByRole('button');
    
    // Tab to first button
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();
    
    // Arrow right to next button
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[1]).toHaveFocus();
    
    // Arrow right to last button
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[2]).toHaveFocus();
    
    // Arrow right should wrap to first
    await userEvent.keyboard('{ArrowRight}');
    await expect(buttons[0]).toHaveFocus();
    
    // Arrow left should go to last
    await userEvent.keyboard('{ArrowLeft}');
    await expect(buttons[2]).toHaveFocus();
  },

  /**
   * Test button group with icons
   */
  async testIconButtonGroup(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByTestId('icon-button-group');
    const buttons = within(group).getAllByRole('button');
    
    // Check each button has an icon
    for (const button of buttons) {
      const icon = within(button).getByTestId(/icon/i);
      await expect(icon).toBeInTheDocument();
    }
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group');
    
    // Test ARIA attributes on group
    await expect(group).toHaveAttribute('role', 'group');
    await expect(group).toHaveAttribute('aria-label');
    
    // Test button accessibility
    const buttons = within(group).getAllByRole('button');
    for (let i = 0; i < buttons.length; i++) {
      await expect(buttons[i]).toHaveAttribute('aria-posinset', String(i + 1));
      await expect(buttons[i]).toHaveAttribute('aria-setsize', String(buttons.length));
    }
  }
};

// Export individual test functions
export const testBasicButtonGroup = ButtonGroupTests.testBasicButtonGroup;
export const testToggleGroup = ButtonGroupTests.testToggleGroup;
export const testMultiSelectGroup = ButtonGroupTests.testMultiSelectGroup;
export const testGroupOrientation = ButtonGroupTests.testGroupOrientation;
export const testGroupSizes = ButtonGroupTests.testGroupSizes;
export const testGroupVariants = ButtonGroupTests.testGroupVariants;
export const testDisabledGroup = ButtonGroupTests.testDisabledGroup;
export const testKeyboardNavigation = ButtonGroupTests.testKeyboardNavigation;
export const testIconButtonGroup = ButtonGroupTests.testIconButtonGroup;
export const testAccessibility = ButtonGroupTests.testAccessibility;