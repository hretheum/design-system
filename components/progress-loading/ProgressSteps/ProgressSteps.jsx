import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressSteps Component
 */
export const ProgressSteps = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'progresssteps',
    `progresssteps--${variant}`,
    `progresssteps--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ProgressSteps.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ProgressSteps;
