import React, { useState } from 'react';
import { ColorPicker } from '../../components/02-forms-inputs/ColorPicker/ColorPicker';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible color picker with multiple format support (hex, rgb, hsl), preset colors, and keyboard navigation.'
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
      control: 'color',
      description: 'Current color value'
    },
    defaultValue: {
      control: 'color',
      description: 'Initial color value'
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: 'Color format'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the color picker'
    },
    showPresets: {
      control: 'boolean',
      description: 'Show preset color palette'
    },
    showInput: {
      control: 'boolean',
      description: 'Show color input field'
    },
    allowAlpha: {
      control: 'boolean',
      description: 'Allow alpha/transparency selection'
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'inline'],
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
  const [color, setColor] = useState(args.defaultValue || '#3b82f6');
  
  const handleChange = (newColor) => {
    setColor(newColor);
    action('onChange')(newColor);
  };
  
  const handleChangeComplete = (finalColor) => {
    action('onChangeComplete')(finalColor);
  };

  return (
    <div style={{ padding: '20px' }}>
      <ColorPicker
        {...args}
        value={args.value !== undefined ? args.value : color}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
      <div style={{ 
        marginTop: '16px',
        padding: '16px',
        backgroundColor: args.value !== undefined ? args.value : color,
        border: '1px solid #ccc',
        borderRadius: '4px',
        color: 'white',
        textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
      }}>
        Selected: {args.value !== undefined ? args.value : color}
      </div>
    </div>
  );
};

// Default Color Picker
export const Default = Template.bind({});
Default.args = {
  defaultValue: '#3b82f6',
  'aria-label': 'Choose color'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button');
  
  // Test accessibility
  await expect(trigger).toBeInTheDocument();
  await expect(trigger).toHaveAttribute('aria-label');
  
  // Test opening picker
  await userEvent.click(trigger);
};

// With Presets
export const WithPresets = Template.bind({});
WithPresets.args = {
  defaultValue: '#ef4444',
  showPresets: true,
  format: 'hex',
  'aria-label': 'Color picker with presets'
};
WithPresets.parameters = {
  docs: {
    description: {
      story: 'Color picker with preset color palette for quick selection.'
    }
  }
};

// RGB Format
export const RGBFormat = Template.bind({});
RGBFormat.args = {
  defaultValue: 'rgb(34, 197, 94)',
  format: 'rgb',
  showInput: true,
  'aria-label': 'RGB color picker'
};
RGBFormat.parameters = {
  docs: {
    description: {
      story: 'Color picker using RGB format with input field.'
    }
  }
};

// HSL Format
export const HSLFormat = Template.bind({});
HSLFormat.args = {
  defaultValue: 'hsl(262, 83%, 58%)',
  format: 'hsl',
  showInput: true,
  'aria-label': 'HSL color picker'
};
HSLFormat.parameters = {
  docs: {
    description: {
      story: 'Color picker using HSL format for better color understanding.'
    }
  }
};

// With Alpha/Transparency
export const WithAlpha = Template.bind({});
WithAlpha.args = {
  defaultValue: 'rgba(168, 85, 247, 0.7)',
  format: 'rgb',
  allowAlpha: true,
  showInput: true,
  'aria-label': 'Color picker with alpha'
};
WithAlpha.parameters = {
  docs: {
    description: {
      story: 'Color picker with alpha/transparency support.'
    }
  }
};

// Compact Variant
export const Compact = Template.bind({});
Compact.args = {
  defaultValue: '#f59e0b',
  variant: 'compact',
  size: 'sm',
  'aria-label': 'Compact color picker'
};

// Inline Variant
export const Inline = Template.bind({});
Inline.args = {
  defaultValue: '#10b981',
  variant: 'inline',
  showPresets: true,
  'aria-label': 'Inline color picker'
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  defaultValue: '#6b7280',
  disabled: true,
  'aria-label': 'Disabled color picker'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button');
  
  // Test disabled state
  await expect(trigger).toBeDisabled();
  await expect(trigger).toHaveAttribute('aria-disabled', 'true');
};

