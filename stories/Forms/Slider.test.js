/**
 * Interaction tests for Slider component
 */

import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { testUtils } from '../../tests/interaction/test-utils';

export const SliderTests = {
  /**
   * Test basic slider functionality
   */
  async testBasicSlider(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    
    // Test slider exists
    await expect(slider).toBeInTheDocument();
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    await expect(slider).toHaveAttribute('aria-valuemin', '0');
    await expect(slider).toHaveAttribute('aria-valuemax', '100');
    
    // Test value display
    const valueDisplay = canvas.getByTestId('slider-value');
    await expect(valueDisplay).toHaveTextContent('50');
  },

  /**
   * Test slider interaction
   */
  async testSliderInteraction(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    
    // Click on slider track to change value
    const sliderTrack = canvas.getByTestId('slider-track');
    const trackRect = sliderTrack.getBoundingClientRect();
    
    // Click at 75% position
    await userEvent.click(sliderTrack, {
      clientX: trackRect.left + (trackRect.width * 0.75)
    });
    
    // Check value updated
    await waitFor(() => {
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });
  },

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    
    // Focus slider
    slider.focus();
    await expect(slider).toHaveFocus();
    
    // Arrow right increases value
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '51');
    
    // Arrow left decreases value
    await userEvent.keyboard('{ArrowLeft}');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    
    // Arrow up increases by step
    await userEvent.keyboard('{ArrowUp}');
    await expect(slider).toHaveAttribute('aria-valuenow', '55');
    
    // Arrow down decreases by step
    await userEvent.keyboard('{ArrowDown}');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    
    // Home goes to minimum
    await userEvent.keyboard('{Home}');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    
    // End goes to maximum
    await userEvent.keyboard('{End}');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
  },

  /**
   * Test range slider
   */
  async testRangeSlider(canvasElement) {
    const canvas = within(canvasElement);
    const sliders = canvas.getAllByRole('slider');
    
    // Should have two thumbs for range
    await expect(sliders).toHaveLength(2);
    
    // Test min thumb
    const minSlider = sliders[0];
    await expect(minSlider).toHaveAttribute('aria-label', 'Minimum value');
    await expect(minSlider).toHaveAttribute('aria-valuenow', '20');
    
    // Test max thumb
    const maxSlider = sliders[1];
    await expect(maxSlider).toHaveAttribute('aria-label', 'Maximum value');
    await expect(maxSlider).toHaveAttribute('aria-valuenow', '80');
    
    // Min should not exceed max
    minSlider.focus();
    await userEvent.keyboard('{End}');
    await expect(minSlider).toHaveAttribute('aria-valuenow', '80');
  },

  /**
   * Test slider with marks
   */
  async testSliderWithMarks(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    
    // Check marks exist
    const marks = canvas.getAllByTestId(/slider-mark/i);
    await expect(marks.length).toBeGreaterThan(0);
    
    // Check mark labels
    const markLabels = canvas.getAllByTestId(/slider-mark-label/i);
    await expect(markLabels.length).toBeGreaterThan(0);
    
    // Click on mark to snap to value
    await userEvent.click(marks[2]);
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
  },

  /**
   * Test stepped slider
   */
  async testSteppedSlider(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByTestId('stepped-slider');
    
    // Check step attribute
    await expect(slider).toHaveAttribute('step', '10');
    
    // Arrow right should increase by step
    slider.focus();
    const initialValue = parseInt(slider.getAttribute('aria-valuenow'));
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', String(initialValue + 10));
  },

  /**
   * Test vertical slider
   */
  async testVerticalSlider(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByTestId('vertical-slider');
    
    // Check orientation
    await expect(slider).toHaveAttribute('aria-orientation', 'vertical');
    
    // Arrow up should increase value (opposite of horizontal)
    slider.focus();
    const initialValue = parseInt(slider.getAttribute('aria-valuenow'));
    await userEvent.keyboard('{ArrowUp}');
    await expect(slider).toHaveAttribute('aria-valuenow', String(initialValue + 1));
  },

  /**
   * Test disabled slider
   */
  async testDisabledSlider(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByTestId('disabled-slider');
    
    // Check disabled state
    await expect(slider).toBeDisabled();
    await expect(slider).toHaveAttribute('aria-disabled', 'true');
    
    // Try to interact - should not change value
    const initialValue = slider.getAttribute('aria-valuenow');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue);
  },

  /**
   * Test slider with input
   */
  async testSliderWithInput(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    const input = canvas.getByRole('spinbutton');
    
    // Check input reflects slider value
    await expect(input).toHaveValue(50);
    
    // Change slider value
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    
    // Input should update
    await waitFor(() => {
      expect(input).toHaveValue(51);
    });
    
    // Change input value
    await userEvent.clear(input);
    await userEvent.type(input, '75');
    await userEvent.tab();
    
    // Slider should update
    await waitFor(() => {
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });
  },

  /**
   * Test accessibility
   */
  async testAccessibility(canvasElement) {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    
    // Test ARIA attributes
    testUtils.testAriaAttributes(slider, {
      'role': 'slider',
      'aria-valuenow': expect.any(String),
      'aria-valuemin': expect.any(String),
      'aria-valuemax': expect.any(String),
      'aria-label': expect.any(String),
      'tabindex': '0'
    });
    
    // Test live region for value changes
    const liveRegion = canvas.getByRole('status');
    await expect(liveRegion).toBeInTheDocument();
    
    // Change value and check announcement
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    
    await waitFor(() => {
      expect(liveRegion).toHaveTextContent(/51/);
    });
  }
};

// Export individual test functions
export const testBasicSlider = SliderTests.testBasicSlider;
export const testSliderInteraction = SliderTests.testSliderInteraction;
export const testKeyboardNavigation = SliderTests.testKeyboardNavigation;
export const testRangeSlider = SliderTests.testRangeSlider;
export const testSliderWithMarks = SliderTests.testSliderWithMarks;
export const testSteppedSlider = SliderTests.testSteppedSlider;
export const testVerticalSlider = SliderTests.testVerticalSlider;
export const testDisabledSlider = SliderTests.testDisabledSlider;
export const testSliderWithInput = SliderTests.testSliderWithInput;
export const testAccessibility = SliderTests.testAccessibility;