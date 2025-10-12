/**
 * Interaction tests for Sidebar component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const SidebarTests = {
  /**
   * Test basic sidebar structure
   */
  async testBasicSidebar(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    
    // Test sidebar exists
    await expect(sidebar).toBeInTheDocument();
    await expect(sidebar).toHaveAttribute('aria-label');
    
    // Test navigation items
    const navItems = within(sidebar).getAllByRole('link');
    await expect(navItems.length).toBeGreaterThan(0);
    
    // Test sections/groups
    const sections = within(sidebar).getAllByRole('group');
    await expect(sections.length).toBeGreaterThan(0);
  },

  /**
   * Test collapsed/expanded state
   */
  async testCollapseExpand(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    const toggleButton = canvas.getByRole('button', { name: /toggle|collapse|expand/i });
    
    // Initially expanded
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
    await expect(sidebar).toHaveStyle({ width: '240px' });
    
    // Collapse sidebar
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(sidebar).toHaveAttribute('data-collapsed', 'true');
      expect(sidebar).toHaveStyle({ width: '64px' });
    });
    
    // Check items show only icons when collapsed
    const navItems = within(sidebar).getAllByRole('link');
    for (const item of navItems) {
      const label = within(item).queryByTestId('nav-label');
      if (label) {
        await expect(label).not.toBeVisible();
      }
    }
    
    // Expand again
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(sidebar).toHaveAttribute('data-collapsed', 'false');
      expect(sidebar).toHaveStyle({ width: '240px' });
    });
  },

  /**
   * Test navigation items
   */
  async testNavigationItems(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    const navItems = within(sidebar).getAllByRole('link');
    
    // Test active item
    const activeItem = navItems.find(item => 
      item.getAttribute('aria-current') === 'page'
    );
    await expect(activeItem).toBeDefined();
    await expect(activeItem).toHaveClass('sidebar-item--active');
    
    // Test hover states
    for (const item of navItems.slice(0, 3)) {
      await testUtils.testHoverState(canvas, 'link');
    }
    
    // Test click navigation
    const inactiveItem = navItems.find(item => 
      item.getAttribute('aria-current') !== 'page'
    );
    if (inactiveItem) {
      await userEvent.click(inactiveItem);
      // Would normally trigger navigation
    }
  },

  /**
   * Test nested navigation
   */
  async testNestedNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    
    // Find expandable section
    const expandableButton = within(sidebar).getByRole('button', { name: /settings|admin|more/i });
    await expect(expandableButton).toHaveAttribute('aria-expanded', 'false');
    
    // Expand section
    await userEvent.click(expandableButton);
    await expect(expandableButton).toHaveAttribute('aria-expanded', 'true');
    
    // Check nested items appear
    const nestedItems = await waitFor(() => {
      const section = expandableButton.closest('[role="group"]');
      return within(section).getAllByRole('link');
    });
    await expect(nestedItems.length).toBeGreaterThan(0);
    
    // Check indentation
    for (const item of nestedItems) {
      await expect(item).toHaveClass('sidebar-item--nested');
    }
    
    // Collapse section
    await userEvent.click(expandableButton);
    await expect(expandableButton).toHaveAttribute('aria-expanded', 'false');
  },

  /**
   * Test sidebar sections
   */
  async testSidebarSections(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    const sections = within(sidebar).getAllByRole('group');
    
    // Each section should have a label
    for (const section of sections) {
      const label = section.getAttribute('aria-label') || 
                   within(section).queryByRole('heading');
      await expect(label).toBeTruthy();
    }
    
    // Test section separators
    const separators = within(sidebar).getAllByRole('separator');
    await expect(separators.length).toBeGreaterThan(0);
  },

  /**
   * Test search in sidebar
   */
  async testSidebarSearch(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    const searchInput = within(sidebar).getByRole('searchbox');
    
    // Type search query
    await userEvent.type(searchInput, 'dash');
    
    // Wait for filtering
    await waitFor(() => {
      const visibleItems = within(sidebar).getAllByRole('link');
      const dashboardItem = visibleItems.find(item => 
        item.textContent.toLowerCase().includes('dash')
      );
      expect(dashboardItem).toBeVisible();
    });
    
    // Clear search
    await userEvent.clear(searchInput);
    
    // All items should be visible again
    await waitFor(() => {
      const allItems = within(sidebar).getAllByRole('link');
      expect(allItems.length).toBeGreaterThan(1);
    });
  },

  /**
   * Test pinned items
   */
  async testPinnedItems(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    
    // Find pinned section
    const pinnedSection = within(sidebar).getByRole('group', { name: /pinned|favorites/i });
    const pinnedItems = within(pinnedSection).getAllByRole('link');
    
    // Test pin/unpin functionality
    const regularItem = within(sidebar).getAllByRole('link')[3];
    const pinButton = within(regularItem.parentElement).getByRole('button', { name: /pin/i });
    
    await userEvent.click(pinButton);
    
    // Item should appear in pinned section
    await waitFor(() => {
      const newPinnedItems = within(pinnedSection).getAllByRole('link');
      expect(newPinnedItems.length).toBe(pinnedItems.length + 1);
    });
  },

  /**
   * Test mobile behavior
   */
  async testMobileBehavior(canvasElement) {
    const canvas = within(canvasElement);
    
    // Set mobile viewport
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
      
      // Sidebar should be hidden or overlay on mobile
      expect(sidebar).toHaveAttribute('data-mobile', 'true');
      
      // Should have backdrop when open
      const backdrop = canvas.queryByTestId('sidebar-backdrop');
      if (sidebar.getAttribute('data-open') === 'true') {
        expect(backdrop).toBeInTheDocument();
      }
    });
    
    // Reset viewport
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    const navItems = within(sidebar).getAllByRole('link');
    
    // Tab through items
    for (let i = 0; i < Math.min(5, navItems.length); i++) {
      await userEvent.tab();
      await expect(navItems[i]).toHaveFocus();
    }
    
    // Arrow key navigation
    navItems[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(navItems[1]).toHaveFocus();
    
    await userEvent.keyboard('{ArrowUp}');
    await expect(navItems[0]).toHaveFocus();
    
    // Enter to activate
    await userEvent.keyboard('{Enter}');
    // Would trigger navigation
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole('navigation', { name: /sidebar/i });
    
    // Test landmark role
    await expect(sidebar).toHaveAttribute('role', 'navigation');
    await expect(sidebar).toHaveAttribute('aria-label');
    
    // Test toggle button
    const toggleButton = canvas.getByRole('button', { name: /toggle/i });
    await expect(toggleButton).toHaveAttribute('aria-label');
    await expect(toggleButton).toHaveAttribute('aria-expanded');
    
    // Test current page indication
    const currentPage = within(sidebar).getByRole('link', { current: 'page' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    
    // Test nested navigation ARIA
    const expandableButtons = within(sidebar).getAllByRole('button', { expanded: false });
    for (const button of expandableButtons) {
      await expect(button).toHaveAttribute('aria-expanded');
      await expect(button).toHaveAttribute('aria-controls');
    }
    
    // Test focus management
    const firstItem = within(sidebar).getAllByRole('link')[0];
    firstItem.focus();
    await expect(firstItem).toHaveFocus();
  }
};

// Export individual test functions
export const testBasicSidebar = SidebarTests.testBasicSidebar;
export const testCollapseExpand = SidebarTests.testCollapseExpand;
export const testNavigationItems = SidebarTests.testNavigationItems;
export const testNestedNavigation = SidebarTests.testNestedNavigation;
export const testSidebarSections = SidebarTests.testSidebarSections;
export const testSidebarSearch = SidebarTests.testSidebarSearch;
export const testPinnedItems = SidebarTests.testPinnedItems;
export const testMobileBehavior = SidebarTests.testMobileBehavior;
export const testKeyboardNavigation = SidebarTests.testKeyboardNavigation;
export const testAccessibility = SidebarTests.testAccessibility;