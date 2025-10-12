import React from 'react';
import PropTypes from 'prop-types';

/**
 * RichTextEditor Component
 */
export const RichTextEditor = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'richtexteditor',
    `richtexteditor--${variant}`,
    `richtexteditor--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

RichTextEditor.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default RichTextEditor;
