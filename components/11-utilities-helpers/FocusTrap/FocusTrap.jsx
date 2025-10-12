import React from 'react';
import PropTypes from 'prop-types';

/**
 * FocusTrap Component
 */
export const FocusTrap = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'focustrap',
    `focustrap--${variant}`,
    `focustrap--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

FocusTrap.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default FocusTrap;
