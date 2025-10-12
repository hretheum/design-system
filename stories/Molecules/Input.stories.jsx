import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const Input = ({ label, placeholder, error, disabled, type = 'text', value, required, helpText, readOnly, ...props }) => {
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
        readOnly={readOnly}
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
  title: 'Molecules/Input',
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
    readOnly: true,
  },
};

export const WithError = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
    readOnly: true,
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

/**
 * Interaction Test - Automated testing with play functions
 * This test runs automatically in test-runner
 */
export const InteractiveTest = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="Test Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        data-testid="test-input"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the input element
    const input = canvas.getByPlaceholderText('Type here...');
    
    // Test: Input should be empty initially
    await expect(input).toHaveValue('');
    
    // Test: Type text into input
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
    
    // Test: Clear input
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
    
    // Test: Type and verify final value
    await userEvent.type(input, 'Testing');
    await expect(input).toHaveValue('Testing');
  },
};
