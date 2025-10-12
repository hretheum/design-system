import React from 'react';

const Badge = ({ variant = 'default', size = 'md', children, dot, ...props }) => {
  const variants = {
    default: { background: '#e5e7eb', color: '#374151' },
    primary: { background: '#dbeafe', color: '#1e40af' },
    success: { background: '#dcfce7', color: '#166534' },
    warning: { background: '#fef3c7', color: '#92400e' },
    error: { background: '#fee2e2', color: '#991b1b' },
    info: { background: '#dbeafe', color: '#1e40af' },
  };

  const sizes = {
    sm: { padding: '0.125rem 0.5rem', fontSize: '0.75rem', height: '20px' },
    md: { padding: '0.25rem 0.625rem', fontSize: '0.875rem', height: '24px' },
    lg: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', height: '28px' },
  };

  const config = variants[variant];
  const sizeConfig = sizes[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dot ? '0.375rem' : 0,
        ...sizeConfig,
        background: config.background,
        color: config.color,
        borderRadius: '9999px',
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
      {...props}
    >
      {dot && (
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: config.color,
        }} />
      )}
      {children}
    </span>
  );
};

export default {
  title: 'Badges & Labels/Badge',
  component: Badge,
  parameters: {
    category: '09-badges-labels',
    docs: {
      description: {
        component: 'Badge for status indicators, labels, and counts. WCAG 2.1 compliant with sufficient color contrast.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'error', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    children: { control: 'text' },
    dot: { control: 'boolean', description: 'Show status dot' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'Default',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Success = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Small = {
  args: {
    size: 'sm',
    variant: 'primary',
    children: 'Small',
  },
};

export const Medium = {
  args: {
    size: 'md',
    variant: 'primary',
    children: 'Medium',
  },
};

export const Large = {
  args: {
    size: 'lg',
    variant: 'primary',
    children: 'Large',
  },
};

export const WithDot = {
  args: {
    variant: 'success',
    dot: true,
    children: 'Active',
  },
};

export const Count = {
  args: {
    variant: 'error',
    children: '99+',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
    </div>
  ),
};

export const WithDots = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="default" dot>Idle</Badge>
    </div>
  ),
};

export const StatusIndicators = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Server Status:</span>
        <Badge variant="success" dot size="sm">Online</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Build Status:</span>
        <Badge variant="warning" dot size="sm">In Progress</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>API Status:</span>
        <Badge variant="error" dot size="sm">Down</Badge>
      </div>
    </div>
  ),
};

export const NotificationBadges = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button style={{ padding: '0.5rem', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          🔔
        </button>
        <Badge variant="error" size="sm" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
          5
        </Badge>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button style={{ padding: '0.5rem', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          💬
        </button>
        <Badge variant="primary" size="sm" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
          12
        </Badge>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button style={{ padding: '0.5rem', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          📧
        </button>
        <Badge variant="error" size="sm" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
          99+
        </Badge>
      </div>
    </div>
  ),
};

export const CategoryTags = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="primary">React</Badge>
      <Badge variant="info">TypeScript</Badge>
      <Badge variant="success">Accessibility</Badge>
      <Badge variant="default">Design System</Badge>
      <Badge variant="warning">Beta</Badge>
    </div>
  ),
};

export const UserRoles = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="https://via.placeholder.com/40" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <div>
          <div style={{ fontWeight: 600 }}>John Doe</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            <Badge variant="primary" size="sm">Admin</Badge>
            <Badge variant="success" size="sm">Pro</Badge>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="https://via.placeholder.com/40" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <div>
          <div style={{ fontWeight: 600 }}>Jane Smith</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            <Badge variant="default" size="sm">Member</Badge>
            <Badge variant="warning" size="sm">Trial</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
