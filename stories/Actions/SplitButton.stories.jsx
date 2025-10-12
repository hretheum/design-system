import React, { useState } from 'react';
import { SplitButton } from '../../components/01-actions-controls/SplitButton/SplitButton';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Actions/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Split button with primary action and dropdown menu for additional options.'
      }
    }
  }
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <SplitButton
      {...args}
      isOpen={isOpen}
      onToggle={setIsOpen}
      onPrimaryClick={action('primaryClick')}
      onOptionClick={action('optionClick')}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  primaryLabel: 'Save',
  options: [
    { value: 'save-as', label: 'Save As...' },
    { value: 'save-copy', label: 'Save Copy' },
    { value: 'export', label: 'Export' }
  ]
};

export const PublishActions = Template.bind({});
PublishActions.args = {
  primaryLabel: 'Publish',
  variant: 'primary',
  options: [
    { value: 'publish-now', label: 'Publish Now' },
    { value: 'schedule', label: 'Schedule for Later' },
    { value: 'save-draft', label: 'Save as Draft' },
    { value: 'preview', label: 'Preview' }
  ]
};

export const DeleteActions = Template.bind({});
DeleteActions.args = {
  primaryLabel: 'Delete',
  variant: 'danger',
  options: [
    { value: 'delete-soft', label: 'Move to Trash' },
    { value: 'delete-permanent', label: 'Delete Permanently' },
    { value: 'delete-all', label: 'Delete All Selected' }
  ]
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  primaryLabel: 'Share',
  primaryIcon: '🔗',
  options: [
    { value: 'copy-link', label: 'Copy Link', icon: '📋' },
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'social', label: 'Social Media', icon: '📱' }
  ]
};