// Theme Colors Demo
export const ThemeColors = () => {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#64748b');
  const [accentColor, setAccentColor] = useState('#f59e0b');
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Theme Color Configuration</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Primary Color</label>
          <ColorPicker
            value={primaryColor}
            onChange={setPrimaryColor}
            showPresets={true}
            aria-label="Primary theme color"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Secondary Color</label>
          <ColorPicker
            value={secondaryColor}
            onChange={setSecondaryColor}
            showPresets={true}
            aria-label="Secondary theme color"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Accent Color</label>
          <ColorPicker
            value={accentColor}
            onChange={setAccentColor}
            showPresets={true}
            aria-label="Accent theme color"
          />
        </div>
      </div>
      
      <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <h4>Preview</h4>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button style={{ 
            backgroundColor: primaryColor, 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px' 
          }}>
            Primary Button
          </button>
          <button style={{ 
            backgroundColor: secondaryColor, 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px' 
          }}>
            Secondary Button
          </button>
          <span style={{ 
            backgroundColor: accentColor, 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '12px', 
            fontSize: '12px' 
          }}>
            Accent Badge
          </span>
        </div>
      </div>
    </div>
  );
};
ThemeColors.parameters = {
  docs: {
    description: {
      story: 'Real-world example of theme color configuration with live preview.'
    }
  }
};

// Brand Colors Demo
export const BrandColors = () => {
  const [brandColors, setBrandColors] = useState({
    primary: '#1f2937',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  });
  
  const updateColor = (key, color) => {
    setBrandColors(prev => ({ ...prev, [key]: color }));
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Brand Color Palette</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '16px' }}>
        {Object.entries(brandColors).map(([key, color]) => (
          <div key={key}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', textTransform: 'capitalize' }}>
              {key}
            </label>
            <ColorPicker
              value={color}
              onChange={(newColor) => updateColor(key, newColor)}
              size="sm"
              aria-label={`${key} brand color`}
            />
            <div style={{ 
              marginTop: '4px', 
              fontSize: '12px', 
              fontFamily: 'monospace',
              color: '#6b7280'
            }}>
              {color}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <h4>Export Code</h4>
        <pre style={{ 
          backgroundColor: '#f8fafc', 
          padding: '12px', 
          borderRadius: '4px', 
          fontSize: '12px',
          overflow: 'auto'
        }}>
{`// Brand Colors
const brandColors = {
${Object.entries(brandColors).map(([key, color]) => `  ${key}: '${color}',`).join('\n')}
};`}
        </pre>
      </div>
    </div>
  );
};
BrandColors.parameters = {
  docs: {
    description: {
      story: 'Complete brand color palette manager with code export.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [color, setColor] = useState('#8b5cf6');
  const [variant, setVariant] = useState('default');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>Variant: </label>
        <select value={variant} onChange={(e) => setVariant(e.target.value)}>
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="inline">Inline</option>
        </select>
      </div>
      
      <div style={{ border: '1px dashed #ccc', padding: '16px', borderRadius: '4px' }}>
        <ColorPicker
          value={color}
          onChange={setColor}
          variant={variant}
          showPresets={variant !== 'compact'}
          aria-label="Responsive color picker demo"
        />
      </div>
      
      <p style={{ marginTop: '8px' }}>Selected: {color}</p>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive behavior across different variants.'
    }
  }
};

// Accessibility Focus Demo
export const AccessibilityDemo = () => {
  const [color, setColor] = useState('#ec4899');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label id="color-label" style={{ fontWeight: 'bold' }}>
          Choose your favorite color:
        </label>
      </div>
      
      <ColorPicker
        value={color}
        onChange={setColor}
        aria-labelledby="color-label"
        aria-describedby="color-description"
        showPresets={true}
        showInput={true}
      />
      
      <div id="color-description" style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
        Use Tab to navigate, Enter to open color picker, arrow keys to adjust color values.
        Current color: {color}
      </div>
    </div>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates proper ARIA labeling and keyboard navigation.'
    }
  }
};
