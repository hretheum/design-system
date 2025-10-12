import React from 'react';
import { Menu } from './Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    category: '03-navigation-wayfinding',
  },
};

const Template = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Menu Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Menu Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Menu Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Menu',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Menu',
  size: 'lg',
};
