/**
 * Interaction tests for ActionMenu component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const ActionMenuTests = {
  /**
   * Test basic action menu functionality
   */
  async testBasicActionMenu(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /actions/i });
    
    // Test trigger exists
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open menu
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Check menu is visible
    const menu = await waitFor(() => canvas.getByRole('menu'));
    await expect(menu).toBeInTheDocument();
    
    // Check menu items
    const menuItems = within(menu).getAllByRole('menuitem');
    await expect(menuItems.length).toBeGreaterThan(0);
  },

  /**
   * Test menu item selection
   */
  async testMenuItemSelection(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /actions/i });
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Click menu item
    const editItem = within(menu).getByRole('menuitem', { name: /edit/i });
    const onEdit = jest.fn();
    editItem.onclick = onEdit;
    
    await userEvent.click(editItem);
    await expect(onEdit).toHaveBeenCalled();
    
    // Menu should close after selection
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },

  /**
   * Test menu with sections
   */
  async testMenuSections(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('sectioned-action-menu');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check for section headers
    const sections = within(menu).getAllByRole('separator');
    await expect(sections.length).toBeGreaterThan(0);
    
    // Check section labels
    const sectionLabels = within(menu).getAllByRole('heading');
    await expect(sectionLabels.length).toBeGreaterThan(0);
  },

  /**
   * Test menu with icons
   */
  async testMenuWithIcons(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('icon-action-menu');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check menu items have icons
    const menuItems = within(menu).getAllByRole('menuitem');
    for (const item of menuItems) {
      const icon = within(item).queryByTestId(/icon/i);
      await expect(icon).toBeInTheDocument();
    }
  },

  /**
   * Test disabled menu items
   */
  async testDisabledMenuItems(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /actions/i });
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Find disabled item
    const disabledItem = within(menu).getByRole('menuitem', { name: /delete/i });
    await expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    
    // Try to click disabled item
    const onClick = jest.fn();
    disabledItem.onclick = onClick;
    await userEvent.click(disabledItem);
    await expect(onClick).not.toHaveBeenCalled();
    
    // Menu should stay open
    await expect(menu).toBeInTheDocument();
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /actions/i });
    
    // Focus trigger
    trigger.focus();
    await expect(trigger).toHaveFocus();
    
    // Open with Enter
    await userEvent.keyboard('{Enter}');
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // First item should be focused
    const menuItems = within(menu).getAllByRole('menuitem');
    await waitFor(() => {
      expect(menuItems[0]).toHaveFocus();
    });
    
    // Navigate down
    await userEvent.keyboard('{ArrowDown}');
    await expect(menuItems[1]).toHaveFocus();
    
    // Navigate up
    await userEvent.keyboard('{ArrowUp}');
    await expect(menuItems[0]).toHaveFocus();
    
    // Close with Escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveFocus();
  },

  /**
   * Test menu positioning
   */
  async testMenuPositioning(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test different positions
    const positions = ['bottom', 'top', 'left', 'right'];
    
    for (const position of positions) {
      const trigger = canvas.getByTestId(`action-menu-${position}`);
      
      await userEvent.click(trigger);
      const menu = await waitFor(() => {
        return within(canvasElement).getByTestId(`menu-${position}`);
      });
      
      await expect(menu).toHaveAttribute('data-position', position);
      
      // Close menu
      await userEvent.keyboard('{Escape}');
    }
  },

  /**
   * Test nested menus
   */
  async testNestedMenus(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('nested-action-menu');
    
    // Open main menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Find submenu trigger
    const submenuTrigger = within(menu).getByRole('menuitem', { name: /more/i });
    await expect(submenuTrigger).toHaveAttribute('aria-haspopup', 'menu');
    
    // Hover to open submenu
    await userEvent.hover(submenuTrigger);
    
    const submenu = await waitFor(() => {
      return canvas.getAllByRole('menu')[1];
    });
    await expect(submenu).toBeInTheDocument();
    
    // Click submenu item
    const submenuItem = within(submenu).getAllByRole('menuitem')[0];
    await userEvent.click(submenuItem);
    
    // Both menus should close
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test menu with search
   */
  async testMenuWithSearch(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('searchable-action-menu');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Find search input
    const searchInput = within(menu).getByRole('searchbox');
    await expect(searchInput).toBeInTheDocument();
    
    // Type to filter
    await userEvent.type(searchInput, 'edit');
    
    // Check filtered results
    await waitFor(() => {
      const visibleItems = within(menu).getAllByRole('menuitem');
      expect(visibleItems.every(item => 
        item.textContent.toLowerCase().includes('edit')
      )).toBe(true);
    });
    
    // Clear search
    await userEvent.clear(searchInput);
    
    // All items should be visible again
    await waitFor(() => {
      const allItems = within(menu).getAllByRole('menuitem');
      expect(allItems.length).toBeGreaterThan(1);
    });
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /actions/i });
    
    // Test trigger accessibility
    testUtils.testAriaAttributes(trigger, {
      'aria-haspopup': 'menu',
      'aria-expanded': 'false',
      'role': 'button'
    });
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Test menu accessibility
    await expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
    
    // Test menu items
    const menuItems = within(menu).getAllByRole('menuitem');
    for (const item of menuItems) {
      await expect(item).toHaveAttribute('tabindex');
    }
  }
};

// Export individual test functions
export const testBasicActionMenu = ActionMenuTests.testBasicActionMenu;
export const testMenuItemSelection = ActionMenuTests.testMenuItemSelection;
export const testMenuSections = ActionMenuTests.testMenuSections;
export const testMenuWithIcons = ActionMenuTests.testMenuWithIcons;
export const testDisabledMenuItems = ActionMenuTests.testDisabledMenuItems;
export const testKeyboardNavigation = ActionMenuTests.testKeyboardNavigation;
export const testMenuPositioning = ActionMenuTests.testMenuPositioning;
export const testNestedMenus = ActionMenuTests.testNestedMenus;
export const testMenuWithSearch = ActionMenuTests.testMenuWithSearch;
export const testAccessibility = ActionMenuTests.testAccessibility;