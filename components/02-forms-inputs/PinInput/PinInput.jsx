import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * PinInput Component - Multi-character PIN/OTP input with accessibility
 */
export const PinInput = ({
  length = 4,
  value,
  defaultValue = '',
  type = 'number',
  mask = false,
  disabled = false,
  autoFocus = false,
  placeholder = '',
  manageFocus = true,
  onComplete,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel = 'PIN input',
  'aria-describedby': ariaDescribedby,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue.split('').slice(0, length));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  const currentValue = value !== undefined ? value.split('').slice(0, length) : internalValue;
  const isControlled = value !== undefined;

  const classes = [
    'pin-input',
    `pin-input--${variant}`,
    `pin-input--${size}`,
    disabled && 'pin-input--disabled',
    mask && 'pin-input--masked',
    className
  ].filter(Boolean).join(' ');

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    for (let i = inputRefs.current.length; i < length; i++) {
      inputRefs.current[i] = React.createRef();
    }
  }, [length]);

  // Auto focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]?.current) {
      inputRefs.current[0].current.focus();
    }
  }, [autoFocus]);

  const updateValue = (newValues) => {
    if (!isControlled) {
      setInternalValue([...newValues]);
    }
    
    const valueString = newValues.join('');
    onChange?.(valueString);
    
    if (valueString.length === length && newValues.every(v => v !== '')) {
      onComplete?.(valueString);
    }
  };

  const isValidInput = (char) => {
    if (type === 'number') {
      return /^[0-9]$/.test(char);
    }
    if (type === 'alphanumeric') {
      return /^[a-zA-Z0-9]$/.test(char);
    }
    return /^[a-zA-Z]$/.test(char); // alphabetic
  };

  const handleInputChange = (index, e) => {
    const inputValue = e.target.value;
    const lastChar = inputValue.slice(-1);
    
    if (inputValue === '' || isValidInput(lastChar)) {
      const newValues = [...currentValue];
      newValues[index] = inputValue === '' ? '' : lastChar;
      updateValue(newValues);
      
      // Auto-advance to next field
      if (manageFocus && lastChar && index < length - 1) {
        inputRefs.current[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    const { key } = e;
    
    if (key === 'Backspace') {
      e.preventDefault();
      
      const newValues = [...currentValue];
      
      if (currentValue[index]) {
        // Clear current field
        newValues[index] = '';
        updateValue(newValues);
      } else if (manageFocus && index > 0) {
        // Move to previous field and clear it
        newValues[index - 1] = '';
        updateValue(newValues);
        inputRefs.current[index - 1]?.current?.focus();
      }
    } else if (key === 'Delete') {
      e.preventDefault();
      const newValues = [...currentValue];
      newValues[index] = '';
      updateValue(newValues);
    } else if (key === 'ArrowLeft' && manageFocus && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.current?.focus();
    } else if (key === 'ArrowRight' && manageFocus && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.current?.focus();
    } else if (key === 'Home' && manageFocus) {
      e.preventDefault();
      inputRefs.current[0]?.current?.focus();
    } else if (key === 'End' && manageFocus) {
      e.preventDefault();
      inputRefs.current[length - 1]?.current?.focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
    onFocus?.(index);
  };

  const handleBlur = (index) => {
    setFocusedIndex(-1);
    onBlur?.(index);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const validChars = pastedData
      .split('')
      .filter(char => isValidInput(char))
      .slice(0, length);
    
    if (validChars.length > 0) {
      const newValues = [...currentValue];
      validChars.forEach((char, i) => {
        if (i < length) {
          newValues[i] = char;
        }
      });
      updateValue(newValues);
      
      // Focus appropriate field after paste
      if (manageFocus) {
        const nextIndex = Math.min(validChars.length, length - 1);
        inputRefs.current[nextIndex]?.current?.focus();
      }
    }
  };

  const getInputMode = () => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'alphanumeric':
        return 'text';
      default:
        return 'text';
    }
  };

  return (
    <div className={classes} {...props}>
      <div className="pin-input__fields" role="group" aria-label={ariaLabel}>
        {Array.from({ length }, (_, index) => {
          const inputValue = currentValue[index] || '';
          const displayValue = mask && inputValue ? '•' : inputValue;
          
          return (
            <input
              key={index}
              ref={inputRefs.current[index]}
              type={mask ? 'password' : 'text'}
              className={`pin-input__field ${
                focusedIndex === index ? 'pin-input__field--focused' : ''
              }`}
              value={mask ? inputValue : displayValue}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={1}
              inputMode={getInputMode()}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              onBlur={() => handleBlur(index)}
              onPaste={index === 0 ? handlePaste : undefined}
              aria-label={`${ariaLabel} digit ${index + 1} of ${length}`}
              aria-describedby={ariaDescribedby}
              data-index={index}
            />
          );
        })}
      </div>
      
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name="pin"
        value={currentValue.join('')}
      />
    </div>
  );
};

PinInput.propTypes = {
  length: PropTypes.number,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.oneOf(['number', 'alphanumeric', 'alphabetic']),
  mask: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  manageFocus: PropTypes.bool,
  onComplete: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default PinInput;
