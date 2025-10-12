import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * SkipLink Component - Accessibility skip navigation link
 */
export const SkipLink = ({
  href = '#main',
  children = 'Skip to main content',
  position = 'top-left',
  variant = 'default',
  className = '',
  ...props
}) => {
  const linkRef = useRef(null);

  const classes = [
    'skip-link',
    `skip-link--${variant}`,
    `skip-link--${position}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    // Ensure the target element can receive focus
    const target = document.querySelector(href);
    if (target) {
      // If target doesn't have tabindex, temporarily add one
      const originalTabIndex = target.getAttribute('tabindex');
      if (originalTabIndex === null && !target.matches('a, button, input, select, textarea, [tabindex]')) {
        target.setAttribute('tabindex', '-1');
      }
      
      // Focus the target element
      target.focus();
      
      // Restore original tabindex if we added one
      if (originalTabIndex === null && target.getAttribute('tabindex') === '-1') {
        target.removeAttribute('tabindex');
      }
    }
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

SkipLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  variant: PropTypes.oneOf(['default', 'prominent', 'subtle']),
  className: PropTypes.string,
};

/**
 * SkipLinks Component - Container for multiple skip links
 */
export const SkipLinks = ({
  links = [
    { href: '#main', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' }
  ],
  position = 'top-left',
  variant = 'default',
  className = '',
  ...props
}) => {
  const classes = [
    'skip-links',
    `skip-links--${variant}`,
    `skip-links--${position}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <ul className="skip-links__list" role="list">
        {links.map((link, index) => (
          <li key={index} className="skip-links__item">
            <SkipLink
              href={link.href}
              variant={variant}
              position={position}
              className="skip-links__link"
              onClick={link.onClick}
            >
              {link.label}
            </SkipLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

SkipLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  variant: PropTypes.oneOf(['default', 'prominent', 'subtle']),
  className: PropTypes.string,
};

export default SkipLink;
