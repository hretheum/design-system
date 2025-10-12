import React from 'react';
import PropTypes from 'prop-types';

/**
 * IconButton Component - Button with icon content and accessibility
 */
export const IconButton = ({
  icon,
  'aria-label': ariaLabel,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const classes = [
    'icon-button',
    `icon-button--${variant}`,
    `icon-button--${size}`,
    disabled && 'icon-button--disabled',
    loading && 'icon-button--loading',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="icon-button__spinner" aria-hidden="true">
          ◌
        </span>
      ) : (
        <span className="icon-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  'aria-label': PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default IconButton;
