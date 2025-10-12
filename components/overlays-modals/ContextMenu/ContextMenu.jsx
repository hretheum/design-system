import React from 'react';
import PropTypes from 'prop-types';

/**
 * ContextMenu Component
 */
export const ContextMenu = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'contextmenu',
    `contextmenu--${variant}`,
    `contextmenu--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ContextMenu.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ContextMenu;
