import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Sidebar Component - Collapsible navigation sidebar with accessibility
 */
export const Sidebar = ({
  isOpen = true,
  collapsible = true,
  overlay = false,
  position = 'left',
  width = 'md',
  items = [],
  header,
  footer,
  onToggle,
  onItemClick,
  'aria-label': ariaLabel = 'Sidebar navigation',
  variant = 'default',
  className = '',
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const [activeItem, setActiveItem] = useState(null);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const currentIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const isControlled = isOpen !== undefined;

  const classes = [
    'sidebar',
    `sidebar--${variant}`,
    `sidebar--${position}`,
    `sidebar--width-${width}`,
    currentIsOpen && 'sidebar--open',
    collapsible && 'sidebar--collapsible',
    overlay && 'sidebar--overlay',
    className
  ].filter(Boolean).join(' ');

  const toggleSidebar = () => {
    if (!isControlled) {
      setInternalIsOpen(!currentIsOpen);
    }
    onToggle?.(!currentIsOpen);
  };

  // Handle escape key to close overlay sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && overlay && currentIsOpen) {
        toggleSidebar();
        toggleButtonRef.current?.focus();
      }
    };

    if (overlay && currentIsOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [overlay, currentIsOpen]);

  // Handle click outside to close overlay sidebar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        overlay && 
        currentIsOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(e.target) &&
        !toggleButtonRef.current?.contains(e.target)
      ) {
        toggleSidebar();
      }
    };

    if (overlay && currentIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [overlay, currentIsOpen]);

  const handleItemClick = (item, index) => {
    setActiveItem(index);
    item.onClick?.();
    onItemClick?.(item, index);
    
    // Close overlay sidebar after item click
    if (overlay && !item.children) {
      toggleSidebar();
    }
  };

  const renderItem = (item, index, level = 0) => {
    const isActive = activeItem === index || item.active;
    const hasChildren = item.children && item.children.length > 0;
    const [isExpanded, setIsExpanded] = useState(item.defaultExpanded || false);

    const handleItemKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (hasChildren) {
          setIsExpanded(!isExpanded);
        } else {
          handleItemClick(item, index);
        }
      }
    };

    const itemClasses = [
      'sidebar__item',
      `sidebar__item--level-${level}`,
      isActive && 'sidebar__item--active',
      item.disabled && 'sidebar__item--disabled',
      hasChildren && 'sidebar__item--expandable',
      isExpanded && 'sidebar__item--expanded'
    ].filter(Boolean).join(' ');

    return (
      <div key={index} className={itemClasses}>
        {item.href ? (
          <a
            href={item.href}
            className="sidebar__link"
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              handleItemClick(item, index);
            }}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={item.disabled}
          >
            <span className="sidebar__link-content">
              {item.icon && (
                <span className="sidebar__link-icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="sidebar__link-text">
                {item.label}
              </span>
              {item.badge && (
                <span className="sidebar__link-badge" aria-label={`${item.badge} items`}>
                  {item.badge}
                </span>
              )}
            </span>
            {hasChildren && (
              <span className="sidebar__expand-icon" aria-hidden="true">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
          </a>
        ) : (
          <button
            type="button"
            className="sidebar__button"
            onClick={() => {
              if (hasChildren) {
                setIsExpanded(!isExpanded);
              } else {
                handleItemClick(item, index);
              }
            }}
            onKeyDown={handleItemKeyDown}
            disabled={item.disabled}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="sidebar__button-content">
              {item.icon && (
                <span className="sidebar__button-icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="sidebar__button-text">
                {item.label}
              </span>
              {item.badge && (
                <span className="sidebar__button-badge" aria-label={`${item.badge} items`}>
                  {item.badge}
                </span>
              )}
            </span>
            {hasChildren && (
              <span className="sidebar__expand-icon" aria-hidden="true">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="sidebar__submenu" role="group">
            {item.children.map((child, childIndex) => 
              renderItem(child, `${index}-${childIndex}`, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderHeader = () => {
    if (!header) return null;

    return (
      <div className="sidebar__header">
        {header}
      </div>
    );
  };

  const renderNavigation = () => {
    if (items.length === 0) return null;

    return (
      <nav className="sidebar__nav" aria-label={ariaLabel}>
        <div className="sidebar__items">
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <div 
                  key={`divider-${index}`}
                  className="sidebar__divider"
                  role="separator"
                />
              );
            }

            if (item.type === 'heading') {
              return (
                <div key={index} className="sidebar__heading">
                  {item.label}
                </div>
              );
            }

            return renderItem(item, index);
          })}
        </div>
      </nav>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <div className="sidebar__footer">
        {footer}
      </div>
    );
  };

  const renderToggleButton = () => {
    if (!collapsible) return null;

    return (
      <button
        ref={toggleButtonRef}
        type="button"
        className="sidebar__toggle"
        onClick={toggleSidebar}
        aria-expanded={currentIsOpen}
        aria-controls="sidebar-content"
        aria-label={currentIsOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <span className="sidebar__toggle-icon" aria-hidden="true">
          {currentIsOpen ? '«' : '»'}
        </span>
      </button>
    );
  };

  return (
    <>
      {overlay && currentIsOpen && (
        <div 
          className="sidebar__overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <aside
        ref={sidebarRef}
        className={classes}
        aria-hidden={!currentIsOpen}
        aria-label={ariaLabel}
        {...props}
      >
        <div id="sidebar-content" className="sidebar__content">
          {renderHeader()}
          {renderNavigation()}
          {renderFooter()}
        </div>
        
        {renderToggleButton()}
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  collapsible: PropTypes.bool,
  overlay: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(['divider', 'heading']),
        label: PropTypes.string,
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.node,
        badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        defaultExpanded: PropTypes.bool,
        children: PropTypes.array,
      })
    ])
  ),
  header: PropTypes.node,
  footer: PropTypes.node,
  onToggle: PropTypes.func,
  onItemClick: PropTypes.func,
  'aria-label': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'bordered', 'filled']),
  className: PropTypes.string,
};

export default Sidebar;
