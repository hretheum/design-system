import React, { useState } from 'react';
import { Slider } from '../../components/02-forms-inputs/Slider/Slider';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible range input slider with keyboard support, custom formatting, and both horizontal and vertical orientations.'
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
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number', 
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    value: {
      control: 'number',
      description: 'Controlled value'
    },
    defaultValue: {
      control: 'number',
      description: 'Initial value for uncontrolled component'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation'
    },
    showLabels: {
      control: 'boolean',
      description: 'Show min/max labels'
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value'
    },
    variant: {
      control: 'select',
      options: ['default', 'discrete', 'range'],
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
  const [value, setValue] = useState(args.defaultValue || args.min || 0);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    action('onChange')(newValue);
  };
  
  const handleChangeComplete = (finalValue) => {
    action('onChangeComplete')(finalValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Slider
        {...args}
        value={args.value !== undefined ? args.value : value}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
      <p style={{ marginTop: '16px' }}>Current value: {args.value !== undefined ? args.value : value}</p>
    </div>
  );
};

// Default Slider
export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  defaultValue: 25,
  'aria-label': 'Default slider'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider');
  
  // Test accessibility
  await expect(slider).toBeInTheDocument();
  await expect(slider).toHaveAttribute('aria-valuemin', '0');
  await expect(slider).toHaveAttribute('aria-valuemax', '100');
  await expect(slider).toHaveAttribute('aria-valuenow');
};

// With Custom Step
export const CustomStep = Template.bind({});
CustomStep.args = {
  min: 0,
  max: 10,
  step: 0.5,
  defaultValue: 2.5,
  'aria-label': 'Custom step slider'
};
CustomStep.parameters = {
  docs: {
    description: {
      story: 'Slider with custom step increment (0.5) for more precise control.'
    }
  }
};

// Price Range Example
export const PriceRange = Template.bind({});
PriceRange.args = {
  min: 0,
  max: 1000,
  step: 10,
  defaultValue: 250,
  formatValue: (value) => `$${value}`,
  showLabels: true,
  showValue: true,
  'aria-label': 'Price range slider'
};
PriceRange.parameters = {
  docs: {
    description: {
      story: 'Price range slider with custom formatting function.'
    }
  }
};

// Percentage Slider
export const Percentage = Template.bind({});
Percentage.args = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 75,
  formatValue: (value) => `${value}%`,
  variant: 'discrete',
  'aria-label': 'Percentage slider'
};
Percentage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider');
  
  // Test keyboard interaction
  await userEvent.click(slider);
  await userEvent.keyboard('{ArrowRight}');
  await userEvent.keyboard('{ArrowRight}');
  await userEvent.keyboard('{ArrowLeft}');
};

// Vertical Orientation
export const Vertical = Template.bind({});
Vertical.args = {
  min: 0,
  max: 100,
  defaultValue: 60,
  orientation: 'vertical',
  size: 'lg',
  'aria-label': 'Vertical slider'
};
Vertical.decorators = [
  (Story) => (
    <div style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
      <Story />
    </div>
  )
];

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  min: 0,
  max: 100,
  defaultValue: 40,
  disabled: true,
  'aria-label': 'Disabled slider'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const slider = canvas.getByRole('slider');
  
  // Test disabled state
  await expect(slider).toBeDisabled();
  await expect(slider).toHaveAttribute('aria-disabled', 'true');
};

// Large Size
export const Large = Template.bind({});
Large.args = {
  min: 0,
  max: 100,
  defaultValue: 50,
  size: 'lg',
  variant: 'discrete',
  'aria-label': 'Large slider'
};

// Small Size
export const Small = Template.bind({});
Small.args = {
  min: 0,
  max: 100,
  defaultValue: 30,
  size: 'sm',
  'aria-label': 'Small slider'
};

// Volume Control Example
export const VolumeControl = () => {
  const [volume, setVolume] = useState(50);
  
  const getVolumeIcon = (vol) => {
    if (vol === 0) return '🔇';
    if (vol < 30) return '🔈';
    if (vol < 70) return '🔉';
    return '🔊';
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '24px' }}>{getVolumeIcon(volume)}</span>
        <Slider
          min={0}
          max={100}
          value={volume}
          onChange={setVolume}
          formatValue={(value) => `${value}%`}
          aria-label="Volume control"
          style={{ flex: 1 }}
        />
        <span style={{ minWidth: '40px', textAlign: 'right' }}>{volume}%</span>
      </div>
    </div>
  );
};
VolumeControl.parameters = {
  docs: {
    description: {
      story: 'Real-world example of a volume control with visual feedback.'
    }
  }
};

// Temperature Range
export const Temperature = () => {
  const [temp, setTemp] = useState(21);
  
  const getTempColor = (temperature) => {
    if (temperature < 15) return '#4299e1'; // cold - blue
    if (temperature < 25) return '#48bb78'; // mild - green  
    return '#f56565'; // hot - red
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3>Room Temperature Control</h3>
        <div style={{ 
          padding: '8px 16px', 
          backgroundColor: getTempColor(temp),
          color: 'white',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          {temp}°C
        </div>
      </div>
      <Slider
        min={10}
        max={35}
        value={temp}
        onChange={setTemp}
        formatValue={(value) => `${value}°C`}
        aria-label="Temperature control"
        showLabels={true}
      />
    </div>
  );
};
Temperature.parameters = {
  docs: {
    description: {
      story: 'Temperature control with dynamic color feedback based on value.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [value, setValue] = useState(50);
  const [orientation, setOrientation] = useState('horizontal');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={orientation === 'vertical'}
            onChange={(e) => setOrientation(e.target.checked ? 'vertical' : 'horizontal')}
          />
          Vertical orientation
        </label>
      </div>
      
      <div style={{ 
        height: orientation === 'vertical' ? '200px' : 'auto',
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          orientation={orientation}
          aria-label="Responsive slider demo"
        />
      </div>
      
      <p style={{ marginTop: '16px' }}>Value: {value}</p>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive behavior switching between horizontal and vertical orientations.'
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
      <Slider
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={setValue}
        aria-labelledby="rating-label"
        aria-describedby="rating-description"
        showLabels={true}
        showValue={true}
      />
      <div id="rating-description" style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
        Use arrow keys or click and drag to change the rating. Current rating: {value} out of 10.
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
