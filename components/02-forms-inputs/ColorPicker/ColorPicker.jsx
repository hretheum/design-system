import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * ColorPicker Component - Accessible color selection with multiple formats
 */
export const ColorPicker = ({
  value = '#000000',
  defaultValue,
  disabled = false,
  format = 'hex',
  presetColors = [],
  showInput = true,
  showPresets = true,
  showAlpha = false,
  onChange,
  onChangeComplete,
  'aria-label': ariaLabel = 'Color picker',
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? value);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const classes = [
    'color-picker',
    `color-picker--${variant}`,
    `color-picker--${size}`,
    disabled && 'color-picker--disabled',
    isOpen && 'color-picker--open',
    className
  ].filter(Boolean).join(' ');

  // Color format conversion utilities
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const formatColor = (color, targetFormat) => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    switch (targetFormat) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'hex':
      default:
        return color;
    }
  };

  const updateColor = (newColor) => {
    if (!isControlled) {
      setInternalValue(newColor);
    }
    setInputValue(newColor);
    onChange?.(newColor);
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    updateColor(newColor);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate and update if valid color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      updateColor(newValue);
    }
  };

  const handleInputBlur = () => {
    // Reset to current valid color if input is invalid
    if (!/^#[0-9A-F]{6}$/i.test(inputValue)) {
      setInputValue(currentValue);
    } else {
      onChangeComplete?.(inputValue);
    }
  };

  const handlePresetClick = (color) => {
    updateColor(color);
    onChangeComplete?.(color);
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={classes} onKeyDown={handleKeyDown} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="color-picker__trigger"
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span
          className="color-picker__preview"
          style={{ backgroundColor: currentValue }}
          aria-hidden="true"
        />
        <span className="color-picker__value">
          {formatColor(currentValue, format)}
        </span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="color-picker__popover"
          role="dialog"
          aria-label="Color picker dialog"
        >
          <div className="color-picker__content">
            {/* Native color input for the picker */}
            <div className="color-picker__native-wrapper">
              <input
                type="color"
                className="color-picker__native"
                value={currentValue}
                onChange={handleColorChange}
                disabled={disabled}
                aria-label="Select color"
              />
            </div>

            {showInput && (
              <div className="color-picker__input-group">
                <label className="color-picker__input-label" htmlFor="color-input">
                  Color value:
                </label>
                <input
                  id="color-input"
                  type="text"
                  className="color-picker__input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="#000000"
                  disabled={disabled}
                />
              </div>
            )}

            {showPresets && presetColors.length > 0 && (
              <div className="color-picker__presets">
                <div className="color-picker__presets-label">Presets:</div>
                <div className="color-picker__presets-grid" role="group" aria-label="Preset colors">
                  {presetColors.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`color-picker__preset ${
                        color === currentValue ? 'color-picker__preset--active' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handlePresetClick(color)}
                      aria-label={`Select color ${color}`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.oneOf(['hex', 'rgb', 'hsl']),
  presetColors: PropTypes.arrayOf(PropTypes.string),
  showInput: PropTypes.bool,
  showPresets: PropTypes.bool,
  showAlpha: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  'aria-label': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'compact', 'inline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ColorPicker;
