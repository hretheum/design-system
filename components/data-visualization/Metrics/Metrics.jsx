import React from 'react';
import PropTypes from 'prop-types';

/**
 * Metrics Component
 */
export const Metrics = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'metrics',
    `metrics--${variant}`,
    `metrics--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Metrics.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Metrics;
