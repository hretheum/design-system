import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingOverlay Component
 */
export const LoadingOverlay = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'loadingoverlay',
    `loadingoverlay--${variant}`,
    `loadingoverlay--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

LoadingOverlay.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default LoadingOverlay;
