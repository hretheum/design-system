import React from 'react';
import PropTypes from 'prop-types';

/**
 * LabelGroup Component
 */
export const LabelGroup = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'labelgroup',
    `labelgroup--${variant}`,
    `labelgroup--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

LabelGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default LabelGroup;
