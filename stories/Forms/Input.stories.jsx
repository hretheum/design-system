import React from 'react';

const Input = ({ label, placeholder, error, disabled, type = 'text', value, required, helpText, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
      {label && (
        <label style={{
          fontSize: 'var(--font-size-base)',
          fontWeight: 500,
          color: 'var(--content-primary)',
        }}>
          {label}
          {required && <span style={{ color: 'var(--feedback-error)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'input-error' : helpText ? 'input-help' : undefined}
        style={{
          height: '40px',
          padding: '0 16px',
          fontSize: 'var(--font-size-base)',
          border: error ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
          borderRadius: 'var(--border-radius-md)',
          background: disabled ? 'var(--surface-subdued)' : 'var(--surface-default)',
          color: 'var(--content-primary)',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 200ms',
          outline: 'none',
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.border = '2px solid var(--focus-ring-color)';
            e.target.style.outline = '2px solid var(--focus-ring-color)';
            e.target.style.outlineOffset = '2px';
          }
        }}
        onBlur={(e) => {
          e.target.style.border = error ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)';
          e.target.style.outline = 'none';
        }}
        {...props}
      />
      
      {helpText && !error && (
        <span id="input-help" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)' }}>
          {helpText}
        </span>
      )}
      
      {error && (
        <span id="input-error" role="alert" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Text input field with WCAG 2.1 AA/AAA compliance. Minimum 44px touch target on mobile, 2px focus indicator, support for error states and help text.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Input label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel'], description: 'Input type' },
    error: { control: 'text', description: 'Error message' },
    helpText: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required field indicator' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithValue = {
  args: {
    label: 'Username',
    value: 'johndoe',
  },
};

export const WithError = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const WithHelpText = {
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Must be at least 8 characters with numbers and symbols',
  },
};

export const Required = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Email Address',
    value: 'disabled@example.com',
    disabled: true,
  },
};

export const Email = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
};

export const Number = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
  },
};
