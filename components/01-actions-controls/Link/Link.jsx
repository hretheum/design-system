import React from 'react';
import PropTypes from 'prop-types';

/**
 * Link Component - Accessible link with proper semantics
 */
export const Link = ({
  children,
  href,
  variant = 'default',
  size = 'md',
  disabled = false,
  external = false,
  download,
  target,
  rel,
  onClick,
  className = '',
  ...props
}) => {
  const classes = [
    'link',
    `link--${variant}`,
    `link--${size}`,
    disabled && 'link--disabled',
    external && 'link--external',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const linkProps = {
    className: classes,
    href: disabled ? undefined : href,
    target: external ? '_blank' : target,
    rel: external ? 'noopener noreferrer' : rel,
    download,
    onClick: handleClick,
    'aria-disabled': disabled,
    ...props
  };

  return (
    <a {...linkProps}>
      {children}
      {external && (
        <span className="link__external-icon" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Link;
