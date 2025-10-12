import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Slider Component - Accessible range input with keyboard support
 */
export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  disabled = false,
  orientation = 'horizontal',
  showLabels = true,
  showValue = true,
  formatValue,
  onChange,
  onChangeComplete,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const classes = [
    'slider',
    `slider--${variant}`,
    `slider--${size}`,
    `slider--${orientation}`,
    disabled && 'slider--disabled',
    isDragging && 'slider--dragging',
    className
  ].filter(Boolean).join(' ');

  const getValueFromPosition = useCallback((clientX, clientY) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const isVertical = orientation === 'vertical';
    
    let position;
    if (isVertical) {
      position = (rect.bottom - clientY) / rect.height;
    } else {
      position = (clientX - rect.left) / rect.width;
    }
    
    position = Math.max(0, Math.min(1, position));
    const range = max - min;
    let newValue = min + (position * range);
    
    // Snap to step
    newValue = Math.round(newValue / step) * step;
    return Math.max(min, Math.min(max, newValue));
  }, [min, max, step, orientation]);

  const updateValue = useCallback((newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  const handleMouseDown = (e) => {
    if (disabled) return;
    
    const newValue = getValueFromPosition(e.clientX, e.clientY);
    updateValue(newValue);
    setIsDragging(true);
    
    thumbRef.current?.focus();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || disabled) return;
    
    const newValue = getValueFromPosition(e.clientX, e.clientY);
    updateValue(newValue);
  }, [isDragging, disabled, getValueFromPosition, updateValue]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onChangeComplete?.(currentValue);
    }
  }, [isDragging, currentValue, onChangeComplete]);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleKeyDown = (e) => {
    if (disabled) return;
    
    let newValue = currentValue;
    const largeStep = (max - min) / 10;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(max, currentValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(min, currentValue - step);
        break;
      case 'PageUp':
        e.preventDefault();
        newValue = Math.min(max, currentValue + largeStep);
        break;
      case 'PageDown':
        e.preventDefault();
        newValue = Math.max(min, currentValue - largeStep);
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }
    
    updateValue(newValue);
    onChangeComplete?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(currentValue) : currentValue;

  return (
    <div className={classes} {...props}>
      {showLabels && orientation === 'horizontal' && (
        <div className="slider__labels">
          <span className="slider__label slider__label--min">{min}</span>
          <span className="slider__label slider__label--max">{max}</span>
        </div>
      )}
      
      <div className="slider__container">
        {showLabels && orientation === 'vertical' && (
          <span className="slider__label slider__label--max">{max}</span>
        )}
        
        <div
          ref={sliderRef}
          className="slider__track"
          onMouseDown={handleMouseDown}
          role="presentation"
        >
          <div
            className="slider__fill"
            style={{
              [orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`
            }}
          />
          
          <div
            ref={thumbRef}
            className="slider__thumb"
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-valuetext={displayValue}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-disabled={disabled}
            aria-orientation={orientation}
            onKeyDown={handleKeyDown}
            style={{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${percentage}%`
            }}
          />
        </div>
        
        {showLabels && orientation === 'vertical' && (
          <span className="slider__label slider__label--min">{min}</span>
        )}
      </div>
      
      {showValue && (
        <div className="slider__value" aria-live="polite">
          {displayValue}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  showLabels: PropTypes.bool,
  showValue: PropTypes.bool,
  formatValue: PropTypes.func,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'accent']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Slider;
