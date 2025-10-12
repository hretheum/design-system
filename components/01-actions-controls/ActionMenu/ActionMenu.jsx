import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ActionMenu Component - Accessible dropdown menu with keyboard navigation
 */
export const ActionMenu = ({
  trigger,
  items = [],
  placement = 'bottom-start',
  disabled = false,
  closeOnSelect = true,
  'aria-label': ariaLabel = 'Actions menu',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const classes = [
    'action-menu',
    `action-menu--${placement}`,
    disabled && 'action-menu--disabled',
    isOpen && 'action-menu--open',
    className
  ].filter(Boolean).join(' ');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setActiveIndex(-1);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setActiveIndex(-1);
  };

  const handleTriggerKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(items.length - 1);
        break;
    }
  };

  const handleMenuKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => {
          const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
          return items[nextIndex]?.disabled ? 
            handleMenuKeyDown({ ...e, key: 'ArrowDown' }) : nextIndex;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
          return items[nextIndex]?.disabled ? 
            handleMenuKeyDown({ ...e, key: 'ArrowUp' }) : nextIndex;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && !items[activeIndex]?.disabled) {
          handleItemClick(items[activeIndex], activeIndex);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const handleItemClick = (item, index) => {
    if (item.disabled) return;
    
    item.onClick?.();
    
    if (closeOnSelect) {
      setIsOpen(false);
      setActiveIndex(-1);
      triggerRef.current?.focus();
    }
  };

  const renderTrigger = () => {
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger, {
        ref: triggerRef,
        onClick: handleTriggerClick,
        onKeyDown: handleTriggerKeyDown,
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu',
        'aria-label': ariaLabel,
        disabled
      });
    }

    return (
      <button
        ref={triggerRef}
        type="button"
        className="action-menu__trigger"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {trigger || '⋮'}
      </button>
    );
  };

  return (
    <div className={classes} {...props}>
      {renderTrigger()}
      
      {isOpen && (
        <ul
          ref={menuRef}
          className="action-menu__menu"
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
          tabIndex={-1}
        >
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <li 
                  key={`divider-${index}`}
                  className="action-menu__divider"
                  role="separator"
                  aria-orientation="horizontal"
                />
              );
            }

            return (
              <li key={index} role="none">
                <button
                  type="button"
                  className={`action-menu__item ${
                    index === activeIndex ? 'action-menu__item--active' : ''
                  } ${
                    item.disabled ? 'action-menu__item--disabled' : ''
                  } ${
                    item.destructive ? 'action-menu__item--destructive' : ''
                  }`}
                  role="menuitem"
                  onClick={() => handleItemClick(item, index)}
                  disabled={item.disabled}
                  aria-describedby={item.description ? `item-desc-${index}` : undefined}
                >
                  {item.icon && (
                    <span className="action-menu__item-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="action-menu__item-content">
                    <span className="action-menu__item-label">{item.label}</span>
                    {item.description && (
                      <span 
                        id={`item-desc-${index}`}
                        className="action-menu__item-description"
                      >
                        {item.description}
                      </span>
                    )}
                  </span>
                  {item.shortcut && (
                    <span className="action-menu__item-shortcut" aria-hidden="true">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

ActionMenu.propTypes = {
  trigger: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(['divider']),
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.node,
        description: PropTypes.string,
        shortcut: PropTypes.string,
        disabled: PropTypes.bool,
        destructive: PropTypes.bool,
      })
    ])
  ),
  placement: PropTypes.oneOf([
    'top-start', 'top-end', 'bottom-start', 'bottom-end',
    'left-start', 'left-end', 'right-start', 'right-end'
  ]),
  disabled: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default ActionMenu;
