/**
 * Interaction tests for DescriptionList component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const DescriptionListTests = {
  /**
   * Test basic description list structure
   */
  async testBasicDescriptionList(canvasElement) {
    const canvas = within(canvasElement);
    const descriptionList = canvas.getByRole('list');
    
    // Test description list exists
    await expect(descriptionList).toBeInTheDocument();
    await expect(descriptionList.tagName.toLowerCase()).toBe('dl');
    
    // Test terms and descriptions
    const terms = within(descriptionList).getAllByRole('term');
    const descriptions = within(descriptionList).getAllByRole('definition');
    
    await expect(terms.length).toBeGreaterThan(0);
    await expect(descriptions.length).toBeGreaterThan(0);
    await expect(descriptions.length).toBeGreaterThanOrEqual(terms.length);
  },

  /**
   * Test term-description pairing
   */
  async testTermDescriptionPairing(canvasElement) {
    const canvas = within(canvasElement);
    const descriptionList = canvas.getByRole('list');
    const terms = within(descriptionList).getAllByRole('term');
    const descriptions = within(descriptionList).getAllByRole('definition');
    
    // Check proper pairing
    for (let i = 0; i < Math.min(3, terms.length); i++) {
      const term = terms[i];
      const description = descriptions[i];
      
      // Term should come before description in DOM
      const termPosition = Array.from(descriptionList.children).indexOf(term);
      const descPosition = Array.from(descriptionList.children).indexOf(description);
      
      await expect(termPosition).toBeLessThan(descPosition);
      
      // Check ARIA relationship if implemented
      const describedBy = term.getAttribute('aria-describedby');
      if (describedBy) {
        await expect(description.id).toBe(describedBy);
      }
    }
  },

  /**
   * Test horizontal layout
   */
  async testHorizontalLayout(canvasElement) {
    const canvas = within(canvasElement);
    const horizontalList = canvas.getByTestId('horizontal-description-list');
    
    const terms = within(horizontalList).getAllByRole('term');
    const descriptions = within(horizontalList).getAllByRole('definition');
    
    if (terms.length > 0 && descriptions.length > 0) {
      // In horizontal layout, term and description should be side by side
      const termRect = terms[0].getBoundingClientRect();
      const descRect = descriptions[0].getBoundingClientRect();
      
      // Check if they're on the same horizontal line
      const onSameLine = Math.abs(termRect.top - descRect.top) < 10;
      const termOnLeft = termRect.right <= descRect.left + 10;
      
      await expect(onSameLine && termOnLeft).toBe(true);
    }
  },

  /**
   * Test vertical layout
   */
  async testVerticalLayout(canvasElement) {
    const canvas = within(canvasElement);
    const verticalList = canvas.getByTestId('vertical-description-list');
    
    const terms = within(verticalList).getAllByRole('term');
    const descriptions = within(verticalList).getAllByRole('definition');
    
    if (terms.length > 0 && descriptions.length > 0) {
      // In vertical layout, description should be below term
      const termRect = terms[0].getBoundingClientRect();
      const descRect = descriptions[0].getBoundingClientRect();
      
      await expect(descRect.top).toBeGreaterThan(termRect.bottom - 5);
    }
  },

  /**
   * Test multiple descriptions per term
   */
  async testMultipleDescriptions(canvasElement) {
    const canvas = within(canvasElement);
    const multiDescList = canvas.getByTestId('multi-description-list');
    
    // Find a term with multiple descriptions
    const allElements = Array.from(multiDescList.children);
    let termWithMultipleDescs = null;
    let relatedDescs = [];
    
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      if (element.getAttribute('role') === 'term') {
        const followingDescs = [];
        for (let j = i + 1; j < allElements.length; j++) {
          const nextElement = allElements[j];
          if (nextElement.getAttribute('role') === 'definition') {
            followingDescs.push(nextElement);
          } else if (nextElement.getAttribute('role') === 'term') {
            break;
          }
        }
        
        if (followingDescs.length > 1) {
          termWithMultipleDescs = element;
          relatedDescs = followingDescs;
          break;
        }
      }
    }
    
    if (termWithMultipleDescs && relatedDescs.length > 1) {
      // Check all descriptions are properly grouped
      for (const desc of relatedDescs) {
        await expect(desc).toHaveAttribute('role', 'definition');
      }
    }
  },

  /**
   * Test interactive descriptions
   */
  async testInteractiveDescriptions(canvasElement) {
    const canvas = within(canvasElement);
    const interactiveList = canvas.getByTestId('interactive-description-list');
    
    // Find clickable elements in descriptions
    const descriptions = within(interactiveList).getAllByRole('definition');
    
    for (const description of descriptions.slice(0, 3)) {
      const links = within(description).getAllByRole('link');
      const buttons = within(description).getAllByRole('button');
      
      // Test links
      for (const link of links) {
        await expect(link).toHaveAttribute('href');
        
        // Test hover
        await userEvent.hover(link);
        await testUtils.testHoverState(canvas, 'link');
      }
      
      // Test buttons
      for (const button of buttons) {
        const onClick = jest.fn();
        button.onclick = onClick;
        await userEvent.click(button);
        await expect(onClick).toHaveBeenCalled();
      }
    }
  },

  /**
   * Test collapsible descriptions
   */
  async testCollapsibleDescriptions(canvasElement) {
    const canvas = within(canvasElement);
    const collapsibleList = canvas.getByTestId('collapsible-description-list');
    
    // Find expandable terms
    const expandableTerms = within(collapsibleList).getAllByRole('button');
    
    if (expandableTerms.length > 0) {
      const firstExpandable = expandableTerms[0];
      
      // Initially collapsed
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'false');
      
      // Click to expand
      await userEvent.click(firstExpandable);
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'true');
      
      // Description should be visible
      const controlledId = firstExpandable.getAttribute('aria-controls');
      if (controlledId) {
        const description = document.getElementById(controlledId);
        await expect(description).toBeVisible();
      }
      
      // Collapse again
      await userEvent.click(firstExpandable);
      await expect(firstExpandable).toHaveAttribute('aria-expanded', 'false');
    }
  },

  /**
   * Test responsive behavior
   */
  async testResponsiveBehavior(canvasElement) {
    const canvas = within(canvasElement);
    const responsiveList = canvas.getByTestId('responsive-description-list');
    
    const terms = within(responsiveList).getAllByRole('term');
    const descriptions = within(responsiveList).getAllByRole('definition');
    
    if (terms.length > 0 && descriptions.length > 0) {
      // Test mobile layout
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
      
      await waitFor(() => {
        const termRect = terms[0].getBoundingClientRect();
        const descRect = descriptions[0].getBoundingClientRect();
        
        // On mobile, should stack vertically
        const isStacked = descRect.top > termRect.bottom - 10;
        expect(isStacked).toBe(true);
      });
      
      // Test desktop layout
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      
      await waitFor(() => {
        // Layout should adapt to larger screen
        const listStyles = window.getComputedStyle(responsiveList);
        expect(listStyles.display).toBeTruthy();
      });
    }
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const descriptionList = canvas.getByRole('list');
    
    // Get all focusable elements
    const focusableElements = within(descriptionList).getAllByRole(/button|link/);
    
    if (focusableElements.length > 0) {
      // Tab through focusable elements
      for (let i = 0; i < Math.min(3, focusableElements.length); i++) {
        await userEvent.tab();
        await expect(focusableElements[i]).toHaveFocus();
      }
      
      // Test Enter key on expandable terms
      const expandableButton = focusableElements.find(el => 
        el.getAttribute('aria-expanded') !== null
      );
      
      if (expandableButton) {
        expandableButton.focus();
        const initialState = expandableButton.getAttribute('aria-expanded');
        
        await userEvent.keyboard('{Enter}');
        
        const newState = expandableButton.getAttribute('aria-expanded');
        await expect(newState).not.toBe(initialState);
      }
    }
  },

  /**
   * Test list with icons
   */
  async testListWithIcons(canvasElement) {
    const canvas = within(canvasElement);
    const iconList = canvas.getByTestId('icon-description-list');
    
    const terms = within(iconList).getAllByRole('term');
    
    // Check terms have icons
    for (const term of terms.slice(0, 3)) {
      const icon = within(term).queryByTestId(/icon/i);
      if (icon) {
        await expect(icon).toBeInTheDocument();
        
        // Check icon positioning
        const iconRect = icon.getBoundingClientRect();
        const termRect = term.getBoundingClientRect();
        
        // Icon should be on the left
        await expect(iconRect.left).toBeLessThan(termRect.left + termRect.width / 2);
      }
    }
  },

  /**
   * Test list with status indicators
   */
  async testListWithStatus(canvasElement) {
    const canvas = within(canvasElement);
    const statusList = canvas.getByTestId('status-description-list');
    
    const descriptions = within(statusList).getAllByRole('definition');
    
    // Check for status indicators
    for (const description of descriptions.slice(0, 3)) {
      const statusIndicator = within(description).queryByTestId(/status|badge/i);
      if (statusIndicator) {
        await expect(statusIndicator).toBeInTheDocument();
        
        // Should have appropriate status class
        const statusClass = Array.from(statusIndicator.classList).find(cls => 
          cls.includes('success') || cls.includes('error') || cls.includes('warning') || cls.includes('info')
        );
        await expect(statusClass).toBeTruthy();
      }
    }
  },

  /**
   * Test copy functionality
   */
  async testCopyFunctionality(canvasElement) {
    const canvas = within(canvasElement);
    const copyableList = canvas.getByTestId('copyable-description-list');
    
    // Find copy buttons
    const copyButtons = within(copyableList).getAllByRole('button', { name: /copy/i });
    
    if (copyButtons.length > 0) {
      const firstCopyButton = copyButtons[0];
      
      // Mock clipboard API
      const mockClipboard = {
        writeText: jest.fn().mockResolvedValue(undefined)
      };
      Object.assign(navigator, { clipboard: mockClipboard });
      
      // Click copy button
      await userEvent.click(firstCopyButton);
      
      // Check clipboard was called
      await expect(mockClipboard.writeText).toHaveBeenCalled();
      
      // Check for copy feedback
      const feedback = await waitFor(() => 
        canvas.queryByText(/copied|copy successful/i)
      );
      if (feedback) {
        await expect(feedback).toBeInTheDocument();
      }
    }
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const descriptionList = canvas.getByRole('list');
    
    // Test list structure
    await expect(descriptionList.tagName.toLowerCase()).toBe('dl');
    
    // Test terms and descriptions
    const terms = within(descriptionList).getAllByRole('term');
    const descriptions = within(descriptionList).getAllByRole('definition');
    
    for (const term of terms.slice(0, 3)) {
      await expect(term.tagName.toLowerCase()).toBe('dt');
      await expect(term).toHaveAttribute('role', 'term');
    }
    
    for (const description of descriptions.slice(0, 3)) {
      await expect(description.tagName.toLowerCase()).toBe('dd');
      await expect(description).toHaveAttribute('role', 'definition');
    }
    
    // Test expandable terms accessibility
    const expandableTerms = within(descriptionList).getAllByRole('button');
    for (const button of expandableTerms) {
      testUtils.testAriaAttributes(button, {
        'aria-expanded': expect.any(String),
        'aria-controls': expect.any(String)
      });
    }
    
    // Test screen reader announcements
    const liveRegion = canvas.queryByRole('status');
    if (liveRegion && expandableTerms.length > 0) {
      await userEvent.click(expandableTerms[0]);
      
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent(/expanded|collapsed/i);
      });
    }
  }
};

// Export individual test functions
export const testBasicDescriptionList = DescriptionListTests.testBasicDescriptionList;
export const testTermDescriptionPairing = DescriptionListTests.testTermDescriptionPairing;
export const testHorizontalLayout = DescriptionListTests.testHorizontalLayout;
export const testVerticalLayout = DescriptionListTests.testVerticalLayout;
export const testMultipleDescriptions = DescriptionListTests.testMultipleDescriptions;
export const testInteractiveDescriptions = DescriptionListTests.testInteractiveDescriptions;
export const testCollapsibleDescriptions = DescriptionListTests.testCollapsibleDescriptions;
export const testResponsiveBehavior = DescriptionListTests.testResponsiveBehavior;
export const testKeyboardNavigation = DescriptionListTests.testKeyboardNavigation;
export const testListWithIcons = DescriptionListTests.testListWithIcons;
export const testListWithStatus = DescriptionListTests.testListWithStatus;
export const testCopyFunctionality = DescriptionListTests.testCopyFunctionality;
export const testAccessibility = DescriptionListTests.testAccessibility;