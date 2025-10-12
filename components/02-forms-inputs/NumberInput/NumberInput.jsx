import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * NumberInput Component - Accessible number input with step controls
 */
export const NumberInput = ({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  precision = 0,
  disabled = false,
  placeholder,
  showSteppers = true,
  format = 'decimal',
  currency = 'USD',
  locale = 'en-US',
  onChange,
  onIncrement,
  onDecrement,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState(formatDisplayValue(defaultValue));
  const inputRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const classes = [
    'number-input',
    `number-input--${variant}`,
    `number-input--${size}`,
    disabled && 'number-input--disabled',
    showSteppers && 'number-input--with-steppers',
    className
  ].filter(Boolean).join(' ');

  function formatDisplayValue(val) {
    if (val === '' || val === null || val === undefined) return '';
    
    const num = parseFloat(val);
    if (isNaN(num)) return '';

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: precision,
          maximumFractionDigits: precision
        }).format(num);
      case 'percentage':
        return new Intl.NumberFormat(locale, {
          style: 'percent',
          minimumFractionDigits: precision,
          maximumFractionDigits: precision
        }).format(num / 100);
      case 'decimal':
      default:
        return precision > 0 ? num.toFixed(precision) : num.toString();
    }
  }

  function parseInputValue(val) {
    if (val === '' || val === null || val === undefined) return null;
    
    // Remove formatting characters for parsing
    let cleanValue = val.toString();
    
    if (format === 'currency') {
      cleanValue = cleanValue.replace(/[^\d.,\-]/g, '');
    } else if (format === 'percentage') {
      cleanValue = cleanValue.replace(/[^\d.,\-]/g, '');
    }
    
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? null : parsed;
  }

  function clampValue(val) {
    if (val === null || val === undefined) return val;
    
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    
    return precision > 0 ? parseFloat(clamped.toFixed(precision)) : clamped;
  }

  const updateValue = (newValue) => {
    const clampedValue = clampValue(newValue);
    
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    setInputValue(formatDisplayValue(clampedValue));
    onChange?.(clampedValue);
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
    
    const parsedValue = parseInputValue(rawValue);
    if (parsedValue !== null) {
      const clampedValue = clampValue(parsedValue);
      
      if (!isControlled) {
        setInternalValue(clampedValue);
      }
      
      onChange?.(clampedValue);
    }
  };

  const handleInputBlur = (e) => {
    const parsedValue = parseInputValue(inputValue);
    const finalValue = clampValue(parsedValue) ?? currentValue;
    
    setInputValue(formatDisplayValue(finalValue));
    
    if (!isControlled) {
      setInternalValue(finalValue);
    }
    
    onBlur?.(e);
  };

  const handleIncrement = () => {
    if (disabled) return;
    
    const newValue = (currentValue ?? 0) + step;
    updateValue(newValue);
    onIncrement?.(newValue);
    inputRef.current?.focus();
  };

  const handleDecrement = () => {
    if (disabled) return;
    
    const newValue = (currentValue ?? 0) - step;
    updateValue(newValue);
    onDecrement?.(newValue);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        handleIncrement();
        break;
      case 'ArrowDown':
        e.preventDefault();
        handleDecrement();
        break;
    }
  };

  const canIncrement = !disabled && (max === undefined || (currentValue ?? 0) < max);
  const canDecrement = !disabled && (min === undefined || (currentValue ?? 0) > min);

  return (
    <div className={classes} {...props}>
      <input
        ref={inputRef}
        type="text"
        className="number-input__input"
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        role="spinbutton"
        inputMode="decimal"
      />
      
      {showSteppers && (
        <div className="number-input__steppers">
          <button
            type="button"
            className="number-input__stepper number-input__stepper--increment"
            onClick={handleIncrement}
            disabled={!canIncrement}
            aria-label="Increment value"
            tabIndex={-1}
          >
            <span className="number-input__stepper-icon" aria-hidden="true">
              ▲
            </span>
          </button>
          <button
            type="button"
            className="number-input__stepper number-input__stepper--decrement"
            onClick={handleDecrement}
            disabled={!canDecrement}
            aria-label="Decrement value"
            tabIndex={-1}
          >
            <span className="number-input__stepper-icon" aria-hidden="true">
              ▼
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

NumberInput.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  precision: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  showSteppers: PropTypes.bool,
  format: PropTypes.oneOf(['decimal', 'currency', 'percentage']),
  currency: PropTypes.string,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onBlur: PropTypes.func,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default NumberInput;
