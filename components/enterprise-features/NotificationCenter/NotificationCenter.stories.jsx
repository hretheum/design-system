import React from 'react';
import { NotificationCenter } from './NotificationCenter';

export default {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <NotificationCenter {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'NotificationCenter Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'NotificationCenter Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'NotificationCenter Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small NotificationCenter',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large NotificationCenter',
  size: 'lg',
};
