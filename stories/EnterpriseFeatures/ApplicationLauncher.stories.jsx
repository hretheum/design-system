import React from 'react';
import { ApplicationLauncher } from './ApplicationLauncher';

export default {
  title: 'Components/ApplicationLauncher',
  component: ApplicationLauncher,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <ApplicationLauncher {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ApplicationLauncher Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ApplicationLauncher Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ApplicationLauncher Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ApplicationLauncher',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ApplicationLauncher',
  size: 'lg',
};
