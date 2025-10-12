import React from 'react';
import PropTypes from 'prop-types';

/**
 * ApplicationLauncher Component
 */
export const ApplicationLauncher = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'applicationlauncher',
    `applicationlauncher--${variant}`,
    `applicationlauncher--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ApplicationLauncher.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ApplicationLauncher;
