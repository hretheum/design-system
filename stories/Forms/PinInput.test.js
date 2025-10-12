/**
 * Interaction tests for PinInput component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const PinInputTests = {
  /**
   * Test basic pin input functionality
   */
  async testBasicPinInput(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Default should have 4 fields
    await expect(pinFields).toHaveLength(4);
    
    // Each field should accept single character
    for (const field of pinFields) {
      await expect(field).toHaveAttribute('maxlength', '1');
      await expect(field).toHaveAttribute('inputmode', 'numeric');
    }
  },

  /**
   * Test typing flow
   */
  async testTypingFlow(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Type PIN code
    await userEvent.type(pinFields[0], '1');
    await expect(pinFields[0]).toHaveValue('1');
    await expect(pinFields[1]).toHaveFocus();
    
    await userEvent.type(pinFields[1], '2');
    await expect(pinFields[1]).toHaveValue('2');
    await expect(pinFields[2]).toHaveFocus();
    
    await userEvent.type(pinFields[2], '3');
    await expect(pinFields[2]).toHaveValue('3');
    await expect(pinFields[3]).toHaveFocus();
    
    await userEvent.type(pinFields[3], '4');
    await expect(pinFields[3]).toHaveValue('4');
    
    // Check complete event
    const completeStatus = canvas.getByTestId('pin-complete-status');
    await expect(completeStatus).toHaveTextContent('1234');
  },

  /**
   * Test backspace navigation
   */
  async testBackspaceNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Fill all fields
    await userEvent.type(pinFields[0], '1234');
    
    // Focus last field and backspace
    pinFields[3].focus();
    await userEvent.keyboard('{Backspace}');
    await expect(pinFields[3]).toHaveValue('');
    await expect(pinFields[2]).toHaveFocus();
    
    // Continue backspace
    await userEvent.keyboard('{Backspace}');
    await expect(pinFields[2]).toHaveValue('');
    await expect(pinFields[1]).toHaveFocus();
  },

  /**
   * Test paste functionality
   */
  async testPaste(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Focus first field
    pinFields[0].focus();
    
    // Simulate paste event
    const pasteData = '5678';
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true
    });
    pasteEvent.clipboardData.setData('text/plain', pasteData);
    pinFields[0].dispatchEvent(pasteEvent);
    
    // All fields should be filled
    await waitFor(() => {
      expect(pinFields[0]).toHaveValue('5');
      expect(pinFields[1]).toHaveValue('6');
      expect(pinFields[2]).toHaveValue('7');
      expect(pinFields[3]).toHaveValue('8');
    });
  },

  /**
   * Test masked input
   */
  async testMaskedInput(canvasElement) {
    const canvas = within(canvasElement);
    const maskedPinFields = canvas.getAllByTestId(/masked-pin-field/i);
    
    // Check type is password for masked fields
    for (const field of maskedPinFields) {
      await expect(field).toHaveAttribute('type', 'password');
    }
    
    // Type and verify masking
    await userEvent.type(maskedPinFields[0], '1');
    await expect(maskedPinFields[0]).toHaveValue('1');
    
    // Visual should be masked (dots/asterisks)
    const computedStyle = window.getComputedStyle(maskedPinFields[0]);
    await expect(computedStyle.webkitTextSecurity || field.type).toBeTruthy();
  },

  /**
   * Test alphanumeric mode
   */
  async testAlphanumericMode(canvasElement) {
    const canvas = within(canvasElement);
    const alphaFields = canvas.getAllByTestId(/alpha-pin-field/i);
    
    // Should accept letters and numbers
    await userEvent.type(alphaFields[0], 'A');
    await expect(alphaFields[0]).toHaveValue('A');
    await expect(alphaFields[1]).toHaveFocus();
    
    await userEvent.type(alphaFields[1], '1');
    await expect(alphaFields[1]).toHaveValue('1');
    await expect(alphaFields[2]).toHaveFocus();
    
    await userEvent.type(alphaFields[2], 'B');
    await expect(alphaFields[2]).toHaveValue('B');
    await expect(alphaFields[3]).toHaveFocus();
    
    await userEvent.type(alphaFields[3], '2');
    await expect(alphaFields[3]).toHaveValue('2');
  },

  /**
   * Test custom length
   */
  async testCustomLength(canvasElement) {
    const canvas = within(canvasElement);
    
    // Test 6-digit PIN
    const sixDigitFields = canvas.getAllByTestId(/six-digit-pin/i);
    await expect(sixDigitFields).toHaveLength(6);
    
    // Test 8-digit PIN
    const eightDigitFields = canvas.getAllByTestId(/eight-digit-pin/i);
    await expect(eightDigitFields).toHaveLength(8);
  },

  /**
   * Test validation
   */
  async testValidation(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Test numeric-only validation
    await userEvent.type(pinFields[0], 'a');
    await expect(pinFields[0]).toHaveValue('');
    
    // Error message should appear
    const errorMessage = await waitFor(() => canvas.getByRole('alert'));
    await expect(errorMessage).toHaveTextContent(/numeric only/i);
    
    // Type valid input
    await userEvent.type(pinFields[0], '1');
    await expect(pinFields[0]).toHaveValue('1');
    
    // Error should clear
    await waitFor(() => {
      expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    });
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    
    // Tab forward
    pinFields[0].focus();
    await userEvent.tab();
    await expect(pinFields[1]).toHaveFocus();
    
    // Shift+Tab backward
    await userEvent.tab({ shift: true });
    await expect(pinFields[0]).toHaveFocus();
    
    // Arrow keys
    await userEvent.keyboard('{ArrowRight}');
    await expect(pinFields[1]).toHaveFocus();
    
    await userEvent.keyboard('{ArrowLeft}');
    await expect(pinFields[0]).toHaveFocus();
  },

  /**
   * Test disabled state
   */
  async testDisabledState(canvasElement) {
    const canvas = within(canvasElement);
    const disabledFields = canvas.getAllByTestId(/disabled-pin-field/i);
    
    // All fields should be disabled
    for (const field of disabledFields) {
      await expect(field).toBeDisabled();
      
      // Try to type - should not work
      await userEvent.type(field, '1');
      await expect(field).toHaveValue('');
    }
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const pinFields = canvas.getAllByRole('textbox');
    const container = canvas.getByTestId('pin-input-container');
    
    // Container should have proper role and label
    await expect(container).toHaveAttribute('role', 'group');
    await expect(container).toHaveAttribute('aria-label');
    
    // Each field should have proper attributes
    for (let i = 0; i < pinFields.length; i++) {
      await expect(pinFields[i]).toHaveAttribute('aria-label', expect.stringContaining(`${i + 1}`));
      await expect(pinFields[i]).toHaveAttribute('aria-describedby');
    }
    
    // Test screen reader announcements
    const liveRegion = canvas.getByRole('status');
    await userEvent.type(pinFields[0], '1');
    
    await waitFor(() => {
      expect(liveRegion).toHaveTextContent(/entered digit 1/i);
    });
  }
};

// Export individual test functions
export const testBasicPinInput = PinInputTests.testBasicPinInput;
export const testTypingFlow = PinInputTests.testTypingFlow;
export const testBackspaceNavigation = PinInputTests.testBackspaceNavigation;
export const testPaste = PinInputTests.testPaste;
export const testMaskedInput = PinInputTests.testMaskedInput;
export const testAlphanumericMode = PinInputTests.testAlphanumericMode;
export const testCustomLength = PinInputTests.testCustomLength;
export const testValidation = PinInputTests.testValidation;
export const testKeyboardNavigation = PinInputTests.testKeyboardNavigation;
export const testDisabledState = PinInputTests.testDisabledState;
export const testAccessibility = PinInputTests.testAccessibility;