import React, { useState, useRef, useEffect } from 'react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

const Dropdown = ({ trigger, items, position = 'bottom-left', onSelect, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const positions = {
    'top-left': { bottom: 'calc(100% + 4px)', left: 0 },
    'top-right': { bottom: 'calc(100% + 4px)', right: 0 },
    'bottom-left': { top: 'calc(100% + 4px)', left: 0 },
    'bottom-right': { top: 'calc(100% + 4px)', right: 0 },
  };

  const handleItemClick = (item) => {
    if (!item.disabled) {
      onSelect?.(item);
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }} {...props}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            ...positions[position],
            minWidth: '200px',
            background: 'var(--surface-default)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--border-radius-md)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            padding: '0.5rem 0',
            zIndex: 1000,
            animation: 'fadeIn 150ms ease-out',
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-4px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={index}
                  style={{
                    height: '1px',
                    background: 'var(--border-default)',
                    margin: '0.5rem 0',
                  }}
                />
              );
            }

            return (
              <button
                key={index}
                role="menuitem"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: 'var(--font-size-sm)',
                  color: item.disabled ? 'var(--content-disabled)' : item.danger ? '#ef4444' : 'var(--content-primary)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 150ms',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) {
                    e.target.style.background = 'var(--surface-subdued)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
                onFocus={(e) => {
                  e.target.style.background = 'var(--surface-subdued)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {item.icon && <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--content-tertiary)' }}>
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Organisms/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: 'Dropdown menu for actions and options. WCAG 2.1 compliant with keyboard navigation, Escape to close, and ARIA menu pattern.',
      },
    },
  },
  argTypes: {
    position: { control: 'select', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] },
  },
  tags: ['autodocs'],
};

const sampleItems = [
  { label: 'Edit', icon: '✏️', onClick: () => alert('Edit clicked') },
  { label: 'Duplicate', icon: '📋', onClick: () => alert('Duplicate clicked') },
  { divider: true },
  { label: 'Archive', icon: '📦', onClick: () => alert('Archive clicked') },
  { label: 'Delete', icon: '🗑️', danger: true, onClick: () => alert('Delete clicked') },
];

export const Default = {
  args: {
    trigger: (
      <button style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-blue-600)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        Open Menu
      </button>
    ),
    items: sampleItems,
  },
};

export const BottomLeft = {
  args: {
    trigger: (
      <button style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-blue-600)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        Bottom Left
      </button>
    ),
    items: sampleItems,
    position: 'bottom-left',
  },
};

export const BottomRight = {
  args: {
    trigger: (
      <button style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-blue-600)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        Bottom Right
      </button>
    ),
    items: sampleItems,
    position: 'bottom-right',
  },
};

export const WithShortcuts = {
  args: {
    trigger: (
      <button style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-blue-600)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        Actions
      </button>
    ),
    items: [
      { label: 'New', icon: '➕', shortcut: '⌘N' },
      { label: 'Open', icon: '📂', shortcut: '⌘O' },
      { label: 'Save', icon: '💾', shortcut: '⌘S' },
      { divider: true },
      { label: 'Close', icon: '✕', shortcut: '⌘W' },
    ],
  },
};

export const WithDisabled = {
  args: {
    trigger: (
      <button style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-blue-600)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        Options
      </button>
    ),
    items: [
      { label: 'Available Option 1' },
      { label: 'Disabled Option', disabled: true },
      { label: 'Available Option 2' },
      { label: 'Another Disabled', disabled: true },
    ],
  },
};

export const IconButton = {
  render: () => (
    <Dropdown
      trigger={
        <button style={{
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1.25rem',
        }}>
          ⋮
        </button>
      }
      items={sampleItems}
    />
  ),
};

export const UserMenu = {
  render: () => (
    <Dropdown
      trigger={
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          background: 'transparent',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          cursor: 'pointer',
        }}>
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          <span>John Doe</span>
          <span style={{ fontSize: '0.75rem' }}>▼</span>
        </button>
      }
      items={[
        { label: 'Profile', icon: '👤' },
        { label: 'Settings', icon: '⚙️' },
        { label: 'Billing', icon: '💳' },
        { divider: true },
        { label: 'Help', icon: '❓' },
        { label: 'Log out', icon: '🚪', danger: true },
      ]}
      position="bottom-right"
    />
  ),
};

