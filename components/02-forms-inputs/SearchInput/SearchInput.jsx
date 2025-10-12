import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchInput Component - Enhanced search input with suggestions and keyboard navigation
 */
export const SearchInput = ({
  value,
  defaultValue = '',
  placeholder = 'Search...',
  disabled = false,
  loading = false,
  suggestions = [],
  showSuggestions = true,
  debounceMs = 300,
  clearable = true,
  onSearch,
  onChange,
  onSuggestionSelect,
  onClear,
  searchIcon = '🔍',
  clearIcon = '×',
  loadingIcon = '◌',
  'aria-label': ariaLabel = 'Search',
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [debouncedValue, setDebouncedValue] = useState(internalValue);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const classes = [
    'search-input',
    `search-input--${variant}`,
    `search-input--${size}`,
    disabled && 'search-input--disabled',
    loading && 'search-input--loading',
    showSuggestionsList && 'search-input--suggestions-open',
    className
  ].filter(Boolean).join(' ');

  // Debounce search value
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedValue(currentValue);
      onSearch?.(currentValue);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [currentValue, debounceMs, onSearch]);

  // Show/hide suggestions based on value and focus
  useEffect(() => {
    const shouldShow = showSuggestions && 
                     suggestions.length > 0 && 
                     currentValue.length > 0 && 
                     document.activeElement === inputRef.current;
    setShowSuggestionsList(shouldShow);
    
    if (!shouldShow) {
      setActiveSuggestionIndex(-1);
    }
  }, [showSuggestions, suggestions.length, currentValue, disabled]);

  const updateValue = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && currentValue.length > 0) {
      setShowSuggestionsList(true);
    }
  };

  const handleInputBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestionsList(false);
        setActiveSuggestionIndex(-1);
      }
    }, 150);
  };

  const handleClear = () => {
    updateValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion, index) => {
    updateValue(suggestion);
    onSuggestionSelect?.(suggestion, index);
    setShowSuggestionsList(false);
    setActiveSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestionsList) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch?.(currentValue);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[activeSuggestionIndex], activeSuggestionIndex);
        } else {
          onSearch?.(currentValue);
        }
        break;
      case 'Escape':
        setShowSuggestionsList(false);
        setActiveSuggestionIndex(-1);
        break;
      case 'Tab':
        setShowSuggestionsList(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const suggestionId = showSuggestionsList ? 'search-suggestions' : undefined;
  const activeDescendant = activeSuggestionIndex >= 0 ? 
    `suggestion-${activeSuggestionIndex}` : undefined;

  return (
    <div className={classes} {...props}>
      <div className="search-input__container">
        <div className="search-input__icon-wrapper">
          <span className="search-input__search-icon" aria-hidden="true">
            {loading ? loadingIcon : searchIcon}
          </span>
        </div>
        
        <input
          ref={inputRef}
          type="search"
          className="search-input__input"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          aria-expanded={showSuggestionsList}
          aria-haspopup="listbox"
          aria-owns={suggestionId}
          aria-activedescendant={activeDescendant}
          role="combobox"
          autoComplete="off"
        />
        
        {clearable && currentValue && !loading && (
          <button
            type="button"
            className="search-input__clear-button"
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
          >
            <span className="search-input__clear-icon" aria-hidden="true">
              {clearIcon}
            </span>
          </button>
        )}
      </div>

      {showSuggestionsList && (
        <div
          ref={suggestionsRef}
          id={suggestionId}
          className="search-input__suggestions"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              id={`suggestion-${index}`}
              className={`search-input__suggestion ${
                index === activeSuggestionIndex ? 'search-input__suggestion--active' : ''
              }`}
              role="option"
              aria-selected={index === activeSuggestionIndex}
              onClick={() => handleSuggestionClick(suggestion, index)}
              onMouseEnter={() => setActiveSuggestionIndex(index)}
            >
              <span className="search-input__suggestion-icon" aria-hidden="true">
                {searchIcon}
              </span>
              <span className="search-input__suggestion-text">
                {suggestion}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  showSuggestions: PropTypes.bool,
  debounceMs: PropTypes.number,
  clearable: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionSelect: PropTypes.func,
  onClear: PropTypes.func,
  searchIcon: PropTypes.node,
  clearIcon: PropTypes.node,
  loadingIcon: PropTypes.node,
  'aria-label': PropTypes.string,
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default SearchInput;
