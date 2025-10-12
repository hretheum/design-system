import React from 'react';
import PropTypes from 'prop-types';

/**
 * AvatarGroup Component
 */
export const AvatarGroup = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'avatargroup',
    `avatargroup--${variant}`,
    `avatargroup--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

AvatarGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default AvatarGroup;