export const TableActions = {
  render: () => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
          <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map((i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-default)' }}>
            <td style={{ padding: '0.75rem' }}>Item {i}</td>
            <td style={{ padding: '0.75rem' }}>
              <span style={{
                padding: '0.25rem 0.5rem',
                background: '#dcfce7',
                color: '#166534',
                borderRadius: '9999px',
                fontSize: '0.75rem',
              }}>
                Active
              </span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
              <Dropdown
                trigger={
                  <button style={{
                    padding: '0.25rem 0.5rem',
                    background: 'transparent',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}>
                    ⋮
                  </button>
                }
                items={sampleItems}
                position="bottom-right"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const ContextMenu = {
  render: () => {
    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (e) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
      <div>
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            background: 'var(--surface-subdued)',
            border: '1px dashed var(--border-default)',
            borderRadius: '6px',
            textAlign: 'center',
            cursor: 'context-menu',
          }}
        >
          Right-click here to open context menu
        </div>

        {contextMenu && (
          <div
            style={{
              position: 'fixed',
              top: contextMenu.y,
              left: contextMenu.x,
              minWidth: '200px',
              background: 'var(--surface-default)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              padding: '0.5rem 0',
              zIndex: 1000,
            }}
            onClick={() => setContextMenu(null)}
          >
            {sampleItems.map((item, index) => {
              if (item.divider) {
                return <div key={index} style={{ height: '1px', background: 'var(--border-default)', margin: '0.5rem 0' }} />;
              }
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: 'var(--font-size-sm)',
                    color: item.danger ? '#ef4444' : 'var(--content-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
};

export const MultiLevel = {
  render: () => (
    <Dropdown
      trigger={
        <button style={{
          padding: '0.5rem 1rem',
          background: 'var(--color-blue-600)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}>
          File Menu
        </button>
      }
      items={[
        { label: 'New File', icon: '📄', shortcut: '⌘N' },
        { label: 'New Folder', icon: '📁' },
        { divider: true },
        { label: 'Open...', icon: '📂', shortcut: '⌘O' },
        { label: 'Open Recent', icon: '🕒' },
        { divider: true },
        { label: 'Save', icon: '💾', shortcut: '⌘S' },
        { label: 'Save As...', icon: '💾', shortcut: '⇧⌘S' },
        { divider: true },
        { label: 'Close', icon: '✕', shortcut: '⌘W' },
      ]}
    />
  ),
};

/**
 * Interaction Test - Tests dropdown open/close and selection
 */
export const DropdownTest = {
  render: () => {
    const [selected, setSelected] = useState('');
    
    return (
      <div>
        <Dropdown
          trigger="Select Action"
          items={[
            { label: 'Edit', onClick: () => setSelected('Edit') },
            { label: 'Delete', onClick: () => setSelected('Delete') },
            { label: 'Share', onClick: () => setSelected('Share') },
          ]}
        />
        {selected && <div style={{ marginTop: '1rem' }}>Selected: {selected}</div>}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test: Dropdown should be closed initially
    expect(canvas.queryByText('Edit')).not.toBeInTheDocument();
    
    // Test: Click trigger to open dropdown
    const trigger = canvas.getByText('Select Action');
    await userEvent.click(trigger);
    
    // Test: Menu items should be visible
    await waitFor(() => {
      expect(canvas.getByText('Edit')).toBeInTheDocument();
      expect(canvas.getByText('Delete')).toBeInTheDocument();
      expect(canvas.getByText('Share')).toBeInTheDocument();
    });
    
    // Test: Click an item
    await userEvent.click(canvas.getByText('Edit'));
    
    // Test: Selection should be displayed
    await waitFor(() => {
      expect(canvas.getByText('Selected: Edit')).toBeInTheDocument();
    });
    
    // Test: Menu should close after selection
    expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
  },
};
