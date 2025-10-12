import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const Checkbox = ({ label, checked: controlledChecked, onChange, disabled, indeterminate, error, ...props }) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        minHeight: '44px',
        padding: '8px',
        userSelect: 'none',
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            ref={(el) => {
              if (el) el.indeterminate = indeterminate;
            }}
            aria-invalid={error ? 'true' : 'false'}
            style={{
              appearance: 'none',
              width: '24px',
              height: '24px',
              border: error ? '2px solid var(--feedback-error)' : '2px solid var(--border-default)',
              borderRadius: '4px',
              background: checked ? 'var(--color-blue-600)' : 'var(--surface-default)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              transition: 'all 200ms',
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--focus-ring-color)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
            {...props}
          />
          {(checked || indeterminate) && (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              style={{
                position: 'absolute',
                width: '14px',
                height: '14px',
                pointerEvents: 'none',
              }}
            >
              {indeterminate ? (
                <line x1="4" y1="8" x2="12" y2="8" stroke="white" strokeWidth="2" />
              ) : (
                <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          )}
        </div>
        
        {label && (
          <span style={{
            fontSize: 'var(--font-size-base)',
            color: disabled ? 'var(--content-disabled)' : 'var(--content-primary)',
          }}>
            {label}
          </span>
        )}
      </label>
      
      {error && (
        <span role="alert" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)', paddingLeft: '32px' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default {
  title: 'Forms & Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    category: '02-forms-inputs',
    docs: {
      description: {
        component: 'Checkbox input with support for checked, unchecked, indeterminate states. WCAG 2.1 compliant with 24px clickable area (expandable to 44px with padding).',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Checkbox label' },
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    indeterminate: { control: 'boolean', description: 'Indeterminate state (partial)' },
    error: { control: 'text', description: 'Error message' },
  },
  tags: ['autodocs'],
};

export const Unchecked = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

export const Indeterminate = {
  args: {
    label: 'Select all items (some selected)',
    indeterminate: true,
  },
};

export const Disabled = {
  args: {
    label: 'This option is disabled',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'This option is checked and disabled',
    checked: true,
    disabled: true,
  },
};

export const WithError = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

export const WithoutLabel = {
  args: {
    'aria-label': 'Select item',
  },
};

export const CheckboxGroup = {
  render: () => {
    const [selected, setSelected] = useState([]);
    
    const options = ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular'];
    const allChecked = selected.length === options.length;
    const someChecked = selected.length > 0 && selected.length < options.length;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(options);
            } else {
              setSelected([]);
            }
          }}
        />
        <div style={{ borderLeft: '2px solid var(--border-default)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {options.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={selected.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelected([...selected, option]);
                } else {
                  setSelected(selected.filter(item => item !== option));
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Interaction Test - Tests checkbox toggling
 */
export const CheckboxTest = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Accept terms and conditions"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        data-testid="test-checkbox"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find checkbox by label
    const checkbox = canvas.getByLabelText('Accept terms and conditions');
    
    // Test: Should be unchecked initially
    await expect(checkbox).not.toBeChecked();
    
    // Test: Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    
    // Test: Click to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
    
    // Test: Check again
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};
