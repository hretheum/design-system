import React from 'react';
import { Icon } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    category: '10-media-icons',
  },
};

const Template = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Icon Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Icon Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Icon Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Icon',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Icon',
  size: 'lg',
};
