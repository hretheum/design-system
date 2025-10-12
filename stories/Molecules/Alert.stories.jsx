import React from 'react';

const Alert = ({ variant = 'info', title, children, onClose, icon, ...props }) => {
  const variants = {
    success: {
      background: '#f0fdf4',
      border: '#22c55e',
      text: '#166534',
      icon: '✓',
    },
    warning: {
      background: '#fffbeb',
      border: '#f59e0b',
      text: '#92400e',
      icon: '⚠',
    },
    error: {
      background: '#fef2f2',
      border: '#ef4444',
      text: '#991b1b',
      icon: '✕',
    },
    info: {
      background: '#eff6ff',
      border: '#3b82f6',
      text: '#1e40af',
      icon: 'ℹ',
    },
  };

  const config = variants[variant];

  return (
    <div
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem',
        background: config.background,
        border: `1px solid ${config.border}`,
        borderLeft: `4px solid ${config.border}`,
        borderRadius: 'var(--border-radius-md)',
        color: config.text,
        fontSize: 'var(--font-size-sm)',
      }}
      {...props}
    >
      <div style={{
        fontSize: '1.25rem',
        lineHeight: 1,
        flexShrink: 0,
      }}>
        {icon || config.icon}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{
            fontWeight: 600,
            marginBottom: '0.25rem',
            fontSize: 'var(--font-size-base)',
          }}>
            {title}
          </div>
        )}
        <div style={{ lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          style={{
            flexShrink: 0,
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '4px',
            color: config.text,
            cursor: 'pointer',
            fontSize: '1.25rem',
            lineHeight: 1,
            opacity: 0.7,
            transition: 'opacity 200ms',
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.7}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Alert messages for providing feedback to users. Supports 4 variants (success, warning, error, info) with WCAG 2.1 compliant colors and ARIA live regions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Alert variant/severity',
    },
    title: { control: 'text', description: 'Alert title' },
    children: { control: 'text', description: 'Alert message content' },
    icon: { control: 'text', description: 'Custom icon' },
  },
  tags: ['autodocs'],
};

export const Success = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const Error = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Failed to save changes. Please try again.',
  },
};

export const Info = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'New features are now available. Check out the changelog.',
  },
};

export const WithoutTitle = {
  args: {
    variant: 'info',
    children: 'This is a simple alert without a title.',
  },
};

export const WithDismiss = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'You can close this alert by clicking the X button.',
    onClose: () => alert('Alert dismissed'),
  },
};

export const LongContent = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success" title="Success">
        Operation completed successfully!
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review your input before submitting.
      </Alert>
      <Alert variant="error" title="Error">
        An error occurred while processing your request.
      </Alert>
      <Alert variant="info" title="Info">
        Here's some helpful information for you.
      </Alert>
    </div>
  ),
};

export const Interactive = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    
    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--color-blue-600)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            cursor: 'pointer',
          }}
        >
          Show Alert
        </button>
      );
    }
    
    return (
      <Alert
        variant="success"
        title="Success"
        onClose={() => setVisible(false)}
      >
        This alert can be dismissed and re-shown.
      </Alert>
    );
  },
};

export const WithCustomIcon = {
  args: {
    variant: 'info',
    title: 'New Message',
    children: 'You have received a new message.',
    icon: '📧',
  },
};

export const FormValidation = {
  render: () => {
    const [errors, setErrors] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    
    const validate = () => {
      const newErrors = [];
      if (!document.getElementById('name').value) {
        newErrors.push('Name is required');
      }
      if (!document.getElementById('email').value) {
        newErrors.push('Email is required');
      }
      
      if (newErrors.length > 0) {
        setErrors(newErrors);
        setSuccess(false);
      } else {
        setErrors([]);
        setSuccess(true);
      }
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {errors.length > 0 && (
          <Alert variant="error" title="Validation Errors">
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem' }}>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" title="Success" onClose={() => setSuccess(false)}>
            Form submitted successfully!
          </Alert>
        )}
        
        <input id="name" placeholder="Name" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
        <input id="email" placeholder="Email" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
        <button onClick={validate} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Validate
        </button>
      </div>
    );
  },
};
