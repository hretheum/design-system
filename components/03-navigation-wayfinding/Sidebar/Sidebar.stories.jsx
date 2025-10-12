import React from 'react';
import { Sidebar } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    category: '03-navigation-wayfinding',
  },
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Sidebar Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Sidebar Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Sidebar Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Sidebar',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Sidebar',
  size: 'lg',
};
