import React, { useState } from 'react';
import { IconButton } from '../../components/01-actions-controls/IconButton/IconButton';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Actions/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Icon-only button with accessible labeling, multiple variants, and comprehensive interaction states.'
      }
    }
  },
  argTypes: {
    icon: { control: 'text', description: 'Icon content (emoji, SVG, etc.)' },
    'aria-label': { control: 'text', description: 'Accessible label for screen readers' },
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'], description: 'Visual variant' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Button size' },
    disabled: { control: 'boolean', description: 'Disable the button' },
    loading: { control: 'boolean', description: 'Show loading state' }
  }
};

const Template = (args) => (
  <IconButton {...args} onClick={action('clicked')} />
);

export const Default = Template.bind({});
Default.args = {
  icon: '⚙️',
  'aria-label': 'Settings'
};

export const Primary = Template.bind({});
Primary.args = {
  icon: '✓',
  variant: 'primary',
  'aria-label': 'Confirm'
};

export const Danger = Template.bind({});
Danger.args = {
  icon: '🗑️',
  variant: 'danger',
  'aria-label': 'Delete'
};

export const Toolbar = () => (
  <div style={{ display: 'flex', gap: '8px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
    <IconButton icon="📄" aria-label="New document" onClick={action('new')} />
    <IconButton icon="📁" aria-label="Open file" onClick={action('open')} />
    <IconButton icon="💾" aria-label="Save" onClick={action('save')} />
    <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
    <IconButton icon="↶" aria-label="Undo" onClick={action('undo')} />
    <IconButton icon="↷" aria-label="Redo" onClick={action('redo')} />
    <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
    <IconButton icon="⚙️" aria-label="Settings" onClick={action('settings')} />
  </div>
);

export const Disabled = Template.bind({});
Disabled.args = {
  icon: '🔒',
  disabled: true,
  'aria-label': 'Locked'
};

export const Loading = Template.bind({});
Loading.args = {
  icon: '💾',
  loading: true,
  'aria-label': 'Saving...'
};
