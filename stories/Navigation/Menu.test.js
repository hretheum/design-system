/**
 * Interaction tests for Menu component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const MenuTests = {
  /**
   * Test basic menu functionality
   */
  async testBasicMenu(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /menu|options/i });
    
    // Test trigger exists
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Check menu appears
    const menu = await waitFor(() => canvas.getByRole('menu'));
    await expect(menu).toBeInTheDocument();
    await expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
    
    // Check menu items
    const menuItems = within(menu).getAllByRole('menuitem');
    await expect(menuItems.length).toBeGreaterThan(0);
  },

  /**
   * Test menu item selection
   */
  async testMenuItemSelection(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /menu/i });
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Select menu item
    const menuItems = within(menu).getAllByRole('menuitem');
    const firstItem = menuItems[0];
    
    const onClick = jest.fn();
    firstItem.onclick = onClick;
    
    await userEvent.click(firstItem);
    await expect(onClick).toHaveBeenCalled();
    
    // Menu should close after selection
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },

  /**
   * Test menu with icons
   */
  async testMenuWithIcons(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('icon-menu-trigger');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check menu items have icons
    const menuItems = within(menu).getAllByRole('menuitem');
    for (const item of menuItems) {
      const icon = within(item).queryByTestId(/icon/i);
      await expect(icon).toBeInTheDocument();
    }
    
    // Check icon spacing
    const firstItem = menuItems[0];
    const icon = within(firstItem).getByTestId(/icon/i);
    const iconRect = icon.getBoundingClientRect();
    const itemRect = firstItem.getBoundingClientRect();
    
    // Icon should be on the left with proper spacing
    await expect(iconRect.left).toBeGreaterThan(itemRect.left);
  },

  /**
   * Test menu with shortcuts
   */
  async testMenuWithShortcuts(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('shortcut-menu-trigger');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check for keyboard shortcuts
    const shortcutElements = within(menu).getAllByTestId(/shortcut/i);
    await expect(shortcutElements.length).toBeGreaterThan(0);
    
    // Check shortcut format
    const firstShortcut = shortcutElements[0];
    await expect(firstShortcut).toHaveTextContent(/Ctrl|Cmd|\+/);
  },

  /**
   * Test submenu functionality
   */
  async testSubmenu(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('submenu-trigger');
    
    // Open main menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Find submenu trigger
    const submenuTrigger = within(menu).getByRole('menuitem', { name: /more|submenu/i });
    await expect(submenuTrigger).toHaveAttribute('aria-haspopup', 'menu');
    
    // Hover to open submenu
    await userEvent.hover(submenuTrigger);
    
    const submenu = await waitFor(() => {
      const menus = canvas.getAllByRole('menu');
      return menus.find(m => m !== menu);
    });
    
    await expect(submenu).toBeInTheDocument();
    
    // Check submenu positioning
    const submenuRect = submenu.getBoundingClientRect();
    const triggerRect = submenuTrigger.getBoundingClientRect();
    
    // Submenu should be positioned to the right of the trigger
    await expect(submenuRect.left).toBeGreaterThanOrEqual(triggerRect.right - 10);
    
    // Click submenu item
    const submenuItems = within(submenu).getAllByRole('menuitem');
    await userEvent.click(submenuItems[0]);
    
    // Both menus should close
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test menu separators
   */
  async testMenuSeparators(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('separated-menu-trigger');
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Check for separators
    const separators = within(menu).getAllByRole('separator');
    await expect(separators.length).toBeGreaterThan(0);
    
    // Check separator positioning
    const menuItems = within(menu).getAllByRole('menuitem');
    const separator = separators[0];
    
    // Separator should be between menu items
    const separatorRect = separator.getBoundingClientRect();
    const beforeItem = menuItems[1];
    const afterItem = menuItems[2];
    
    await expect(separatorRect.top).toBeGreaterThan(beforeItem.getBoundingClientRect().bottom);
    await expect(separatorRect.bottom).toBeLessThan(afterItem.getBoundingClientRect().top);
  },

  /**
   * Test disabled menu items
   */
  async testDisabledMenuItems(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /menu/i });
    
    // Open menu
    await userEvent.click(trigger);
    const menu = await waitFor(() => canvas.getByRole('menu'));
    
    // Find disabled item
    const disabledItem = within(menu).getByRole('menuitem', { name: /disabled/i });
    await expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    await expect(disabledItem).toHaveClass('menu-item--disabled');
    
    // Try to click - should not work
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
    const trigger = canvas.getByRole('button', { name: /menu/i });
    
    // Focus trigger and open with Enter
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    
    const menu = await waitFor(() => canvas.getByRole('menu'));
    const menuItems = within(menu).getAllByRole('menuitem');
    
    // First item should be focused
    await waitFor(() => {
      expect(menuItems[0]).toHaveFocus();
    });
    
    // Arrow down navigation
    await userEvent.keyboard('{ArrowDown}');
    await expect(menuItems[1]).toHaveFocus();
    
    // Arrow up navigation
    await userEvent.keyboard('{ArrowUp}');
    await expect(menuItems[0]).toHaveFocus();
    
    // Home key goes to first item
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    await userEvent.keyboard('{Home}');
    await expect(menuItems[0]).toHaveFocus();
    
    // End key goes to last item
    await userEvent.keyboard('{End}');
    await expect(menuItems[menuItems.length - 1]).toHaveFocus();
    
    // Enter to select
    await userEvent.keyboard('{Enter}');
    
    // Menu should close
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test menu positioning
   */
  async testMenuPositioning(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test different positions
    const positions = ['bottom', 'top', 'left', 'right'];
    
    for (const position of positions) {
      const trigger = canvas.getByTestId(`menu-trigger-${position}`);
      
      await userEvent.click(trigger);
      const menu = await waitFor(() => canvas.getByTestId(`menu-${position}`));
      
      // Check position attribute
      await expect(menu).toHaveAttribute('data-position', position);
      
      // Check positioning relative to trigger
      const triggerRect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      
      switch (position) {
        case 'bottom':
          await expect(menuRect.top).toBeGreaterThanOrEqual(triggerRect.bottom);
          break;
        case 'top':
          await expect(menuRect.bottom).toBeLessThanOrEqual(triggerRect.top);
          break;
        case 'left':
          await expect(menuRect.right).toBeLessThanOrEqual(triggerRect.left);
          break;
        case 'right':
          await expect(menuRect.left).toBeGreaterThanOrEqual(triggerRect.right);
          break;
      }
      
      // Close menu
      await userEvent.keyboard('{Escape}');
    }
  },

  /**
   * Test context menu
   */
  async testContextMenu(canvasElement) {
    const canvas = within(canvasElement);
    const contextArea = canvas.getByTestId('context-menu-area');
    
    // Right click to open context menu
    await userEvent.pointer([
      { keys: '[MouseRight>]', target: contextArea },
      { keys: '[/MouseRight]' }
    ]);
    
    const contextMenu = await waitFor(() => canvas.getByRole('menu'));
    await expect(contextMenu).toBeInTheDocument();
    
    // Check menu positioning at cursor
    const menuRect = contextMenu.getBoundingClientRect();
    // Context menu should appear near the click position
    await expect(menuRect.left).toBeGreaterThan(0);
    await expect(menuRect.top).toBeGreaterThan(0);
    
    // Click outside to close
    await userEvent.click(document.body);
    
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /menu/i });
    
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
    await expect(menu).toHaveAttribute('role', 'menu');
    await expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
    
    // Test menu items
    const menuItems = within(menu).getAllByRole('menuitem');
    for (const item of menuItems) {
      await expect(item).toHaveAttribute('role', 'menuitem');
      await expect(item).toHaveAttribute('tabindex', '-1');
    }
    
    // Test live region announcements
    const liveRegion = canvas.getByRole('status');
    await userEvent.keyboard('{ArrowDown}');
    
    await waitFor(() => {
      expect(liveRegion).toHaveTextContent(menuItems[1].textContent);
    });
  }
};

// Export individual test functions
export const testBasicMenu = MenuTests.testBasicMenu;
export const testMenuItemSelection = MenuTests.testMenuItemSelection;
export const testMenuWithIcons = MenuTests.testMenuWithIcons;
export const testMenuWithShortcuts = MenuTests.testMenuWithShortcuts;
export const testSubmenu = MenuTests.testSubmenu;
export const testMenuSeparators = MenuTests.testMenuSeparators;
export const testDisabledMenuItems = MenuTests.testDisabledMenuItems;
export const testKeyboardNavigation = MenuTests.testKeyboardNavigation;
export const testMenuPositioning = MenuTests.testMenuPositioning;
export const testContextMenu = MenuTests.testContextMenu;
export const testAccessibility = MenuTests.testAccessibility;