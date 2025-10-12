import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Menu Component - Accessible menu with keyboard navigation and submenus
 */
export const Menu = ({
  items = [],
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  onItemClick,
  'aria-label': ariaLabel = 'Menu',
  className = '',
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openSubmenus, setOpenSubmenus] = useState(new Set());
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const classes = [
    'menu',
    `menu--${variant}`,
    `menu--${size}`,
    `menu--${orientation}`,
    className
  ].filter(Boolean).join(' ');

  // Initialize item refs
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
    for (let i = itemRefs.current.length; i < items.length; i++) {
      itemRefs.current[i] = React.createRef();
    }
  }, [items.length]);

  const handleKeyDown = (e) => {
    const focusableItems = items.filter((item, index) => 
      item.type !== 'divider' && !item.disabled
    );
    const currentFocusableIndex = focusableItems.findIndex((_, index) => {
      const originalIndex = items.indexOf(focusableItems[index]);
      return originalIndex === activeIndex;
    });

    switch (e.key) {
      case 'ArrowDown':
        if (orientation === 'vertical') {
          e.preventDefault();
          const nextIndex = currentFocusableIndex < focusableItems.length - 1 ? 
            currentFocusableIndex + 1 : 0;
          const nextOriginalIndex = items.indexOf(focusableItems[nextIndex]);
          setActiveIndex(nextOriginalIndex);
          itemRefs.current[nextOriginalIndex]?.current?.focus();
        }
        break;
      case 'ArrowUp':
        if (orientation === 'vertical') {
          e.preventDefault();
          const prevIndex = currentFocusableIndex > 0 ? 
            currentFocusableIndex - 1 : focusableItems.length - 1;
          const prevOriginalIndex = items.indexOf(focusableItems[prevIndex]);
          setActiveIndex(prevOriginalIndex);
          itemRefs.current[prevOriginalIndex]?.current?.focus();
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          e.preventDefault();
          const nextIndex = currentFocusableIndex < focusableItems.length - 1 ? 
            currentFocusableIndex + 1 : 0;
          const nextOriginalIndex = items.indexOf(focusableItems[nextIndex]);
          setActiveIndex(nextOriginalIndex);
          itemRefs.current[nextOriginalIndex]?.current?.focus();
        } else {
          // Open submenu
          const currentItem = items[activeIndex];
          if (currentItem?.children) {
            setOpenSubmenus(prev => new Set([...prev, activeIndex]));
          }
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          e.preventDefault();
          const prevIndex = currentFocusableIndex > 0 ? 
            currentFocusableIndex - 1 : focusableItems.length - 1;
          const prevOriginalIndex = items.indexOf(focusableItems[prevIndex]);
          setActiveIndex(prevOriginalIndex);
          itemRefs.current[prevOriginalIndex]?.current?.focus();
        } else {
          // Close submenu
          setOpenSubmenus(prev => {
            const newSet = new Set(prev);
            newSet.delete(activeIndex);
            return newSet;
          });
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const activeItem = items[activeIndex];
        if (activeItem && !activeItem.disabled) {
          if (activeItem.children) {
            setOpenSubmenus(prev => {
              const newSet = new Set(prev);
              if (newSet.has(activeIndex)) {
                newSet.delete(activeIndex);
              } else {
                newSet.add(activeIndex);
              }
              return newSet;
            });
          } else {
            handleItemClick(activeItem, activeIndex);
          }
        }
        break;
      case 'Escape':
        setOpenSubmenus(new Set());
        setActiveIndex(-1);
        break;
      case 'Home':
        e.preventDefault();
        if (focusableItems.length > 0) {
          const firstIndex = items.indexOf(focusableItems[0]);
          setActiveIndex(firstIndex);
          itemRefs.current[firstIndex]?.current?.focus();
        }
        break;
      case 'End':
        e.preventDefault();
        if (focusableItems.length > 0) {
          const lastIndex = items.indexOf(focusableItems[focusableItems.length - 1]);
          setActiveIndex(lastIndex);
          itemRefs.current[lastIndex]?.current?.focus();
        }
        break;
    }
  };

  const handleItemClick = (item, index) => {
    if (item.disabled) return;
    
    item.onClick?.();
    onItemClick?.(item, index);
    
    // Close submenus after clicking a leaf item
    if (!item.children) {
      setOpenSubmenus(new Set());
    }
  };

  const handleItemFocus = (index) => {
    setActiveIndex(index);
  };

  const handleItemMouseEnter = (index) => {
    const item = items[index];
    if (item?.children) {
      setOpenSubmenus(prev => new Set([...prev, index]));
    }
  };

  const handleItemMouseLeave = (index) => {
    // Don't close submenu immediately on mouse leave for better UX
    setTimeout(() => {
      setOpenSubmenus(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 150);
  };

  const renderSubmenu = (children, parentIndex) => {
    if (!children || children.length === 0) return null;

    return (
      <ul className="menu__submenu" role="menu" aria-orientation="vertical">
        {children.map((child, childIndex) => {
          if (child.type === 'divider') {
            return (
              <li 
                key={`submenu-divider-${childIndex}`}
                className="menu__divider"
                role="separator"
              />
            );
          }

          const childKey = `${parentIndex}-${childIndex}`;
          
          return (
            <li key={childKey} className="menu__item" role="none">
              {child.href ? (
                <a
                  href={child.href}
                  className={`menu__link ${
                    child.disabled ? 'menu__link--disabled' : ''
                  }`}
                  role="menuitem"
                  onClick={(e) => {
                    if (child.disabled) {
                      e.preventDefault();
                      return;
                    }
                    handleItemClick(child, childKey);
                  }}
                  aria-disabled={child.disabled}
                >
                  {child.icon && (
                    <span className="menu__link-icon" aria-hidden="true">
                      {child.icon}
                    </span>
                  )}
                  <span className="menu__link-text">
                    {child.label}
                  </span>
                  {child.shortcut && (
                    <span className="menu__link-shortcut" aria-hidden="true">
                      {child.shortcut}
                    </span>
                  )}
                </a>
              ) : (
                <button
                  type="button"
                  className={`menu__button ${
                    child.disabled ? 'menu__button--disabled' : ''
                  }`}
                  role="menuitem"
                  onClick={() => handleItemClick(child, childKey)}
                  disabled={child.disabled}
                >
                  {child.icon && (
                    <span className="menu__button-icon" aria-hidden="true">
                      {child.icon}
                    </span>
                  )}
                  <span className="menu__button-text">
                    {child.label}
                  </span>
                  {child.shortcut && (
                    <span className="menu__button-shortcut" aria-hidden="true">
                      {child.shortcut}
                    </span>
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderItem = (item, index) => {
    if (item.type === 'divider') {
      return (
        <li 
          key={`divider-${index}`}
          className="menu__divider"
          role="separator"
          aria-orientation={orientation}
        />
      );
    }

    const isActive = activeIndex === index;
    const hasSubmenu = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(index);

    const itemClasses = [
      'menu__item',
      item.disabled && 'menu__item--disabled',
      hasSubmenu && 'menu__item--has-submenu',
      isSubmenuOpen && 'menu__item--submenu-open'
    ].filter(Boolean).join(' ');

    return (
      <li 
        key={index} 
        className={itemClasses}
        role="none"
        onMouseEnter={() => handleItemMouseEnter(index)}
        onMouseLeave={() => handleItemMouseLeave(index)}
      >
        {item.href ? (
          <a
            ref={itemRefs.current[index]}
            href={item.href}
            className={`menu__link ${
              isActive ? 'menu__link--active' : ''
            } ${
              item.disabled ? 'menu__link--disabled' : ''
            }`}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              handleItemClick(item, index);
            }}
            onFocus={() => handleItemFocus(index)}
            aria-haspopup={hasSubmenu ? 'menu' : undefined}
            aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
            aria-disabled={item.disabled}
          >
            {item.icon && (
              <span className="menu__link-icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="menu__link-text">
              {item.label}
            </span>
            {item.shortcut && (
              <span className="menu__link-shortcut" aria-hidden="true">
                {item.shortcut}
              </span>
            )}
            {hasSubmenu && (
              <span className="menu__submenu-indicator" aria-hidden="true">
                {orientation === 'horizontal' ? '▼' : '▶'}
              </span>
            )}
          </a>
        ) : (
          <button
            ref={itemRefs.current[index]}
            type="button"
            className={`menu__button ${
              isActive ? 'menu__button--active' : ''
            } ${
              item.disabled ? 'menu__button--disabled' : ''
            }`}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleItemClick(item, index)}
            onFocus={() => handleItemFocus(index)}
            disabled={item.disabled}
            aria-haspopup={hasSubmenu ? 'menu' : undefined}
            aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
          >
            {item.icon && (
              <span className="menu__button-icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="menu__button-text">
              {item.label}
            </span>
            {item.shortcut && (
              <span className="menu__button-shortcut" aria-hidden="true">
                {item.shortcut}
              </span>
            )}
            {hasSubmenu && (
              <span className="menu__submenu-indicator" aria-hidden="true">
                {orientation === 'horizontal' ? '▼' : '▶'}
              </span>
            )}
          </button>
        )}
        
        {hasSubmenu && isSubmenuOpen && renderSubmenu(item.children, index)}
      </li>
    );
  };

  return (
    <ul
      ref={menuRef}
      className={classes}
      role="menubar"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {items.map((item, index) => renderItem(item, index))}
    </ul>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(['divider']),
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.node,
        shortcut: PropTypes.string,
        disabled: PropTypes.bool,
        children: PropTypes.array,
      })
    ])
  ),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  variant: PropTypes.oneOf(['default', 'pills', 'tabs']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onItemClick: PropTypes.func,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default Menu;
