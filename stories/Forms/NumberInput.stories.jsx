import React, { useState } from 'react';
import { NumberInput } from '../../components/02-forms-inputs/NumberInput/NumberInput';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible number input with increment/decrement buttons, min/max validation, custom formatting, and keyboard support.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Controlled input value'
    },
    defaultValue: {
      control: 'number',
      description: 'Initial value for uncontrolled component'
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value'
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value'
    },
    step: {
      control: 'number',
      description: 'Step increment for buttons and keyboard'
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    readOnly: {
      control: 'boolean',
      description: 'Make input read-only'
    },
    showButtons: {
      control: 'boolean',
      description: 'Show increment/decrement buttons'
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative numbers'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    }
  }
};

const Template = (args) => {
  const [value, setValue] = useState(args.defaultValue);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    action('onChange')(newValue);
  };
  
  const handleBlur = (event) => {
    action('onBlur')(event.target.value);
  };
  
  const handleInvalid = (error) => {
    action('onInvalid')(error);
  };

  return (
    <div style={{ padding: '20px' }}>
      <NumberInput
        {...args}
        value={args.value !== undefined ? args.value : value}
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
      />
      <p style={{ marginTop: '16px', color: '#6b7280' }}>
        Current value: {args.value !== undefined ? args.value : value}
      </p>
    </div>
  );
};

// Default Number Input
export const Default = Template.bind({});
Default.args = {
  defaultValue: 42,
  placeholder: 'Enter a number...',
  'aria-label': 'Number input'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('spinbutton');
  
  // Test accessibility
  await expect(input).toBeInTheDocument();
  await expect(input).toHaveAttribute('aria-label');
  
  // Test typing
  await userEvent.clear(input);
  await userEvent.type(input, '123');
  await expect(input).toHaveValue(123);
};

// With Min/Max Constraints
export const WithConstraints = Template.bind({});
WithConstraints.args = {
  defaultValue: 5,
  min: 0,
  max: 10,
  step: 1,
  showButtons: true,
  'aria-label': 'Number input with constraints'
};
WithConstraints.parameters = {
  docs: {
    description: {
      story: 'Number input with minimum and maximum value constraints.'
    }
  }
};
WithConstraints.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const incrementButton = canvas.getByLabelText(/increment/i);
  const decrementButton = canvas.getByLabelText(/decrement/i);
  
  // Test increment button
  await userEvent.click(incrementButton);
  await userEvent.click(incrementButton);
  
  // Test decrement button
  await userEvent.click(decrementButton);
};

// Decimal Precision
export const DecimalPrecision = Template.bind({});
DecimalPrecision.args = {
  defaultValue: 12.34,
  step: 0.01,
  precision: 2,
  min: 0,
  max: 100,
  showButtons: true,
  'aria-label': 'Decimal number input'
};
DecimalPrecision.parameters = {
  docs: {
    description: {
      story: 'Number input with decimal precision control.'
    }
  }
};

// Currency Input
export const Currency = Template.bind({});
Currency.args = {
  defaultValue: 299.99,
  step: 0.01,
  precision: 2,
  min: 0,
  formatValue: (value) => value ? `$${value.toFixed(2)}` : '',
  parseValue: (text) => parseFloat(text.replace('$', '')) || 0,
  showButtons: true,
  placeholder: '$0.00',
  'aria-label': 'Price input'
};
Currency.parameters = {
  docs: {
    description: {
      story: 'Currency input with custom formatting and parsing.'
    }
  }
};

// Percentage Input
export const Percentage = Template.bind({});
Percentage.args = {
  defaultValue: 75,
  min: 0,
  max: 100,
  step: 5,
  formatValue: (value) => value ? `${value}%` : '',
  parseValue: (text) => parseFloat(text.replace('%', '')) || 0,
  showButtons: true,
  variant: 'outlined',
  'aria-label': 'Percentage input'
};
Percentage.parameters = {
  docs: {
    description: {
      story: 'Percentage input with custom formatting.'
    }
  }
};

// Large Numbers
export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  defaultValue: 1000000,
  step: 1000,
  min: 0,
  formatValue: (value) => value ? value.toLocaleString() : '',
  parseValue: (text) => parseFloat(text.replace(/,/g, '')) || 0,
  showButtons: true,
  placeholder: '1,000,000',
  'aria-label': 'Large number input'
};
LargeNumbers.parameters = {
  docs: {
    description: {
      story: 'Large number input with thousands separators.'
    }
  }
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  defaultValue: 100,
  disabled: true,
  showButtons: true,
  'aria-label': 'Disabled number input'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('spinbutton');
  
  // Test disabled state
  await expect(input).toBeDisabled();
  await expect(input).toHaveAttribute('aria-disabled', 'true');
};

// Read Only
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  defaultValue: 42,
  readOnly: true,
  showButtons: false,
  'aria-label': 'Read-only number input'
};

// No Buttons
export const NoButtons = Template.bind({});
NoButtons.args = {
  defaultValue: 25,
  min: 0,
  max: 100,
  showButtons: false,
  variant: 'filled',
  'aria-label': 'Number input without buttons'
};

// Large Size
export const Large = Template.bind({});
Large.args = {
  defaultValue: 500,
  size: 'lg',
  showButtons: true,
  'aria-label': 'Large number input'
};

// Small Size
export const Small = Template.bind({});
Small.args = {
  defaultValue: 10,
  size: 'sm',
  showButtons: true,
  'aria-label': 'Small number input'
};

