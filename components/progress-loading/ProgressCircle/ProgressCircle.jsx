import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressCircle Component
 */
export const ProgressCircle = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'progresscircle',
    `progresscircle--${variant}`,
    `progresscircle--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ProgressCircle.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ProgressCircle;
