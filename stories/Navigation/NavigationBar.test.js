/**
 * Interaction tests for NavigationBar component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const NavigationBarTests = {
  /**
   * Test basic navigation bar structure
   */
  async testBasicNavigationBar(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Test navbar exists
    await expect(navbar).toBeInTheDocument();
    await expect(navbar).toHaveAttribute('aria-label');
    
    // Test logo/brand
    const brand = canvas.getByTestId('navbar-brand');
    await expect(brand).toBeInTheDocument();
    
    // Test navigation items
    const navItems = within(navbar).getAllByRole('link');
    await expect(navItems.length).toBeGreaterThan(0);
  },

  /**
   * Test navigation item interaction
   */
  async testNavigationItems(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    const navItems = within(navbar).getAllByRole('link');
    
    // Test hover states
    for (const item of navItems) {
      await testUtils.testHoverState(canvas, 'link');
    }
    
    // Test active item
    const activeItem = within(navbar).getByRole('link', { current: 'page' });
    await expect(activeItem).toHaveAttribute('aria-current', 'page');
    await expect(activeItem).toHaveClass('nav-item--active');
  },

  /**
   * Test dropdown menus
   */
  async testDropdownMenus(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Find dropdown trigger
    const dropdownTrigger = within(navbar).getByRole('button', { name: /products|services/i });
    await expect(dropdownTrigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'false');
    
    // Open dropdown
    await userEvent.click(dropdownTrigger);
    await expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'true');
    
    // Check dropdown menu
    const dropdownMenu = await waitFor(() => canvas.getByRole('menu'));
    await expect(dropdownMenu).toBeInTheDocument();
    
    // Check menu items
    const menuItems = within(dropdownMenu).getAllByRole('menuitem');
    await expect(menuItems.length).toBeGreaterThan(0);
    
    // Close dropdown
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  /**
   * Test mobile navigation
   */
  async testMobileNavigation(canvasElement) {
    const canvas = within(canvasElement);
    
    // Set mobile viewport
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      // Hamburger menu should appear
      const hamburger = canvas.getByRole('button', { name: /menu|navigation/i });
      expect(hamburger).toBeVisible();
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      
      // Desktop nav should be hidden
      const desktopNav = canvas.getByTestId('desktop-nav');
      expect(desktopNav).not.toBeVisible();
    });
    
    // Open mobile menu
    const hamburger = canvas.getByRole('button', { name: /menu/i });
    await userEvent.click(hamburger);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    
    // Check mobile menu
    const mobileMenu = await waitFor(() => canvas.getByTestId('mobile-menu'));
    await expect(mobileMenu).toBeVisible();
    
    // Reset viewport
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
  },

  /**
   * Test search functionality
   */
  async testSearchFunctionality(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Find search button
    const searchButton = within(navbar).getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
    
    // Search input should appear
    const searchInput = await waitFor(() => 
      within(navbar).getByRole('searchbox')
    );
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveFocus();
    
    // Type search query
    await userEvent.type(searchInput, 'test query');
    await userEvent.keyboard('{Enter}');
    
    // Check search submission
    const searchForm = searchInput.closest('form');
    const onSubmit = jest.fn(e => e.preventDefault());
    searchForm.addEventListener('submit', onSubmit);
    
    await userEvent.keyboard('{Enter}');
    await expect(onSubmit).toHaveBeenCalled();
  },

  /**
   * Test user menu
   */
  async testUserMenu(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Find user menu trigger
    const userMenuTrigger = within(navbar).getByRole('button', { name: /user|profile|account/i });
    await expect(userMenuTrigger).toBeInTheDocument();
    
    // Open user menu
    await userEvent.click(userMenuTrigger);
    
    const userMenu = await waitFor(() => canvas.getByRole('menu'));
    const menuItems = within(userMenu).getAllByRole('menuitem');
    
    // Check common user menu items
    const expectedItems = ['Profile', 'Settings', 'Sign Out'];
    for (const itemText of expectedItems) {
      const item = menuItems.find(el => el.textContent.includes(itemText));
      await expect(item).toBeInTheDocument();
    }
  },

  /**
   * Test sticky behavior
   */
  async testStickyBehavior(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Initial position
    const initialStyles = window.getComputedStyle(navbar);
    await expect(initialStyles.position).toBe('fixed');
    
    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
    
    // Check for scroll class
    await waitFor(() => {
      expect(navbar).toHaveClass('navbar--scrolled');
    });
    
    // Check shadow or border appears
    const scrolledStyles = window.getComputedStyle(navbar);
    await expect(scrolledStyles.boxShadow).not.toBe('none');
    
    // Reset scroll
    window.scrollY = 0;
    window.dispatchEvent(new Event('scroll'));
  },

  /**
   * Test breadcrumb integration
   */
  async testBreadcrumbIntegration(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Check for breadcrumb
    const breadcrumb = within(navbar).queryByRole('navigation', { name: /breadcrumb/i });
    if (breadcrumb) {
      const breadcrumbItems = within(breadcrumb).getAllByRole('link');
      await expect(breadcrumbItems.length).toBeGreaterThan(0);
      
      // Last item should be current
      const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
      await expect(lastItem).toHaveAttribute('aria-current', 'page');
    }
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    const navItems = within(navbar).getAllByRole('link');
    
    // Tab through items
    for (const item of navItems) {
      await userEvent.tab();
      await expect(item).toHaveFocus();
    }
    
    // Test dropdown keyboard navigation
    const dropdownTrigger = within(navbar).queryByRole('button', { name: /products/i });
    if (dropdownTrigger) {
      dropdownTrigger.focus();
      
      // Open with Enter
      await userEvent.keyboard('{Enter}');
      const menu = await waitFor(() => canvas.getByRole('menu'));
      
      // Arrow keys should navigate menu
      await userEvent.keyboard('{ArrowDown}');
      const firstMenuItem = within(menu).getAllByRole('menuitem')[0];
      await expect(firstMenuItem).toHaveFocus();
    }
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const navbar = canvas.getByRole('navigation');
    
    // Test landmark
    await expect(navbar).toHaveAttribute('role', 'navigation');
    await expect(navbar).toHaveAttribute('aria-label');
    
    // Test skip link
    const skipLink = canvas.getByRole('link', { name: /skip to main/i });
    await expect(skipLink).toBeInTheDocument();
    
    // Focus skip link
    skipLink.focus();
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveFocus();
    
    // Test mobile menu accessibility
    const hamburger = canvas.queryByRole('button', { name: /menu/i });
    if (hamburger) {
      await expect(hamburger).toHaveAttribute('aria-label');
      await expect(hamburger).toHaveAttribute('aria-expanded');
    }
  }
};

// Export individual test functions
export const testBasicNavigationBar = NavigationBarTests.testBasicNavigationBar;
export const testNavigationItems = NavigationBarTests.testNavigationItems;
export const testDropdownMenus = NavigationBarTests.testDropdownMenus;
export const testMobileNavigation = NavigationBarTests.testMobileNavigation;
export const testSearchFunctionality = NavigationBarTests.testSearchFunctionality;
export const testUserMenu = NavigationBarTests.testUserMenu;
export const testStickyBehavior = NavigationBarTests.testStickyBehavior;
export const testBreadcrumbIntegration = NavigationBarTests.testBreadcrumbIntegration;
export const testKeyboardNavigation = NavigationBarTests.testKeyboardNavigation;
export const testAccessibility = NavigationBarTests.testAccessibility;