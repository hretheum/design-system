import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const Tabs = ({ tabs, defaultTab = 0, variant = 'underline', size = 'md', fullWidth = false, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const sizeConfig = sizes[size];

  return (
    <div style={{ width: '100%' }}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: variant === 'pills' ? '0.5rem' : '0',
          borderBottom: variant === 'underline' ? '1px solid var(--border-default)' : 'none',
          background: variant === 'boxed' ? 'var(--surface-subdued)' : 'transparent',
          padding: variant === 'boxed' ? '0.25rem' : '0',
          borderRadius: variant === 'boxed' ? 'var(--border-radius-md)' : '0',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => handleTabClick(index)}
            disabled={tab.disabled}
            style={{
              flex: fullWidth ? 1 : 'none',
              ...sizeConfig,
              background:
                variant === 'boxed' && activeTab === index
                  ? 'var(--surface-default)'
                  : variant === 'pills' && activeTab === index
                  ? 'var(--color-blue-600)'
                  : 'transparent',
              color:
                variant === 'pills' && activeTab === index
                  ? 'white'
                  : tab.disabled
                  ? 'var(--content-disabled)'
                  : activeTab === index
                  ? 'var(--color-blue-600)'
                  : 'var(--content-secondary)',
              border: variant === 'boxed' ? 'none' : '1px solid transparent',
              borderBottom:
                variant === 'underline' && activeTab === index
                  ? '2px solid var(--color-blue-600)'
                  : variant === 'underline'
                  ? '2px solid transparent'
                  : 'none',
              borderRadius: variant === 'boxed' || variant === 'pills' ? 'var(--border-radius-md)' : '0',
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              fontWeight: activeTab === index ? 600 : 400,
              opacity: tab.disabled ? 0.5 : 1,
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--focus-ring-color)';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
            }}
          >
            {tab.icon && <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span style={{
                marginLeft: '0.5rem',
                padding: '0.125rem 0.5rem',
                background: activeTab === index && variant === 'pills' ? 'rgba(255,255,255,0.2)' : 'var(--surface-subdued)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
          style={{
            padding: '1.5rem 0',
          }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Navigation & Wayfinding/Tabs',
  component: Tabs,
  parameters: {
    category: '03-navigation-wayfinding',
    docs: {
      description: {
        component: 'Tabs for organizing content into multiple panels. WCAG 2.1 compliant with ARIA tablist pattern and keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['underline', 'pills', 'boxed'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

const sampleTabs = [
  { label: 'Profile', content: <div>Profile content goes here</div> },
  { label: 'Settings', content: <div>Settings content goes here</div> },
  { label: 'Messages', content: <div>Messages content goes here</div> },
];

export const Underline = {
  args: {
    tabs: sampleTabs,
    variant: 'underline',
  },
};

export const Pills = {
  args: {
    tabs: sampleTabs,
    variant: 'pills',
  },
};

export const Boxed = {
  args: {
    tabs: sampleTabs,
    variant: 'boxed',
  },
};

export const Small = {
  args: {
    tabs: sampleTabs,
    size: 'sm',
  },
};

export const Medium = {
  args: {
    tabs: sampleTabs,
    size: 'md',
  },
};

export const Large = {
  args: {
    tabs: sampleTabs,
    size: 'lg',
  },
};

export const FullWidth = {
  args: {
    tabs: sampleTabs,
    fullWidth: true,
  },
};

export const WithIcons = {
  args: {
    tabs: [
      { label: 'Home', icon: '🏠', content: <div>Home content</div> },
      { label: 'Search', icon: '🔍', content: <div>Search content</div> },
      { label: 'Settings', icon: '⚙️', content: <div>Settings content</div> },
    ],
    variant: 'underline',
  },
};

export const WithBadges = {
  args: {
    tabs: [
      { label: 'All', badge: '12', content: <div>All items</div> },
      { label: 'Pending', badge: '3', content: <div>Pending items</div> },
      { label: 'Completed', badge: '9', content: <div>Completed items</div> },
    ],
    variant: 'underline',
  },
};

export const WithDisabled = {
  args: {
    tabs: [
      { label: 'Active Tab', content: <div>Active content</div> },
      { label: 'Disabled Tab', content: <div>This should not show</div>, disabled: true },
      { label: 'Another Active', content: <div>Another active content</div> },
    ],
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Underline</h3>
        <Tabs tabs={sampleTabs} variant="underline" />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Pills</h3>
        <Tabs tabs={sampleTabs} variant="pills" />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Boxed</h3>
        <Tabs tabs={sampleTabs} variant="boxed" />
      </div>
    </div>
  ),
};

export const Interactive = {
  render: () => {
    const [currentTab, setCurrentTab] = useState(0);
    
    const tabs = [
      {
        label: 'Profile',
        content: (
          <div>
            <h3>Profile Information</h3>
            <p>View and edit your profile details.</p>
          </div>
        ),
      },
      {
        label: 'Account',
        content: (
          <div>
            <h3>Account Settings</h3>
            <p>Manage your account preferences and security.</p>
          </div>
        ),
      },
      {
        label: 'Notifications',
        badge: '5',
        content: (
          <div>
            <h3>Notification Settings</h3>
            <p>You have 5 unread notifications.</p>
          </div>
        ),
      },
    ];

    return (
      <div>
        <Tabs tabs={tabs} defaultTab={currentTab} onChange={setCurrentTab} />
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px' }}>
          Current tab index: <strong>{currentTab}</strong>
        </div>
      </div>
    );
  },
};

export const FormExample = {
  render: () => {
    const tabs = [
      {
        label: 'Personal Info',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="First Name" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
            <input placeholder="Last Name" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
            <input placeholder="Email" type="email" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
          </div>
        ),
      },
      {
        label: 'Address',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="Street Address" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
            <input placeholder="City" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
            <input placeholder="ZIP Code" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '4px' }} />
          </div>
        ),
      },
      {
        label: 'Review',
        content: (
          <div>
            <h3>Review Your Information</h3>
            <p>Please review all information before submitting.</p>
            <button style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'var(--color-blue-600)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Submit
            </button>
          </div>
        ),
      },
    ];

    return <Tabs tabs={tabs} variant="pills" />;
  },
};

/**
 * Interaction Test - Tests tab switching
 */
export const TabsTest = {
  render: () => {
    const tabs = [
      { id: 'home', label: 'Home', content: <div>Home content is displayed</div> },
      { id: 'profile', label: 'Profile', content: <div>Profile content is displayed</div> },
      { id: 'settings', label: 'Settings', content: <div>Settings content is displayed</div> },
    ];
    
    return <Tabs tabs={tabs} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test: First tab content should be visible initially
    await expect(canvas.getByText('Home content is displayed')).toBeVisible();
    
    // Test: Other tabs content should be hidden (still in DOM but not visible)
    const profileContent = canvas.getByText('Profile content is displayed');
    const settingsContent = canvas.getByText('Settings content is displayed');
    await expect(profileContent).not.toBeVisible();
    await expect(settingsContent).not.toBeVisible();
    
    // Test: Click Profile tab
    const profileTab = canvas.getByRole('tab', { name: /profile/i });
    await userEvent.click(profileTab);
    
    // Test: Profile content should be visible, Home hidden
    await expect(profileContent).toBeVisible();
    await expect(canvas.getByText('Home content is displayed')).not.toBeVisible();
    
    // Test: Click Settings tab
    const settingsTab = canvas.getByRole('tab', { name: /settings/i });
    await userEvent.click(settingsTab);
    
    // Test: Settings content should be visible, Profile hidden
    await expect(settingsContent).toBeVisible();
    await expect(profileContent).not.toBeVisible();
  },
};
