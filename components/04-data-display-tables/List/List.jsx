import React from 'react';
import PropTypes from 'prop-types';

/**
 * List Component - Accessible list with various layouts and interactive items
 */
export const List = ({
  items = [],
  ordered = false,
  selectable = false,
  multiSelect = false,
  selectedItems = [],
  onSelectionChange,
  onItemClick,
  renderItem,
  variant = 'default',
  size = 'md',
  layout = 'vertical',
  dividers = false,
  spacing = 'md',
  'aria-label': ariaLabel,
  className = '',
  ...props
}) => {
  const classes = [
    'list',
    `list--${variant}`,
    `list--${size}`,
    `list--${layout}`,
    `list--spacing-${spacing}`,
    selectable && 'list--selectable',
    multiSelect && 'list--multi-select',
    dividers && 'list--dividers',
    className
  ].filter(Boolean).join(' ');

  const handleItemClick = (item, index) => {
    if (item.disabled) return;

    if (selectable) {
      const itemId = item.id ?? index;
      let newSelection = [...selectedItems];
      
      if (multiSelect) {
        const isSelected = selectedItems.includes(itemId);
        if (isSelected) {
          newSelection = newSelection.filter(id => id !== itemId);
        } else {
          newSelection.push(itemId);
        }
      } else {
        newSelection = selectedItems.includes(itemId) ? [] : [itemId];
      }
      
      onSelectionChange?.(newSelection);
    }
    
    item.onClick?.(item, index);
    onItemClick?.(item, index);
  };

  const handleKeyDown = (e, item, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(item, index);
    }
  };

  const isItemSelected = (item, index) => {
    const itemId = item.id ?? index;
    return selectedItems.includes(itemId);
  };

  const renderListItem = (item, index) => {
    if (typeof item === 'string') {
      item = { content: item };
    }

    const isSelected = isItemSelected(item, index);
    const itemClasses = [
      'list__item',
      item.disabled && 'list__item--disabled',
      isSelected && 'list__item--selected',
      selectable && 'list__item--selectable',
      item.active && 'list__item--active'
    ].filter(Boolean).join(' ');

    const itemProps = {
      className: itemClasses,
      onClick: () => handleItemClick(item, index),
      onKeyDown: (e) => handleKeyDown(e, item, index),
      'aria-disabled': item.disabled,
      ...(selectable && {
        role: multiSelect ? 'option' : 'option',
        'aria-selected': isSelected,
        tabIndex: item.disabled ? -1 : 0
      })
    };

    // Custom render function
    if (renderItem) {
      return (
        <li key={item.id ?? index} {...itemProps}>
          {renderItem(item, index, { isSelected, isDisabled: item.disabled })}
        </li>
      );
    }

    // Default rendering
    const content = (
      <>
        {selectable && (
          <div className="list__item-checkbox" aria-hidden="true">
            <input
              type={multiSelect ? 'checkbox' : 'radio'}
              checked={isSelected}
              onChange={() => {}} // Handled by parent click
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        )}
        
        {item.avatar && (
          <div className="list__item-avatar">
            {item.avatar}
          </div>
        )}
        
        {item.icon && (
          <div className="list__item-icon" aria-hidden="true">
            {item.icon}
          </div>
        )}
        
        <div className="list__item-content">
          {item.title && (
            <div className="list__item-title">
              {item.title}
            </div>
          )}
          
          {(item.description || item.content) && (
            <div className="list__item-description">
              {item.description || item.content}
            </div>
          )}
          
          {item.metadata && (
            <div className="list__item-metadata">
              {Array.isArray(item.metadata) ? (
                item.metadata.map((meta, metaIndex) => (
                  <span key={metaIndex} className="list__item-meta">
                    {meta}
                  </span>
                ))
              ) : (
                <span className="list__item-meta">{item.metadata}</span>
              )}
            </div>
          )}
        </div>
        
        {item.actions && (
          <div className="list__item-actions">
            {item.actions}
          </div>
        )}
        
        {item.badge && (
          <div className="list__item-badge">
            {item.badge}
          </div>
        )}
      </>
    );

    if (item.href && !item.disabled) {
      return (
        <li key={item.id ?? index}>
          <a {...itemProps} href={item.href}>
            {content}
          </a>
        </li>
      );
    }

    return (
      <li key={item.id ?? index} {...itemProps}>
        {content}
      </li>
    );
  };

  const ListElement = ordered ? 'ol' : 'ul';
  const listRole = selectable ? (multiSelect ? 'listbox' : 'radiogroup') : 'list';
  
  const listProps = {
    className: classes,
    role: listRole,
    'aria-label': ariaLabel,
    'aria-multiselectable': selectable && multiSelect,
    ...props
  };

  return (
    <ListElement {...listProps}>
      {items.map((item, index) => renderListItem(item, index))}
    </ListElement>
  );
};

// Sub-components
export const ListItem = ({ 
  children, 
  selected = false, 
  disabled = false, 
  active = false,
  onClick,
  href,
  className = '',
  ...props 
}) => {
  const classes = [
    'list__item',
    selected && 'list__item--selected',
    disabled && 'list__item--disabled',
    active && 'list__item--active',
    className
  ].filter(Boolean).join(' ');

  const itemProps = {
    className: classes,
    onClick: disabled ? undefined : onClick,
    'aria-disabled': disabled,
    'aria-selected': selected,
    ...props
  };

  if (href && !disabled) {
    return (
      <li>
        <a {...itemProps} href={href}>
          {children}
        </a>
      </li>
    );
  }

  return (
    <li {...itemProps}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        content: PropTypes.node,
        icon: PropTypes.node,
        avatar: PropTypes.node,
        badge: PropTypes.node,
        metadata: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
        actions: PropTypes.node,
        href: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        active: PropTypes.bool,
      })
    ])
  ),
  ordered: PropTypes.bool,
  selectable: PropTypes.bool,
  multiSelect: PropTypes.bool,
  selectedItems: PropTypes.array,
  onSelectionChange: PropTypes.func,
  onItemClick: PropTypes.func,
  renderItem: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'bordered', 'filled', 'flush']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'grid']),
  dividers: PropTypes.bool,
  spacing: PropTypes.oneOf(['sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default List;
