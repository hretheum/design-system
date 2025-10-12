/**
 * Interaction tests for SearchInput component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const SearchInputTests = {
  /**
   * Test basic search input functionality
   */
  async testBasicSearchInput(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Test input exists
    await expect(searchInput).toBeInTheDocument();
    await expect(searchInput).toHaveAttribute('type', 'search');
    
    // Test search icon
    const searchIcon = canvas.getByTestId('search-icon');
    await expect(searchIcon).toBeInTheDocument();
    
    // Type in search
    await userEvent.type(searchInput, 'test query');
    await expect(searchInput).toHaveValue('test query');
  },

  /**
   * Test search suggestions
   */
  async testSearchSuggestions(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Start typing
    await userEvent.type(searchInput, 'prod');
    
    // Wait for suggestions to appear
    const suggestions = await waitFor(() => canvas.getByRole('listbox'));
    await expect(suggestions).toBeInTheDocument();
    
    // Check suggestions
    const options = within(suggestions).getAllByRole('option');
    await expect(options.length).toBeGreaterThan(0);
    await expect(options[0]).toHaveTextContent(/product/i);
    
    // Select suggestion with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    await expect(options[0]).toHaveAttribute('aria-selected', 'true');
    
    // Press Enter to select
    await userEvent.keyboard('{Enter}');
    await expect(searchInput).toHaveValue(options[0].textContent);
    
    // Suggestions should close
    await waitFor(() => {
      expect(canvas.queryByRole('listbox')).not.toBeInTheDocument();
    });
  },

  /**
   * Test clear button
   */
  async testClearButton(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Type something
    await userEvent.type(searchInput, 'search term');
    
    // Clear button should appear
    const clearButton = await waitFor(() => 
      canvas.getByRole('button', { name: /clear/i })
    );
    await expect(clearButton).toBeInTheDocument();
    
    // Click clear button
    await userEvent.click(clearButton);
    
    // Input should be cleared
    await expect(searchInput).toHaveValue('');
    
    // Clear button should disappear
    await waitFor(() => {
      expect(canvas.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });
  },

  /**
   * Test search submission
   */
  async testSearchSubmission(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    const form = searchInput.closest('form');
    
    // Add submit handler
    const onSubmit = jest.fn(e => e.preventDefault());
    form.addEventListener('submit', onSubmit);
    
    // Type and submit with Enter
    await userEvent.type(searchInput, 'search query');
    await userEvent.keyboard('{Enter}');
    
    // Check submit was called
    await expect(onSubmit).toHaveBeenCalled();
    
    // Test submit button if present
    const submitButton = canvas.queryByRole('button', { name: /search/i });
    if (submitButton) {
      await userEvent.click(submitButton);
      await expect(onSubmit).toHaveBeenCalledTimes(2);
    }
  },

  /**
   * Test loading state
   */
  async testLoadingState(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByTestId('loading-search');
    
    // Type to trigger search
    await userEvent.type(searchInput, 'loading');
    
    // Check for loading indicator
    await waitFor(() => {
      const spinner = canvas.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });
    
    // Input should be marked as busy
    await expect(searchInput).toHaveAttribute('aria-busy', 'true');
  },

  /**
   * Test search with filters
   */
  async testSearchWithFilters(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Open filter dropdown
    const filterButton = canvas.getByRole('button', { name: /filter/i });
    await userEvent.click(filterButton);
    
    // Select filter options
    const filterMenu = await waitFor(() => canvas.getByRole('menu'));
    const categoryFilter = within(filterMenu).getByRole('checkbox', { name: /category/i });
    await userEvent.click(categoryFilter);
    
    // Apply filters
    const applyButton = within(filterMenu).getByRole('button', { name: /apply/i });
    await userEvent.click(applyButton);
    
    // Check filter badge appears
    const filterBadge = await waitFor(() => canvas.getByTestId('filter-badge'));
    await expect(filterBadge).toHaveTextContent('1');
    
    // Perform search with filters
    await userEvent.type(searchInput, 'filtered search');
    await userEvent.keyboard('{Enter}');
  },

  /**
   * Test search history
   */
  async testSearchHistory(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Focus to show history
    await userEvent.click(searchInput);
    
    // Check for recent searches
    const history = await waitFor(() => canvas.getByTestId('search-history'));
    await expect(history).toBeInTheDocument();
    
    // Check history items
    const historyItems = within(history).getAllByRole('button');
    await expect(historyItems.length).toBeGreaterThan(0);
    
    // Click history item
    await userEvent.click(historyItems[0]);
    await expect(searchInput).toHaveValue(historyItems[0].textContent);
  },

  /**
   * Test voice search
   */
  async testVoiceSearch(canvasElement) {
    const canvas = within(canvasElement);
    
    // Check for voice search button
    const voiceButton = canvas.queryByRole('button', { name: /voice|microphone/i });
    
    if (voiceButton && 'webkitSpeechRecognition' in window) {
      await expect(voiceButton).toBeEnabled();
      
      // Click voice button
      await userEvent.click(voiceButton);
      
      // Should start listening
      await expect(voiceButton).toHaveAttribute('aria-pressed', 'true');
      await expect(voiceButton).toHaveAttribute('aria-label', expect.stringContaining('listening'));
    }
  },

  /**
   * Test keyboard shortcuts
   */
  async testKeyboardShortcuts(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Test Ctrl+K or Cmd+K to focus search
    await userEvent.keyboard('{Control>}k{/Control}');
    await expect(searchInput).toHaveFocus();
    
    // Test Escape to clear and blur
    await userEvent.type(searchInput, 'text');
    await userEvent.keyboard('{Escape}');
    await expect(searchInput).toHaveValue('');
    
    // Type again
    await userEvent.type(searchInput, 'new text');
    
    // Escape again should blur
    await userEvent.keyboard('{Escape}');
    await expect(searchInput).not.toHaveFocus();
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole('searchbox');
    
    // Test ARIA attributes
    await expect(searchInput).toHaveAttribute('aria-label');
    await expect(searchInput).toHaveAttribute('autocomplete', 'off');
    
    // Test with suggestions
    await userEvent.type(searchInput, 'test');
    
    const suggestions = await waitFor(() => canvas.getByRole('listbox'));
    await expect(searchInput).toHaveAttribute('aria-controls', suggestions.id);
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');
    await expect(searchInput).toHaveAttribute('aria-autocomplete', 'list');
    
    // Test live region for results
    const liveRegion = canvas.getByRole('status');
    await expect(liveRegion).toBeInTheDocument();
    await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  }
};

// Export individual test functions
export const testBasicSearchInput = SearchInputTests.testBasicSearchInput;
export const testSearchSuggestions = SearchInputTests.testSearchSuggestions;
export const testClearButton = SearchInputTests.testClearButton;
export const testSearchSubmission = SearchInputTests.testSearchSubmission;
export const testLoadingState = SearchInputTests.testLoadingState;
export const testSearchWithFilters = SearchInputTests.testSearchWithFilters;
export const testSearchHistory = SearchInputTests.testSearchHistory;
export const testVoiceSearch = SearchInputTests.testVoiceSearch;
export const testKeyboardShortcuts = SearchInputTests.testKeyboardShortcuts;
export const testAccessibility = SearchInputTests.testAccessibility;