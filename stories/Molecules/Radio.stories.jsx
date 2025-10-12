import React, { useState } from 'react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

const Radio = ({ label, value, checked, onChange, disabled, name, error, ...props }) => {
  return (
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
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          aria-invalid={error ? 'true' : 'false'}
          style={{
            appearance: 'none',
            width: '24px',
            height: '24px',
            border: error ? '2px solid var(--feedback-error)' : '2px solid var(--border-default)',
            borderRadius: '50%',
            background: 'var(--surface-default)',
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
        {checked && (
          <div style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: disabled ? 'var(--content-disabled)' : 'var(--color-blue-600)',
            pointerEvents: 'none',
          }} />
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
  );
};

const RadioGroup = ({ options, value, onChange, disabled, error, direction = 'vertical' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div role="radiogroup" style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap: direction === 'vertical' ? '0.5rem' : '1.5rem',
        flexWrap: 'wrap',
      }}>
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            disabled={disabled || option.disabled}
            name="radio-group"
            error={error}
          />
        ))}
      </div>
      {error && (
        <span role="alert" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default {
  title: 'Molecules/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'Radio button for single selection from multiple options. WCAG 2.1 compliant with 24px clickable area.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Radio label' },
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    error: { control: 'text', description: 'Error state' },
  },
  tags: ['autodocs'],
};

export const Single = {
  args: {
    label: 'Option 1',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'Option 1',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled checked option',
    checked: true,
    disabled: true,
  },
};

export const VerticalGroup = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
    
    return <RadioGroup options={options} value={selected} onChange={setSelected} />;
  },
};

export const HorizontalGroup = {
  render: () => {
    const [selected, setSelected] = useState('medium');
    
    const options = [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ];
    
    return <RadioGroup options={options} value={selected} onChange={setSelected} direction="horizontal" />;
  },
};

export const WithDisabledOptions = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    
    const options = [
      { label: 'Available option', value: 'option1' },
      { label: 'Sold out (disabled)', value: 'option2', disabled: true },
      { label: 'Another available option', value: 'option3' },
    ];
    
    return <RadioGroup options={options} value={selected} onChange={setSelected} />;
  },
};

export const WithError = {
  render: () => {
    const [selected, setSelected] = useState(null);
    
    const options = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
    
    return (
      <div>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
          Do you accept the terms? <span style={{ color: 'var(--feedback-error)' }}>*</span>
        </label>
        <RadioGroup
          options={options}
          value={selected}
          onChange={setSelected}
          error={!selected ? 'Please select an option' : undefined}
        />
      </div>
    );
  },
};

export const DisabledGroup = {
  render: () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
    
    return <RadioGroup options={options} value="option2" disabled />;
  },
};

/**
 * Interaction Test - Tests radio selection
 */
export const RadioTest = {
  render: () => {
    const [value, setValue] = useState('');
    const options = [
      { label: 'Credit Card', value: 'card' },
      { label: 'PayPal', value: 'paypal' },
      { label: 'Bank Transfer', value: 'bank' },
    ];
    
    return (
      <RadioGroup
        label="Payment Method"
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find radio buttons
    const cardRadio = canvas.getByLabelText('Credit Card');
    const paypalRadio = canvas.getByLabelText('PayPal');
    const bankRadio = canvas.getByLabelText('Bank Transfer');
    
    // Test: No selection initially
    await expect(cardRadio).not.toBeChecked();
    await expect(paypalRadio).not.toBeChecked();
    await expect(bankRadio).not.toBeChecked();
    
    // Test: Select Credit Card
    await userEvent.click(cardRadio);
    await waitFor(() => expect(cardRadio).toBeChecked());
    await expect(paypalRadio).not.toBeChecked();
    
    // Test: Switch to PayPal
    await userEvent.click(paypalRadio);
    await waitFor(() => expect(paypalRadio).toBeChecked());
    await expect(cardRadio).not.toBeChecked();
    
    // Test: Switch to Bank Transfer
    await userEvent.click(bankRadio);
    await waitFor(() => expect(bankRadio).toBeChecked());
    await expect(paypalRadio).not.toBeChecked();
  },
};
