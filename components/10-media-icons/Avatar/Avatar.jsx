import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar - User representation component
 * Displays user profile image or initials
 */
export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  variant = 'circle',
  status,
  className = '',
  ...props
}) => {
  const classes = [
    'avatar',
    `avatar--${size}`,
    `avatar--${variant}`,
    status && `avatar--status-${status}`,
    className
  ].filter(Boolean).join(' ');

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(part => part[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar__image" />
      ) : (
        <span className="avatar__initials">{getInitials(name)}</span>
      )}
      {status && <span className={`avatar__status avatar__status--${status}`} />}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['circle', 'square', 'rounded']),
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  className: PropTypes.string,
};

export default Avatar;
