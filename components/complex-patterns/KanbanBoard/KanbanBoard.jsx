import React from 'react';
import PropTypes from 'prop-types';

/**
 * KanbanBoard Component
 */
export const KanbanBoard = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'kanbanboard',
    `kanbanboard--${variant}`,
    `kanbanboard--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

KanbanBoard.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default KanbanBoard;
