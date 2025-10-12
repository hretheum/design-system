import React from 'react';
import PropTypes from 'prop-types';

/**
 * CodeEditor Component
 */
export const CodeEditor = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'codeeditor',
    `codeeditor--${variant}`,
    `codeeditor--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CodeEditor.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default CodeEditor;
