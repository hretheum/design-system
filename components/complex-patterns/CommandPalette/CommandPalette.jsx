import React from 'react';
import PropTypes from 'prop-types';

/**
 * CommandPalette Component
 */
export const CommandPalette = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'commandpalette',
    `commandpalette--${variant}`,
    `commandpalette--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CommandPalette.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default CommandPalette;
