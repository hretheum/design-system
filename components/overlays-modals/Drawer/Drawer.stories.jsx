import React from 'react';
import { Drawer } from './Drawer';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    category: 'overlays-modals',
  },
};

const Template = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Drawer Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Drawer Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Drawer Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Drawer',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Drawer',
  size: 'lg',
};
