import React, { useState } from 'react';
import { ActionMenu } from '../../components/01-actions-controls/ActionMenu/ActionMenu';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Actions/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dropdown menu for actions with keyboard navigation, separators, and danger states.'
      }
    }
  }
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <ActionMenu
      {...args}
      isOpen={isOpen}
      onToggle={setIsOpen}
      onAction={action('action')}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  trigger: 'Actions',
  actions: [
    { id: 'edit', label: 'Edit', icon: '✏️' },
    { id: 'duplicate', label: 'Duplicate', icon: '📋' },
    { id: 'share', label: 'Share', icon: '🔗' },
    { type: 'separator' },
    { id: 'delete', label: 'Delete', icon: '🗑️', variant: 'danger' }
  ]
};

export const ContextMenu = Template.bind({});
ContextMenu.args = {
  trigger: '⋮',
  variant: 'ghost',
  actions: [
    { id: 'view', label: 'View Details' },
    { id: 'edit', label: 'Edit' },
    { type: 'separator' },
    { id: 'copy', label: 'Copy Link' },
    { id: 'move', label: 'Move to...' },
    { type: 'separator' },
    { id: 'archive', label: 'Archive' },
    { id: 'delete', label: 'Delete', variant: 'danger' }
  ]
};

export const UserMenu = Template.bind({});
UserMenu.args = {
  trigger: 'John Doe',
  actions: [
    { id: 'profile', label: 'View Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { type: 'separator' },
    { id: 'help', label: 'Help & Support', icon: '❓' },
    { type: 'separator' },
    { id: 'logout', label: 'Sign Out', variant: 'danger' }
  ]
};

export const StatusActions = () => {
  const [status, setStatus] = useState('draft');
  
  const statusActions = {
    draft: [
      { id: 'edit', label: 'Edit' },
      { id: 'publish', label: 'Publish' },
      { id: 'schedule', label: 'Schedule' },
      { type: 'separator' },
      { id: 'delete', label: 'Delete', variant: 'danger' }
    ],
    published: [
      { id: 'edit', label: 'Edit' },
      { id: 'unpublish', label: 'Unpublish' },
      { id: 'duplicate', label: 'Duplicate' },
      { type: 'separator' },
      { id: 'archive', label: 'Archive' }
    ]
  };
  
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <span>Status: <strong>{status}</strong></span>
      <ActionMenu
        trigger="Actions"
        actions={statusActions[status]}
        onAction={(actionId) => {
          action('statusAction')(actionId, status);
          if (actionId === 'publish') setStatus('published');
          if (actionId === 'unpublish') setStatus('draft');
        }}
      />
    </div>
  );
};

export const WithSubmenus = Template.bind({});
WithSubmenus.args = {
  trigger: 'File',
  actions: [
    { id: 'new', label: 'New', icon: '📄' },
    { id: 'open', label: 'Open', icon: '📁' },
    { 
      id: 'recent', 
      label: 'Open Recent', 
      submenu: [
        { id: 'recent-1', label: 'Document 1.pdf' },
        { id: 'recent-2', label: 'Presentation.pptx' },
        { id: 'recent-3', label: 'Spreadsheet.xlsx' }
      ]
    },
    { type: 'separator' },
    { id: 'save', label: 'Save', icon: '💾' },
    { id: 'save-as', label: 'Save As...' },
    { type: 'separator' },
    {
      id: 'export',
      label: 'Export',
      submenu: [
        { id: 'export-pdf', label: 'Export as PDF' },
        { id: 'export-image', label: 'Export as Image' },
        { id: 'export-csv', label: 'Export as CSV' }
      ]
    }
  ]
};
