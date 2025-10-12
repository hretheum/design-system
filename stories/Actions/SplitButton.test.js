/**
 * Interaction tests for SplitButton component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const SplitButtonTests = {
  /**
   * Test basic split button functionality
   */
  async testBasicSplitButton(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test main button
    const mainButton = canvas.getByRole('button', { name: /save/i });
    await expect(mainButton).toBeInTheDocument();
    
    // Test dropdown button
    const dropdownButton = canvas.getByRole('button', { name: /more options/i });
    await expect(dropdownButton).toBeInTheDocument();
    
    // Click main button
    const onMainClick = jest.fn();
    mainButton.onclick = onMainClick;
    await userEvent.click(mainButton);
    await expect(onMainClick).toHaveBeenCalled();
    
    // Click dropdown button to open menu
    await userEvent.click(dropdownButton);
    
    await waitFor(() => {
      const menu = canvas.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  },

  /**
   * Test dropdown menu interactions
   */
  async testDropdownMenu(canvasElement) {
    const canvas = within(canvasElement);
    const dropdownButton = canvas.getByRole('button', { name: /more options/i });
    
    // Open menu
    await userEvent.click(dropdownButton);
    
    const menu = await waitFor(() => canvas.getByRole('menu'));
    const menuItems = within(menu).getAllByRole('menuitem');
    
    // Check menu items
    await expect(menuItems).toHaveLength(3);
    await expect(menuItems[0]).toHaveTextContent('Save as draft');
    await expect(menuItems[1]).toHaveTextContent('Save and close');
    await expect(menuItems[2]).toHaveTextContent('Save and new');
    
    // Click menu item
    const onItemClick = jest.fn();
    menuItems[0].onclick = onItemClick;
    await userEvent.click(menuItems[0]);
    await expect(onItemClick).toHaveBeenCalled();
    
    // Menu should close after selection
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const mainButton = canvas.getByRole('button', { name: /save/i });
    const dropdownButton = canvas.getByRole('button', { name: /more options/i });
    
    // Tab to main button
    await userEvent.tab();
    await expect(mainButton).toHaveFocus();
    
    // Tab to dropdown button
    await userEvent.tab();
    await expect(dropdownButton).toHaveFocus();
    
    // Open menu with Enter
    await userEvent.keyboard('{Enter}');
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Navigate menu with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    const firstItem = within(menu).getAllByRole('menuitem')[0];
    await expect(firstItem).toHaveFocus();
    
    // Close menu with Escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test split button variants
   */
  async testSplitButtonVariants(canvasElement) {
    const canvas = within(canvasElement);
    
    const variants = ['primary', 'secondary', 'danger', 'success'];
    
    for (const variant of variants) {
      const splitButton = canvas.getByTestId(`split-button-${variant}`);
      const mainButton = within(splitButton).getAllByRole('button')[0];
      const dropdownButton = within(splitButton).getAllByRole('button')[1];
      
      await expect(mainButton).toHaveClass(`button--${variant}`);
      await expect(dropdownButton).toHaveClass(`button--${variant}`);
    }
  },

  /**
   * Test disabled state
   */
  async testDisabledSplitButton(canvasElement) {
    const canvas = within(canvasElement);
    const splitButton = canvas.getByTestId('split-button-disabled');
    
    const mainButton = within(splitButton).getByRole('button', { name: /disabled/i });
    const dropdownButton = within(splitButton).getAllByRole('button')[1];
    
    // Both buttons should be disabled
    await expect(mainButton).toBeDisabled();
    await expect(dropdownButton).toBeDisabled();
    
    // Click should not work
    const onClick = jest.fn();
    mainButton.onclick = onClick;
    await userEvent.click(mainButton);
    await expect(onClick).not.toHaveBeenCalled();
  },

  /**
   * Test loading state
   */
  async testLoadingSplitButton(canvasElement) {
    const canvas = within(canvasElement);
    const splitButton = canvas.getByTestId('split-button-loading');
    
    const mainButton = within(splitButton).getAllByRole('button')[0];
    const spinner = within(mainButton).getByRole('status');
    
    // Check for loading indicator
    await expect(spinner).toBeInTheDocument();
    await expect(mainButton).toHaveAttribute('aria-busy', 'true');
    
    // Both buttons should be disabled while loading
    const buttons = within(splitButton).getAllByRole('button');
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  },

  /**
   * Test menu positioning
   */
  async testMenuPositioning(canvasElement) {
    const canvas = within(canvasElement);
    const dropdownButton = canvas.getByRole('button', { name: /more options/i });
    
    // Open menu
    await userEvent.click(dropdownButton);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check menu is positioned correctly
    const buttonRect = dropdownButton.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    
    // Menu should be below the button
    await expect(menuRect.top).toBeGreaterThanOrEqual(buttonRect.bottom);
    
    // Menu should be aligned with button
    await expect(Math.abs(menuRect.left - buttonRect.left)).toBeLessThan(10);
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const dropdownButton = canvas.getByRole('button', { name: /more options/i });
    
    // Test ARIA attributes
    await expect(dropdownButton).toHaveAttribute('aria-haspopup', 'menu');
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    await userEvent.click(dropdownButton);
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
    
    const menu = await waitFor(() => canvas.getByRole('menu'));
    await expect(menu).toHaveAttribute('aria-labelledby', dropdownButton.id);
  }
};

// Export individual test functions
export const testBasicSplitButton = SplitButtonTests.testBasicSplitButton;
export const testDropdownMenu = SplitButtonTests.testDropdownMenu;
export const testKeyboardNavigation = SplitButtonTests.testKeyboardNavigation;
export const testSplitButtonVariants = SplitButtonTests.testSplitButtonVariants;
export const testDisabledSplitButton = SplitButtonTests.testDisabledSplitButton;
export const testLoadingSplitButton = SplitButtonTests.testLoadingSplitButton;
export const testMenuPositioning = SplitButtonTests.testMenuPositioning;
export const testAccessibility = SplitButtonTests.testAccessibility;