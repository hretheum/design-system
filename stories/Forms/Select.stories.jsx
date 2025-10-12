import React from 'react';

const Select = ({ label, options, placeholder, value, onChange, disabled, error, required, helpText, ...props }) => {
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
      
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'select-error' : helpText ? 'select-help' : undefined}
          style={{
            width: '100%',
            height: '40px',
            padding: '0 40px 0 16px',
            fontSize: 'var(--font-size-base)',
            border: error ? '2px solid var(--feedback-error)' : '1px solid var(--border-default)',
            borderRadius: 'var(--border-radius-md)',
            background: disabled ? 'var(--surface-subdued)' : 'var(--surface-default)',
            color: value ? 'var(--content-primary)' : 'var(--content-secondary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            appearance: 'none',
            outline: 'none',
            transition: 'border-color 200ms',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            pointerEvents: 'none',
            color: disabled ? 'var(--content-disabled)' : 'var(--content-secondary)',
          }}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {helpText && !error && (
        <span id="select-help" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)' }}>
          {helpText}
        </span>
      )}
      
      {error && (
        <span id="select-error" role="alert" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--feedback-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Dropdown select for choosing from multiple options. WCAG 2.1 compliant with keyboard navigation support.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Select label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    error: { control: 'text', description: 'Error message' },
    helpText: { control: 'text', description: 'Helper text' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required field indicator' },
  },
  tags: ['autodocs'],
};

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
];

export const Default = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const WithValue = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'uk',
  },
};

export const WithError = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    error: 'Please select a country',
  },
};

export const WithHelpText = {
  args: {
    label: 'Preferred Language',
    placeholder: 'Choose language',
    helpText: 'Select your preferred language for communications',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
    ],
  },
};

export const Required = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Country',
    value: 'us',
    options: countryOptions,
    disabled: true,
  },
};

export const WithDisabledOptions = {
  args: {
    label: 'Product Size',
    placeholder: 'Select size',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large (Out of stock)', value: 'lg', disabled: true },
      { label: 'Extra Large (Out of stock)', value: 'xl', disabled: true },
    ],
  },
};

export const Interactive = {
  render: () => {
    const [country, setCountry] = React.useState('');
    
    return (
      <div>
        <Select
          label="Country"
          placeholder="Select a country"
          options={countryOptions}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {country && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: 'var(--border-radius-md)' }}>
            Selected: <strong>{countryOptions.find(c => c.value === country)?.label}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const MultipleSelects = {
  render: () => {
    const [formData, setFormData] = React.useState({
      country: '',
      state: '',
      city: '',
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Select
          label="Country"
          placeholder="Select country"
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
          ]}
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value, state: '', city: '' })}
        />
        
        {formData.country && (
          <Select
            label="State/Region"
            placeholder="Select state"
            options={
              formData.country === 'us'
                ? [
                    { label: 'California', value: 'ca' },
                    { label: 'New York', value: 'ny' },
                    { label: 'Texas', value: 'tx' },
                  ]
                : [
                    { label: 'England', value: 'england' },
                    { label: 'Scotland', value: 'scotland' },
                    { label: 'Wales', value: 'wales' },
                  ]
            }
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '' })}
          />
        )}
        
        {formData.state && (
          <Select
            label="City"
            placeholder="Select city"
            options={[
              { label: 'City 1', value: 'city1' },
              { label: 'City 2', value: 'city2' },
              { label: 'City 3', value: 'city3' },
            ]}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        )}
      </div>
    );
  },
};
