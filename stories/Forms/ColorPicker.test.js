/**
 * Interaction tests for ColorPicker component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const ColorPickerTests = {
  /**
   * Test basic color picker functionality
   */
  async testBasicColorPicker(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Test trigger exists and shows current color
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveStyle({ backgroundColor: 'rgb(0, 123, 255)' });
    
    // Click to open picker
    await userEvent.click(trigger);
    
    // Check picker is visible
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    await expect(picker).toBeInTheDocument();
  },

  /**
   * Test color selection from palette
   */
  async testPaletteSelection(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Select color from palette
    const colorSwatches = within(picker).getAllByRole('button', { name: /color/i });
    const redSwatch = colorSwatches.find(s => s.getAttribute('aria-label').includes('red'));
    
    await userEvent.click(redSwatch);
    
    // Check trigger updated
    await waitFor(() => {
      expect(trigger).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });
    
    // Picker should close
    await waitFor(() => {
      expect(canvas.queryByTestId('color-picker-panel')).not.toBeInTheDocument();
    });
  },

  /**
   * Test hex input
   */
  async testHexInput(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find hex input
    const hexInput = within(picker).getByRole('textbox', { name: /hex/i });
    await expect(hexInput).toHaveValue('#007BFF');
    
    // Change hex value
    await userEvent.clear(hexInput);
    await userEvent.type(hexInput, '#FF5733');
    await userEvent.tab();
    
    // Check color updated
    await waitFor(() => {
      expect(trigger).toHaveStyle({ backgroundColor: 'rgb(255, 87, 51)' });
    });
  },

  /**
   * Test RGB inputs
   */
  async testRGBInputs(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find RGB inputs
    const redInput = within(picker).getByRole('spinbutton', { name: /red/i });
    const greenInput = within(picker).getByRole('spinbutton', { name: /green/i });
    const blueInput = within(picker).getByRole('spinbutton', { name: /blue/i });
    
    // Change RGB values
    await userEvent.clear(redInput);
    await userEvent.type(redInput, '128');
    
    await userEvent.clear(greenInput);
    await userEvent.type(greenInput, '64');
    
    await userEvent.clear(blueInput);
    await userEvent.type(blueInput, '192');
    
    await userEvent.tab();
    
    // Check color updated
    await waitFor(() => {
      expect(trigger).toHaveStyle({ backgroundColor: 'rgb(128, 64, 192)' });
    });
  },

  /**
   * Test HSL sliders
   */
  async testHSLSliders(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find hue slider
    const hueSlider = within(picker).getByRole('slider', { name: /hue/i });
    await expect(hueSlider).toHaveAttribute('aria-valuemax', '360');
    
    // Change hue
    hueSlider.focus();
    await userEvent.keyboard('{End}');
    
    // Color should change to red hue
    await waitFor(() => {
      const hexInput = within(picker).getByRole('textbox', { name: /hex/i });
      const hexValue = hexInput.value;
      expect(hexValue.startsWith('#FF') || hexValue.startsWith('#ff')).toBe(true);
    });
  },

  /**
   * Test opacity slider
   */
  async testOpacitySlider(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find opacity slider
    const opacitySlider = within(picker).getByRole('slider', { name: /opacity|alpha/i });
    await expect(opacitySlider).toHaveAttribute('aria-valuemax', '100');
    
    // Change opacity
    opacitySlider.focus();
    await userEvent.keyboard('{Home}');
    
    // Check rgba value updated
    const rgbaDisplay = within(picker).getByTestId('rgba-display');
    await expect(rgbaDisplay).toHaveTextContent(/rgba.*0\)/);
  },

  /**
   * Test preset colors
   */
  async testPresetColors(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find preset section
    const presets = within(picker).getAllByTestId(/preset-color/i);
    await expect(presets.length).toBeGreaterThan(0);
    
    // Click preset
    await userEvent.click(presets[0]);
    
    // Color should update to preset
    const presetColor = presets[0].getAttribute('data-color');
    await waitFor(() => {
      const hexInput = within(picker).getByRole('textbox', { name: /hex/i });
      expect(hexInput).toHaveValue(presetColor);
    });
  },

  /**
   * Test eyedropper tool
   */
  async testEyedropper(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Open picker
    await userEvent.click(trigger);
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Find eyedropper button
    const eyedropperButton = within(picker).getByRole('button', { name: /eyedropper|pick/i });
    
    // Check if EyeDropper API is supported
    if ('EyeDropper' in window) {
      await expect(eyedropperButton).toBeEnabled();
      
      // Click eyedropper
      await userEvent.click(eyedropperButton);
      
      // Should activate eyedropper mode
      await expect(eyedropperButton).toHaveAttribute('aria-pressed', 'true');
    } else {
      // Should be disabled if not supported
      await expect(eyedropperButton).toBeDisabled();
    }
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Tab to trigger
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    
    // Open with Enter
    await userEvent.keyboard('{Enter}');
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Tab through controls
    await userEvent.tab(); // To first control
    const focusedElement = document.activeElement;
    await expect(focusedElement).toBeInTheDocument();
    
    // Close with Escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.queryByTestId('color-picker-panel')).not.toBeInTheDocument();
    });
    
    // Focus should return to trigger
    await expect(trigger).toHaveFocus();
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId('color-picker-trigger');
    
    // Test trigger accessibility
    await expect(trigger).toHaveAttribute('aria-label');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // Open picker
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    const picker = await waitFor(() => canvas.getByTestId('color-picker-panel'));
    
    // Test picker accessibility
    await expect(picker).toHaveAttribute('role', 'dialog');
    await expect(picker).toHaveAttribute('aria-label');
    
    // Test color contrast display
    const contrastInfo = within(picker).getByTestId('contrast-info');
    await expect(contrastInfo).toBeInTheDocument();
    await expect(contrastInfo).toHaveTextContent(/AA|AAA/);
  }
};

// Export individual test functions
export const testBasicColorPicker = ColorPickerTests.testBasicColorPicker;
export const testPaletteSelection = ColorPickerTests.testPaletteSelection;
export const testHexInput = ColorPickerTests.testHexInput;
export const testRGBInputs = ColorPickerTests.testRGBInputs;
export const testHSLSliders = ColorPickerTests.testHSLSliders;
export const testOpacitySlider = ColorPickerTests.testOpacitySlider;
export const testPresetColors = ColorPickerTests.testPresetColors;
export const testEyedropper = ColorPickerTests.testEyedropper;
export const testKeyboardNavigation = ColorPickerTests.testKeyboardNavigation;
export const testAccessibility = ColorPickerTests.testAccessibility;