import React from 'react';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    category: 'layout-structure',
  },
};

const Template = (args) => <Divider {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Divider Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Divider Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Divider Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Divider',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Divider',
  size: 'lg',
};