// Quantity Selector
export const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  const [price] = useState(29.99);
  
  const total = quantity * price;
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Product Quantity</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
        <label style={{ fontWeight: 'bold' }}>Quantity:</label>
        <NumberInput
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={99}
          step={1}
          showButtons={true}
          size="md"
          aria-label="Product quantity"
          style={{ width: '120px' }}
        />
      </div>
      
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div>Unit Price: ${price.toFixed(2)}</div>
        <div>Quantity: {quantity}</div>
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#059669' }}>
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
QuantitySelector.parameters = {
  docs: {
    description: {
      story: 'Real-world example of a quantity selector with price calculation.'
    }
  }
};

// Temperature Control
export const TemperatureControl = () => {
  const [celsius, setCelsius] = useState(20);
  const [fahrenheit, setFahrenheit] = useState(68);
  
  const celsiusToFahrenheit = (c) => (c * 9/5) + 32;
  const fahrenheitToCelsius = (f) => (f - 32) * 5/9;
  
  const handleCelsiusChange = (value) => {
    setCelsius(value);
    setFahrenheit(Math.round(celsiusToFahrenheit(value) * 10) / 10);
  };
  
  const handleFahrenheitChange = (value) => {
    setFahrenheit(value);
    setCelsius(Math.round(fahrenheitToCelsius(value) * 10) / 10);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Temperature Converter</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Celsius</label>
          <NumberInput
            value={celsius}
            onChange={handleCelsiusChange}
            step={0.1}
            precision={1}
            formatValue={(value) => value ? `${value}°C` : ''}
            parseValue={(text) => parseFloat(text.replace('°C', '')) || 0}
            showButtons={true}
            aria-label="Temperature in Celsius"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Fahrenheit</label>
          <NumberInput
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            step={0.1}
            precision={1}
            formatValue={(value) => value ? `${value}°F` : ''}
            parseValue={(text) => parseFloat(text.replace('°F', '')) || 0}
            showButtons={true}
            aria-label="Temperature in Fahrenheit"
          />
        </div>
      </div>
    </div>
  );
};
TemperatureControl.parameters = {
  docs: {
    description: {
      story: 'Temperature converter with synchronized inputs.'
    }
  }
};

// Form Integration
export const FormIntegration = () => {
  const [formData, setFormData] = useState({
    age: 25,
    income: 50000,
    dependents: 0,
    experience: 2.5
  });
  
  const [errors, setErrors] = useState({});
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.age < 18 || formData.age > 120) {
      newErrors.age = 'Age must be between 18 and 120';
    }
    
    if (formData.income < 0) {
      newErrors.income = 'Income cannot be negative';
    }
    
    if (formData.dependents < 0) {
      newErrors.dependents = 'Dependents cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Personal Information Form</h3>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Age</label>
            <NumberInput
              value={formData.age}
              onChange={(value) => updateField('age', value)}
              min={18}
              max={120}
              step={1}
              showButtons={true}
              aria-label="Your age"
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : undefined}
            />
            {errors.age && (
              <div id="age-error" style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.age}
              </div>
            )}
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Annual Income</label>
            <NumberInput
              value={formData.income}
              onChange={(value) => updateField('income', value)}
              min={0}
              step={1000}
              formatValue={(value) => value ? `$${value.toLocaleString()}` : ''}
              parseValue={(text) => parseFloat(text.replace(/[$,]/g, '')) || 0}
              showButtons={true}
              aria-label="Annual income"
              aria-invalid={!!errors.income}
            />
            {errors.income && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.income}
              </div>
            )}
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Number of Dependents</label>
            <NumberInput
              value={formData.dependents}
              onChange={(value) => updateField('dependents', value)}
              min={0}
              max={20}
              step={1}
              showButtons={true}
              aria-label="Number of dependents"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Years of Experience</label>
            <NumberInput
              value={formData.experience}
              onChange={(value) => updateField('experience', value)}
              min={0}
              max={50}
              step={0.5}
              precision={1}
              formatValue={(value) => value ? `${value} years` : ''}
              parseValue={(text) => parseFloat(text.replace(' years', '')) || 0}
              showButtons={true}
              aria-label="Years of experience"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          style={{ 
            marginTop: '24px',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};
FormIntegration.parameters = {
  docs: {
    description: {
      story: 'Comprehensive form with validation and different number input types.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [value, setValue] = useState(50);
  const [viewportSize, setViewportSize] = useState('desktop');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>Viewport Size: </label>
        <select 
          value={viewportSize} 
          onChange={(e) => setViewportSize(e.target.value)}
        >
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>
      
      <div style={{ 
        width: viewportSize === 'mobile' ? '280px' : 
               viewportSize === 'tablet' ? '400px' : '100%',
        border: '1px dashed #ccc',
        padding: '16px'
      }}>
        <NumberInput
          value={value}
          onChange={setValue}
          size={viewportSize === 'mobile' ? 'sm' : 'md'}
          showButtons={viewportSize !== 'mobile'}
          aria-label={`Number input for ${viewportSize} viewport`}
        />
      </div>
      
      <p style={{ marginTop: '8px' }}>Value: {value}</p>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive behavior across different viewport sizes.'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo = () => {
  const [value, setValue] = useState(5);
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label id="rating-label" style={{ fontWeight: 'bold' }}>
          Rate this product (1-10):
        </label>
      </div>
      
      <NumberInput
        value={value}
        onChange={setValue}
        min={1}
        max={10}
        step={1}
        showButtons={true}
        aria-labelledby="rating-label"
        aria-describedby="rating-description"
      />
      
      <div id="rating-description" style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
        Use arrow keys, Page Up/Down, or the +/- buttons to change the rating.
        Current rating: {value} out of 10 stars.
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <span>Rating: </span>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ color: i < value ? '#fbbf24' : '#d1d5db' }}>★</span>
        ))}
      </div>
    </div>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates proper ARIA labeling and descriptions for screen readers.'
    }
  }
};
