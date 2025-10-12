import React from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyState Component - Display when no data or content is available
 */
export const EmptyState = ({
  icon,
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  actions,
  variant = 'default',
  size = 'md',
  centered = true,
  className = '',
  ...props
}) => {
  const classes = [
    'empty-state',
    `empty-state--${variant}`,
    `empty-state--${size}`,
    centered && 'empty-state--centered',
    className
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (illustration) {
      return (
        <div className="empty-state__illustration" aria-hidden="true">
          {illustration}
        </div>
      );
    }

    if (icon) {
      return (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      );
    }

    // Default icon
    return (
      <div className="empty-state__icon empty-state__icon--default" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="empty-state__content">
        {title && (
          <h3 className="empty-state__title">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="empty-state__description">
            {description}
          </p>
        )}
      </div>
    );
  };

  const renderActions = () => {
    // Use custom actions if provided
    if (actions) {
      return (
        <div className="empty-state__actions">
          {actions}
        </div>
      );
    }

    // Use primary/secondary actions
    if (primaryAction || secondaryAction) {
      return (
        <div className="empty-state__actions">
          {primaryAction && (
            <div className="empty-state__primary-action">
              {primaryAction}
            </div>
          )}
          {secondaryAction && (
            <div className="empty-state__secondary-action">
              {secondaryAction}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classes} role="region" aria-label="Empty state" {...props}>
      <div className="empty-state__container">
        {renderIcon()}
        {renderContent()}
        {renderActions()}
      </div>
    </div>
  );
};

// Predefined empty state variants
export const NoDataEmptyState = ({ onRetry, onAdd, ...props }) => (
  <EmptyState
    icon={
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    }
    title="No data available"
    description="There's no data to display at the moment."
    primaryAction={onAdd && (
      <button type="button" className="button button--primary" onClick={onAdd}>
        Add Data
      </button>
    )}
    secondaryAction={onRetry && (
      <button type="button" className="button button--secondary" onClick={onRetry}>
        Refresh
      </button>
    )}
    {...props}
  />
);

export const NoResultsEmptyState = ({ onClear, onRetry, searchTerm, ...props }) => (
  <EmptyState
    icon={
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    }
    title="No results found"
    description={searchTerm ? 
      `No results found for "${searchTerm}". Try adjusting your search terms.` :
      "No results match your current filters."
    }
    primaryAction={onClear && (
      <button type="button" className="button button--primary" onClick={onClear}>
        Clear Filters
      </button>
    )}
    secondaryAction={onRetry && (
      <button type="button" className="button button--secondary" onClick={onRetry}>
        Try Again
      </button>
    )}
    {...props}
  />
);

export const ErrorEmptyState = ({ onRetry, onSupport, error, ...props }) => (
  <EmptyState
    variant="error"
    icon={
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    }
    title="Something went wrong"
    description={error || "We're having trouble loading this content. Please try again."}
    primaryAction={onRetry && (
      <button type="button" className="button button--primary" onClick={onRetry}>
        Try Again
      </button>
    )}
    secondaryAction={onSupport && (
      <button type="button" className="button button--secondary" onClick={onSupport}>
        Contact Support
      </button>
    )}
    {...props}
  />
);

export const LoadingEmptyState = ({ message = "Loading...", ...props }) => (
  <EmptyState
    variant="loading"
    icon={
      <div className="spinner" role="status" aria-label="Loading">
        <svg width="64" height="64" viewBox="0 0 24 24">
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="32"
            strokeDashoffset="32"
          >
            <animate 
              attributeName="stroke-dasharray" 
              dur="2s" 
              values="0 32;16 16;0 32;0 32" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="stroke-dashoffset" 
              dur="2s" 
              values="0;-16;-32;-32" 
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    }
    title={message}
    description="Please wait while we load your content."
    {...props}
  />
);

// PropTypes
NoDataEmptyState.propTypes = {
  onRetry: PropTypes.func,
  onAdd: PropTypes.func,
};

NoResultsEmptyState.propTypes = {
  onClear: PropTypes.func,
  onRetry: PropTypes.func,
  searchTerm: PropTypes.string,
};

ErrorEmptyState.propTypes = {
  onRetry: PropTypes.func,
  onSupport: PropTypes.func,
  error: PropTypes.string,
};

LoadingEmptyState.propTypes = {
  message: PropTypes.string,
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  illustration: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryAction: PropTypes.node,
  secondaryAction: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'error', 'loading', 'success']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default EmptyState;
