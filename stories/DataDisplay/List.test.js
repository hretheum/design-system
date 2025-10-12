/**
 * Interaction tests for List component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const ListTests = {
  /**
   * Test basic list functionality
   */
  async testBasicList(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    
    // Test list exists
    await expect(list).toBeInTheDocument();
    
    // Test list items
    const listItems = within(list).getAllByRole('listitem');
    await expect(listItems.length).toBeGreaterThan(0);
    
    // Check basic structure
    for (const item of listItems.slice(0, 3)) {
      await expect(item).toHaveAttribute('role', 'listitem');
    }
  },

  /**
   * Test interactive list items
   */
  async testInteractiveList(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('interactive-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Items should be clickable
    for (const item of listItems.slice(0, 3)) {
      const button = within(item).getByRole('button');
      await expect(button).toBeInTheDocument();
      
      // Test click
      const onClick = jest.fn();
      button.onclick = onClick;
      await userEvent.click(button);
      await expect(onClick).toHaveBeenCalled();
    }
  },

  /**
   * Test list with selection
   */
  async testSelectableList(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('selectable-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Items should have checkboxes or be selectable
    const selectableItems = listItems.filter(item => {
      const checkbox = within(item).queryByRole('checkbox');
      const button = within(item).queryByRole('button');
      return checkbox || (button && button.getAttribute('aria-pressed') !== null);
    });
    
    await expect(selectableItems.length).toBeGreaterThan(0);
    
    // Test selection
    const firstItem = selectableItems[0];
    const checkbox = within(firstItem).queryByRole('checkbox');
    
    if (checkbox) {
      // Checkbox selection
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
      
      // Unselect
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    } else {
      // Button selection
      const button = within(firstItem).getByRole('button');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-pressed', 'true');
    }
  },

  /**
   * Test list with icons
   */
  async testListWithIcons(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('icon-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Check items have icons
    for (const item of listItems.slice(0, 3)) {
      const icon = within(item).getByTestId(/icon/i);
      await expect(icon).toBeInTheDocument();
      
      // Check icon positioning
      const iconRect = icon.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      
      // Icon should be on the left
      await expect(iconRect.left).toBeLessThan(itemRect.left + itemRect.width / 2);
    }
  },

  /**
   * Test list with avatars
   */
  async testListWithAvatars(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('avatar-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Check items have avatars
    for (const item of listItems.slice(0, 3)) {
      const avatar = within(item).getByTestId(/avatar/i);
      await expect(avatar).toBeInTheDocument();
      
      // Check avatar is image or initials
      const img = within(avatar).queryByRole('img');
      const initials = within(avatar).queryByText(/^[A-Z]{1,2}$/);
      
      await expect(img || initials).toBeTruthy();
    }
  },

  /**
   * Test nested list
   */
  async testNestedList(canvasElement) {
    const canvas = within(canvasElement);
    const parentList = canvas.getByTestId('nested-list');
    
    // Find nested lists
    const nestedLists = within(parentList).getAllByRole('list');
    await expect(nestedLists.length).toBeGreaterThan(1);
    
    // Check indentation
    const parentItems = within(parentList).getAllByRole('listitem');
    const nestedItems = within(nestedLists[1]).getAllByRole('listitem');
    
    // Nested items should have more indentation
    const parentIndent = parseInt(window.getComputedStyle(parentItems[0]).paddingLeft);
    const nestedIndent = parseInt(window.getComputedStyle(nestedItems[0]).paddingLeft);
    
    await expect(nestedIndent).toBeGreaterThan(parentIndent);
  },

  /**
   * Test ordered list
   */
  async testOrderedList(canvasElement) {
    const canvas = within(canvasElement);
    const orderedList = canvas.getByTestId('ordered-list');
    
    // Should be an ol element
    await expect(orderedList.tagName.toLowerCase()).toBe('ol');
    
    const listItems = within(orderedList).getAllByRole('listitem');
    
    // Check for numbering
    for (let i = 0; i < Math.min(3, listItems.length); i++) {
      const item = listItems[i];
      const styles = window.getComputedStyle(item);
      
      // Should have list-style or counter
      await expect(styles.listStyleType).not.toBe('none');
    }
  },

  /**
   * Test list with descriptions
   */
  async testDescriptiveList(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('descriptive-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Check items have title and description
    for (const item of listItems.slice(0, 3)) {
      const title = within(item).getByTestId('item-title');
      const description = within(item).getByTestId('item-description');
      
      await expect(title).toBeInTheDocument();
      await expect(description).toBeInTheDocument();
      
      // Check hierarchy
      const titleStyles = window.getComputedStyle(title);
      const descStyles = window.getComputedStyle(description);
      
      // Title should be more prominent
      await expect(parseInt(titleStyles.fontWeight)).toBeGreaterThan(parseInt(descStyles.fontWeight));
    }
  },

  /**
   * Test list with actions
   */
  async testListWithActions(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('action-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Check items have action buttons
    for (const item of listItems.slice(0, 3)) {
      const actions = within(item).getAllByRole('button');
      await expect(actions.length).toBeGreaterThan(0);
      
      // Test action clicks
      const editButton = actions.find(btn => btn.textContent.includes('Edit'));
      if (editButton) {
        const onClick = jest.fn();
        editButton.onclick = onClick;
        await userEvent.click(editButton);
        await expect(onClick).toHaveBeenCalled();
      }
    }
  },

  /**
   * Test list keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('navigable-list');
    const listItems = within(list).getAllByRole('listitem');
    
    // Make items focusable
    const focusableItems = listItems.filter(item => {
      const button = within(item).queryByRole('button');
      const link = within(item).queryByRole('link');
      return button || link || item.tabIndex >= 0;
    });
    
    if (focusableItems.length > 0) {
      // Tab through items
      for (let i = 0; i < Math.min(3, focusableItems.length); i++) {
        await userEvent.tab();
        const focusableElement = within(focusableItems[i]).queryByRole('button') ||
                                within(focusableItems[i]).queryByRole('link') ||
                                focusableItems[i];
        await expect(focusableElement).toHaveFocus();
      }
      
      // Arrow key navigation if supported
      const firstFocusable = within(focusableItems[0]).queryByRole('button') ||
                            within(focusableItems[0]).queryByRole('link') ||
                            focusableItems[0];
      
      firstFocusable.focus();
      await userEvent.keyboard('{ArrowDown}');
      
      // Check if focus moved to next item
      const secondFocusable = within(focusableItems[1]).queryByRole('button') ||
                             within(focusableItems[1]).queryByRole('link') ||
                             focusableItems[1];
      
      // Focus might move to next item depending on implementation
      const currentlyFocused = document.activeElement;
      await expect([firstFocusable, secondFocusable]).toContain(currentlyFocused);
    }
  },

  /**
   * Test list dividers
   */
  async testListDividers(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('divided-list');
    
    // Check for dividers between items
    const dividers = within(list).getAllByRole('separator');
    const listItems = within(list).getAllByRole('listitem');
    
    // Should have dividers between items (n-1 dividers for n items)
    await expect(dividers.length).toBe(listItems.length - 1);
    
    // Check divider positioning
    for (const divider of dividers.slice(0, 2)) {
      const dividerRect = divider.getBoundingClientRect();
      await expect(dividerRect.height).toBeLessThan(5); // Should be thin line
    }
  },

  /**
   * Test empty list state
   */
  async testEmptyList(canvasElement) {
    const canvas = within(canvasElement);
    const emptyList = canvas.getByTestId('empty-list');
    
    // Should have no list items
    const listItems = within(emptyList).queryAllByRole('listitem');
    await expect(listItems).toHaveLength(0);
    
    // Should show empty state message
    const emptyMessage = within(emptyList).getByText(/no items|empty|nothing to show/i);
    await expect(emptyMessage).toBeInTheDocument();
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    
    // Test list labeling
    const listLabel = list.getAttribute('aria-label') || list.getAttribute('aria-labelledby');
    await expect(listLabel).toBeTruthy();
    
    // Test list items
    const listItems = within(list).getAllByRole('listitem');
    for (const item of listItems.slice(0, 3)) {
      await expect(item).toHaveAttribute('role', 'listitem');
    }
    
    // Test live region for dynamic updates
    const liveRegion = canvas.queryByRole('status');
    if (liveRegion) {
      await expect(liveRegion).toHaveAttribute('aria-live');
    }
    
    // Test selection announcements
    const selectableList = canvas.queryByTestId('selectable-list');
    if (selectableList) {
      const checkbox = within(selectableList).queryByRole('checkbox');
      if (checkbox) {
        await userEvent.click(checkbox);
        
        // Should announce selection change
        const announcement = canvas.queryByRole('status');
        if (announcement) {
          await expect(announcement).toHaveTextContent(/selected|checked/i);
        }
      }
    }
  }
};

// Export individual test functions
export const testBasicList = ListTests.testBasicList;
export const testInteractiveList = ListTests.testInteractiveList;
export const testSelectableList = ListTests.testSelectableList;
export const testListWithIcons = ListTests.testListWithIcons;
export const testListWithAvatars = ListTests.testListWithAvatars;
export const testNestedList = ListTests.testNestedList;
export const testOrderedList = ListTests.testOrderedList;
export const testDescriptiveList = ListTests.testDescriptiveList;
export const testListWithActions = ListTests.testListWithActions;
export const testKeyboardNavigation = ListTests.testKeyboardNavigation;
export const testListDividers = ListTests.testListDividers;
export const testEmptyList = ListTests.testEmptyList;
export const testAccessibility = ListTests.testAccessibility;