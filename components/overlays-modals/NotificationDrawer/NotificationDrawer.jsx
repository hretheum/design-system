import React from 'react';
import PropTypes from 'prop-types';

/**
 * NotificationDrawer Component
 */
export const NotificationDrawer = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'notificationdrawer',
    `notificationdrawer--${variant}`,
    `notificationdrawer--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

NotificationDrawer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default NotificationDrawer;
