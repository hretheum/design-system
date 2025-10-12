import React from 'react';
import { UserProfile } from './UserProfile';

export default {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'UserProfile Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'UserProfile Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'UserProfile Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small UserProfile',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large UserProfile',
  size: 'lg',
};
