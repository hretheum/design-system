/**
 * Interaction tests for TreeView component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const TreeViewTests = {
  /**
   * Test basic tree structure
   */
  async testBasicTreeView(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    
    // Test tree exists
    await expect(tree).toBeInTheDocument();
    await expect(tree).toHaveAttribute('aria-label');
    
    // Test tree items
    const treeItems = within(tree).getAllByRole('treeitem');
    await expect(treeItems.length).toBeGreaterThan(0);
    
    // Check basic structure
    for (const item of treeItems.slice(0, 3)) {
      await expect(item).toHaveAttribute('role', 'treeitem');
      await expect(item).toHaveAttribute('aria-level');
    }
  },

  /**
   * Test expand/collapse functionality
   */
  async testExpandCollapse(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    
    // Find expandable items
    const expandableItems = within(tree).getAllByRole('treeitem', { expanded: false });
    
    if (expandableItems.length > 0) {
      const firstExpandable = expandableItems[0];
      
      // Initially collapsed
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'false');
      
      // Click to expand
      const expandButton = within(firstExpandable).getByRole('button');
      await userEvent.click(expandButton);
      
      // Should be expanded
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'true');
      
      // Child items should be visible
      const childItems = await waitFor(() => {
        const level = parseInt(firstExpandable.getAttribute('aria-level'));
        return within(tree).getAllByRole('treeitem').filter(item => 
          parseInt(item.getAttribute('aria-level')) === level + 1
        );
      });
      
      await expect(childItems.length).toBeGreaterThan(0);
      
      // Collapse again
      await userEvent.click(expandButton);
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'false');
    }
  },

  /**
   * Test tree item selection
   */
  async testTreeItemSelection(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    // Select first item
    const firstItem = treeItems[0];
    await userEvent.click(firstItem);
    
    // Should be selected
    await expect(firstItem).toHaveAttribute('aria-selected', 'true');
    
    // Other items should not be selected (single selection)
    const otherItems = treeItems.slice(1, 3);
    for (const item of otherItems) {
      await expect(item).toHaveAttribute('aria-selected', 'false');
    }
    
    // Select another item
    if (treeItems.length > 1) {
      const secondItem = treeItems[1];
      await userEvent.click(secondItem);
      
      // First item should be deselected
      await expect(firstItem).toHaveAttribute('aria-selected', 'false');
      await expect(secondItem).toHaveAttribute('aria-selected', 'true');
    }
  },

  /**
   * Test multi-selection
   */
  async testMultiSelection(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByTestId('multi-select-tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    if (treeItems.length > 1) {
      // Ctrl+click for multi-selection
      await userEvent.click(treeItems[0]);
      await expect(treeItems[0]).toHaveAttribute('aria-selected', 'true');
      
      // Ctrl+click second item
      await userEvent.click(treeItems[1], { ctrlKey: true });
      
      // Both should be selected
      await expect(treeItems[0]).toHaveAttribute('aria-selected', 'true');
      await expect(treeItems[1]).toHaveAttribute('aria-selected', 'true');
      
      // Ctrl+click first item again to deselect
      await userEvent.click(treeItems[0], { ctrlKey: true });
      await expect(treeItems[0]).toHaveAttribute('aria-selected', 'false');
      await expect(treeItems[1]).toHaveAttribute('aria-selected', 'true');
    }
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    // Focus first item
    treeItems[0].focus();
    await expect(treeItems[0]).toHaveFocus();
    
    // Arrow down moves to next item
    await userEvent.keyboard('{ArrowDown}');
    await expect(treeItems[1]).toHaveFocus();
    
    // Arrow up moves to previous item
    await userEvent.keyboard('{ArrowUp}');
    await expect(treeItems[0]).toHaveFocus();
    
    // Home goes to first item
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    await userEvent.keyboard('{Home}');
    await expect(treeItems[0]).toHaveFocus();
    
    // End goes to last visible item
    await userEvent.keyboard('{End}');
    const lastItem = treeItems[treeItems.length - 1];
    await expect(lastItem).toHaveFocus();
    
    // Test expand/collapse with keyboard
    const expandableItem = treeItems.find(item => 
      item.getAttribute('aria-expanded') === 'false'
    );
    
    if (expandableItem) {
      expandableItem.focus();
      
      // Right arrow expands
      await userEvent.keyboard('{ArrowRight}');
      await expect(expandableItem).toHaveAttribute('aria-expanded', 'true');
      
      // Left arrow collapses
      await userEvent.keyboard('{ArrowLeft}');
      await expect(expandableItem).toHaveAttribute('aria-expanded', 'false');
    }
  },

  /**
   * Test tree with icons
   */
  async testTreeWithIcons(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByTestId('icon-tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    // Check items have icons
    for (const item of treeItems.slice(0, 3)) {
      const icon = within(item).getByTestId(/icon/i);
      await expect(icon).toBeInTheDocument();
      
      // Check different icons for folders vs files
      const isExpandable = item.getAttribute('aria-expanded') !== null;
      const iconType = icon.getAttribute('data-type');
      
      if (isExpandable) {
        await expect(iconType).toMatch(/folder|directory/i);
      } else {
        await expect(iconType).toMatch(/file|document/i);
      }
    }
  },

  /**
   * Test tree item indentation
   */
  async testTreeIndentation(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    // Group items by level
    const itemsByLevel = {};
    treeItems.forEach(item => {
      const level = parseInt(item.getAttribute('aria-level'));
      if (!itemsByLevel[level]) itemsByLevel[level] = [];
      itemsByLevel[level].push(item);
    });
    
    // Check indentation increases with level
    const levels = Object.keys(itemsByLevel).map(Number).sort();
    
    for (let i = 1; i < levels.length; i++) {
      const currentLevel = itemsByLevel[levels[i]][0];
      const previousLevel = itemsByLevel[levels[i-1]][0];
      
      const currentIndent = parseInt(window.getComputedStyle(currentLevel).paddingLeft);
      const previousIndent = parseInt(window.getComputedStyle(previousLevel).paddingLeft);
      
      await expect(currentIndent).toBeGreaterThan(previousIndent);
    }
  },

  /**
   * Test tree search/filter
   */
  async testTreeSearch(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    const tree = canvas.getByRole('tree');
    
    // Type search query
    await userEvent.type(searchInput, 'document');
    
    // Wait for filtering
    await waitFor(() => {
      const visibleItems = within(tree).getAllByRole('treeitem');
      const hasMatchingItem = visibleItems.some(item => 
        item.textContent.toLowerCase().includes('document')
      );
      expect(hasMatchingItem).toBe(true);
    });
    
    // Clear search
    await userEvent.clear(searchInput);
    
    // All items should be visible again
    await waitFor(() => {
      const allItems = within(tree).getAllByRole('treeitem');
      expect(allItems.length).toBeGreaterThan(1);
    });
  },

  /**
   * Test drag and drop
   */
  async testDragAndDrop(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByTestId('draggable-tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    if (treeItems.length > 1) {
      const sourceItem = treeItems[0];
      const targetItem = treeItems[1];
      
      // Check if items are draggable
      const isDraggable = sourceItem.getAttribute('draggable') === 'true';
      
      if (isDraggable) {
        // Simulate drag start
        const dragStartEvent = new DragEvent('dragstart', { bubbles: true });
        sourceItem.dispatchEvent(dragStartEvent);
        
        // Check drag feedback
        await expect(sourceItem).toHaveClass('tree-item--dragging');
        
        // Simulate drop on target
        const dropEvent = new DragEvent('drop', { bubbles: true });
        targetItem.dispatchEvent(dropEvent);
        
        // Check if item moved (this would depend on implementation)
        await waitFor(() => {
          const updatedItems = within(tree).getAllByRole('treeitem');
          expect(updatedItems).toHaveLength(treeItems.length);
        });
      }
    }
  },

  /**
   * Test context menu
   */
  async testContextMenu(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    const treeItems = within(tree).getAllByRole('treeitem');
    
    // Right-click on tree item
    const firstItem = treeItems[0];
    await userEvent.pointer([
      { keys: '[MouseRight>]', target: firstItem },
      { keys: '[/MouseRight]' }
    ]);
    
    // Check for context menu
    const contextMenu = await waitFor(() => canvas.getByRole('menu'));
    await expect(contextMenu).toBeInTheDocument();
    
    // Check menu options
    const menuItems = within(contextMenu).getAllByRole('menuitem');
    const expectedActions = ['Rename', 'Delete', 'Copy', 'Cut'];
    
    const menuTexts = menuItems.map(item => item.textContent);
    const hasExpectedActions = expectedActions.some(action => 
      menuTexts.some(text => text.includes(action))
    );
    
    await expect(hasExpectedActions).toBe(true);
    
    // Close context menu
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test lazy loading
   */
  async testLazyLoading(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByTestId('lazy-tree');
    
    // Find lazy expandable item
    const lazyItem = within(tree).getByTestId('lazy-node');
    await expect(lazyItem).toHaveAttribute('aria-expanded', 'false');
    
    // Expand to trigger lazy loading
    const expandButton = within(lazyItem).getByRole('button');
    await userEvent.click(expandButton);
    
    // Check for loading indicator
    const loadingIndicator = await waitFor(() => 
      within(lazyItem).getByRole('status')
    );
    await expect(loadingIndicator).toBeInTheDocument();
    
    // Wait for content to load
    await waitFor(() => {
      const childItems = within(tree).getAllByRole('treeitem').filter(item => {
        const level = parseInt(item.getAttribute('aria-level'));
        const parentLevel = parseInt(lazyItem.getAttribute('aria-level'));
        return level === parentLevel + 1;
      });
      expect(childItems.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    
    // Test tree labeling
    await expect(tree).toHaveAttribute('aria-label');
    
    // Test tree items
    const treeItems = within(tree).getAllByRole('treeitem');
    
    for (const item of treeItems.slice(0, 3)) {
      // Test required attributes
      testUtils.testAriaAttributes(item, {
        'role': 'treeitem',
        'aria-level': expect.any(String),
        'aria-selected': expect.any(String)
      });
      
      // Test expandable items
      if (item.getAttribute('aria-expanded') !== null) {
        await expect(item).toHaveAttribute('aria-expanded');
      }
    }
    
    // Test keyboard navigation
    treeItems[0].focus();
    await expect(treeItems[0]).toHaveFocus();
    
    // Test focus management
    await userEvent.keyboard('{ArrowDown}');
    await expect(document.activeElement).toBe(treeItems[1]);
    
    // Test screen reader announcements
    const liveRegion = canvas.getByRole('status');
    await userEvent.click(treeItems[0]);
    
    await waitFor(() => {
      expect(liveRegion).toHaveTextContent(/selected/i);
    });
  }
};

// Export individual test functions
export const testBasicTreeView = TreeViewTests.testBasicTreeView;
export const testExpandCollapse = TreeViewTests.testExpandCollapse;
export const testTreeItemSelection = TreeViewTests.testTreeItemSelection;
export const testMultiSelection = TreeViewTests.testMultiSelection;
export const testKeyboardNavigation = TreeViewTests.testKeyboardNavigation;
export const testTreeWithIcons = TreeViewTests.testTreeWithIcons;
export const testTreeIndentation = TreeViewTests.testTreeIndentation;
export const testTreeSearch = TreeViewTests.testTreeSearch;
export const testDragAndDrop = TreeViewTests.testDragAndDrop;
export const testContextMenu = TreeViewTests.testContextMenu;
export const testLazyLoading = TreeViewTests.testLazyLoading;
export const testAccessibility = TreeViewTests.testAccessibility;