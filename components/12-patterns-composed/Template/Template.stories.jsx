/**
 * Template Story - Best Practices Guide
 * 
 * This file serves as a template and reference for creating new component stories.
 * Follow these patterns to maintain consistency across the design system.
 */

import React, { useState } from 'react';

/**
 * COMPONENT DEFINITION
 * 
 * Best Practices:
 * 1. Use clear, descriptive prop names
 * 2. Provide sensible defaults
 * 3. Use PropTypes or TypeScript for type safety
 * 4. Include WCAG-compliant features (ARIA, keyboard support, focus management)
 * 5. Use design tokens (CSS variables) for styling
 * 6. Support common size variants (sm, md, lg)
 * 7. Include disabled and error states
 * 8. Make interactive elements focusable and keyboard-accessible
 */

const TemplateComponent = ({
  // Content props
  label,
  children,
  
  // State props
  disabled = false,
  error,
  
  // Variant props
  variant = 'default',
  size = 'md',
  
  // Event handlers
  onClick,
  onChange,
  
  // Accessibility props
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  
  // Pass-through props
  ...props
}) => {
  // Size configuration
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  // Variant configuration
  const variants = {
    default: { background: 'var(--surface-default)', color: 'var(--content-primary)' },
    primary: { background: 'var(--color-blue-600)', color: 'white' },
    secondary: { background: 'transparent', color: 'var(--content-primary)' },
  };

  const sizeConfig = sizes[size];
  const variantConfig = variants[variant];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {/* Label (if provided) */}
      {label && (
        <label style={{ fontSize: 'var(--font-size-base)', fontWeight: 500 }}>
          {label}
        </label>
      )}

      {/* Main interactive element */}
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={error ? 'component-error' : ariaDescribedby}
        aria-invalid={error ? 'true' : 'false'}
        style={{
          ...sizeConfig,
          ...variantConfig,
          border: error ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
          borderRadius: 'var(--border-radius-md)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'all 200ms',
          outline: 'none',
        }}
        // Focus handling (WCAG 2.4.7)
        onFocus={(e) => {
          e.target.style.outline = '2px solid var(--focus-ring-color)';
          e.target.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
        }}
        // Hover state
        onMouseEnter={(e) => {
          if (!disabled) {
            e.target.style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.opacity = '1';
          }
        }}
        {...props}
      >
        {children}
      </button>

      {/* Error message (WCAG 3.3.1) */}
      {error && (
        <span
          id="component-error"
          role="alert"
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--feedback-error)',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

/**
 * STORY EXPORT DEFAULT
 * 
 * Best Practices:
 * 1. Use descriptive title (Category/ComponentName)
 * 2. Include comprehensive component description
 * 3. List WCAG compliance features
 * 4. Use autodocs tag for automatic documentation
 * 5. Configure argTypes for all important props
 */

export default {
  title: 'Patterns & Composed/Template',
  component: TemplateComponent,
  parameters: {
    category: '12-patterns-composed',
    docs: {
      description: {
        component: 'Template component demonstrating best practices. WCAG 2.1 AA/AAA compliant with keyboard navigation, focus indicators, and ARIA support.',
      },
    },
  },
  argTypes: {
    // Control types for different prop types
    label: { control: 'text', description: 'Component label' },
    children: { control: 'text', description: 'Button content' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    error: { control: 'text', description: 'Error message' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
  tags: ['autodocs'],
};

/**
 * BASIC STORIES
 * 
 * Best Practices:
 * 1. Start with simple, single-prop variations
 * 2. Use descriptive story names
 * 3. Show one concept per story
 * 4. Include common use cases
 */

export const Default = {
  args: {
    children: 'Default Component',
  },
};

export const Primary = {
  args: {
    children: 'Primary Variant',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Variant',
    variant: 'secondary',
  },
};

export const Small = {
  args: {
    children: 'Small Size',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Large Size',
    size: 'lg',
  },
};

export const WithLabel = {
  args: {
    label: 'Component Label',
    children: 'Click me',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled State',
    disabled: true,
  },
};

export const WithError = {
  args: {
    label: 'Input Field',
    children: 'Submit',
    error: 'This field is required',
  },
};

/**
 * COMBINATION STORIES
 * 
 * Best Practices:
 * 1. Show multiple variants together
 * 2. Demonstrate real-world usage
 * 3. Use render function for complex examples
 */

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <TemplateComponent variant="default">Default</TemplateComponent>
      <TemplateComponent variant="primary">Primary</TemplateComponent>
      <TemplateComponent variant="secondary">Secondary</TemplateComponent>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <TemplateComponent size="sm">Small</TemplateComponent>
      <TemplateComponent size="md">Medium</TemplateComponent>
      <TemplateComponent size="lg">Large</TemplateComponent>
    </div>
  ),
};

/**
 * INTERACTIVE STORIES
 * 
 * Best Practices:
 * 1. Use hooks for state management
 * 2. Demonstrate real interactions
 * 3. Show feedback and state changes
 * 4. Include form validation examples
 */

export const Interactive = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <TemplateComponent
          variant="primary"
          onClick={() => setCount(count + 1)}
        >
          Clicked {count} times
        </TemplateComponent>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px' }}>
          <strong>Count:</strong> {count}
        </div>
      </div>
    );
  },
};

