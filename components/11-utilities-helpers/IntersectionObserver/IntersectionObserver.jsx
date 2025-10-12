import React from 'react';
import PropTypes from 'prop-types';

/**
 * IntersectionObserver Component
 */
export const IntersectionObserver = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'intersectionobserver',
    `intersectionobserver--${variant}`,
    `intersectionobserver--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

IntersectionObserver.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default IntersectionObserver;
