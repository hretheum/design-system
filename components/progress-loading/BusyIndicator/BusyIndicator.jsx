import React from 'react';
import PropTypes from 'prop-types';

/**
 * BusyIndicator Component
 */
export const BusyIndicator = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'busyindicator',
    `busyindicator--${variant}`,
    `busyindicator--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

BusyIndicator.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default BusyIndicator;
