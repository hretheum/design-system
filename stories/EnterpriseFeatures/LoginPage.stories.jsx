import React from 'react';
import { LoginPage } from './LoginPage';

export default {
  title: 'Components/LoginPage',
  component: LoginPage,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'LoginPage Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'LoginPage Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'LoginPage Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small LoginPage',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large LoginPage',
  size: 'lg',
};
