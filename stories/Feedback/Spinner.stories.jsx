import React from 'react';

const Spinner = ({ size = 'md', variant = 'primary', label, ...props }) => {
  const sizes = {
    xs: '12px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  };

  const variants = {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    white: '#ffffff',
  };

  return (
    <div
      role="status"
      aria-label={label || 'Loading'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
      {...props}
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          animation: 'spin 1s linear infinite',
        }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={variants[variant]}
          strokeWidth="3"
          strokeOpacity="0.25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={variants[variant]}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      
      {label && (
        <span style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--content-secondary)',
        }}>
          {label}
        </span>
      )}
      
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: 'Loading spinner for indicating progress. WCAG 2.1 compliant with ARIA status role and screen reader text.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error', 'white'] },
    label: { control: 'text', description: 'Loading label' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const Primary = {
  args: {
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
  },
};

export const Success = {
  args: {
    variant: 'success',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
  },
};

export const Error = {
  args: {
    variant: 'error',
  },
};

export const ExtraSmall = {
  args: {
    size: 'xs',
  },
};

export const Small = {
  args: {
    size: 'sm',
  },
};

export const Medium = {
  args: {
    size: 'md',
  },
};

export const Large = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge = {
  args: {
    size: 'xl',
  },
};

export const WithLabel = {
  args: {
    label: 'Loading...',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Spinner variant="primary" label="Primary" />
      <Spinner variant="secondary" label="Secondary" />
      <Spinner variant="success" label="Success" />
      <Spinner variant="warning" label="Warning" />
      <Spinner variant="error" label="Error" />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const InButton = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'not-allowed',
        opacity: 0.7,
      }}>
        <Spinner size="sm" variant="white" />
        Loading...
      </button>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: '#22c55e',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'not-allowed',
        opacity: 0.7,
      }}>
        <Spinner size="sm" variant="white" />
        Processing...
      </button>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'transparent',
        color: 'var(--content-primary)',
        border: '1px solid var(--border-default)',
        borderRadius: '6px',
        cursor: 'not-allowed',
        opacity: 0.7,
      }}>
        <Spinner size="sm" variant="primary" />
        Submitting...
      </button>
    </div>
  ),
};

export const LoadingStates = {
  render: () => {
    const [loading, setLoading] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.5rem',
            background: loading ? '#9ca3af' : 'var(--color-blue-600)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            minWidth: '150px',
          }}
        >
          {loading && <Spinner size="sm" variant="white" />}
          {loading ? 'Loading...' : 'Click to Load'}
        </button>
      </div>
    );
  },
};

export const CenteredFullPage = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      gap: '1rem',
    }}>
      <Spinner size="xl" />
      <div style={{ fontSize: 'var(--font-size-lg)', color: 'var(--content-secondary)' }}>
        Loading content...
      </div>
    </div>
  ),
};

export const InlineText = {
  render: () => (
    <div style={{ fontSize: 'var(--font-size-base)' }}>
      Your request is being processed <Spinner size="xs" variant="primary" />
    </div>
  ),
};

export const CardLoading = {
  render: () => (
    <div style={{
      padding: '2rem',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--border-radius-lg)',
      textAlign: 'center',
    }}>
      <Spinner size="lg" label="Loading data..." />
    </div>
  ),
};

export const OverlayLoading = {
  render: () => (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      <div style={{
        padding: '2rem',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--border-radius-lg)',
      }}>
        <h3 style={{ marginTop: 0 }}>Content Area</h3>
        <p>Some content that is being loaded...</p>
        <p>More content here...</p>
      </div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 'var(--border-radius-lg)',
      }}>
        <Spinner size="xl" label="Loading..." />
      </div>
    </div>
  ),
};

export const DataLoading = {
  render: () => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      setTimeout(() => {
        setData([
          { id: 1, name: 'Item 1', status: 'Active' },
          { id: 2, name: 'Item 2', status: 'Pending' },
          { id: 3, name: 'Item 3', status: 'Active' },
        ]);
        setLoading(false);
      }, 2000);
    }, []);

    if (loading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          gap: '1rem',
        }}>
          <Spinner size="lg" />
          <div style={{ color: 'var(--content-secondary)' }}>Fetching data...</div>
        </div>
      );
    }

    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Data Loaded</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <td style={{ padding: '0.5rem' }}>{item.id}</td>
                <td style={{ padding: '0.5rem' }}>{item.name}</td>
                <td style={{ padding: '0.5rem' }}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