export const FormExample = {
  render: () => {
    const [formData, setFormData] = useState({ value: '' });
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
      const newErrors = {};
      if (!formData.value) {
        newErrors.value = 'This field is required';
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Input Field
          </label>
          <input
            value={formData.value}
            onChange={(e) => setFormData({ value: e.target.value })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: errors.value ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
              borderRadius: '6px',
            }}
          />
          {errors.value && (
            <span style={{ fontSize: '0.875rem', color: 'var(--feedback-error)' }}>
              {errors.value}
            </span>
          )}
        </div>

        <TemplateComponent variant="primary" onClick={handleSubmit}>
          Submit
        </TemplateComponent>
      </div>
    );
  },
};

/**
 * ACCESSIBILITY STORIES
 * 
 * Best Practices:
 * 1. Demonstrate keyboard navigation
 * 2. Show focus indicators
 * 3. Include ARIA attributes
 * 4. Test with screen readers
 */

export const KeyboardNavigation = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
        Press <kbd style={{ padding: '0.125rem 0.25rem', background: 'var(--surface-subdued)', borderRadius: '3px' }}>Tab</kbd> to navigate,{' '}
        <kbd style={{ padding: '0.125rem 0.25rem', background: 'var(--surface-subdued)', borderRadius: '3px' }}>Enter</kbd> or{' '}
        <kbd style={{ padding: '0.125rem 0.25rem', background: 'var(--surface-subdued)', borderRadius: '3px' }}>Space</kbd> to activate
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TemplateComponent variant="primary">Button 1</TemplateComponent>
        <TemplateComponent variant="secondary">Button 2</TemplateComponent>
        <TemplateComponent>Button 3</TemplateComponent>
      </div>
    </div>
  ),
};

/**
 * CHECKLIST FOR NEW STORIES
 * 
 * Component Implementation:
 * ✓ Uses design tokens (CSS variables)
 * ✓ Supports size variants (sm, md, lg)
 * ✓ Includes disabled state
 * ✓ Has error state with message
 * ✓ Keyboard accessible (focusable, Enter/Space support)
 * ✓ Focus indicator (2px, WCAG 2.4.7)
 * ✓ ARIA attributes (label, describedby, invalid)
 * ✓ Touch targets (minimum 44px mobile, 24px desktop)
 * ✓ Color contrast (WCAG AA minimum)
 * ✓ Transition animations (<200ms for instant feel)
 * 
 * Story Documentation:
 * ✓ Descriptive title (Category/ComponentName)
 * ✓ Component description with WCAG info
 * ✓ ArgTypes configured
 * ✓ Default story
 * ✓ Variant stories (all visual variants)
 * ✓ Size stories (all sizes)
 * ✓ State stories (disabled, error, loading)
 * ✓ Interactive story (with hooks)
 * ✓ Real-world example (form, card, etc.)
 * ✓ Accessibility demo (keyboard navigation)
 */
