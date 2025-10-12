import React from 'react';
import PropTypes from 'prop-types';

/**
 * DateRangePicker Component
 */
export const DateRangePicker = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'daterangepicker',
    `daterangepicker--${variant}`,
    `daterangepicker--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

DateRangePicker.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default DateRangePicker;
