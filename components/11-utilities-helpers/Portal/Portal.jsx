import React from 'react';
import PropTypes from 'prop-types';

/**
 * Portal Component
 */
export const Portal = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'portal',
    `portal--${variant}`,
    `portal--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Portal.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Portal;
