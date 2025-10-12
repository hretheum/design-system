import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatusBadge Component
 */
export const StatusBadge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'statusbadge',
    `statusbadge--${variant}`,
    `statusbadge--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

StatusBadge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default StatusBadge;
