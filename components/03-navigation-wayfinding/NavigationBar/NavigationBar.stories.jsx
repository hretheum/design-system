import React from 'react';
import { NavigationBar } from './NavigationBar';

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    category: '03-navigation-wayfinding',
  },
};

const Template = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'NavigationBar Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'NavigationBar Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'NavigationBar Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small NavigationBar',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large NavigationBar',
  size: 'lg',
};
