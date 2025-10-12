/**
 * Interaction tests for EmptyState component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const EmptyStateTests = {
  /**
   * Test basic empty state structure
   */
  async testBasicEmptyState(canvasElement) {
    const canvas = within(canvasElement);
    const emptyState = canvas.getByTestId('empty-state');
    
    // Test empty state exists
    await expect(emptyState).toBeInTheDocument();
    
    // Test required elements
    const title = canvas.getByRole('heading');
    const description = canvas.getByText(/get started/i);
    
    await expect(title).toBeInTheDocument();
    await expect(description).toBeInTheDocument();
    
    // Test icon
    const icon = canvas.getByTestId('empty-state-icon');
    await expect(icon).toBeInTheDocument();
  },

  /**
   * Test empty state with action
   */
  async testEmptyStateWithAction(canvasElement) {
    const canvas = within(canvasElement);
    const action = canvas.getByRole('button', { name: /upload file/i });
    
    await expect(action).toBeInTheDocument();
    
    // Test action click
    const onClick = jest.fn();
    action.onclick = onClick;
    await userEvent.click(action);
    await expect(onClick).toHaveBeenCalled();
    
    // Test action positioning
    const emptyState = canvas.getByTestId('empty-state');
    const emptyStateRect = emptyState.getBoundingClientRect();
    const actionRect = action.getBoundingClientRect();
    
    // Action should be centered horizontally
    const centerX = emptyStateRect.left + emptyStateRect.width / 2;
    const actionCenterX = actionRect.left + actionRect.width / 2;
    
    await expect(Math.abs(centerX - actionCenterX)).toBeLessThan(50);
  },

  /**
   * Test empty state variants
   */
  async testEmptyStateVariants(canvasElement) {
    const canvas = within(canvasElement);
    
    const variants = ['default', 'success', 'error', 'warning', 'info'];
    
    for (const variant of variants) {
      const variantState = canvas.getByTestId(`empty-state-${variant}`);
      
      if (variantState) {
        await expect(variantState).toHaveClass(`empty-state--${variant}`);
        
        // Check variant-specific styling
        const styles = window.getComputedStyle(variantState);
        await expect(styles).toBeTruthy();
      }
    }
  },

  /**
   * Test empty state with custom illustration
   */
  async testCustomIllustration(canvasElement) {
    const canvas = within(canvasElement);
    const emptyState = canvas.getByTestId('custom-illustration-empty-state');
    
    // Find custom illustration
    const illustration = within(emptyState).getByTestId('custom-illustration');
    await expect(illustration).toBeInTheDocument();
    
    // Check illustration styling
    const illustrationStyles = window.getComputedStyle(illustration);
    await expect(parseInt(illustrationStyles.width)).toBeGreaterThan(0);
    await expect(parseInt(illustrationStyles.height)).toBeGreaterThan(0);
  },

  /**
   * Test empty state with multiple actions
   */
  async testMultipleActions(canvasElement) {
    const canvas = within(canvasElement);
    const emptyState = canvas.getByTestId('multiple-actions-empty-state');
    
    // Find action buttons
    const actions = within(emptyState).getAllByRole('button');
    await expect(actions.length).toBeGreaterThan(1);
    
    // Test primary and secondary actions
    const primaryAction = actions.find(btn => 
      btn.classList.contains('button--primary') || 
      btn.textContent.includes('Try Again')
    );
    const secondaryAction = actions.find(btn => 
      btn.classList.contains('button--secondary') || 
      btn.textContent.includes('Go Back')
    );
    
    if (primaryAction && secondaryAction) {
      // Test both actions
      const onPrimary = jest.fn();
      const onSecondary = jest.fn();
      
      primaryAction.onclick = onPrimary;
      secondaryAction.onclick = onSecondary;
      
      await userEvent.click(primaryAction);
      await userEvent.click(secondaryAction);
      
      await expect(onPrimary).toHaveBeenCalled();
      await expect(onSecondary).toHaveBeenCalled();
    }
  },

  /**
   * Test search results empty state
   */
  async testSearchEmptyState(canvasElement) {
    const canvas = within(canvasElement);
    const searchEmpty = canvas.getByTestId('search-empty-state');
    
    // Check search-specific content
    const title = within(searchEmpty).getByRole('heading');
    await expect(title).toHaveTextContent(/no.*results|nothing found/i);
    
    // Check for search suggestions or clear action
    const clearButton = within(searchEmpty).queryByRole('button', { name: /clear|reset/i });
    if (clearButton) {
      await userEvent.click(clearButton);
      // Would typically clear search and show all results
    }
  },

  /**
   * Test loading to empty state transition
   */
  async testLoadingTransition(canvasElement) {
    const canvas = within(canvasElement);
    const container = canvas.getByTestId('loading-empty-container');
    
    // Initially should show loading
    const loadingIndicator = within(container).queryByRole('status');
    if (loadingIndicator) {
      await expect(loadingIndicator).toBeInTheDocument();
      
      // Wait for loading to complete and empty state to appear
      await waitFor(() => {
        const emptyState = within(container).queryByTestId('empty-state');
        expect(emptyState).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Loading indicator should be gone
      await waitFor(() => {
        expect(within(container).queryByRole('status')).not.toBeInTheDocument();
      });
    }
  },

  /**
   * Test responsive empty state
   */
  async testResponsiveEmptyState(canvasElement) {
    const canvas = within(canvasElement);
    const emptyState = canvas.getByTestId('responsive-empty-state');
    
    // Test mobile layout
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      const icon = within(emptyState).getByTestId('empty-state-icon');
      const title = within(emptyState).getByRole('heading');
      
      // On mobile, elements should stack vertically with smaller sizes
      const iconRect = icon.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      
      expect(titleRect.top).toBeGreaterThan(iconRect.bottom - 10);
    });
    
    // Test desktop layout
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      // Elements should have appropriate desktop sizing
      const emptyStateStyles = window.getComputedStyle(emptyState);
      expect(emptyStateStyles.maxWidth).toBeTruthy();
    });
  },

  /**
   * Test animated empty state
   */
  async testAnimatedEmptyState(canvasElement) {
    const canvas = within(canvasElement);
    const animatedEmpty = canvas.getByTestId('animated-empty-state');
    
    // Check for animation classes
    const icon = within(animatedEmpty).getByTestId('empty-state-icon');
    const iconClasses = Array.from(icon.classList);
    
    const hasAnimation = iconClasses.some(cls => 
      cls.includes('animate') || cls.includes('fade') || cls.includes('slide')
    );
    
    // Animation should be present for enhanced experience
    await expect(hasAnimation).toBe(true);
    
    // Check animation duration
    const iconStyles = window.getComputedStyle(icon);
    const animationDuration = iconStyles.animationDuration;
    
    if (animationDuration && animationDuration !== '0s') {
      await expect(parseFloat(animationDuration)).toBeGreaterThan(0);
    }
  },

  /**
   * Test empty state with filters
   */
  async testFilteredEmptyState(canvasElement) {
    const canvas = within(canvasElement);
    const filterContainer = canvas.getByTestId('filtered-results-container');
    
    // Check for active filters indication
    const filterBadge = within(filterContainer).getByTestId('filter-badge');
    await expect(filterBadge).toHaveTextContent(/\d+/); // Should show filter count
    
    // Find clear filters button
    const clearFiltersButton = within(filterContainer).getByRole('button', { name: /clear.*filter/i });
    
    // Click to clear filters
    await userEvent.click(clearFiltersButton);
    
    // Empty state should change or disappear
    await waitFor(() => {
      const emptyState = within(filterContainer).queryByTestId('empty-state');
      // Either empty state is gone or shows different message
      if (emptyState) {
        const title = within(emptyState).queryByRole('heading');
        expect(title).not.toHaveTextContent(/no results match/i);
      }
    });
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const emptyState = canvas.getByTestId('empty-state');
    
    // Test semantic structure
    const title = within(emptyState).getByRole('heading');
    const description = within(emptyState).getByText(/description/i);
    
    // Title should be properly leveled
    await expect(title.tagName).toMatch(/^H[1-6]$/);
    
    // Test icon accessibility
    const icon = within(emptyState).getByTestId('empty-state-icon');
    const iconRole = icon.getAttribute('role');
    const iconAlt = icon.getAttribute('alt');
    const ariaLabel = icon.getAttribute('aria-label');
    
    // Icon should be decorative or have proper labeling
    await expect(iconRole === 'presentation' || iconAlt || ariaLabel).toBe(true);
    
    // Test action accessibility
    const actions = within(emptyState).getAllByRole('button');
    for (const action of actions) {
      testUtils.testAriaAttributes(action, {
        'role': 'button',
        'tabindex': '0'
      });
      
      // Action should be focusable
      action.focus();
      await expect(action).toHaveFocus();
    }
    
    // Test keyboard navigation
    if (actions.length > 0) {
      await userEvent.tab();
      await expect(actions[0]).toHaveFocus();
      
      // Enter should activate
      const onClick = jest.fn();
      actions[0].onclick = onClick;
      await userEvent.keyboard('{Enter}');
      await expect(onClick).toHaveBeenCalled();
    }
  },

  /**
   * Test empty state announcements
   */
  async testScreenReaderAnnouncements(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test live region for dynamic empty states
    const liveRegion = canvas.queryByRole('status');
    if (liveRegion) {
      await expect(liveRegion).toHaveAttribute('aria-live');
      
      // Check announcement content
      const announcement = liveRegion.textContent;
      await expect(announcement).toMatch(/no.*items|empty|nothing to show/i);
    }
    
    // Test polite announcements for search results
    const searchEmpty = canvas.queryByTestId('search-empty-state');
    if (searchEmpty) {
      const politeRegion = within(searchEmpty).queryByRole('status');
      if (politeRegion) {
        await expect(politeRegion).toHaveAttribute('aria-live', 'polite');
      }
    }
  }
};

// Export individual test functions
export const testBasicEmptyState = EmptyStateTests.testBasicEmptyState;
export const testEmptyStateWithAction = EmptyStateTests.testEmptyStateWithAction;
export const testEmptyStateVariants = EmptyStateTests.testEmptyStateVariants;
export const testCustomIllustration = EmptyStateTests.testCustomIllustration;
export const testMultipleActions = EmptyStateTests.testMultipleActions;
export const testSearchEmptyState = EmptyStateTests.testSearchEmptyState;
export const testLoadingTransition = EmptyStateTests.testLoadingTransition;
export const testResponsiveEmptyState = EmptyStateTests.testResponsiveEmptyState;
export const testAnimatedEmptyState = EmptyStateTests.testAnimatedEmptyState;
export const testFilteredEmptyState = EmptyStateTests.testFilteredEmptyState;
export const testAccessibility = EmptyStateTests.testAccessibility;
export const testScreenReaderAnnouncements = EmptyStateTests.testScreenReaderAnnouncements;