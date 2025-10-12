import React from 'react';
import { Portal } from './Portal';

export default {
  title: 'Components/Portal',
  component: Portal,
  parameters: {
    category: '11-utilities-helpers',
  },
};

const Template = (args) => <Portal {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Portal Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Portal Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Portal Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Portal',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Portal',
  size: 'lg',
};
