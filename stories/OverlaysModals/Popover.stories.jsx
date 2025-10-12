import React from 'react';
import { Popover } from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    category: 'overlays-modals',
  },
};

const Template = (args) => <Popover {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Popover Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Popover Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Popover Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Popover',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Popover',
  size: 'lg',
};
