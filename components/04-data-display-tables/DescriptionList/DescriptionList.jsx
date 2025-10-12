import React from 'react';
import PropTypes from 'prop-types';

/**
 * DescriptionList Component - Semantic description list for key-value pairs
 */
export const DescriptionList = ({
  items = [],
  layout = 'vertical',
  variant = 'default',
  size = 'md',
  dividers = false,
  spacing = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'description-list',
    `description-list--${variant}`,
    `description-list--${size}`,
    `description-list--${layout}`,
    `description-list--spacing-${spacing}`,
    dividers && 'description-list--dividers',
    className
  ].filter(Boolean).join(' ');

  const renderItem = (item, index) => {
    if (typeof item === 'object' && item.term && item.description) {
      return (
        <React.Fragment key={index}>
          <dt className="description-list__term">
            {item.icon && (
              <span className="description-list__term-icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="description-list__term-text">
              {item.term}
            </span>
            {item.required && (
              <span className="description-list__required" aria-label="required">
                *
              </span>
            )}
          </dt>
          <dd className="description-list__description">
            {Array.isArray(item.description) ? (
              <ul className="description-list__values" role="list">
                {item.description.map((desc, descIndex) => (
                  <li key={descIndex} className="description-list__value">
                    {desc}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="description-list__value">
                {item.description}
              </span>
            )}
            {item.badge && (
              <span className="description-list__badge">
                {item.badge}
              </span>
            )}
          </dd>
        </React.Fragment>
      );
    }
    
    // Fallback for invalid items
    return null;
  };

  return (
    <dl className={classes} {...props}>
      {items.map((item, index) => renderItem(item, index))}
    </dl>
  );
};

// Sub-components for manual composition
export const DescriptionTerm = ({ 
  children, 
  icon,
  required = false,
  className = '', 
  ...props 
}) => {
  const classes = [
    'description-list__term',
    className
  ].filter(Boolean).join(' ');

  return (
    <dt className={classes} {...props}>
      {icon && (
        <span className="description-list__term-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="description-list__term-text">
        {children}
      </span>
      {required && (
        <span className="description-list__required" aria-label="required">
          *
        </span>
      )}
    </dt>
  );
};

export const DescriptionDetail = ({ 
  children, 
  badge,
  className = '', 
  ...props 
}) => {
  const classes = [
    'description-list__description',
    className
  ].filter(Boolean).join(' ');

  return (
    <dd className={classes} {...props}>
      <span className="description-list__value">
        {children}
      </span>
      {badge && (
        <span className="description-list__badge">
          {badge}
        </span>
      )}
    </dd>
  );
};

DescriptionTerm.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  required: PropTypes.bool,
  className: PropTypes.string,
};

DescriptionDetail.propTypes = {
  children: PropTypes.node.isRequired,
  badge: PropTypes.node,
  className: PropTypes.string,
};

DescriptionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.node.isRequired,
      description: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
      ]).isRequired,
      icon: PropTypes.node,
      badge: PropTypes.node,
      required: PropTypes.bool,
    })
  ),
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'grid']),
  variant: PropTypes.oneOf(['default', 'bordered', 'striped', 'card']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  dividers: PropTypes.bool,
  spacing: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default DescriptionList;
