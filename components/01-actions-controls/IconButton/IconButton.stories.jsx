import React from 'react';
import { IconButton } from './IconButton';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    category: '01-actions-controls',
  },
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'IconButton Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'IconButton Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'IconButton Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small IconButton',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large IconButton',
  size: 'lg',
};
