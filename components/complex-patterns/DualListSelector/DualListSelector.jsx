import React from 'react';
import PropTypes from 'prop-types';

/**
 * DualListSelector Component
 */
export const DualListSelector = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'duallistselector',
    `duallistselector--${variant}`,
    `duallistselector--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

DualListSelector.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default DualListSelector;
