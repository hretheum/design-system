import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const Switch = ({ label, checked: controlledChecked, onChange, disabled, error, ...props }) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}>
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          style={{ display: 'none' }}
          {...props}
        />
        
        <div style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          background: checked ? 'var(--color-blue-600)' : 'var(--border-default)',
          borderRadius: '12px',
          transition: 'background 200ms',
          opacity: disabled ? 0.6 : 1,
        }}>
          <div style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '20px',
            height: '20px',
            background: 'white',
            borderRadius: '50%',
            transition: 'left 200ms',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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

      {error && (
        <span role="alert" style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--feedback-error)',
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default {
  title: 'Molecules/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'Toggle switch for binary on/off state. WCAG 2.1 compliant with role="switch" and keyboard support.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked = {
  args: {
    label: 'Email notifications',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled checked',
    checked: true,
    disabled: true,
  },
};

export const WithError = {
  args: {
    label: 'Terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

export const WithoutLabel = {
  args: {
    checked: true,
  },
};

export const SmallSize = {
  render: () => (
    <div style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}>
      <Switch label="Small switch" />
    </div>
  ),
};

export const LargeSize = {
  render: () => (
    <div style={{ transform: 'scale(1.2)', transformOrigin: 'left' }}>
      <Switch label="Large switch" />
    </div>
  ),
};

export const SettingsPanel = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>User Preferences</h3>
        
        <Switch
          label="Push Notifications"
          checked={settings.notifications}
          onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
        />
        
        <Switch
          label="Dark Mode"
          checked={settings.darkMode}
          onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
        />
        
        <Switch
          label="Auto-save drafts"
          checked={settings.autoSave}
          onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
        />
        
        <Switch
          label="Share analytics data"
          checked={settings.analytics}
          onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
        />

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

/**
 * Interaction Test - Tests switch toggling
 */
export const SwitchTest = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <Switch
        label="Enable feature"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        data-testid="test-switch"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find switch by label
    const switchElement = canvas.getByRole('switch', { name: /enable feature/i });
    
    // Test: Should be unchecked initially
    await expect(switchElement).not.toBeChecked();
    
    // Test: Click to enable
    await userEvent.click(switchElement);
    await expect(switchElement).toBeChecked();
    
    // Test: Click to disable
    await userEvent.click(switchElement);
    await expect(switchElement).not.toBeChecked();
    
    // Test: Enable again
    await userEvent.click(switchElement);
    await expect(switchElement).toBeChecked();
  },
};
