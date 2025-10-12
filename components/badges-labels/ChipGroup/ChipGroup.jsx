import React from 'react';
import PropTypes from 'prop-types';

/**
 * ChipGroup Component
 */
export const ChipGroup = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'chipgroup',
    `chipgroup--${variant}`,
    `chipgroup--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ChipGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ChipGroup;
