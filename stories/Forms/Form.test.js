/**
 * Interaction tests for Form component wrapper
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const FormTests = {
  /**
   * Test basic form structure
   */
  async testBasicForm(canvasElement) {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form');
    
    // Test form exists
    await expect(form).toBeInTheDocument();
    
    // Test form sections
    const sections = canvas.getAllByRole('group');
    await expect(sections.length).toBeGreaterThan(0);
    
    // Test submit button
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await expect(submitButton).toBeInTheDocument();
  },

  /**
   * Test form validation
   */
  async testFormValidation(canvasElement) {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form');
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    
    // Try to submit empty form
    await userEvent.click(submitButton);
    
    // Check for validation errors
    const errors = await waitFor(() => canvas.getAllByRole('alert'));
    await expect(errors.length).toBeGreaterThan(0);
    
    // Form should have invalid state
    await expect(form).toHaveAttribute('aria-invalid', 'true');
    
    // Fill required fields
    const requiredInput = canvas.getByLabelText(/required/i);
    await userEvent.type(requiredInput, 'Test value');
    
    // Submit again
    await userEvent.click(submitButton);
    
    // Errors should be reduced/cleared
    await waitFor(() => {
      const newErrors = canvas.queryAllByRole('alert');
      expect(newErrors.length).toBeLessThan(errors.length);
    });
  },

  /**
   * Test field groups
   */
  async testFieldGroups(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test fieldset groups
    const fieldsets = canvas.getAllByRole('group');
    
    for (const fieldset of fieldsets) {
      // Should have legend or aria-label
      const legend = within(fieldset).queryByRole('heading');
      const ariaLabel = fieldset.getAttribute('aria-label');
      await expect(legend || ariaLabel).toBeTruthy();
    }
  },

  /**
   * Test form submission
   */
  async testFormSubmission(canvasElement) {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form');
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    
    // Fill all required fields
    const inputs = canvas.getAllByRole('textbox');
    for (const input of inputs) {
      if (input.hasAttribute('required')) {
        await userEvent.type(input, 'Test value');
      }
    }
    
    // Add submission handler
    const onSubmit = jest.fn(e => e.preventDefault());
    form.addEventListener('submit', onSubmit);
    
    // Submit form
    await userEvent.click(submitButton);
    
    // Check submission was triggered
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    
    // Check for success message
    const successMessage = await waitFor(() => 
      canvas.getByText(/success|submitted/i)
    );
    await expect(successMessage).toBeInTheDocument();
  },

  /**
   * Test progressive disclosure
   */
  async testProgressiveDisclosure(canvasElement) {
    const canvas = within(canvasElement);
    
    // Find conditional field trigger
    const triggerCheckbox = canvas.getByRole('checkbox', { name: /show additional/i });
    
    // Additional fields should be hidden
    let additionalFields = canvas.queryByTestId('additional-fields');
    await expect(additionalFields).not.toBeInTheDocument();
    
    // Check trigger to show fields
    await userEvent.click(triggerCheckbox);
    
    // Additional fields should appear
    additionalFields = await waitFor(() => 
      canvas.getByTestId('additional-fields')
    );
    await expect(additionalFields).toBeInTheDocument();
    
    // Uncheck to hide again
    await userEvent.click(triggerCheckbox);
    
    // Fields should disappear
    await waitFor(() => {
      expect(canvas.queryByTestId('additional-fields')).not.toBeInTheDocument();
    });
  },

  /**
   * Test form reset
   */
  async testFormReset(canvasElement) {
    const canvas = within(canvasElement);
    const resetButton = canvas.getByRole('button', { name: /reset|clear/i });
    
    // Fill some fields
    const textInput = canvas.getAllByRole('textbox')[0];
    const checkbox = canvas.getAllByRole('checkbox')[0];
    const select = canvas.getAllByRole('combobox')[0];
    
    await userEvent.type(textInput, 'Test text');
    await userEvent.click(checkbox);
    await userEvent.selectOptions(select, 'option2');
    
    // Reset form
    await userEvent.click(resetButton);
    
    // Check fields are cleared
    await expect(textInput).toHaveValue('');
    await expect(checkbox).not.toBeChecked();
    await expect(select).toHaveValue('');
  },

  /**
   * Test field dependencies
   */
  async testFieldDependencies(canvasElement) {
    const canvas = within(canvasElement);
    
    // Find country select
    const countrySelect = canvas.getByLabelText(/country/i);
    const stateSelect = canvas.getByLabelText(/state/i);
    
    // State should be disabled initially
    await expect(stateSelect).toBeDisabled();
    
    // Select country
    await userEvent.selectOptions(countrySelect, 'USA');
    
    // State should be enabled and populated
    await waitFor(() => {
      expect(stateSelect).toBeEnabled();
    });
    
    // Check state options are loaded
    const stateOptions = within(stateSelect).getAllByRole('option');
    await expect(stateOptions.length).toBeGreaterThan(1);
  },

  /**
   * Test auto-save
   */
  async testAutoSave(canvasElement) {
    const canvas = within(canvasElement);
    const autoSaveIndicator = canvas.getByTestId('auto-save-indicator');
    
    // Type in a field
    const input = canvas.getAllByRole('textbox')[0];
    await userEvent.type(input, 'Auto save test');
    
    // Wait for auto-save to trigger
    await waitFor(() => {
      expect(autoSaveIndicator).toHaveTextContent(/saving/i);
    }, { timeout: 3000 });
    
    // Wait for save to complete
    await waitFor(() => {
      expect(autoSaveIndicator).toHaveTextContent(/saved/i);
    }, { timeout: 5000 });
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form');
    
    // Get all focusable elements
    const focusableElements = within(form).getAllByRole(/textbox|checkbox|radio|button|combobox/);
    
    // Tab through form
    for (let i = 0; i < focusableElements.length; i++) {
      await userEvent.tab();
      await expect(focusableElements[i]).toHaveFocus();
    }
    
    // Test Enter key submission from input
    const lastInput = canvas.getAllByRole('textbox').pop();
    lastInput.focus();
    
    const onSubmit = jest.fn(e => e.preventDefault());
    form.addEventListener('submit', onSubmit);
    
    await userEvent.keyboard('{Enter}');
    await expect(onSubmit).toHaveBeenCalled();
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form');
    
    // Test form labeling
    await expect(form).toHaveAttribute('aria-label');
    
    // Test error summary
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    const errorSummary = await waitFor(() => 
      canvas.getByRole('region', { name: /error summary/i })
    );
    await expect(errorSummary).toBeInTheDocument();
    await expect(errorSummary).toHaveAttribute('aria-live', 'assertive');
    
    // Test field descriptions
    const inputs = canvas.getAllByRole('textbox');
    for (const input of inputs) {
      const describedBy = input.getAttribute('aria-describedby');
      if (describedBy) {
        const description = document.getElementById(describedBy);
        await expect(description).toBeInTheDocument();
      }
    }
  }
};

// Export individual test functions
export const testBasicForm = FormTests.testBasicForm;
export const testFormValidation = FormTests.testFormValidation;
export const testFieldGroups = FormTests.testFieldGroups;
export const testFormSubmission = FormTests.testFormSubmission;
export const testProgressiveDisclosure = FormTests.testProgressiveDisclosure;
export const testFormReset = FormTests.testFormReset;
export const testFieldDependencies = FormTests.testFieldDependencies;
export const testAutoSave = FormTests.testAutoSave;
export const testKeyboardNavigation = FormTests.testKeyboardNavigation;
export const testAccessibility = FormTests.testAccessibility;