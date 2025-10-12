/**
 * Test utilities for interaction tests
 * Provides common testing helpers and setup
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';

export const testUtils = {
  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvas, elementSelector) {
    const element = canvas.getByRole(elementSelector);
    
    // Test Tab navigation
    await userEvent.tab();
    await expect(element).toHaveFocus();
    
    // Test Enter key
    await userEvent.keyboard('{Enter}');
    
    // Test Space key
    await userEvent.keyboard(' ');
    
    // Test Escape key
    await userEvent.keyboard('{Escape}');
    
    return element;
  },

  /**
   * Test ARIA attributes
   */
  testAriaAttributes(element, expectedAttributes) {
    for (const [attr, value] of Object.entries(expectedAttributes)) {
      if (value !== null) {
        expect(element).toHaveAttribute(attr, value);
      }
    }
  },

  /**
   * Test form validation
   */
  async testFormValidation(canvas, inputSelector, invalidValue, validValue) {
    const input = canvas.getByRole(inputSelector);
    
    // Test invalid input
    await userEvent.clear(input);
    await userEvent.type(input, invalidValue);
    await userEvent.tab();
    
    // Check for error state
    const errorMessage = canvas.queryByRole('alert');
    await expect(errorMessage).toBeInTheDocument();
    
    // Test valid input
    await userEvent.clear(input);
    await userEvent.type(input, validValue);
    await userEvent.tab();
    
    // Check error is removed
    await waitFor(() => {
      expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    });
  },

  /**
   * Test click interaction
   */
  async testClickInteraction(canvas, elementRole, expectedAction) {
    const element = canvas.getByRole(elementRole);
    
    // Test click
    await userEvent.click(element);
    
    // Verify action was called
    if (expectedAction) {
      await expect(expectedAction).toHaveBeenCalled();
    }
    
    return element;
  },

  /**
   * Test hover state
   */
  async testHoverState(canvas, elementRole) {
    const element = canvas.getByRole(elementRole);
    const initialStyle = window.getComputedStyle(element);
    
    // Hover
    await userEvent.hover(element);
    await waitFor(() => {
      const hoverStyle = window.getComputedStyle(element);
      expect(hoverStyle).not.toEqual(initialStyle);
    });
    
    // Unhover
    await userEvent.unhover(element);
  },

  /**
   * Test disabled state
   */
  testDisabledState(element) {
    expect(element).toBeDisabled();
    expect(element).toHaveAttribute('aria-disabled', 'true');
  },

  /**
   * Test focus trap
   */
  async testFocusTrap(canvas, containerRole) {
    const container = canvas.getByRole(containerRole);
    const focusableElements = within(container).getAllByRole('button');
    
    // Focus first element
    await userEvent.tab();
    await expect(focusableElements[0]).toHaveFocus();
    
    // Tab through elements
    for (let i = 1; i < focusableElements.length; i++) {
      await userEvent.tab();
      await expect(focusableElements[i]).toHaveFocus();
    }
    
    // Tab should cycle back to first element
    await userEvent.tab();
    await expect(focusableElements[0]).toHaveFocus();
  },

  /**
   * Test loading state
   */
  async testLoadingState(canvas, buttonRole) {
    const button = canvas.getByRole(buttonRole);
    
    // Click to trigger loading
    await userEvent.click(button);
    
    // Check for loading indicator
    await waitFor(() => {
      const spinner = canvas.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  },

  /**
   * Test responsive behavior
   */
  async testResponsiveBehavior(canvas, breakpoints) {
    for (const [size, width] of Object.entries(breakpoints)) {
      // Set viewport
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
      
      await waitFor(() => {
        // Test specific behavior for this breakpoint
        const element = canvas.getByTestId(`responsive-${size}`);
        expect(element).toBeVisible();
      });
    }
  }
};

export default testUtils;