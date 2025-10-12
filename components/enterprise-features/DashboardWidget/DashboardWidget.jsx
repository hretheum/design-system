import React from 'react';
import PropTypes from 'prop-types';

/**
 * DashboardWidget Component
 */
export const DashboardWidget = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'dashboardwidget',
    `dashboardwidget--${variant}`,
    `dashboardwidget--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

DashboardWidget.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default DashboardWidget;
