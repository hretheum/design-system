import React from 'react';
import { List } from './List';

export default {
  title: 'Components/List',
  component: List,
  parameters: {
    category: '04-data-display-tables',
  },
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'List Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'List Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'List Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small List',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large List',
  size: 'lg',
};
