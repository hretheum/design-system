import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Form Component - Accessible form with validation and error handling
 */
export const Form = ({
  children,
  onSubmit,
  onReset,
  onValidationChange,
  validation = {},
  disabled = false,
  loading = false,
  autoComplete = 'on',
  noValidate = false,
  method = 'POST',
  action,
  encType,
  target,
  variant = 'default',
  layout = 'vertical',
  spacing = 'md',
  className = '',
  ...props
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const classes = [
    'form',
    `form--${variant}`,
    `form--${layout}`,
    `form--spacing-${spacing}`,
    disabled && 'form--disabled',
    (loading || isSubmitting) && 'form--loading',
    className
  ].filter(Boolean).join(' ');

  // Validation utilities
  const validateField = (name, value, rules) => {
    const fieldErrors = [];
    
    if (rules.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push('This field is required');
    }
    
    if (value && rules.minLength && value.toString().length < rules.minLength) {
      fieldErrors.push(`Minimum ${rules.minLength} characters required`);
    }
    
    if (value && rules.maxLength && value.toString().length > rules.maxLength) {
      fieldErrors.push(`Maximum ${rules.maxLength} characters allowed`);
    }
    
    if (value && rules.pattern && !rules.pattern.test(value.toString())) {
      fieldErrors.push(rules.message || 'Invalid format');
    }
    
    if (value && rules.min && parseFloat(value) < rules.min) {
      fieldErrors.push(`Minimum value is ${rules.min}`);
    }
    
    if (value && rules.max && parseFloat(value) > rules.max) {
      fieldErrors.push(`Maximum value is ${rules.max}`);
    }
    
    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value, formData);
      if (customError) {
        fieldErrors.push(customError);
      }
    }
    
    return fieldErrors;
  };

  const validateForm = (data = formData) => {
    const newErrors = {};
    
    Object.keys(validation).forEach(fieldName => {
      const fieldValue = data[fieldName];
      const fieldRules = validation[fieldName];
      const fieldErrors = validateField(fieldName, fieldValue, fieldRules);
      
      if (fieldErrors.length > 0) {
        newErrors[fieldName] = fieldErrors;
      }
    });
    
    setErrors(newErrors);
    onValidationChange?.(newErrors, Object.keys(newErrors).length === 0);
    
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (name, value) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Validate field if it has been touched
    if (touched[name] && validation[name]) {
      const fieldErrors = validateField(name, value, validation[name]);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors.length > 0 ? fieldErrors : undefined
      }));
    }
  };

  const markFieldTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (disabled || isSubmitting) return;
    
    // Mark all fields as touched
    const allFields = Object.keys(validation);
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);
    
    // Validate entire form
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      
      try {
        await onSubmit?.(formData, e);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Focus first field with error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.focus();
      }
    }
  };

  const handleReset = (e) => {
    setFormData({});
    setErrors({});
    setTouched({});
    onReset?.(e);
  };

  // Enhanced children with form context
  const enhancedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    
    // Pass form context to form field components
    if (child.props.name) {
      const fieldName = child.props.name;
      return React.cloneElement(child, {
        value: formData[fieldName] ?? child.props.value ?? '',
        error: errors[fieldName]?.[0],
        touched: touched[fieldName],
        disabled: disabled || child.props.disabled,
        onChange: (value, e) => {
          updateField(fieldName, value);
          child.props.onChange?.(value, e);
        },
        onBlur: (e) => {
          markFieldTouched(fieldName);
          child.props.onBlur?.(e);
        },
        ...child.props
      });
    }
    
    return child;
  });

  const formProps = {
    ref: formRef,
    className: classes,
    onSubmit: handleSubmit,
    onReset: handleReset,
    autoComplete,
    noValidate,
    method: method,
    action,
    encType,
    target,
    'aria-disabled': disabled,
    ...props
  };

  return (
    <form {...formProps}>
      <div className="form__content">
        {enhancedChildren}
      </div>
      
      {/* Form status for screen readers */}
      <div className="form__status" aria-live="polite" aria-atomic="true">
        {isSubmitting && (
          <span className="form__loading-message">
            Submitting form...
          </span>
        )}
        {Object.keys(errors).length > 0 && (
          <span className="form__error-summary">
            Form has {Object.keys(errors).length} error{Object.keys(errors).length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </form>
  );
};

// Form field components
export const FormField = ({ children, label, error, required, helpText, className, ...props }) => {
  const fieldId = props.id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = helpText ? `${fieldId}-help` : undefined;
  
  const classes = [
    'form-field',
    error && 'form-field--error',
    required && 'form-field--required',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className="form-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="form-field__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="form-field__control">
        {React.cloneElement(children, {
          id: fieldId,
          'aria-describedby': [errorId, helpId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': !!error,
          ...children.props
        })}
      </div>
      
      {helpText && (
        <div id={helpId} className="form-field__help">
          {helpText}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="form-field__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  className: PropTypes.string,
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onValidationChange: PropTypes.func,
  validation: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  noValidate: PropTypes.bool,
  method: PropTypes.string,
  action: PropTypes.string,
  encType: PropTypes.string,
  target: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'card', 'inline']),
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'grid']),
  spacing: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Form;
