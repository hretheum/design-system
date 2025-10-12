import React, { useState, useEffect } from 'react';

const ProgressBar = ({ value = 0, max = 100, size = 'md', variant = 'primary', label, showValue = false, striped = false, animated = false, ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: '4px',
    md: '8px',
    lg: '12px',
  };

  const variants = {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--content-secondary)',
        }}>
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
        style={{
          width: '100%',
          height: sizes[size],
          background: 'var(--surface-subdued)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
        {...props}
      >
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: striped
            ? `repeating-linear-gradient(
                45deg,
                ${variants[variant]},
                ${variants[variant]} 10px,
                ${variants[variant]}dd 10px,
                ${variants[variant]}dd 20px
              )`
            : variants[variant],
          borderRadius: '9999px',
          transition: 'width 300ms ease-out',
          animation: animated ? 'progress-stripes 1s linear infinite' : 'none',
        }}>
          <style>
            {`
              @keyframes progress-stripes {
                0% { background-position: 0 0; }
                100% { background-position: 40px 0; }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'Progress bar for showing completion status. WCAG 2.1 compliant with ARIA progressbar role.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 }, description: 'Current value' },
    max: { control: 'number', description: 'Maximum value' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'error'] },
    label: { control: 'text', description: 'Progress label' },
    showValue: { control: 'boolean', description: 'Show percentage value' },
    striped: { control: 'boolean', description: 'Striped pattern' },
    animated: { control: 'boolean', description: 'Animate stripes' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    value: 60,
  },
};

export const WithLabel = {
  args: {
    value: 75,
    label: 'Upload Progress',
  },
};

export const WithValue = {
  args: {
    value: 45,
    label: 'Download Progress',
    showValue: true,
  },
};

export const Primary = {
  args: {
    value: 60,
    variant: 'primary',
    showValue: true,
  },
};

export const Success = {
  args: {
    value: 100,
    variant: 'success',
    label: 'Completed',
    showValue: true,
  },
};

export const Warning = {
  args: {
    value: 35,
    variant: 'warning',
    label: 'Low Storage',
    showValue: true,
  },
};

export const Error = {
  args: {
    value: 15,
    variant: 'error',
    label: 'Critical',
    showValue: true,
  },
};

export const Small = {
  args: {
    value: 70,
    size: 'sm',
    showValue: true,
  },
};

export const Medium = {
  args: {
    value: 70,
    size: 'md',
    showValue: true,
  },
};

export const Large = {
  args: {
    value: 70,
    size: 'lg',
    showValue: true,
  },
};

export const Striped = {
  args: {
    value: 65,
    striped: true,
    showValue: true,
  },
};

export const StripedAnimated = {
  args: {
    value: 75,
    striped: true,
    animated: true,
    label: 'Processing',
    showValue: true,
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={60} variant="primary" label="Primary" showValue />
      <ProgressBar value={100} variant="success" label="Success" showValue />
      <ProgressBar value={35} variant="warning" label="Warning" showValue />
      <ProgressBar value={15} variant="error" label="Error" showValue />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar value={70} size="sm" label="Small" showValue />
      <ProgressBar value={70} size="md" label="Medium" showValue />
      <ProgressBar value={70} size="lg" label="Large" showValue />
    </div>
  ),
};

export const AnimatedUpload = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setProgress(0);
      setIsUploading(true);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
    };

    return (
      <div>
        <ProgressBar
          value={progress}
          variant={progress === 100 ? 'success' : 'primary'}
          label="File Upload"
          showValue
          striped={isUploading}
          animated={isUploading}
        />
        <button
          onClick={startUpload}
          disabled={isUploading}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: isUploading ? '#9ca3af' : 'var(--color-blue-600)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isUploading ? 'not-allowed' : 'pointer',
          }}
        >
          {isUploading ? 'Uploading...' : progress === 100 ? 'Upload Complete' : 'Start Upload'}
        </button>
      </div>
    );
  },
};

export const MultipleProgress = {
  render: () => {
    const tasks = [
      { name: 'Download files', progress: 100, variant: 'success' },
      { name: 'Extract archive', progress: 75, variant: 'primary' },
      { name: 'Install packages', progress: 45, variant: 'primary' },
      { name: 'Build project', progress: 0, variant: 'primary' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map((task, index) => (
          <ProgressBar
            key={index}
            value={task.progress}
            variant={task.variant}
            label={task.name}
            showValue
            striped={task.progress > 0 && task.progress < 100}
            animated={task.progress > 0 && task.progress < 100}
          />
        ))}
      </div>
    );
  },
};

export const CustomMax = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar value={250} max={500} label="Storage Used" showValue />
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--content-secondary)' }}>
        250 MB / 500 MB used
      </div>
    </div>
  ),
};

export const DiskUsage = {
  render: () => {
    const drives = [
      { name: 'C: System', used: 85, variant: 'error' },
      { name: 'D: Documents', used: 45, variant: 'success' },
      { name: 'E: Media', used: 72, variant: 'warning' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {drives.map((drive, index) => (
          <div key={index}>
            <ProgressBar
              value={drive.used}
              variant={drive.variant}
              label={drive.name}
              showValue
              size="lg"
            />
          </div>
        ))}
      </div>
    );
  },
};
