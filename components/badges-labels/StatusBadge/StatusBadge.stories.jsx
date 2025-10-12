import React from 'react';
import { StatusBadge } from './StatusBadge';

export default {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    category: 'badges-labels',
  },
};

const Template = (args) => <StatusBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'StatusBadge Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'StatusBadge Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'StatusBadge Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small StatusBadge',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large StatusBadge',
  size: 'lg',
};
