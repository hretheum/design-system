import React from 'react';
import { ContextMenu } from './ContextMenu';

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    category: 'overlays-modals',
  },
};

const Template = (args) => <ContextMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ContextMenu Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ContextMenu Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ContextMenu Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ContextMenu',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ContextMenu',
  size: 'lg',
};
