import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

/**
 * ButtonGroup Component - Groups related buttons with proper ARIA semantics
 */
export const ButtonGroup = ({
  children,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  disabled = false,
  exclusive = false,
  value,
  onChange,
  'aria-label': ariaLabel,
  className = '',
  ...props
}) => {
  const classes = [
    'button-group',
    `button-group--${variant}`,
    `button-group--${size}`,
    `button-group--${orientation}`,
    disabled && 'button-group--disabled',
    exclusive && 'button-group--exclusive',
    className
  ].filter(Boolean).join(' ');

  const handleButtonClick = (buttonValue, originalOnClick) => {
    return (e) => {
      if (disabled) return;
      
      if (exclusive) {
        onChange?.(buttonValue === value ? null : buttonValue);
      }
      
      originalOnClick?.(e);
    };
  };

  const enhancedChildren = Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;
    const isActive = exclusive && child.props.value === value;
    
    return cloneElement(child, {
      ...child.props,
      disabled: disabled || child.props.disabled,
      size: child.props.size || size,
      variant: child.props.variant || variant,
      onClick: handleButtonClick(child.props.value, child.props.onClick),
      'aria-pressed': exclusive ? isActive : child.props['aria-pressed'],
      className: [
        child.props.className,
        'button-group__item',
        isFirst && 'button-group__item--first',
        isLast && 'button-group__item--last',
        isActive && 'button-group__item--active'
      ].filter(Boolean).join(' ')
    });
  });

  const groupProps = {
    className: classes,
    role: exclusive ? 'radiogroup' : 'group',
    'aria-label': ariaLabel,
    'aria-orientation': orientation,
    'aria-disabled': disabled,
    ...props
  };

  return (
    <div {...groupProps}>
      {enhancedChildren}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  disabled: PropTypes.bool,
  exclusive: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default ButtonGroup;
