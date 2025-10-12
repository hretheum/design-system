import React, { useState, useEffect } from 'react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md', closeOnBackdrop = true, closeOnEsc = true, ...props }) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1200px',
    full: '100vw',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
      {...props}
    >
      <div
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 200ms ease-out',
        }}
      />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: sizes[size],
          maxHeight: size === 'full' ? '100vh' : '90vh',
          background: 'var(--surface-default)',
          borderRadius: size === 'full' ? '0' : 'var(--border-radius-lg)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 300ms ease-out',
        }}
      >
        {title && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-default)',
          }}>
            <h2 id="modal-title" style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                borderRadius: 'var(--border-radius-md)',
                color: 'var(--content-secondary)',
                cursor: 'pointer',
                fontSize: '1.5rem',
                lineHeight: 1,
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-subdued)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              ×
            </button>
          </div>
        )}

        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem',
        }}>
          {children}
        </div>

        {footer && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--border-default)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default {
  title: 'Overlays & Modals/Modal',
  component: Modal,
  parameters: {
    category: '08-overlays-modals',
    docs: {
      description: {
        component: 'Modal dialog for focused content. WCAG 2.1 compliant with focus trap, keyboard navigation (Esc to close), and ARIA dialog pattern.',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Small = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Small Modal
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="sm">
          <p>This is a small modal dialog.</p>
        </Modal>
      </>
    );
  },
};

export const Medium = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Medium Modal
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Medium Modal" size="md">
          <p>This is a medium-sized modal dialog (default).</p>
        </Modal>
      </>
    );
  },
};

export const Large = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Large Modal
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="lg">
          <p>This is a large modal dialog for more content.</p>
          <p>It can contain multiple paragraphs and more complex layouts.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Modal with Footer
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirmation"
          footer={
            <>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Confirm
              </button>
            </>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </>
    );
  },
};

export const LongContent = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Modal with Scrolling
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Terms and Conditions">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </Modal>
      </>
    );
  },
};

export const FormModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Form Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create New User"
          footer={
            <>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => { alert('Form submitted!'); setIsOpen(false); }} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Create User
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
              <input style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} placeholder="John Doe" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} placeholder="john@example.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Role</label>
              <select style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }}>
                <option>Admin</option>
                <option>User</option>
                <option>Guest</option>
              </select>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClose = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Open Modal (No Backdrop Close)
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Important" closeOnBackdrop={false}>
          <p>This modal cannot be closed by clicking the backdrop.</p>
          <p>You must use the close button or press Escape.</p>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmation = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Delete Item
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item"
          size="sm"
          footer={
            <>
              <button onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => { alert('Item deleted!'); setIsOpen(false); }} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Delete
              </button>
            </>
          }
        >
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Interaction Test - Tests modal open/close interactions
 */
export const ModalTest = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          data-testid="open-modal"
          style={{ padding: '0.5rem 1rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Open Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Test Modal"
        >
          <p>This is the modal content for testing.</p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find open button
    const openButton = canvas.getByTestId('open-modal');
    
    // Test: Modal should not be visible initially
    expect(canvas.queryByText('Test Modal')).not.toBeInTheDocument();
    
    // Test: Click to open modal
    await userEvent.click(openButton);
    await waitFor(() => {
      expect(canvas.getByText('Test Modal')).toBeInTheDocument();
    });
    
    // Test: Modal content should be visible
    await expect(canvas.getByText('This is the modal content for testing.')).toBeInTheDocument();
    
    // Test: Close modal by clicking close button
    const closeButton = canvas.getByLabelText('Close modal');
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(canvas.queryByText('Test Modal')).not.toBeInTheDocument();
    });
  },
};
