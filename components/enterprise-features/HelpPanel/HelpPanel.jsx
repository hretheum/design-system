import React from 'react';
import PropTypes from 'prop-types';

/**
 * HelpPanel Component
 */
export const HelpPanel = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'helppanel',
    `helppanel--${variant}`,
    `helppanel--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

HelpPanel.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default HelpPanel;
