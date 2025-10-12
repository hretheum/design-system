import React, { useState, useEffect } from 'react';

const Toast = ({ variant = 'info', title, children, duration = 5000, onClose, position = 'top-right', ...props }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const variants = {
    success: { background: '#22c55e', icon: '✓' },
    warning: { background: '#f59e0b', icon: '⚠' },
    error: { background: '#ef4444', icon: '✕' },
    info: { background: '#3b82f6', icon: 'ℹ' },
  };

  const positions = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
  };

  const config = variants[variant];
  const positionStyle = positions[position];

  return (
    <div
      role="status"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      style={{
        position: 'fixed',
        ...positionStyle,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        minWidth: '300px',
        maxWidth: '500px',
        padding: '1rem',
        background: config.background,
        color: 'white',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        animation: isExiting ? 'slideOut 300ms ease-out' : 'slideIn 300ms ease-out',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 300ms',
      }}
      {...props}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(${position.includes('right') ? '100%' : position.includes('left') ? '-100%' : '0'}) translateY(${position.includes('top') ? '-100%' : position.includes('bottom') ? '100%' : '0'});
              opacity: 0;
            }
            to {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}
      </style>

      <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
        {config.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.95 }}>
          {children}
        </div>
      </div>

      <button
        onClick={handleClose}
        aria-label="Close notification"
        style={{
          flexShrink: 0,
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.25rem',
          lineHeight: 1,
          transition: 'background 200ms',
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ×
      </button>
    </div>
  );
};

export default {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'Toast notification for temporary messages. Auto-dismisses after duration with smooth animations. WCAG 2.1 compliant with ARIA live regions.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
    position: { control: 'select', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'] },
    title: { control: 'text' },
    children: { control: 'text' },
    duration: { control: 'number', description: 'Auto-dismiss duration (ms), 0 for manual' },
  },
  tags: ['autodocs'],
};

export const Success = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved.',
    duration: 0,
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire soon.',
    duration: 0,
  },
};

export const Error = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Failed to save changes.',
    duration: 0,
  },
};

export const Info = {
  args: {
    variant: 'info',
    title: 'Info',
    children: 'New updates are available.',
    duration: 0,
  },
};

export const WithoutTitle = {
  args: {
    variant: 'success',
    children: 'File uploaded successfully.',
    duration: 0,
  },
};

export const AutoDismiss = {
  args: {
    variant: 'info',
    title: 'Auto-dismiss',
    children: 'This will close in 3 seconds.',
    duration: 3000,
  },
};

export const TopLeft = {
  args: {
    variant: 'success',
    children: 'Top left position',
    position: 'top-left',
    duration: 0,
  },
};

export const BottomCenter = {
  args: {
    variant: 'info',
    children: 'Bottom center position',
    position: 'bottom-center',
    duration: 0,
  },
};

export const ToastManager = {
  render: () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (variant, title, message) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, variant, title, message }]);
    };

    const removeToast = (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button onClick={() => addToast('success', 'Success', 'Operation completed')} style={{ padding: '0.5rem 1rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Show Success
          </button>
          <button onClick={() => addToast('warning', 'Warning', 'Please be careful')} style={{ padding: '0.5rem 1rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Show Warning
          </button>
          <button onClick={() => addToast('error', 'Error', 'Something went wrong')} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Show Error
          </button>
          <button onClick={() => addToast('info', 'Info', 'Here is some info')} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Show Info
          </button>
        </div>

        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            duration={3000}
            onClose={() => removeToast(toast.id)}
            position="top-right"
            style={{ top: `${1 + index * 5.5}rem` }}
          >
            {toast.message}
          </Toast>
        ))}
      </div>
    );
  },
};
