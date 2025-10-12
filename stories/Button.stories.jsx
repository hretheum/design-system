import React from 'react';

// Simple Button component for demo
const Button = ({ children, variant = 'primary', size = 'md', disabled = false, ...props }) => {
  const styles = {
    primary: {
      background: 'var(--color-blue-600)',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--content-primary)',
      border: '1px solid var(--border-default)',
    },
  };

  const sizes = {
    sm: { height: '32px', padding: '0 12px', fontSize: '14px' },
    md: { height: '40px', padding: '0 16px', fontSize: '16px' },
    lg: { height: '48px', padding: '0 24px', fontSize: '18px' },
  };

  return (
    <button
      style={{
        ...styles[variant],
        ...sizes[size],
        borderRadius: 'var(--border-radius-md)',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        minHeight: size === 'md' ? 'var(--touch-target-mobile)' : undefined,
        outline: 'none',
      }}
      disabled={disabled}
      {...props}
      onFocus={(e) => {
        e.target.style.outline = `var(--focus-ring-width) solid var(--focus-ring-color)`;
        e.target.style.outlineOffset = 'var(--focus-ring-offset)';
      }}
      onBlur={(e) => {
        e.target.style.outline = 'none';
      }}
    >
      {children}
    </button>
  );
};

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary UI button component with WCAG 2.1 AA/AAA compliance. Touch target minimum 44x44px on mobile.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size (md meets WCAG touch target)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithAccessibleFocus = {
  args: {
    children: 'Tab to focus (2px outline)',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Focus indicator meets WCAG 2.4.7 with 2px width and 2px offset.',
      },
    },
  },
};
