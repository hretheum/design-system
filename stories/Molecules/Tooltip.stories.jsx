import React, { useState } from 'react';

const Tooltip = ({ content, children, position = 'top', delay = 0, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const positions = {
    top: { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    left: { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
    right: { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
  };

  const arrows = {
    top: { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      {children}
      
      {isVisible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            ...positions[position],
            padding: '0.5rem 0.75rem',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            fontSize: '0.875rem',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            zIndex: 10000,
            pointerEvents: 'none',
            animation: 'fadeIn 150ms ease-out',
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
          </style>
          {content}
          <div
            style={{
              position: 'absolute',
              ...arrows[position],
              width: '8px',
              height: '8px',
              background: 'rgba(0, 0, 0, 0.9)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Tooltip for providing additional context on hover/focus. WCAG 2.1 compliant with keyboard support and ARIA tooltip role.',
      },
    },
  },
  argTypes: {
    content: { control: 'text', description: 'Tooltip content' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number', description: 'Delay before showing (ms)' },
  },
  tags: ['autodocs'],
};

export const Top = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hover me</button>,
  },
};

export const Bottom = {
  args: {
    content: 'Bottom tooltip',
    position: 'bottom',
    children: <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hover me</button>,
  },
};

export const Left = {
  args: {
    content: 'Left tooltip',
    position: 'left',
    children: <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hover me</button>,
  },
};

export const Right = {
  args: {
    content: 'Right tooltip',
    position: 'right',
    children: <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hover me</button>,
  },
};

export const WithDelay = {
  args: {
    content: 'Appears after 500ms',
    delay: 500,
    children: <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hover me (delayed)</button>,
  },
};

export const OnIcon = {
  render: () => (
    <Tooltip content="Help information">
      <button style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-subdued)',
        border: '1px solid var(--border-default)',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.25rem',
      }}>
        ?
      </button>
    </Tooltip>
  ),
};

export const OnText = {
  render: () => (
    <p>
      This is some text with a{' '}
      <Tooltip content="Additional context here">
        <span style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', cursor: 'help' }}>
          tooltip
        </span>
      </Tooltip>
      {' '}in the middle.
    </p>
  ),
};

export const AllPositions = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', padding: '4rem' }}>
      <Tooltip content="Top tooltip" position="top">
        <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Top
        </button>
      </Tooltip>

      <div style={{ display: 'flex', gap: '3rem' }}>
        <Tooltip content="Left tooltip" position="left">
          <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Left
          </button>
        </Tooltip>

        <Tooltip content="Right tooltip" position="right">
          <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Right
          </button>
        </Tooltip>
      </div>

      <Tooltip content="Bottom tooltip" position="bottom">
        <button style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Bottom
        </button>
      </Tooltip>
    </div>
  ),
};

export const IconButtons = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Edit">
        <button style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          ✏️
        </button>
      </Tooltip>

      <Tooltip content="Delete">
        <button style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          🗑️
        </button>
      </Tooltip>

      <Tooltip content="Share">
        <button style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          🔗
        </button>
      </Tooltip>

      <Tooltip content="Download">
        <button style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
          ⬇️
        </button>
      </Tooltip>
    </div>
  ),
};

export const FormField = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label style={{ fontWeight: 500 }}>Password</label>
        <Tooltip content="Password must be at least 8 characters with numbers and symbols">
          <span style={{
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--surface-subdued)',
            borderRadius: '50%',
            fontSize: '0.75rem',
            cursor: 'help',
          }}>
            i
          </span>
        </Tooltip>
      </div>
      <input
        type="password"
        placeholder="Enter password"
        style={{
          padding: '0.5rem',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
        }}
      />
    </div>
  ),
};

export const Truncated = {
  render: () => (
    <div style={{ maxWidth: '200px' }}>
      <Tooltip content="This is the full text that was truncated in the UI">
        <div style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'help',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
        }}>
          This is the full text that was truncated
        </div>
      </Tooltip>
    </div>
  ),
};

export const StatusIndicators = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tooltip content="Service is running normally">
          <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', cursor: 'help' }} />
        </Tooltip>
        <span>API Server</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tooltip content="Experiencing degraded performance">
          <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', cursor: 'help' }} />
        </Tooltip>
        <span>Database</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tooltip content="Service is currently down">
          <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', cursor: 'help' }} />
        </Tooltip>
        <span>Email Service</span>
      </div>
    </div>
  ),
};

export const DataTable = {
  render: () => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
          <th style={{ padding: '0.75rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Name
              <Tooltip content="User's full name">
                <span style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', cursor: 'help' }}>?</span>
              </Tooltip>
            </div>
          </th>
          <th style={{ padding: '0.75rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Score
              <Tooltip content="Performance score out of 100">
                <span style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', cursor: 'help' }}>?</span>
              </Tooltip>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
          <td style={{ padding: '0.75rem' }}>John Doe</td>
          <td style={{ padding: '0.75rem' }}>95</td>
        </tr>
        <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
          <td style={{ padding: '0.75rem' }}>Jane Smith</td>
          <td style={{ padding: '0.75rem' }}>87</td>
        </tr>
      </tbody>
    </table>
  ),
};
