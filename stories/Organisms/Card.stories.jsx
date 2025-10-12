import React from 'react';

const Card = ({ variant = 'elevated', padding = 'md', header, footer, children, interactive = false, onClick, ...props }) => {
  const variants = {
    flat: {
      background: 'var(--surface-default)',
      border: '1px solid var(--border-default)',
      boxShadow: 'none',
    },
    elevated: {
      background: 'var(--surface-default)',
      border: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    },
    outlined: {
      background: 'var(--surface-default)',
      border: '2px solid var(--border-default)',
      boxShadow: 'none',
    },
  };

  const paddings = {
    none: '0',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  };

  const variantStyle = variants[variant];
  const paddingValue = paddings[padding];

  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        ...variantStyle,
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'all 200ms',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = variantStyle.boxShadow;
        }
      }}
      onFocus={(e) => {
        if (interactive) {
          e.currentTarget.style.outline = '2px solid var(--focus-ring-color)';
          e.currentTarget.style.outlineOffset = '2px';
        }
      }}
      onBlur={(e) => {
        if (interactive) {
          e.currentTarget.style.outline = 'none';
        }
      }}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      {...props}
    >
      {header && (
        <div style={{
          padding: paddingValue,
          borderBottom: '1px solid var(--border-default)',
          fontWeight: 600,
          fontSize: 'var(--font-size-lg)',
        }}>
          {header}
        </div>
      )}
      
      <div style={{ padding: paddingValue }}>
        {children}
      </div>
      
      {footer && (
        <div style={{
          padding: paddingValue,
          borderTop: '1px solid var(--border-default)',
          background: 'var(--surface-subdued)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--content-secondary)',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Organisms/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Card container for grouping related content. WCAG 2.1 compliant with keyboard support for interactive cards.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['flat', 'elevated', 'outlined'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    header: { control: 'text' },
    footer: { control: 'text' },
    interactive: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Elevated = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ marginTop: 0 }}>Card Title</h3>
        <p>This is an elevated card with shadow effect.</p>
      </div>
    ),
  },
};

export const Flat = {
  args: {
    variant: 'flat',
    children: (
      <div>
        <h3 style={{ marginTop: 0 }}>Card Title</h3>
        <p>This is a flat card with border.</p>
      </div>
    ),
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 style={{ marginTop: 0 }}>Card Title</h3>
        <p>This is an outlined card with thicker border.</p>
      </div>
    ),
  },
};

export const WithHeader = {
  args: {
    header: 'Card Header',
    children: <p>Card content goes here.</p>,
  },
};

export const WithFooter = {
  args: {
    footer: 'Last updated: 2 hours ago',
    children: <p>Card content with footer information.</p>,
  },
};

export const WithHeaderAndFooter = {
  args: {
    header: 'Complete Card',
    footer: 'Additional information',
    children: (
      <div>
        <p>This card has both header and footer.</p>
        <p>Content can span multiple paragraphs.</p>
      </div>
    ),
  },
};

export const SmallPadding = {
  args: {
    padding: 'sm',
    children: <p>Card with small padding (1rem).</p>,
  },
};

export const LargePadding = {
  args: {
    padding: 'lg',
    children: <p>Card with large padding (2rem).</p>,
  },
};

export const NoPadding = {
  args: {
    padding: 'none',
    children: (
      <img
        src="https://via.placeholder.com/400x200"
        alt="Placeholder"
        style={{ width: '100%', display: 'block' }}
      />
    ),
  },
};

export const Interactive = {
  args: {
    interactive: true,
    children: (
      <div>
        <h3 style={{ marginTop: 0 }}>Clickable Card</h3>
        <p>Hover over this card to see the interactive effect.</p>
      </div>
    ),
    onClick: () => alert('Card clicked!'),
  },
};

export const ProductCard = {
  render: () => (
    <Card variant="elevated" padding="none" style={{ maxWidth: '300px' }}>
      <img src="https://via.placeholder.com/300x200" alt="Product" style={{ width: '100%', display: 'block' }} />
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Product Name</h3>
        <p style={{ color: 'var(--content-secondary)', fontSize: 'var(--font-size-sm)', margin: '0 0 1rem 0' }}>
          Short product description goes here.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>$49.99</span>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'var(--color-blue-600)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            cursor: 'pointer',
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  ),
};

export const UserCard = {
  render: () => (
    <Card variant="outlined" padding="md" style={{ maxWidth: '350px' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <img
          src="https://via.placeholder.com/60"
          alt="User"
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>John Doe</h3>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--content-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Software Engineer
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ padding: '0.25rem 0.5rem', background: '#dbeafe', color: '#1e40af', borderRadius: '4px', fontSize: '0.75rem' }}>
              React
            </span>
            <span style={{ padding: '0.25rem 0.5rem', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '0.75rem' }}>
              TypeScript
            </span>
          </div>
        </div>
      </div>
    </Card>
  ),
};

export const StatCard = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      <Card variant="elevated">
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)', marginBottom: '0.5rem' }}>
          Total Users
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          2,543
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)', color: '#22c55e' }}>
          ↑ 12% from last month
        </div>
      </Card>

      <Card variant="elevated">
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)', marginBottom: '0.5rem' }}>
          Revenue
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          $45.2K
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)', color: '#22c55e' }}>
          ↑ 8% from last month
        </div>
      </Card>

      <Card variant="elevated">
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)', marginBottom: '0.5rem' }}>
          Active Sessions
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          892
        </div>
        <div style={{ fontSize: 'var(--font-size-sm)', color: '#ef4444' }}>
          ↓ 3% from last month
        </div>
      </Card>
    </div>
  ),
};

export const GridLayout = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} variant="elevated" interactive onClick={() => alert(`Card ${i} clicked`)}>
          <h4 style={{ marginTop: 0 }}>Card {i}</h4>
          <p style={{ color: 'var(--content-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Click me to see interaction
          </p>
        </Card>
      ))}
    </div>
  ),
};
