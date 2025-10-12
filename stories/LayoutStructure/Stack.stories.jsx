import React from 'react';
import { Stack } from './Stack';

export default {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    category: 'layout-structure',
  },
};

const Template = (args) => <Stack {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Stack Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Stack Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Stack Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Stack',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Stack',
  size: 'lg',
};
