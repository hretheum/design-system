import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * NavigationBar Component - Accessible navigation with mobile menu support
 */
export const NavigationBar = ({
  brand,
  items = [],
  actions,
  mobileBreakpoint = 768,
  sticky = false,
  elevated = true,
  'aria-label': ariaLabel = 'Main navigation',
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const classes = [
    'navigation-bar',
    `navigation-bar--${variant}`,
    `navigation-bar--${size}`,
    sticky && 'navigation-bar--sticky',
    elevated && 'navigation-bar--elevated',
    isMobileMenuOpen && 'navigation-bar--mobile-open',
    className
  ].filter(Boolean).join(' ');

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = (item) => {
    item.onClick?.();
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderBrand = () => {
    if (!brand) return null;

    if (React.isValidElement(brand)) {
      return (
        <div className="navigation-bar__brand">
          {brand}
        </div>
      );
    }

    if (typeof brand === 'object' && brand.href) {
      return (
        <div className="navigation-bar__brand">
          <a 
            href={brand.href}
            className="navigation-bar__brand-link"
            onClick={brand.onClick}
          >
            {brand.logo && (
              <span className="navigation-bar__brand-logo" aria-hidden="true">
                {brand.logo}
              </span>
            )}
            {brand.name && (
              <span className="navigation-bar__brand-name">
                {brand.name}
              </span>
            )}
          </a>
        </div>
      );
    }

    return (
      <div className="navigation-bar__brand">
        {brand}
      </div>
    );
  };

  const renderNavigationItems = () => {
    if (items.length === 0) return null;

    return (
      <ul className="navigation-bar__items" role="list">
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <li 
                key={`divider-${index}`}
                className="navigation-bar__divider"
                role="separator"
                aria-orientation="vertical"
              />
            );
          }

          const isActive = item.active || (item.href && window.location.pathname === item.href);
          
          return (
            <li key={index} className="navigation-bar__item" role="none">
              {item.href ? (
                <a
                  href={item.href}
                  className={`navigation-bar__link ${
                    isActive ? 'navigation-bar__link--active' : ''
                  } ${
                    item.disabled ? 'navigation-bar__link--disabled' : ''
                  }`}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                      return;
                    }
                    handleItemClick(item);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={item.disabled}
                >
                  {item.icon && (
                    <span className="navigation-bar__link-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="navigation-bar__link-text">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="navigation-bar__link-badge" aria-label={`${item.badge} notifications`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              ) : (
                <button
                  type="button"
                  className={`navigation-bar__button ${
                    isActive ? 'navigation-bar__button--active' : ''
                  } ${
                    item.disabled ? 'navigation-bar__button--disabled' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="navigation-bar__button-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="navigation-bar__button-text">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="navigation-bar__button-badge" aria-label={`${item.badge} notifications`}>
                      {item.badge}
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

  const renderActions = () => {
    if (!actions) return null;

    return (
      <div className="navigation-bar__actions">
        {actions}
      </div>
    );
  };

  const renderMobileToggle = () => {
    if (!isMobile || items.length === 0) return null;

    return (
      <button
        ref={mobileButtonRef}
        type="button"
        className="navigation-bar__mobile-toggle"
        onClick={handleMobileToggle}
        aria-expanded={isMobileMenuOpen}
        aria-controls="navigation-menu"
        aria-label="Toggle navigation menu"
      >
        <span className="navigation-bar__mobile-toggle-icon" aria-hidden="true">
          {isMobileMenuOpen ? '✕' : '☰'}
        </span>
      </button>
    );
  };

  return (
    <nav ref={navRef} className={classes} aria-label={ariaLabel} {...props}>
      <div className="navigation-bar__container">
        {renderBrand()}
        
        {!isMobile && (
          <>
            {renderNavigationItems()}
            {renderActions()}
          </>
        )}
        
        {renderMobileToggle()}
      </div>
      
      {isMobile && (
        <div 
          id="navigation-menu"
          className={`navigation-bar__mobile-menu ${
            isMobileMenuOpen ? 'navigation-bar__mobile-menu--open' : ''
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          {renderNavigationItems()}
          {actions && (
            <div className="navigation-bar__mobile-actions">
              {renderActions()}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

NavigationBar.propTypes = {
  brand: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.node,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ]),
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
        badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        active: PropTypes.bool,
        disabled: PropTypes.bool,
      })
    ])
  ),
  actions: PropTypes.node,
  mobileBreakpoint: PropTypes.number,
  sticky: PropTypes.bool,
  elevated: PropTypes.bool,
  'aria-label': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'transparent', 'filled']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default NavigationBar;
