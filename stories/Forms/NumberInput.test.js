/**
 * Interaction tests for NumberInput component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const NumberInputTests = {
  /**
   * Test basic number input functionality
   */
  async testBasicNumberInput(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByRole('spinbutton');
    
    // Test input exists
    await expect(numberInput).toBeInTheDocument();
    await expect(numberInput).toHaveAttribute('type', 'number');
    await expect(numberInput).toHaveValue(0);
    
    // Type a number
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '42');
    await expect(numberInput).toHaveValue(42);
  },

  /**
   * Test stepper buttons
   */
  async testStepperButtons(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByRole('spinbutton');
    const incrementButton = canvas.getByRole('button', { name: /increment|increase/i });
    const decrementButton = canvas.getByRole('button', { name: /decrement|decrease/i });
    
    // Test increment
    const initialValue = parseInt(numberInput.value);
    await userEvent.click(incrementButton);
    await expect(numberInput).toHaveValue(initialValue + 1);
    
    // Test decrement
    await userEvent.click(decrementButton);
    await expect(numberInput).toHaveValue(initialValue);
    
    // Test holding for rapid change
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: incrementButton },
      { delay: 500 },
      { keys: '[/MouseLeft]' }
    ]);
    
    // Value should have increased multiple times
    await expect(numberInput.value).toBeGreaterThan(initialValue);
  },

  /**
   * Test min/max constraints
   */
  async testMinMaxConstraints(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByTestId('constrained-number-input');
    
    // Check attributes
    await expect(numberInput).toHaveAttribute('min', '0');
    await expect(numberInput).toHaveAttribute('max', '100');
    
    // Try to exceed max
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '150');
    await userEvent.tab();
    
    // Should be clamped to max
    await expect(numberInput).toHaveValue(100);
    
    // Try to go below min
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '-10');
    await userEvent.tab();
    
    // Should be clamped to min
    await expect(numberInput).toHaveValue(0);
  },

  /**
   * Test step attribute
   */
  async testStepAttribute(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByTestId('stepped-number-input');
    const incrementButton = canvas.getByRole('button', { name: /increment/i });
    
    // Check step attribute
    await expect(numberInput).toHaveAttribute('step', '5');
    
    // Set initial value
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '10');
    
    // Click increment - should add step value
    await userEvent.click(incrementButton);
    await expect(numberInput).toHaveValue(15);
    
    // Test keyboard increment
    numberInput.focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(numberInput).toHaveValue(20);
  },

  /**
   * Test decimal input
   */
  async testDecimalInput(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByTestId('decimal-number-input');
    
    // Check step for decimals
    await expect(numberInput).toHaveAttribute('step', '0.01');
    
    // Type decimal value
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '3.14159');
    await userEvent.tab();
    
    // Should round to step precision
    await expect(numberInput).toHaveValue(3.14);
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByRole('spinbutton');
    
    // Focus input
    numberInput.focus();
    await expect(numberInput).toHaveFocus();
    
    // Set initial value
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '50');
    
    // Arrow up increases
    await userEvent.keyboard('{ArrowUp}');
    await expect(numberInput).toHaveValue(51);
    
    // Arrow down decreases
    await userEvent.keyboard('{ArrowDown}');
    await expect(numberInput).toHaveValue(50);
    
    // Page up increases by 10
    await userEvent.keyboard('{PageUp}');
    await expect(numberInput).toHaveValue(60);
    
    // Page down decreases by 10
    await userEvent.keyboard('{PageDown}');
    await expect(numberInput).toHaveValue(50);
    
    // Home goes to min
    await userEvent.keyboard('{Home}');
    const min = numberInput.getAttribute('min');
    if (min) {
      await expect(numberInput).toHaveValue(parseInt(min));
    }
    
    // End goes to max
    await userEvent.keyboard('{End}');
    const max = numberInput.getAttribute('max');
    if (max) {
      await expect(numberInput).toHaveValue(parseInt(max));
    }
  },

  /**
   * Test formatting
   */
  async testFormatting(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByTestId('formatted-number-input');
    
    // Type large number
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '1000000');
    await userEvent.tab();
    
    // Should display formatted
    const formattedDisplay = canvas.getByTestId('formatted-display');
    await expect(formattedDisplay).toHaveTextContent('1,000,000');
    
    // Test currency formatting
    const currencyInput = canvas.getByTestId('currency-number-input');
    await userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, '1234.56');
    await userEvent.tab();
    
    const currencyDisplay = canvas.getByTestId('currency-display');
    await expect(currencyDisplay).toHaveTextContent('$1,234.56');
  },

  /**
   * Test validation
   */
  async testValidation(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByRole('spinbutton');
    
    // Test invalid input (letters)
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, 'abc');
    
    // Should not accept letters
    await expect(numberInput).toHaveValue(null);
    
    // Test validation message
    await userEvent.tab();
    const errorMessage = await waitFor(() => canvas.getByRole('alert'));
    await expect(errorMessage).toHaveTextContent(/invalid|required/i);
    
    // Fix the value
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '42');
    await userEvent.tab();
    
    // Error should disappear
    await waitFor(() => {
      expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    });
  },

  /**
   * Test disabled state
   */
  async testDisabledState(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByTestId('disabled-number-input');
    const incrementButton = canvas.getByTestId('disabled-increment');
    const decrementButton = canvas.getByTestId('disabled-decrement');
    
    // Check all are disabled
    await expect(numberInput).toBeDisabled();
    await expect(incrementButton).toBeDisabled();
    await expect(decrementButton).toBeDisabled();
    
    // Try to type - should not work
    const initialValue = numberInput.value;
    await userEvent.type(numberInput, '123');
    await expect(numberInput).toHaveValue(initialValue);
    
    // Try to click buttons - should not work
    await userEvent.click(incrementButton);
    await expect(numberInput).toHaveValue(initialValue);
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const numberInput = canvas.getByRole('spinbutton');
    
    // Test ARIA attributes
    testUtils.testAriaAttributes(numberInput, {
      'role': 'spinbutton',
      'aria-valuenow': expect.any(String),
      'aria-valuemin': expect.any(String),
      'aria-valuemax': expect.any(String)
    });
    
    // Test stepper button accessibility
    const incrementButton = canvas.getByRole('button', { name: /increment/i });
    const decrementButton = canvas.getByRole('button', { name: /decrement/i });
    
    await expect(incrementButton).toHaveAttribute('aria-label');
    await expect(decrementButton).toHaveAttribute('aria-label');
    
    // Test live region for value changes
    const liveRegion = canvas.getByRole('status');
    await userEvent.click(incrementButton);
    
    await waitFor(() => {
      expect(liveRegion).toHaveTextContent(numberInput.value);
    });
  }
};

// Export individual test functions
export const testBasicNumberInput = NumberInputTests.testBasicNumberInput;
export const testStepperButtons = NumberInputTests.testStepperButtons;
export const testMinMaxConstraints = NumberInputTests.testMinMaxConstraints;
export const testStepAttribute = NumberInputTests.testStepAttribute;
export const testDecimalInput = NumberInputTests.testDecimalInput;
export const testKeyboardNavigation = NumberInputTests.testKeyboardNavigation;
export const testFormatting = NumberInputTests.testFormatting;
export const testValidation = NumberInputTests.testValidation;
export const testDisabledState = NumberInputTests.testDisabledState;
export const testAccessibility = NumberInputTests.testAccessibility;