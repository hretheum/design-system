import React from 'react';
import PropTypes from 'prop-types';

/**
 * Gauges Component
 */
export const Gauges = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'gauges',
    `gauges--${variant}`,
    `gauges--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Gauges.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Gauges;
