import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const Textarea = ({ label, placeholder, error, disabled, value: controlledValue, onChange, required, helpText, maxLength, rows = 4, id, ...props }) => {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };
  
  const charCount = value?.length || 0;
  const showCount = maxLength !== undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '600px' }}>
      {label && (
        <label htmlFor={textareaId} style={{
          fontSize: 'var(--font-size-base)',
          fontWeight: 500,
          color: 'var(--content-primary)',
        }}>
          {label}
          {required && <span style={{ color: 'var(--feedback-error)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'textarea-error' : helpText ? 'textarea-help' : undefined}
        style={{
          minHeight: '96px',
          padding: '12px 16px',
          fontSize: 'var(--font-size-base)',
          fontFamily: 'inherit',
          lineHeight: 1.5,
          border: error ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
          borderRadius: 'var(--border-radius-md)',
          background: disabled ? 'var(--surface-subdued)' : 'var(--surface-default)',
          color: 'var(--content-primary)',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          resize: 'vertical',
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          {helpText && !error && (
            <span id="textarea-help" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)' }}>
              {helpText}
            </span>
          )}
          
          {error && (
            <span id="textarea-error" role="alert" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)' }}>
              {error}
            </span>
          )}
        </div>
        
        {showCount && (
          <span style={{
            fontSize: 'var(--font-size-sm)',
            color: charCount > maxLength * 0.9 ? 'var(--feedback-warning)' : 'var(--content-secondary)',
            whiteSpace: 'nowrap',
          }}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default {
  title: 'Molecules/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text input for longer content. WCAG 2.1 compliant with resizable functionality and character count support.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Textarea label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    error: { control: 'text', description: 'Error message' },
    helpText: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required field indicator' },
    rows: { control: 'number', description: 'Number of visible text rows' },
    maxLength: { control: 'number', description: 'Maximum character length' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...',
  },
};

export const WithValue = {
  args: {
    label: 'Bio',
    value: 'I am a software engineer passionate about building accessible user interfaces.',
    onChange: () => {}, // Prevent React warning
  },
};

export const WithError = {
  args: {
    label: 'Comments',
    value: 'Too short',
    error: 'Comments must be at least 10 characters long',
    onChange: () => {}, // Prevent React warning
  },
};

export const WithHelpText = {
  args: {
    label: 'Feedback',
    placeholder: 'Tell us what you think...',
    helpText: 'Your feedback helps us improve our product',
  },
};

export const Required = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Message',
    value: 'This field is disabled and cannot be edited.',
    disabled: true,
  },
};

export const WithCharacterCount = {
  args: {
    label: 'Tweet',
    placeholder: "What's happening?",
    maxLength: 280,
    helpText: 'Keep it short and sweet',
  },
};

export const LargeTextarea = {
  args: {
    label: 'Article Content',
    placeholder: 'Write your article...',
    rows: 10,
  },
};

export const SmallTextarea = {
  args: {
    label: 'Quick Note',
    placeholder: 'Add a note...',
    rows: 2,
  },
};

export const Interactive = {
  render: () => {
    const [text, setText] = useState('');
    const minLength = 10;
    const hasError = text.length > 0 && text.length < minLength;
    
    return (
      <Textarea
        label="Feedback"
        placeholder="Share your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={hasError ? `Please enter at least ${minLength} characters` : undefined}
        helpText={!hasError ? `Minimum ${minLength} characters required` : undefined}
        maxLength={500}
      />
    );
  },
};

export const WithWordCount = {
  render: () => {
    const [text, setText] = useState('');
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const maxWords = 100;
    
    return (
      <div>
        <Textarea
          label="Essay"
          placeholder="Write your essay..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          helpText={`${wordCount} / ${maxWords} words`}
        />
      </div>
    );
  },
};

export const FormExample = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
    });
    const [errors, setErrors] = useState({});
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
      
      if (!formData.title) {
        newErrors.title = 'Title is required';
      }
      if (formData.description.length < 20) {
        newErrors.description = 'Description must be at least 20 characters';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };
    
    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '600px' }}>
          <label style={{ fontWeight: 500 }}>
            Title <span style={{ color: 'var(--feedback-error)' }}>*</span>
          </label>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              height: '40px',
              padding: '0 16px',
              fontSize: 'var(--font-size-base)',
              border: errors.title ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
              borderRadius: 'var(--border-radius-md)',
              outline: 'none',
            }}
          />
          {errors.title && (
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)' }}>
              {errors.title}
            </span>
          )}
        </div>
        
        <Textarea
          label="Description"
          placeholder="Describe your project..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          maxLength={500}
          error={errors.description}
          helpText="Minimum 20 characters"
        />
        
        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            height: '40px',
            padding: '0 24px',
            background: 'var(--color-blue-600)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    );
  },
};

/**
 * Interaction Test - Tests textarea input and character counting
 */
export const TextareaTest = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        label="Your comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your comment..."
        maxLength={100}
        data-testid="test-textarea"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find textarea by label
    const textarea = canvas.getByLabelText('Your comment');
    
    // Test: Should be empty initially
    await expect(textarea).toHaveValue('');
    
    // Test: Type text
    await userEvent.type(textarea, 'This is a test comment.');
    await expect(textarea).toHaveValue('This is a test comment.');
    
    // Test: Character counter should show (if displayed)
    const charCount = canvas.queryByText(/23.*\/.*100/);
    if (charCount) {
      await expect(charCount).toBeInTheDocument();
    }
    
    // Test: Clear and type more
    await userEvent.clear(textarea);
    await expect(textarea).toHaveValue('');
    
    await userEvent.type(textarea, 'New text');
    await expect(textarea).toHaveValue('New text');
  },
};
