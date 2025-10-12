import React from 'react';
import PropTypes from 'prop-types';

/**
 * ScrollLock Component
 */
export const ScrollLock = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'scrolllock',
    `scrolllock--${variant}`,
    `scrolllock--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ScrollLock.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ScrollLock;
