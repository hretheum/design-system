import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * SplitButton Component - Button with primary action and dropdown menu
 */
export const SplitButton = ({
  children,
  onPrimaryClick,
  menuItems = [],
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  dropdownIcon = '▼',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const classes = [
    'split-button',
    `split-button--${variant}`,
    `split-button--${size}`,
    disabled && 'split-button--disabled',
    loading && 'split-button--loading',
    isOpen && 'split-button--open',
    className
  ].filter(Boolean).join(' ');

  const handlePrimaryClick = (e) => {
    if (disabled || loading) return;
    onPrimaryClick?.(e);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    if (disabled || loading) return;
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item, index) => {
    item.onClick?.();
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        dropdownButtonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < menuItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : menuItems.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) {
          handleMenuItemClick(menuItems[activeIndex], activeIndex);
        }
        break;
    }
  };

  return (
    <div className={classes} onKeyDown={handleKeyDown} {...props}>
      <button
        type="button"
        className="split-button__primary"
        disabled={disabled || loading}
        onClick={handlePrimaryClick}
        aria-describedby={isOpen ? 'split-button-menu' : undefined}
      >
        {loading ? (
          <span className="split-button__spinner" aria-hidden="true">
            ◌
          </span>
        ) : (
          children
        )}
      </button>
      
      <button
        ref={dropdownButtonRef}
        type="button"
        className="split-button__dropdown"
        disabled={disabled || loading}
        onClick={handleDropdownClick}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="More options"
      >
        <span className="split-button__dropdown-icon" aria-hidden="true">
          {dropdownIcon}
        </span>
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          id="split-button-menu"
          className="split-button__menu"
          role="menu"
          aria-orientation="vertical"
        >
          {menuItems.map((item, index) => (
            <li key={index} role="none">
              <button
                type="button"
                className={`split-button__menu-item ${
                  index === activeIndex ? 'split-button__menu-item--active' : ''
                }`}
                role="menuitem"
                onClick={() => handleMenuItemClick(item, index)}
                disabled={item.disabled}
              >
                {item.icon && (
                  <span className="split-button__menu-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SplitButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPrimaryClick: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
    })
  ),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  dropdownIcon: PropTypes.node,
  className: PropTypes.string,
};

export default SplitButton;
