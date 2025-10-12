import React, { useState } from 'react';

const Switch = ({ label, checked: controlledChecked, onChange, disabled, ...props }) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <label style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      minHeight: '44px',
      padding: '8px',
      userSelect: 'none',
    }}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={checked}
        style={{ display: 'none' }}
        {...props}
      />
      
      <div
        style={{
          position: 'relative',
          width: '48px',
          height: '24px',
          borderRadius: '12px',
          background: checked
            ? (disabled ? 'var(--color-blue-400)' : 'var(--color-blue-600)')
            : (disabled ? 'var(--neutral-200)' : 'var(--neutral-400)'),
          transition: 'background 200ms',
          outline: '2px solid transparent',
          outlineOffset: '2px',
        }}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleChange({ target: { checked: !checked } });
          }
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid var(--focus-ring-color)';
        }}
        onBlur={(e) => {
          e.target.style.outline = '2px solid transparent';
        }}
      >
        <div style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '26px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '10px',
          background: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: disabled ? 0.6 : 1,
        }} />
      </div>
      
      {label && (
        <span style={{
          fontSize: 'var(--font-size-base)',
          color: disabled ? 'var(--content-disabled)' : 'var(--content-primary)',
        }}>
          {label}
        </span>
      )}
    </label>
  );
};

export default {
  title: 'Molecules/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'Toggle switch for binary on/off states. WCAG 2.1 compliant with keyboard support and focus indicators.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Switch label' },
    checked: { control: 'boolean', description: 'Checked/on state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  tags: ['autodocs'],
};

export const Off = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const On = {
  args: {
    label: 'Enable notifications',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'This setting is disabled',
    disabled: true,
  },
};

export const DisabledOn = {
  args: {
    label: 'This setting is on and disabled',
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

export const Interactive = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    
    return (
      <Switch
        label="Enable notifications"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
    );
  },
};

export const SettingsGroup = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });
    
    const toggleSetting = (key) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: 'var(--font-size-lg)' }}>Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Switch
              label="Push notifications"
              checked={settings.notifications}
              onChange={() => toggleSetting('notifications')}
            />
            <Switch
              label="Dark mode"
              checked={settings.darkMode}
              onChange={() => toggleSetting('darkMode')}
            />
            <Switch
              label="Auto-save"
              checked={settings.autoSave}
              onChange={() => toggleSetting('autoSave')}
            />
            <Switch
              label="Analytics tracking"
              checked={settings.analytics}
              onChange={() => toggleSetting('analytics')}
            />
          </div>
        </div>
        
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--surface-subdued)',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-sm)',
        }}>
          <strong>Current settings:</strong>
          <pre style={{ marginTop: '0.5rem' }}>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    );
  },
};
